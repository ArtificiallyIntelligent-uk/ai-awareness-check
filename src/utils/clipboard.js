export function copyToClipboard(text, onDone) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      () => onDone(true),
      () => onDone(false)
    );
    return;
  }
  // fallback for older browsers without the Clipboard API
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    onDone(true);
  } catch (e) {
    onDone(false);
  }
}
