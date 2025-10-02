'use client';

interface FoodPreferenceOption {
  id: string;
  label: string;
  minWidthClass: string;
  borderClass: string;
  activeBgClass: string;
  inactiveTextClass: string;
}

const foodPreferenceOptions: FoodPreferenceOption[] = [
  {
    id: 'vegan',
    label: 'Vegan',
    minWidthClass: 'min-w-[64px]',
    borderClass: 'border-vegan',
    activeBgClass: 'bg-vegan',
    inactiveTextClass: 'text-vegan'
  },
  {
    id: 'vegetarian',
    label: 'Vegetarian',
    minWidthClass: 'min-w-[97px]',
    borderClass: 'border-vegetarian',
    activeBgClass: 'bg-vegetarian',
    inactiveTextClass: 'text-vegetarian'
  },
  {
    id: 'eggetarian',
    label: 'Eggetarian',
    minWidthClass: 'min-w-[97px]',
    borderClass: 'border-eggetarian',
    activeBgClass: 'bg-eggetarian',
    inactiveTextClass: 'text-eggetarian'
  },
  {
    id: 'meat',
    label: 'Meat Based',
    minWidthClass: 'min-w-[97px]',
    borderClass: 'border-meat',
    activeBgClass: 'bg-meat',
    inactiveTextClass: 'text-meat'
  }
];

interface FoodPreferenceSectionProps {
  selectedDiet: string | null;
  onDietChange: (diet: string | null) => void;
}

export default function FoodPreferenceSection({ 
  selectedDiet, 
  onDietChange 
}: FoodPreferenceSectionProps) {
  const selectDiet = (dietId: string) => {
    if (selectedDiet === dietId) {
      onDietChange(null); // Deselect if already selected
    } else {
      onDietChange(dietId);
    }
  };

  return (
    <div className="flex w-full max-w-[343px] flex-col gap-4">
      <div className="inline-flex items-center gap-2.5 self-start rounded-[32px] bg-primary px-3 py-1.5">
        <span className="font-ibm-plex-mono text-[12px] leading-[16px] tracking-[-0.05em] text-background">
          Your food preference
        </span>
      </div>

      <div className="flex flex-row flex-wrap items-center gap-2">
        {foodPreferenceOptions.map((option) => {
          const isSelected = selectedDiet === option.id;
          return (
            <button
              key={option.id}
              onClick={() => selectDiet(option.id)}
              className={`inline-flex items-center justify-center gap-2.5 rounded-[32px] border px-3 py-1.5 text-[13px] leading-[17px] tracking-[-0.05em] transition-colors ${option.minWidthClass} ${option.borderClass} ${
                isSelected
                  ? `${option.activeBgClass} text-background`
                  : `bg-background ${option.inactiveTextClass}`
              }`}
            >
              <span className="font-ibm-plex-mono text-center">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
