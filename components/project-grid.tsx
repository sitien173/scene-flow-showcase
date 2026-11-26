"use client";

import Link from "next/link";
import { useState } from "react";

export type Card = {
  slug: string;
  title: string;
  author: string;
  theme: string;
  format: "9x16" | "16x9";
  duration: string;
  poster: string;
};

export function ProjectGrid({ cards }: { cards: Card[] }) {
  const themes = [...new Set(cards.map((card) => card.theme))].sort();
  const [theme, setTheme] = useState<string>();
  const shown = theme ? cards.filter((card) => card.theme === theme) : cards;

  return (
    <>
      <fieldset className="mb-6 flex flex-wrap gap-2">
        <legend className="sr-only">Lọc theo theme</legend>
        {[undefined, ...themes].map((value) => (
          <button
            key={value ?? "all"}
            type="button"
            aria-pressed={theme === value}
            onClick={() => setTheme(value)}
            className="rounded-full border border-line px-3 py-1 text-sm text-dim transition-colors hover:text-ink aria-pressed:border-accent aria-pressed:text-ink"
          >
            {value ?? "Tất cả"}
          </button>
        ))}
      </fieldset>
      <ul className="grid grid-flow-dense grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {shown.map((card) => (
          <li
            key={card.slug}
            className={card.format === "16x9" ? "col-span-2" : undefined}
          >
            <Link href={`/p/${card.slug}/`} className="group block">
              {/* biome-ignore lint/performance/noImgElement: a static export cannot optimize images */}
              <img
                src={card.poster}
                alt=""
                loading="lazy"
                className={`w-full rounded-xl border border-line bg-surface object-cover transition-transform duration-200 group-hover:scale-[1.02] ${card.format === "16x9" ? "aspect-video" : "aspect-[9/16]"}`}
              />
              <h2 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug">
                {card.title}
              </h2>
              <p className="mt-1 text-xs text-dim">
                {card.author} · {card.theme} · {card.duration}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
