import katex from "katex";

function render(tex: string, display: boolean) {
  try {
    return katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false,
      output: "htmlAndMathml",
      strict: "ignore",
    });
  } catch {
    return tex;
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Shared KaTeX HTML for server components and the client MathText wrapper. */
export function mathToHtml(text: string) {
  if (!text) return "";
  const parts: string[] = [];
  const re = /\$\$([\s\S]+?)\$\$|\$([^$]+)\$/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) {
      parts.push(escapeHtml(text.slice(last, m.index)).replace(/\n/g, "<br/>"));
    }
    if (m[1] != null) parts.push(render(m[1], true));
    else if (m[2] != null) parts.push(render(m[2], false));
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(escapeHtml(text.slice(last)).replace(/\n/g, "<br/>"));
  return parts.join("");
}
