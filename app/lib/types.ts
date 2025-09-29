export interface UserInput {
  staplesSelected: string[];
  cuisinesAllowed: string[];
  needToUseRaw: string;
  haveRaw?: string;
  diet?: string;
  maxCalories?: number;
  minProtein?: number;
}

/**
 * Canonical form of the user input after parsing and normalising.  All
 * ingredient names are lowercased and mapped through the alias file.
 */
export interface CanonicalInput {
  needToUse: string[];
  have: string[];
  staples: string[];
  cuisines: string[];
  diet?: string;
  maxCalories?: number;
  minProtein?: number;
}

/**
 * Summary information about a recipe returned by the generate API.  It
 * includes only the fields needed to render the recipe list.
 */
export interface RecipeSummary {
  id: string;
  name: string;
  cuisines: string[];
  diet: string;
  caloriesPerServing: number;
  proteinPerServing: number;
  keyMatches: string[];
}

/**
 * Detailed information about a recipe.  Used by the recipe detail page.
 */
export interface RecipeDetail extends RecipeSummary {
  servings: number;
  ingredients: string[];
  steps: string[];
  variations?: string[];
}