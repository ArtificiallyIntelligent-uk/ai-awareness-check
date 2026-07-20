import { SITE_URL } from "../data/constants";

// Generates a 1080x1080 result card and shares it via the native Web
// Share API where the browser supports sharing files (mainly mobile
// Safari and Chrome). Falls back to a plain download everywhere else.
// Does nothing further if the person opens the share sheet and cancels.
export async function nativeShareImage(
  archetypeName,
  techPct,
  ethicalPct,
  commercialPct,
  logoSrc
) {
  const SIZE = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");

  try {
    await Promise.all([
      document.fonts.load('700 76px Bitter'),
      document.fonts.load('600 22px Roboto'),
      document.fonts.load('500 26px Roboto'),
      document.fonts.load('600 30px Roboto'),
      document.fonts.load('500 20px "JetBrains Mono"'),
    ]);
    await document.fonts.ready;
  } catch (e) {
    // fonts API not available or failed — proceed with system fallback
  }

  const logo = new Image();
  const logoLoaded = new Promise((resolve) => {
    logo.onload = () => resolve(true);
    logo.onerror = () => resolve(false);
  });
  logo.src = logoSrc;
  const hasLogo = await logoLoaded;

  const INK = "#202020";
  const TEAL = "#1D7E8B";
  const MIST = "#F3F4F8";
  const LINE = "#E4E6EC";
  const FG_MUTED = "#5A5A5A";
  const FG_SUBTLE = "#8A8A8A";

  ctx.fillStyle = MIST;
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.textAlign = "center";

  let y = 150;
  if (hasLogo) {
    ctx.drawImage(logo, SIZE / 2 - 40, y - 70, 80, 80);
    y += 60;
  }

  ctx.fillStyle = TEAL;
  ctx.font = "600 22px Roboto";
  ctx.fillText("AI AWARENESS CHECK", SIZE / 2, y + 40);

  let fontSize = 76;
  ctx.font = `700 ${fontSize}px Bitter`;
  while (ctx.measureText(archetypeName).width > SIZE - 160 && fontSize > 40) {
    fontSize -= 4;
    ctx.font = `700 ${fontSize}px Bitter`;
  }
  ctx.fillStyle = INK;
  ctx.fillText(archetypeName, SIZE / 2, y + 170);

  const stats = [
    { label: "TECHNICAL", value: techPct },
    { label: "ETHICAL", value: ethicalPct },
    { label: "COMMERCIAL", value: commercialPct },
  ];
  const blockWidth = SIZE / 3;
  const statsY = y + 340;
  stats.forEach((s, i) => {
    const cx = blockWidth * i + blockWidth / 2;
    ctx.fillStyle = FG_SUBTLE;
    ctx.font = '500 20px "JetBrains Mono"';
    ctx.fillText(s.label, cx, statsY);
    ctx.fillStyle = INK;
    ctx.font = "700 64px Bitter";
    ctx.fillText(`${s.value}%`, cx, statsY + 74);
  });

  ctx.strokeStyle = LINE;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(120, statsY + 150);
  ctx.lineTo(SIZE - 120, statsY + 150);
  ctx.stroke();

  ctx.fillStyle = FG_MUTED;
  ctx.font = "500 26px Roboto";
  ctx.fillText("Take the assessment yourself:", SIZE / 2, statsY + 220);
  ctx.fillStyle = TEAL;
  ctx.font = "600 30px Roboto";
  ctx.fillText(SITE_URL, SIZE / 2, statsY + 268);

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  const file = new File([blob], "ai-awareness-result.png", { type: "image/png" });
  const shareText = `I got "${archetypeName}" on the AI Awareness Check.`;

  const canUseNativeShare =
    typeof navigator.share === "function" &&
    typeof navigator.canShare === "function" &&
    navigator.canShare({ files: [file] });

  if (canUseNativeShare) {
    try {
      await navigator.share({ files: [file], title: "My AI Awareness result", text: shareText });
      return;
    } catch (err) {
      if (err && err.name === "AbortError") return; // person cancelled — don't force a download too
    }
  }

  // Fallback for browsers without file-sharing support (mainly desktop)
  const link = document.createElement("a");
  link.download = "ai-awareness-result.png";
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}
