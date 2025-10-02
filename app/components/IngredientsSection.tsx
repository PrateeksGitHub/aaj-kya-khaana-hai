'use client';

// Default ingredients - will be overridden by props
const defaultIngredientOptions = [
  'Salt',
  'Oil',
  'Sugar',
  'Water',
  'Haldi',
  'Red Chilli Powder',
  'Jeera'
];

interface IngredientsSectionProps {
  selectedIngredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
  ingredients: string[];
}

export default function IngredientsSection({ 
  selectedIngredients, 
  onIngredientsChange,
  ingredients
}: IngredientsSectionProps) {
  const toggleIngredient = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      onIngredientsChange(selectedIngredients.filter(item => item !== ingredient));
    } else {
      onIngredientsChange([...selectedIngredients, ingredient]);
    }
  };

  // Use provided ingredients or fallback to default
  const ingredientOptions = ingredients.length > 0 ? ingredients : defaultIngredientOptions;

  return (
    <div className="flex w-full max-w-[343px] flex-col gap-4">
      <div className="inline-flex items-center gap-2.5 self-start rounded-[32px] bg-primary px-3 py-1.5">
        <span className="font-ibm-plex-mono text-[12px] leading-[16px] tracking-[-0.05em] text-background">
          If you don't have these... good luck
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {ingredientOptions.map((ingredient) => {
          const isSelected = selectedIngredients.includes(ingredient);
          return (
            <button
              key={ingredient}
              onClick={() => toggleIngredient(ingredient)}
              className={`inline-flex items-center justify-center gap-2.5 rounded-[32px] border px-3 py-1.5 text-[13px] leading-[17px] tracking-[-0.05em] transition-colors border-[#E8DED1] text-[#1E1C16] ${
                isSelected ? 'bg-[#FEE5E0]' : 'bg-background'
              }`}
            >
              <span className="font-ibm-plex-mono text-center whitespace-nowrap">
                {ingredient}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
