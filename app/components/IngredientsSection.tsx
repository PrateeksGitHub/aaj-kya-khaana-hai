'use client';
import { useState } from 'react';

// Default ingredients - will be overridden by props
const defaultIngredientOptions = [
  'Salt', 'Oil', 'Sugar', 'Water', 'Haldi', 'Red Chilli Powder', 'Jeera'
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
    <div className="flex flex-col justify-end items-start w-full max-w-[343px] min-h-[100px]" style={{ gap: '16px' }}>
      {/* Section Header */}
      <div className="flex justify-center items-center gap-[10px] w-[185px] h-[26px] bg-primary rounded-[32px]" style={{ padding: '4px 16px 6px' }}>
        <span className="font-ibm-plex-mono text-[12px] leading-[16px] text-center tracking-[-0.05em] text-background w-[153px] h-[16px]">
          Things we hope you have
        </span>
      </div>

      {/* Ingredient Pills */}
      <div className="flex flex-col justify-end items-start w-full max-w-[343px] min-h-[58px]" style={{ gap: '8px' }}>
        {/* First row */}
        <div className="flex flex-row justify-end items-start w-full max-w-[316px] h-[25px]" style={{ gap: '8px' }}>
          {ingredientOptions.slice(0, 5).map((ingredient) => {
            const isSelected = selectedIngredients.includes(ingredient);
            const width = ingredient === 'Salt' ? '54px' : 
                         ingredient === 'Oil' ? '47px' : 
                         ingredient === 'Sugar' || ingredient === 'Water' || ingredient === 'Haldi' ? '61px' : '61px';
            const textWidth = ingredient === 'Salt' ? '30px' : 
                             ingredient === 'Oil' ? '23px' : 
                             ingredient === 'Sugar' || ingredient === 'Water' || ingredient === 'Haldi' ? '37px' : '37px';
            
            return (
              <button
                key={ingredient}
                onClick={() => toggleIngredient(ingredient)}
                className="box-border flex flex-row justify-center items-center gap-[10px] rounded-[32px] transition-all duration-200 bg-background"
                style={{ 
                  width, 
                  height: '25px',
                  backgroundColor: isSelected ? '#000000' : '#FFFCF7',
                  padding: '4px 12px',
                }}
              >
                <span 
                  className="font-ibm-plex-mono text-[13px] leading-[17px] text-center tracking-[-0.05em]"
                  style={{ 
                    width: textWidth, 
                    height: '17px',
                    color: isSelected ? '#FFFCF7' : '#000000'
                  }}
                >
                  {ingredient}
                </span>
              </button>
            );
          })}
        </div>

        {/* Second row */}
        <div className="flex flex-row justify-end items-start w-full max-w-[216px] h-[25px]" style={{ gap: '8px' }}>
          {ingredientOptions.slice(5).map((ingredient) => {
            const isSelected = selectedIngredients.includes(ingredient);
            const width = ingredient === 'Haldi' ? '61px' : 
                         ingredient === 'Red Chilli Powder' ? '147px' : 
                         ingredient === 'Jeera' ? '61px' : '61px';
            const textWidth = ingredient === 'Haldi' ? '37px' : 
                             ingredient === 'Red Chilli Powder' ? '123px' : 
                             ingredient === 'Jeera' ? '37px' : '37px';
            
            return (
              <button
                key={ingredient}
                onClick={() => toggleIngredient(ingredient)}
                className="box-border flex flex-row justify-center items-center gap-[10px] rounded-[32px] transition-all duration-200 bg-background"
                style={{ 
                  width, 
                  height: '25px',
                  backgroundColor: isSelected ? '#000000' : '#FFFCF7',
                  padding: '4px 12px',
                }}
              >
                <span 
                  className="font-ibm-plex-mono text-[13px] leading-[17px] text-center tracking-[-0.05em]"
                  style={{ 
                    width: textWidth, 
                    height: '17px',
                    color: isSelected ? '#FFFCF7' : '#000000'
                  }}
                >
                  {ingredient}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}