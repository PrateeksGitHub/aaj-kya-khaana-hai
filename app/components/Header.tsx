'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';

const WAVE_HEIGHT = 48;
const WAVE_AMPLITUDE = 12;
const WAVE_LENGTH = 140;

function buildWavePath(width: number) {
  const height = WAVE_HEIGHT;
  const amplitude = WAVE_AMPLITUDE;
  const baseY = height - amplitude;
  let currentX = 0;
  let d = `M0 ${baseY}`;

  while (currentX < width) {
    const nextX = Math.min(currentX + WAVE_LENGTH, width);
    const segmentWidth = nextX - currentX;
    const control1 = currentX + segmentWidth / 4;
    const midX = currentX + segmentWidth / 2;
    const control2 = currentX + (3 * segmentWidth) / 4;
    d += ` Q ${control1} ${baseY - amplitude} ${midX} ${baseY}`;
    d += ` Q ${control2} ${baseY + amplitude} ${nextX} ${baseY}`;
    currentX = nextX;
  }

  d += ` L ${width} ${height} L 0 ${height} Z`;
  return d;
}

export default function Header() {
  const waveRef = useRef<HTMLDivElement>(null);
  const [waveWidth, setWaveWidth] = useState(1440);
  const patternId = useId();

  useEffect(() => {
    const element = waveRef.current;
    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setWaveWidth(entry.contentRect.width);
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const wavePath = useMemo(() => buildWavePath(waveWidth), [waveWidth]);

  return (
    <header className="relative overflow-hidden bg-primary px-4 pb-24 pt-12 text-white">
      <div className="mx-auto flex w-full max-w-[375px] flex-col items-center gap-3 text-center">
        <h1 className="max-w-full font-caveat font-bold text-[48px] leading-[48px] uppercase">
          Aaj Kya
          <span className="block">Khaana Hai?</span>
        </h1>

        <div className="flex min-h-[23px] items-center justify-center rounded-full bg-primary-dark px-3 py-1">
          <span className="text-[12px] leading-[15px] tracking-[-0.05em] text-text-light">
            From 'kuch bhi bana lo' to 'ye banate hai'
          </span>
        </div>
      </div>

      <div ref={waveRef} className="pointer-events-none absolute bottom-0 left-0 w-full">
        <svg
          className="h-12 w-full"
          viewBox={`0 0 ${waveWidth} ${WAVE_HEIGHT}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={`${patternId}-grid`}
              width={16}
              height={16}
              patternUnits="userSpaceOnUse"
            >
              <rect width="16" height="16" fill="#FFFCF7" />
              <path
                d="M0 0H16"
                stroke="#E8DDCD"
                strokeOpacity="0.35"
                strokeWidth="2"
                shapeRendering="crispEdges"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M0 0V16"
                stroke="#E8DDCD"
                strokeOpacity="0.35"
                strokeWidth="2"
                shapeRendering="crispEdges"
                vectorEffect="non-scaling-stroke"
              />
            </pattern>
          </defs>
          <path fill={`url(#${patternId}-grid)`} d={wavePath} />
        </svg>
      </div>
    </header>
  );
}
