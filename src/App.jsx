import { useState, useEffect } from "react";
import styles from "./styles/styles";
import "./styles/print.css";
import SCENARIOS from "./data/scenarios";
import { TOTAL_STEPS } from "./data/constants";
import Intro from "./components/Intro";
import ConfidenceScreen from "./components/ConfidenceScreen";
import ScenarioScreen from "./components/ScenarioScreen";
import Results from "./components/Results";
import Footer from "./components/Footer";

export default function App() {
  const [screen, setScreen] = useState("intro"); // intro | confidence | quiz | results
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [step, setStep] = useState(1); // 1 or 2
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({}); // key "i-1"/"i-2" -> chosen option object
  const [confidenceIndex, setConfidenceIndex] = useState(null);

  // Scroll to top on every navigation — covers intro→confidence,
  // confidence→quiz, step 1→2 within a scenario, moving between
  // scenarios, going back through any of the above, and quiz→results.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen, scenarioIndex, step]);

  function stepKey(i, s) {
    return `${i}-${s}`;
  }

  function branchFor(i) {
    const a = answers[stepKey(i, 1)];
    return a ? a.branch : null;
  }

  function startFlow() {
    setScreen("confidence");
  }

  function chooseConfidence(index) {
    setConfidenceIndex(index);
  }

  function confirmConfidence() {
    setScreen("quiz");
    setScenarioIndex(0);
    setStep(1);
    setSelected(answers[stepKey(0, 1)] || null);
  }

  function choose(opt) {
    setSelected(opt);
  }

  function next() {
    const key = stepKey(scenarioIndex, step);
    const newAnswers = { ...answers, [key]: selected };

    if (step === 1) {
      delete newAnswers[stepKey(scenarioIndex, 2)];
    }
    setAnswers(newAnswers);

    if (step === 1) {
      setStep(2);
      setSelected(newAnswers[stepKey(scenarioIndex, 2)] || null);
    } else if (scenarioIndex + 1 < SCENARIOS.length) {
      const nextIndex = scenarioIndex + 1;
      setScenarioIndex(nextIndex);
      setStep(1);
      setSelected(newAnswers[stepKey(nextIndex, 1)] || null);
    } else {
      setScreen("results");
    }
  }

  function back() {
    if (screen === "confidence") {
      setScreen("intro");
      return;
    }
    if (step === 2) {
      setStep(1);
      setSelected(answers[stepKey(scenarioIndex, 1)] || null);
      return;
    }
    if (scenarioIndex === 0) {
      setScreen("confidence");
      return;
    }
    const prevIndex = scenarioIndex - 1;
    setScenarioIndex(prevIndex);
    setStep(2);
    setSelected(answers[stepKey(prevIndex, 2)] || null);
  }

  function buildRecords() {
    const records = [];
    SCENARIOS.forEach((scenario, i) => {
      const a1 = answers[stepKey(i, 1)];
      const a2 = answers[stepKey(i, 2)];
      if (a1) records.push({ category: scenario.category, type: a1.type });
      if (a2) records.push({ category: scenario.category, type: a2.type });
    });
    return records;
  }

  const currentStepIndex = scenarioIndex * 2 + (step - 1);
  const progress = screen === "quiz" ? (currentStepIndex / TOTAL_STEPS) * 100 : 0;

  return (
    <div style={styles.page}>

      {screen === "quiz" && (
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>
      )}

      <div style={styles.mainContent}>
        {screen === "intro" && <Intro onStart={startFlow} />}

        {screen === "confidence" && (
          <ConfidenceScreen
            confidenceIndex={confidenceIndex}
            onChoose={chooseConfidence}
            onNext={confirmConfidence}
            onBack={back}
          />
        )}

        {screen === "quiz" && (
          <ScenarioScreen
            scenario={SCENARIOS[scenarioIndex]}
            step={step}
            branch={step === 2 ? branchFor(scenarioIndex) : null}
            stepNumber={currentStepIndex + 1}
            totalSteps={TOTAL_STEPS}
            selected={selected}
            onChoose={choose}
            onNext={next}
            onBack={back}
          />
        )}

        {screen === "results" && (
          <Results records={buildRecords()} confidenceIndex={confidenceIndex} onRestart={startFlow} />
        )}
      </div>

      <Footer />
    </div>
  );
}