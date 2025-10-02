import { NextResponse } from 'next/server';
import { parseUserInput } from '../../lib/parser';
import { getAllRecipes } from '../../lib/recipeData';
import { scoreRecipe, toSummary } from '../../lib/scorer';
import { RecipeSummary, UserInput } from '../../lib/types';

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function normaliseUserInput(payload: unknown): UserInput {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Request body must be an object.');
  }

  const input = payload as Partial<UserInput>;

  if (!isStringArray(input.staplesSelected)) {
    throw new Error('staplesSelected must be an array of strings.');
  }

  if (!isStringArray(input.cuisinesAllowed) || input.cuisinesAllowed.length === 0) {
    throw new Error('cuisinesAllowed must be a non-empty array of strings.');
  }

  const staplesSelected = input.staplesSelected
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  const cuisinesAllowed = input.cuisinesAllowed
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  if (cuisinesAllowed.length === 0) {
    throw new Error('cuisinesAllowed must contain at least one value.');
  }

  const result: UserInput = {
    staplesSelected,
    cuisinesAllowed,
    needToUseRaw: typeof input.needToUseRaw === 'string' ? input.needToUseRaw.trim() : ''
  };

  if (typeof input.haveRaw === 'string' && input.haveRaw.trim().length > 0) {
    result.haveRaw = input.haveRaw.trim();
  }

  if (typeof input.diet === 'string' && input.diet.trim().length > 0) {
    result.diet = input.diet.trim();
  }

  if (typeof input.maxCalories === 'number' && Number.isFinite(input.maxCalories) && input.maxCalories >= 0) {
    result.maxCalories = input.maxCalories;
  }

  if (typeof input.minProtein === 'number' && Number.isFinite(input.minProtein) && input.minProtein >= 0) {
    result.minProtein = input.minProtein;
  }

  return result;
}

/**
 * API handler for POST /api/generate.  It accepts a JSON body with the
 * user's selections, parses and normalises the input, filters and scores
 * recipes from the catalogue and returns a list of summaries.
 */
export async function POST(request: Request) {
  let rawPayload: unknown;

  try {
    rawPayload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  let userInput: UserInput;
  try {
    userInput = normaliseUserInput(rawPayload);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }

  const canonical = parseUserInput(userInput);
  const recipes = getAllRecipes();
  const scored: { score: number; summary: RecipeSummary }[] = [];

  for (const recipe of recipes) {
    if (canonical.diet && recipe.diet !== canonical.diet) {
      continue;
    }

    if (
      canonical.cuisines.length > 0 &&
      !recipe.cuisines.some((cuisine) => canonical.cuisines.includes(cuisine))
    ) {
      continue;
    }

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

    if (
      canonical.needToUse.length > 0 &&
      !recipe.ingredients.some((ingredient) => canonical.needToUse.includes(ingredient))
    ) {
      continue;
    }

    const { score, matches } = scoreRecipe(recipe, canonical);
    scored.push({ score, summary: toSummary(recipe, matches) });
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.summary.name.localeCompare(b.summary.name);
  });

  const summaries: RecipeSummary[] = scored.slice(0, 10).map((entry) => entry.summary);

  return NextResponse.json({ results: summaries });
}
