'use client';
import { useState } from 'react';

interface FoodPreferenceOption {
  id: string;
  label: string;
  color: string;
  borderColor: string;
}

const foodPreferenceOptions: FoodPreferenceOption[] = [
  { id: 'vegan', label: 'Vegan', color: '#126006', borderColor: '#126006' },
  { id: 'vegetarian', label: 'Vegetarian', color: '#439730', borderColor: '#439730' },
  { id: 'eggetarian', label: 'Eggetarian', color: '#F16C25', borderColor: '#F16C25' },
  { id: 'meat', label: 'Meat Based', color: '#D52C2C', borderColor: '#D52C2C' },
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
    <div className="flex flex-col justify-end items-start w-full max-w-[343px] min-h-[100px]" style={{ gap: '16px' }}>
      {/* Section Header */}
      <div className="flex justify-center items-center gap-[10px] w-[165px] h-[26px] bg-primary rounded-[32px]" style={{ padding: '4px 16px 6px' }}>
        <span className="font-ibm-plex-mono text-[12px] leading-[16px] text-center tracking-[-0.05em] text-background w-[133px] h-[16px]">
          Your food Preference
        </span>
      </div>

      {/* Preference Pills */}
      <div className="flex flex-row flex-wrap items-center content-start w-full max-w-[343px] min-h-[58px]" style={{ gap: '8px' }}>
        {foodPreferenceOptions.map((option) => {
          const isSelected = selectedDiet === option.id;
          return (
            <button
              key={option.id}
              onClick={() => selectDiet(option.id)}
              className={`box-border flex flex-row justify-center items-center gap-[10px] rounded-[32px] transition-all duration-200 ${
                isSelected 
                  ? '' 
                  : 'bg-background border border-[0.5px]'
              }`}
              style={{
                backgroundColor: isSelected ? option.color : '#FFFCF7',
                borderColor: isSelected ? 'transparent' : option.borderColor,
                width: option.id === 'vegan' ? '61px' : '97px',
                height: '25px',
                padding: '4px 12px',
              }}
            >
              <span
                className="font-ibm-plex-mono text-[13px] leading-[17px] text-center tracking-[-0.05em]"
                style={{
                  color: isSelected ? '#FFFCF7' : option.color,
                  width: option.id === 'vegan' ? '37px' : '73px',
                  height: '17px',
                }}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}