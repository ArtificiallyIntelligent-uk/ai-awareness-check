import styles from "../styles/styles";
import logo from "../assets/logo.png";

function Intro({ onStart }) {
  return (
    <div style={styles.introWrap}>
      <img
        src={logo}
        alt="Artificially Intelligent"
        style={styles.logo}
      />
      <div style={styles.eyebrow}>AI awareness check · 6 scenarios / 12 questions · ~7mins</div>
      <h1 style={styles.introTitle}>Where does your AI knowledge sit?</h1>
      <p style={{ ...styles.introBody, marginBottom: "16px" }}>
        The fact that you've landed on this page suggests you're interested
        in AI, but do you know what kind of AI knowledge you lead with? Are
        you technical, ethical, commercial?
      </p>
      <p style={styles.introBody}>
        The following six scenarios have been designed to give you an
        indication of where your knowledge sits and what you might not be
        considering. There is no pass or fail; the goal is to give you a
        better understanding of what your strengths are and where you might
        want to sharpen your knowledge.
      </p>
      <button style={styles.primaryBtn} onClick={onStart}>
        Begin
      </button>
      <div style={styles.introFoot}>
        No sign-up required, anonymous, and completely marketing-free.
      </div>
    </div>
  );
}
export default Intro;
