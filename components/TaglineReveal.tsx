"use client";

import { useEffect, useRef } from "react";

const LINES = [
  "Find the right MCP server or coding agent without scrolling GitHub for hours.",
  "Ship with tools the yard already checked.",
];

export function TaglineReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const words = Array.from(section.querySelectorAll<HTMLElement>("[data-word]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => {
        w.style.opacity = "1";
        w.style.color = "#ffffff";
      });
      return;
    }

    words.forEach((w) => {
      w.style.opacity = "0.28";
      w.style.color = "#9b9b9b";
      w.style.transition =
        "opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), color 500ms cubic-bezier(0.22, 1, 0.36, 1)";
    });

    const observers: IntersectionObserver[] = [];
    words.forEach((word, i) => {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              window.setTimeout(() => {
                word.style.opacity = "1";
                word.style.color = "#ffffff";
              }, Math.min(i * 40, 400));
              io.unobserve(word);
            }
          }
        },
        { threshold: 0.6, rootMargin: "-35% 0px -35% 0px" },
      );
      io.observe(word);
      observers.push(io);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Tagline"
      className="border-y border-surface-3 bg-surface-1 px-4 py-20 md:py-24"
    >
      <div className="mx-auto max-w-[680px]">
        {LINES.map((line) => (
          <p key={line} className="heading-2 mb-4 text-white last:mb-0">
            {line.split(" ").map((word, i) => (
              <span key={`${word}-${i}`} data-word className="tagline-word inline-block pr-[0.28em]">
                {word}
              </span>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}
