import React, { useEffect, useRef } from "react";

function VariableText({ lines, label, base, max, className = "", paused = false }) {
  const rootRef = useRef(null);
  const frameRef = useRef(0);
  const pointerRef = useRef(null);
  const reducedRef = useRef(false);
  const coarseRef = useRef(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    reducedRef.current = reduced.matches;
    coarseRef.current = coarse.matches;

    const root = rootRef.current;
    const glyphs = [...root.querySelectorAll(".glyph")];
    const setWeights = (pointerX) => {
      glyphs.forEach((glyph) => {
        const rect = glyph.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = Math.abs(pointerX - center);
        const influence = Math.max(0, 1 - distance / 200);
        const eased = influence * influence * (3 - 2 * influence);
        const weight = Math.round(base + (max - base) * eased);
        glyph.style.fontVariationSettings = `"wght" ${weight}`;
      });
    };
    const reset = () => {
      glyphs.forEach((glyph) => {
        glyph.style.fontVariationSettings = `"wght" ${base}`;
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (!entry.isIntersecting) reset();
    }, { threshold: 0.01 });
    observer.observe(root);

    const animate = (time) => {
      if (visibleRef.current && !paused && !reducedRef.current && coarseRef.current) {
        const bounds = root.getBoundingClientRect();
        const progress = ((time / 7000) % 1) * (bounds.width + 400) - 200;
        setWeights(bounds.left + progress);
      } else if (visibleRef.current && pointerRef.current !== null && !paused && !reducedRef.current) {
        setWeights(pointerRef.current);
      } else {
        reset();
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, [base, max, paused]);

  return (
    <span
      ref={rootRef}
      className={`variable-text ${className}`.trim()}
      onPointerMove={(event) => {
        if (!coarseRef.current) pointerRef.current = event.clientX;
      }}
      onPointerLeave={() => {
        pointerRef.current = null;
      }}
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">
        {lines.map((line, lineIndex) => (
          <span className="variable-line" key={lineIndex}>
            {line.flatMap((segment, segmentIndex) =>
              segment.text.split(/(\s+)/).filter(Boolean).map((token, tokenIndex) => {
                if (/^\s+$/.test(token)) {
                  return <span className="variable-space" key={`${segmentIndex}-${tokenIndex}`}> </span>;
                }
                return (
                  <span
                    className={`variable-word ${segment.accent ? "accent" : ""}`.trim()}
                    key={`${segmentIndex}-${tokenIndex}`}
                  >
                    {[...token].map((character, characterIndex) => (
                      <span
                        className="glyph"
                        key={characterIndex}
                        style={{ fontVariationSettings: `"wght" ${base}` }}
                      >
                        {character}
                      </span>
                    ))}
                  </span>
                );
              }),
            )}
          </span>
        ))}
      </span>
    </span>
  );
}

export default VariableText;
