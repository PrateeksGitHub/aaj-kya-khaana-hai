import React from 'react';
import Link from 'next/link';
import { RecipeSummary } from '../lib/types';

interface Props {
  recipe: RecipeSummary;
}

/**
 * RecipeCard displays a brief overview of a recipe suggestion.  It includes the
 * name, cuisines, diet, nutrition info and matched ingredients.  Clicking on
 * the card navigates to the recipe detail page.
 */
export default function RecipeCard({ recipe }: Props) {
  return (
    <Link href={`/recipe/${recipe.id}`} className="block border rounded p-4 hover:shadow-md transition">
      <h3 className="text-lg font-semibold mb-1">{recipe.name}</h3>
      <p className="text-sm text-gray-600 mb-1">
        {recipe.cuisines.join(', ')} • {recipe.diet || 'any'}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        {recipe.caloriesPerServing} kcal / {recipe.proteinPerServing} g protein
      </p>
      {recipe.keyMatches && recipe.keyMatches.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
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
    </Link>
  );
}