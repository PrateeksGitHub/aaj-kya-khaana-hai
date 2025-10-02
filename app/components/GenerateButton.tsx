'use client';

interface GenerateButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function GenerateButton({ onClick, loading = false, disabled = false }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="flex w-full max-w-[343px] items-center justify-center gap-2.5 rounded-2xl bg-primary px-4 py-3 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="font-ibm-plex-mono text-[16px] leading-[16px] text-center tracking-[-0.02em] text-background w-[140px] h-[16px] font-semibold">
        {loading ? 'Generating...' : 'Kya Banega Aaj?'}
      </span>
    </button>
  );
}
