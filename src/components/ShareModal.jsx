import { useState } from "react";
import styles from "../styles/styles";
import { SITE_URL } from "../data/constants";
import { copyToClipboard } from "../utils/clipboard";
import { nativeShareImage } from "../utils/shareImage";
import logo from "../assets/logo.png";

function ShareModal({ archetypeName, techPct, ethicalPct, commercialPct, onClose }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://${SITE_URL}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const shareText = encodeURIComponent("I took the AI Awareness Check");
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const xShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareText}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  function handleCopyLink() {
    copyToClipboard(shareUrl, (success) => {
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    });
  }

  return (
    <div style={styles.modalOverlay} className="no-print" onClick={onClose}>
      <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <button style={styles.modalClose} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div style={styles.modalBody}>
          <div style={styles.previewCard}>
            <img
              src={logo}
              alt="Artificially Intelligent"
              style={styles.previewLogo}
            />
            <div style={styles.previewEyebrow}>AI Awareness Check</div>
            <div style={styles.previewArchetype}>{archetypeName}</div>
            <div style={styles.previewStatsRow}>
              <div style={styles.previewStatItem}>
                <div style={styles.previewStatLabel}>Technical</div>
                <div style={styles.previewStatValue}>{techPct}%</div>
              </div>
              <div style={styles.previewStatItem}>
                <div style={styles.previewStatLabel}>Ethical</div>
                <div style={styles.previewStatValue}>{ethicalPct}%</div>
              </div>
              <div style={styles.previewStatItem}>
                <div style={styles.previewStatLabel}>Commercial</div>
                <div style={styles.previewStatValue}>{commercialPct}%</div>
              </div>
            </div>
            <div style={styles.previewDivider}>
              <div style={styles.previewTagline}>Take the assessment yourself:</div>
              <div style={styles.previewLink}>{SITE_URL}</div>
            </div>
          </div>

          <button
            style={{ ...styles.primaryBtn, width: "100%", textAlign: "center" }}
            onClick={() => nativeShareImage(archetypeName, techPct, ethicalPct, commercialPct, logo)}
          >
            Share
          </button>

          <div style={styles.modalDividerLabel}>or share a link</div>

          <div style={styles.shareRow}>
            <button style={styles.secondaryBtn} onClick={handleCopyLink}>
              {copied ? "Copied" : "Copy link"}
            </button>
            <a style={styles.secondaryBtnLink} href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a style={styles.secondaryBtnLink} href={xShareUrl} target="_blank" rel="noopener noreferrer">
              X
            </a>
            <a style={styles.secondaryBtnLink} href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ShareModal;
