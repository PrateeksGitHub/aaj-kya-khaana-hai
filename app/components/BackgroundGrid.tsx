'use client';

export default function BackgroundGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {/* Vertical lines - More subtle grid */}
      <div className="absolute left-1/2 top-0 w-full h-full -translate-x-1/2">
        {Array.from({ length: 11 }, (_, i) => (
            <div
              key={`v-${i}`}
              className="absolute w-px h-full border-l border-border"
              style={{
                left: `${33 + i * 30}px`,
              }}
            />
        ))}
      </div>
      
      {/* Horizontal lines - More subtle grid */}
      <div className="absolute top-0 left-0 w-full h-full">
        {Array.from({ length: 20 }, (_, i) => (
            <div
              key={`h-${i}`}
              className="absolute h-px w-full border-t border-border"
              style={{
                top: `${32 + i * 30}px`,
              }}
            />
        ))}
      </div>
    </div>
  );
}