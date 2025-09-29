import { getRecipeById } from '../../lib/recipeData';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { id: string };
}

/**
 * Server component for the recipe detail page.  It fetches the recipe by ID
 * from the local data set and renders its full details.  If the recipe
 * doesn’t exist the page responds with a 404 via notFound().
 */
export default async function RecipePage({ params }: PageProps) {
  const recipe = getRecipeById(params.id);
  if (!recipe) {
    notFound();
  }
  return (
    <main className="container mx-auto max-w-3xl p-4 space-y-4">
      <h1 className="text-3xl font-bold">{recipe!.name}</h1>
      <p className="text-gray-700">
        {recipe!.cuisines.join(', ')} • {recipe!.diet} • {recipe!.caloriesPerServing}
        {` `}kcal / {recipe!.proteinPerServing} g protein per serving
      </p>
      <section>
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside">
          {recipe!.ingredients.map((ing) => (
            <li key={ing}>{ing}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Steps</h2>
        <ol className="list-decimal list-inside space-y-1">
          {recipe!.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>
      {recipe!.variations && recipe!.variations.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Variations</h2>
          <ul className="list-disc list-inside">
            {recipe!.variations!.map((variation, idx) => (
              <li key={idx}>{variation}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}