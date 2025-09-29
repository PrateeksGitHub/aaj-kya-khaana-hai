import { NextResponse } from 'next/server';
import { getRecipeById } from '../../../lib/recipeData';

/**
 * API handler for GET /api/recipe/:id.  Returns full recipe details
 * or a 404 response if the recipe is not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = params;
  const recipe = getRecipeById(id);
  if (!recipe) {
    return new NextResponse('Not found', { status: 404 });
  }
  return NextResponse.json(recipe);
}