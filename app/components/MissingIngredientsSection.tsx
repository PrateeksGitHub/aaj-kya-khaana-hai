'use client';

// Default missing ingredients - will be overridden by props
const defaultMissingIngredientOptions = [
  'Green chilli',
  'Tomato',
  'Onion',
  'Rice',
  'Wheat Flour',
  'Potato',
  'Dal',
  'Milk',
  'Butter',
  'Paneer',
  'Eggs',
  'Chicken'
];

interface MissingIngredientsSectionProps {
  selectedMissingIngredients: string[];
  onMissingIngredientsChange: (ingredients: string[]) => void;
  ingredients: string[];
}

export default function MissingIngredientsSection({ 
  selectedMissingIngredients, 
  onMissingIngredientsChange,
  ingredients
}: MissingIngredientsSectionProps) {
  const toggleMissingIngredient = (ingredient: string) => {
    if (selectedMissingIngredients.includes(ingredient)) {
      onMissingIngredientsChange(selectedMissingIngredients.filter(item => item !== ingredient));
    } else {
      onMissingIngredientsChange([...selectedMissingIngredients, ingredient]);
    }
  };

  // Use provided ingredients or fallback to default
  const missingIngredientOptions = ingredients.length > 0 ? ingredients : defaultMissingIngredientOptions;

  return (
    <div className="flex w-full max-w-[343px] flex-col gap-4">
      <div className="inline-flex items-center gap-2.5 self-start rounded-[32px] bg-primary px-3 py-1.5">
        <span className="font-ibm-plex-mono text-[12px] leading-[16px] tracking-[-0.05em] text-background">
          Things we hope you have
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {missingIngredientOptions.map((ingredient) => {
          const isSelected = selectedMissingIngredients.includes(ingredient);
          return (
            <button
              key={ingredient}
              onClick={() => toggleMissingIngredient(ingredient)}
              className={`inline-flex items-center justify-center gap-1.5 rounded-[32px] border px-3 py-1.5 text-[13px] leading-[16px] tracking-[-0.05em] transition-colors border-[#E8DED1] text-black ${
                isSelected ? 'bg-[#FFE9E3]' : 'bg-background'
              }`}
            >
              <span className="font-ibm-plex-mono text-center whitespace-nowrap">
                {ingredient}
              </span>
              <span className="font-ibm-plex-mono text-[11px] text-[#1C1B1F]">
                ×
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
