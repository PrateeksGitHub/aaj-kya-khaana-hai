'use client';

export default function BackgroundGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="background-grid-pattern h-full w-full" />
    </div>
  );
}
