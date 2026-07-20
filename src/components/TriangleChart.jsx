import styles from "../styles/styles";
import { SILVER, LINE, TEAL } from "../styles/theme";

function TriangleChart({ techPct, ethicalPct, commercialPct }) {
  const e = ethicalPct / 100;
  const c = commercialPct / 100;
  const dotX = 50 * e + 100 * c;
  const dotY = (1 - e) * 100;

  return (
    <div style={styles.triangleOuter}>
      <div style={styles.triangleCaptionTop}>Ethical</div>
      <div style={styles.triangleSquare}>
        <svg viewBox="0 0 100 100" style={styles.triangleSvg}>
          <polygon points="50,2 2,98 98,98" fill="#FFFFFF" stroke={LINE} strokeWidth="1" />

          <line x1="50" y1="2" x2="50" y2="98" stroke={SILVER} strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="2" y1="98" x2="74" y2="50" stroke={SILVER} strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="98" y1="98" x2="26" y2="50" stroke={SILVER} strokeWidth="0.5" strokeDasharray="2 2" />

          <circle cx={dotX} cy={dotY} r="2.4" fill={TEAL} stroke="#FFFFFF" strokeWidth="0.6" />
        </svg>
      </div>
      <div style={styles.triangleCaptionRow}>
        <span>Technical</span>
        <span>Commercial</span>
      </div>
    </div>
  );
}
export default TriangleChart;
