import { useState } from "react";
import styles from "../styles/styles";
import ARCHETYPES from "../data/archetypes";
import { computeResult, getCalibrationInsight, getMisconceptionInsight } from "../logic/scoring";
import TriangleChart from "./TriangleChart";
import ShareModal from "./ShareModal";
import RetakeConfirmModal from "./RetakeConfirmModal";

function Results({ records, confidenceIndex, onRestart }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [confirmRetakeOpen, setConfirmRetakeOpen] = useState(false);
  const result = computeResult(records, confidenceIndex);
  const {
    techPct,
    ethicalPct,
    commercialPct,
    misconceptionCount,
    misconceptionCategories,
    isNewcomerFlag,
    archetype,
  } = result;
  const calibrationText = getCalibrationInsight(confidenceIndex, misconceptionCount);
  const misconceptionText = getMisconceptionInsight(misconceptionCount, misconceptionCategories);
  const newcomer = ARCHETYPES.newcomer;

  return (
    <div style={styles.resultsWrap}>
      <div style={styles.eyebrow}>Your result</div>

      <div style={styles.tierName}>{archetype.name}</div>

      {isNewcomerFlag && (
        <div style={styles.newcomerBadge}>
          Newcomer indicator — {misconceptionCount} of 12 answers reflected a
          misunderstanding
        </div>
      )}

      <p style={styles.tierSummary}>{archetype.summary}</p>

      <TriangleChart techPct={techPct} ethicalPct={ethicalPct} commercialPct={commercialPct} />

      <div style={styles.scorePairRow}>
        <div style={styles.scorePairItem}>
          <div style={styles.scorePairLabel}>Technical</div>
          <div style={styles.scorePairValue}>{techPct}%</div>
        </div>
        <div style={styles.scorePairItem}>
          <div style={styles.scorePairLabel}>Ethical</div>
          <div style={styles.scorePairValue}>{ethicalPct}%</div>
        </div>
        <div style={styles.scorePairItem}>
          <div style={styles.scorePairLabel}>Commercial</div>
          <div style={styles.scorePairValue}>{commercialPct}%</div>
        </div>
      </div>

      <div style={styles.insightBlock}>
        <div style={styles.sectionLabel}>Calibration check</div>
        <p style={styles.insightText}>{calibrationText}</p>
      </div>

      <div style={styles.insightBlock}>
        <div style={styles.sectionLabel}>Where the gaps showed up</div>
        <p style={styles.insightText}>{misconceptionText}</p>
      </div>

      {isNewcomerFlag && (
        <div style={styles.insightBlock}>
          <div style={styles.sectionLabel}>{newcomer.name}</div>
          <p style={styles.insightText}>{newcomer.summary}</p>
        </div>
      )}

      <div style={styles.recBlock}>
        <div style={styles.sectionLabel}>Where to focus next</div>
        <ul style={styles.recList}>
          {(isNewcomerFlag ? newcomer.recommendations : archetype.recommendations).map((r, i) => (
            <li key={i} style={styles.recItem}>
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.btnRow} className="no-print">
        <button style={styles.primaryBtn} onClick={() => setShareOpen(true)}>
          Share
        </button>
        <button style={styles.secondaryBtn} onClick={() => window.print()}>
          Download full results (PDF)
        </button>
        <button style={styles.secondaryBtn} onClick={() => setConfirmRetakeOpen(true)}>
          Retake the assessment
        </button>
      </div>

      {shareOpen && (
        <ShareModal
          archetypeName={archetype.name}
          techPct={techPct}
          ethicalPct={ethicalPct}
          commercialPct={commercialPct}
          onClose={() => setShareOpen(false)}
        />
      )}

      {confirmRetakeOpen && (
        <RetakeConfirmModal
          onConfirm={onRestart}
          onCancel={() => setConfirmRetakeOpen(false)}
        />
      )}
    </div>
  );
}
export default Results;
