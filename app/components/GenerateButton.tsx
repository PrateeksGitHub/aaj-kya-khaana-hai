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
          className="flex flex-row justify-center items-center gap-[10px] w-full max-w-[343px] h-[40px] rounded-2xl transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(360deg, #DD3B2C 0%, #EE4C3D 100%)',
            padding: '4px 16px 6px'
          }}
        >
      <span className="font-ibm-plex-mono text-[16px] leading-[16px] text-center tracking-[-0.02em] text-background w-[140px] h-[16px]" style={{ fontWeight: 600 }}>
        {loading ? 'Generating...' : 'Kya Banega Aaj?'}
      </span>
    </button>
  );
}