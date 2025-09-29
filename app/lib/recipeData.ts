import allRecipes from '../../data/recipes.json';
import { RecipeDetail } from './types';

// The JSON import returns a plain array of objects.  Cast to the
// RecipeDetail type for convenience.  In a more robust implementation you
// might validate this at runtime using zod or another schema library.
const recipes: RecipeDetail[] = allRecipes as unknown as RecipeDetail[];

/**
 * Return all recipes in the data set.
 */
export function getAllRecipes(): RecipeDetail[] {
  return recipes;
}

/**
 * Find a recipe by its identifier.
 *
 * @param id - The recipe ID.
 * @returns The recipe detail or undefined if not found.
 */
export function getRecipeById(id: string): RecipeDetail | undefined {
  return recipes.find((r) => r.id === id);
}