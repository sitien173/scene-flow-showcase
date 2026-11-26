"use client";

import { useState } from "react";

const button =
  "rounded-md border border-line px-2.5 py-1 text-xs text-dim transition-colors hover:border-accent hover:text-ink";

export function ExportButtons({
  filename,
  text,
  download = "Tải .md",
}: {
  filename: string;
  text: string;
  download?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function save() {
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/markdown;charset=utf-8" }),
    );
    const link = Object.assign(document.createElement("a"), {
      href: url,
      download: filename,
    });
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex shrink-0 gap-2">
      <button type="button" onClick={copy} className={button}>
        <span aria-live="polite">{copied ? "Đã chép" : "Sao chép"}</span>
      </button>
      <button type="button" onClick={save} className={button}>
        {download}
      </button>
    </div>
  );
}
