import { NextResponse } from 'next/server';
import { parseUserInput } from '../../lib/parser';
import { getAllRecipes } from '../../lib/recipeData';
import { scoreRecipe, toSummary } from '../../lib/scorer';
import { UserInput } from '../../lib/types';

/**
 * API handler for POST /api/generate.  It accepts a JSON body with the
 * user's selections, parses and normalises the input, filters and scores
 * recipes from the catalogue and returns a list of summaries.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UserInput;
    const canonical = parseUserInput(body);
    const allRecipes = getAllRecipes();
    const results = [] as { score: number; summary: any }[];
    // Loop through recipes and apply basic filters.
    for (const recipe of allRecipes) {
      // Filter by diet if specified
      if (canonical.diet && recipe.diet !== canonical.diet) {
        continue;
      }
      // Filter by cuisines (intersection required)
      const cuisineMatch = recipe.cuisines.some((c) => canonical.cuisines.includes(c));
      if (!cuisineMatch) continue;
      // Filter by nutrition constraints
      if (
        canonical.maxCalories !== undefined &&
        recipe.caloriesPerServing > canonical.maxCalories
      ) {
        continue;
      }
      if (
        canonical.minProtein !== undefined &&
        recipe.proteinPerServing < canonical.minProtein
      ) {
        continue;
      }
      // Require at least one needToUse match if there are any needToUse ingredients
      if (
        canonical.needToUse.length > 0 &&
        !recipe.ingredients.some((ing) => canonical.needToUse.includes(ing))
      ) {
        continue;
      }
      // Compute score and matches
      const { score, matches } = scoreRecipe(recipe, canonical);
      results.push({ score, summary: toSummary(recipe, matches) });
    }
    // Sort by descending score; stable sort by name if equal
    results.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.summary.name.localeCompare(b.summary.name);
    });
    // Limit results
    const top = results.slice(0, 10).map((r) => r.summary);
    return NextResponse.json({ results: top });
  } catch (err) {
    return new NextResponse('Invalid request', { status: 400 });
  }
}