import React from 'react';
import { RecipeSummary } from '../lib/types';

interface Props {
  recipe: RecipeSummary;
  onSelect: (id: string) => void;
}

/**
 * RecipeCard displays a brief overview of a recipe suggestion.  It includes the
 * name, cuisines, diet, nutrition info and matched ingredients.  The parent
 * component provides an onSelect handler that opens the recipe drawer.
 */
export default function RecipeCard({ recipe, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(recipe.id)}
      className="w-full rounded border border-border-light bg-white p-4 text-left transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/60"
    >
      <h3 className="mb-1 text-lg font-semibold">{recipe.name}</h3>
      <p className="mb-1 text-sm text-gray-600">
        {recipe.cuisines.join(', ')} • {recipe.diet || 'any'}
      </p>
      <p className="mb-1 text-sm text-gray-600">
        {recipe.caloriesPerServing} kcal / {recipe.proteinPerServing} g protein
      </p>
      {recipe.keyMatches && recipe.keyMatches.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {recipe.keyMatches.map((match) => (
            <span
              key={match}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full"
            >
              {match}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
