import { CanonicalInput, RecipeDetail, RecipeSummary } from './types';

/**
 * Calculate the score for a recipe given the user's canonical input.  The
 * scoring algorithm rewards recipes that cover more of the required
 * ingredients, include optional ingredients and meet calorie/protein constraints.
 * It returns both the numeric score and the list of matched ingredients.
 */
export function scoreRecipe(
  recipe: RecipeDetail,
  input: CanonicalInput
): { score: number; matches: string[] } {
  // Identify matches between recipe ingredients and user lists
  const needMatches = input.needToUse.filter((ing) =>
    recipe.ingredients.includes(ing)
  );
  const haveMatches = input.have.filter((ing) =>
    recipe.ingredients.includes(ing)
  );
  const stapleMatches = input.staples.filter((ing) =>
    recipe.ingredients.includes(ing)
  );
  // Coverage ratios.  If lists are empty, treat coverage as zero.
  const needCoverage =
    input.needToUse.length > 0
      ? needMatches.length / input.needToUse.length
      : 0;
  const haveCoverage =
    input.have.length > 0 ? Math.min(haveMatches.length / input.have.length, 1) : 0;
  // Staple coverage is 1 only if all selected staples appear in the recipe
  const stapleCoverage =
    input.staples.length > 0 && stapleMatches.length === input.staples.length
      ? 1
      : 0;
  // Nutrition fit.  Start at 1 and degrade if constraints are violated.
  let nutritionFit = 1;
  if (input.maxCalories !== undefined) {
    nutritionFit *= recipe.caloriesPerServing <= input.maxCalories ? 1 : 0.5;
  }
  if (input.minProtein !== undefined) {
    nutritionFit *= recipe.proteinPerServing >= input.minProtein ? 1 : 0.5;
  }
  const score =
    0.6 * needCoverage + 0.2 * haveCoverage + 0.1 * stapleCoverage + 0.1 * nutritionFit;
  // Combine matches for output (deduplicated)
  const combined: string[] = [];
  ;[...needMatches, ...haveMatches, ...stapleMatches].forEach((m) => {
    if (!combined.includes(m)) combined.push(m);
  });
  return { score, matches: combined };
}

/**
 * Convert a recipe detail into a summary for the API response, injecting
 * the computed keyMatches.  The API handler uses this helper after sorting
 * recipes by score.
 */
export function toSummary(
  recipe: RecipeDetail,
  matches: string[]
): RecipeSummary {
  return {
    id: recipe.id,
    name: recipe.name,
    cuisines: recipe.cuisines,
    diet: recipe.diet,
    caloriesPerServing: recipe.caloriesPerServing,
    proteinPerServing: recipe.proteinPerServing,
    keyMatches: matches
  };
}