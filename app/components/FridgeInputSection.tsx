'use client';

interface FridgeInputSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FridgeInputSection({ value, onChange }: FridgeInputSectionProps) {
  return (
    <div className="flex w-full max-w-[343px] flex-col gap-4">
      <div className="inline-flex items-center gap-2.5 self-start rounded-[32px] bg-primary px-3 py-1.5">
        <span className="font-ibm-plex-mono text-[12px] leading-[16px] tracking-[-0.05em] text-background">
          What's dying in your fridge
        </span>
      </div>

      <div className="w-full rounded-2xl border border-[#E8DED1] bg-[#FFFCF7] p-3">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. half a tomato, 3-day old spinach, that one sad cucumber"
          className="min-h-[76px] w-full resize-none border-none bg-transparent font-ibm-plex-mono text-[13px] leading-[18px] tracking-[-0.05em] text-[#575757] outline-none"
          rows={3}
        />
      </div>
    </div>
  );
}
