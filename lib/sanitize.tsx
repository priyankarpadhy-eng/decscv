import React from "react";

/**
 * Parses markdown-lite text (bold, italics, links) safely into React nodes.
 * Strictly avoids dangerouslySetInnerHTML and protects against javascript: or data: URIs.
 */
export function parseMarkdownLite(text: string): React.ReactNode[] {
  if (!text) return [];

  const lines = text.split("\n");
  const result: React.ReactNode[] = [];

  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) {
      result.push(<br key={`br-${lineIndex}`} />);
    }

    // Tokenize line for [text](url), **bold**, *italic*
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let keyCounter = 0;

    // Pattern matches:
    // 1. Links: [text](url)
    // 2. Bold: **text**
    // 3. Italic: *text* or _text_
    const regex = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(_([^_]+)_)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(line)) !== null) {
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        tokens.push(line.slice(lastIndex, matchIndex));
      }

      const key = `${lineIndex}-${keyCounter++}`;

      if (match[1]) {
        // Link: match[2] is label, match[3] is url
        const label = match[2];
        const url = match[3];
        // Ensure safe protocol
        if (url.startsWith("http://") || url.startsWith("https://")) {
          tokens.push(
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer nofollow ugc"
              className="underline decoration-current underline-offset-2 hover:opacity-80 transition-opacity"
            >
              {label}
            </a>
          );
        } else {
          tokens.push(label);
        }
      } else if (match[4]) {
        // Bold: match[5]
        tokens.push(<strong key={key} className="font-semibold">{match[5]}</strong>);
      } else if (match[6]) {
        // Italic (*): match[7]
        tokens.push(<em key={key} className="italic">{match[7]}</em>);
      } else if (match[8]) {
        // Italic (_): match[9]
        tokens.push(<em key={key} className="italic">{match[9]}</em>);
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < line.length) {
      tokens.push(line.slice(lastIndex));
    }

    result.push(<React.Fragment key={`line-${lineIndex}`}>{tokens}</React.Fragment>);
  });

  return result;
}

export function sanitizeUrl(url?: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    return trimmed;
  }
  if (trimmed.startsWith("mailto:") || trimmed.startsWith("tel:")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}
