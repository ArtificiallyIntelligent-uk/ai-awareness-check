import styles from "../styles/styles";
import { CONFIDENCE_OPTIONS } from "../data/constants";

function ConfidenceScreen({ confidenceIndex, onChoose, onNext, onBack }) {
  return (
    <div style={styles.quizWrap}>
      <div style={styles.meta}>
        <span>Before you start</span>
      </div>

      <h2 style={styles.questionText}>
        How confident are you in your own knowledge of AI?
      </h2>
      <p style={styles.confidenceSub}>
        Answer honestly — this isn't scored. It's here so we can compare it
        to how many genuine gaps actually show up.
      </p>

      <div style={styles.optionsList}>
        {CONFIDENCE_OPTIONS.map((opt) => (
          <button
            key={opt.index}
            className="option-card"
            onClick={() => onChoose(opt.index)}
            style={{
              ...styles.option,
              ...(confidenceIndex === opt.index ? styles.optionSelected : {}),
            }}
          >
            {opt.label}
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
            opacity: confidenceIndex === null ? 0.35 : 1,
            pointerEvents: confidenceIndex === null ? "none" : "auto",
          }}
          onClick={onNext}
        >
          Start the scenarios →
        </button>
      </div>
    </div>
  );
}
export default ConfidenceScreen;
