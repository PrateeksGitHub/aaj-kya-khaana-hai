'use client';

interface ExtrasInputSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ExtrasInputSection({ value, onChange }: ExtrasInputSectionProps) {
  return (
    <div className="flex flex-col justify-end items-start w-full max-w-[343px] min-h-[192px]" style={{ gap: '16px' }}>
      {/* Section Header */}
      <div className="flex justify-center items-center gap-[10px] w-[264px] h-[26px] bg-primary rounded-[32px]" style={{ padding: '4px 16px 6px' }}>
        <span className="font-ibm-plex-mono text-[12px] leading-[16px] text-center tracking-[-0.05em] text-background w-[232px] h-[16px]">
          Extras I randomly bought (optional)
        </span>
      </div>

      {/* Input Field */}
      <div className="flex flex-row justify-end items-start w-full max-w-[343px] min-h-[150px] bg-background" style={{ gap: '8px' }}>
        <div className="box-border flex flex-row items-start w-full max-w-[343px] min-h-[150px] bg-background rounded-2xl" style={{ padding: '12px', gap: '10px' }}>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. Type in your fridge extras like the fancy dips, jalepenos, olives, cheese (or skip if it's just ketchup)"
            className="w-full font-ibm-plex-mono text-[13px] leading-[18px] tracking-[-0.05em] bg-transparent border-none outline-none resize-none"
            style={{ 
              height: '54px',
              width: '319px',
              minHeight: '54px',
              color: '#575757'
            }}
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}