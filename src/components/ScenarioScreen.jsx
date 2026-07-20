import styles from "../styles/styles";

function ScenarioScreen({ scenario, step, branch, stepNumber, totalSteps, selected, onChoose, onNext, onBack }) {
  const content = step === 1 ? scenario.step1 : scenario.step2[branch];

  return (
    <div style={styles.quizWrap}>
      <div style={styles.meta}>
        <span>
          {String(stepNumber).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
        </span>
        <span style={styles.metaCategory}>{scenario.category}</span>
      </div>

      {step === 2 && <div style={styles.followUpTag}>Follow-up</div>}

      <h2 style={styles.questionText}>{content.text}</h2>

      <div style={styles.optionsList}>
        {content.options.map((opt, i) => (
          <button
            key={i}
            className="option-card"
            onClick={() => onChoose(opt)}
            style={{
              ...styles.option,
              ...(selected === opt ? styles.optionSelected : {}),
            }}
          >
            {opt.text}
          </button>
        ))}
      </div>

      <div style={styles.navRow}>
        <button style={styles.backBtn} onClick={onBack}>
          ← Back
        </button>
        <button
          style={{
            ...styles.primaryBtn,
            opacity: selected === null ? 0.35 : 1,
            pointerEvents: selected === null ? "none" : "auto",
          }}
          onClick={onNext}
        >
          {stepNumber === totalSteps ? "See my result →" : "Next →"}
        </button>
      </div>
    </div>
  );
}
export default ScenarioScreen;
