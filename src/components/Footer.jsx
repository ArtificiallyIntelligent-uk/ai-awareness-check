import styles from "../styles/styles";

function Footer() {
  return (
    <div style={styles.footer}>
      <p style={styles.footerDisclaimer}>
        All results are AI-generated, and although they have been
        human-checked, they may still contain errors.
      </p>
      <p style={styles.footerCopyright}>Artificially Intelligent 2026</p>
    </div>
  );
}
export default Footer;
