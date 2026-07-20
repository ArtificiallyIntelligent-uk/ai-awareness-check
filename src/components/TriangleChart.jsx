import styles from "../styles/styles";
import { SILVER } from "../styles/theme";

function TriangleChart({ techPct, ethicalPct, commercialPct }) {
  const t = techPct / 100;
  const e = ethicalPct / 100;
  const c = commercialPct / 100;
  const xFrac = 0.5 * e + c;
  const yFrac = 1 - e;

return (
    <div style={styles.triangleOuter}>
      <div style={styles.triangleCaptionTop}>Ethical</div>
      <div style={styles.triangleSquare}>
        <div style={styles.triangleShape}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={styles.trianglePartitions}>
            <line x1="50" y1="2" x2="50" y2="98" stroke={SILVER} strokeWidth="0.6" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
            <line x1="2" y1="98" x2="74" y2="50" stroke={SILVER} strokeWidth="0.6" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
            <line x1="98" y1="98" x2="26" y2="50" stroke={SILVER} strokeWidth="0.6" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div
          style={{
            ...styles.triangleDot,
            left: `${xFrac * 100}%`,
            top: `${yFrac * 100}%`,
          }}
        />
      </div>
      <div style={styles.triangleCaptionRow}>
        <span>Technical</span>
        <span>Commercial</span>
      </div>
    </div>
  );
}
export default TriangleChart;
