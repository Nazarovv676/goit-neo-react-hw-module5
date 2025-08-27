import DOMPurify from "dompurify";

export function formatText(rawText) {
  if (!rawText) return "";

  const lines = rawText.split(/\r?\n/);
  const htmlParts = [];
  let listBuffer = [];

  const applyFormatting = (text) => {
    return text

      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")

      .replace(/"([^"]+?)"/g, "<em>$1</em>")

      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<a class="link-in-review" href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
      );
  };

  for (let line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("* ")) {
      listBuffer.push(applyFormatting(trimmed.slice(2)));
    } else {
      if (listBuffer.length > 0) {
        const listHtml = `<ul>${listBuffer.map((item) => `<li>${item}</li>`).join("")}</ul>`;
        htmlParts.push(listHtml);
        listBuffer = [];
      }

      if (trimmed !== "") {
        htmlParts.push(`<p>${applyFormatting(trimmed)}</p>`);
      }
    }
  }

  if (listBuffer.length > 0) {
    const listHtml = `<ul>${listBuffer.map((item) => `<li>${item}</li>`).join("")}</ul>`;
    htmlParts.push(listHtml);
  }

  return DOMPurify.sanitize(htmlParts.join("\n"));
}
