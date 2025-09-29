'use client';
import { useState } from 'react';

// Default missing ingredients - will be overridden by props
const defaultMissingIngredientOptions = [
  'Green chilli', 'Tomato', 'Onion', 'Rice', 'Wheat Flour', 'Potato', 'Dal', 'Milk', 'Butter', 'Paneer', 'Eggs', 'Chicken'
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
    <div className="flex flex-col justify-end items-start w-full max-w-[343px] min-h-[126px]" style={{ gap: '16px' }}>
      {/* Section Header */}
      <div className="flex justify-center items-center gap-[10px] w-[257px] h-[26px] bg-primary rounded-[32px]" style={{ padding: '4px 16px 6px' }}>
        <span className="font-ibm-plex-mono text-[12px] leading-[16px] text-center tracking-[-0.05em] text-background w-[225px] h-[16px]">
          If you don't have these... good luck
        </span>
      </div>

      {/* Missing Ingredient Pills with X icons */}
      <div className="flex flex-col justify-end items-start w-full max-w-[343px] min-h-[84px]" style={{ gap: '6px' }}>
        <div className="flex flex-row flex-wrap items-start content-start w-full max-w-[343px] min-h-[84px]" style={{ gap: '6px' }}>
          {missingIngredientOptions.map((ingredient) => {
            const isSelected = selectedMissingIngredients.includes(ingredient);
            const width = ingredient === 'Green chilli' ? '127px' : 
                         ingredient === 'Tomato' ? '84px' : 
                         ingredient === 'Onion' ? '77px' : 
                         ingredient === 'Rice' ? '70px' : 
                         ingredient === 'Wheat Flour' ? '120px' : 
                         ingredient === 'Potato' ? '84px' : 
                         ingredient === 'Dal' ? '63px' : 
                         ingredient === 'Milk' ? '70px' : 
                         ingredient === 'Butter' ? '84px' : 
                         ingredient === 'Paneer' ? '84px' : 
                         ingredient === 'Eggs' ? '70px' : 
                         ingredient === 'Chicken' ? '84px' : '84px';
            
            const textWidth = ingredient === 'Green chilli' ? '87px' : 
                             ingredient === 'Tomato' ? '44px' : 
                             ingredient === 'Onion' ? '37px' : 
                             ingredient === 'Rice' ? '30px' : 
                             ingredient === 'Wheat Flour' ? '80px' : 
                             ingredient === 'Potato' ? '44px' : 
                             ingredient === 'Dal' ? '23px' : 
                             ingredient === 'Milk' ? '30px' : 
                             ingredient === 'Butter' ? '44px' : 
                             ingredient === 'Paneer' ? '44px' : 
                             ingredient === 'Eggs' ? '30px' : 
                             ingredient === 'Chicken' ? '44px' : '44px';
            
            return (
              <button
                key={ingredient}
                onClick={() => toggleMissingIngredient(ingredient)}
                className="box-border flex flex-row justify-center items-center gap-[10px] rounded-[32px] transition-all duration-200 bg-background"
                style={{ 
                  width, 
                  height: '24px',
                  backgroundColor: isSelected ? '#000000' : '#FFFCF7',
                  padding: '4px 12px',
                }}
              >
                <span 
                  className="font-ibm-plex-mono text-[13px] leading-[16px] text-center tracking-[-0.05em]"
                  style={{ 
                    width: textWidth, 
                    height: '16px',
                    color: isSelected ? '#FFFCF7' : '#000000'
                  }}
                >
                  {ingredient}
                </span>
                {/* X Icon */}
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path 
                      d="M12 4L4 12M4 4L12 12" 
                      stroke="#1C1B1F" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}