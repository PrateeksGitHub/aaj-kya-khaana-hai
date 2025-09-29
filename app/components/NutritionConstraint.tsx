import React from 'react';

interface Props {
  maxCalories?: number;
  minProtein?: number;
  onCaloriesChange: (value: number | undefined) => void;
  onProteinChange: (value: number | undefined) => void;
}

/**
 * NutritionConstraint renders two numeric inputs for setting optional
 * calorie and protein limits.  Both inputs are optional; a blank value
 * means the constraint will be ignored.
 */
export default function NutritionConstraint({
  maxCalories,
  minProtein,
  onCaloriesChange,
  onProteinChange
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">Nutrition constraints (per serving)</label>
      <div className="flex gap-4">
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">Under calories</span>
          <input
            type="number"
            min={0}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            placeholder="e.g. 500"
            value={maxCalories !== undefined ? maxCalories : ''}
            onChange={(e) => {
              const val = e.target.value;
              onCaloriesChange(val === '' ? undefined : Number(val));
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">Above protein (g)</span>
          <input
            type="number"
            min={0}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            placeholder="e.g. 15"
            value={minProtein !== undefined ? minProtein : ''}
            onChange={(e) => {
              const val = e.target.value;
              onProteinChange(val === '' ? undefined : Number(val));
            }}
          />
        </div>
      </div>
    </div>
  );
}