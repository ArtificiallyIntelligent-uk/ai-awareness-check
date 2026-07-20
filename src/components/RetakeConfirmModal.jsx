import styles from "../styles/styles";

function RetakeConfirmModal({ onConfirm, onCancel }) {
  return (
    <div style={styles.modalOverlay} className="no-print" onClick={onCancel}>
      <div style={styles.confirmCard} onClick={(e) => e.stopPropagation()}>
        <h3 style={styles.confirmTitle}>Start over?</h3>
        <p style={styles.confirmBody}>
          Retaking the assessment will clear this result. There's no way
          back to it once you begin again — worth downloading or sharing it
          first if you'd like to keep a copy.
        </p>
        <div style={styles.confirmBtnRow}>
          <button style={styles.secondaryBtn} onClick={onCancel}>
            Cancel
          </button>
          <button style={styles.primaryBtn} onClick={onConfirm}>
            Retake
          </button>
        </div>
      </div>
    </div>
  );
}
export default RetakeConfirmModal;
