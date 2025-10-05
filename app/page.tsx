'use client';

import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import BackgroundGrid from './components/BackgroundGrid';
import FoodPreferenceSection from './components/FoodPreferenceSection';
import IngredientsSection from './components/IngredientsSection';
import MissingIngredientsSection from './components/MissingIngredientsSection';
import FridgeInputSection from './components/FridgeInputSection';
import ExtrasInputSection from './components/ExtrasInputSection';
import GenerateButton from './components/GenerateButton';
import RecipeCard from './components/RecipeCard';
import RecipeDrawer from './components/RecipeDrawer';
import { RecipeDetail, RecipeSummary, UserInput } from './lib/types';

// Default cuisine allow-list used when querying the backend.
const allCuisineIds = ['Indo‑Chinese', 'Indian', 'Asian', 'Chinese', 'Italian', 'Mexican'];

// Dietary-specific ingredient data
const dietaryIngredients = {
  vegan: {
    staples: ['Rice', 'Dal', 'Wheat Flour', 'Quinoa', 'Oats'],
    common: ['Salt', 'Oil', 'Sugar', 'Water', 'Haldi', 'Red Chilli Powder', 'Jeera'],
    missing: ['Green chilli', 'Tomato', 'Onion', 'Rice', 'Wheat Flour', 'Potato', 'Dal']
  },
  vegetarian: {
    staples: ['Rice', 'Dal', 'Wheat Flour', 'Quinoa', 'Oats'],
    common: ['Salt', 'Oil', 'Sugar', 'Water', 'Haldi', 'Red Chilli Powder', 'Jeera'],
    missing: ['Green chilli', 'Tomato', 'Onion', 'Rice', 'Wheat Flour', 'Potato', 'Dal', 'Milk', 'Butter', 'Paneer']
  },
  eggetarian: {
    staples: ['Rice', 'Dal', 'Wheat Flour', 'Quinoa', 'Oats'],
    common: ['Salt', 'Oil', 'Sugar', 'Water', 'Haldi', 'Red Chilli Powder', 'Jeera'],
    missing: ['Green chilli', 'Tomato', 'Onion', 'Rice', 'Wheat Flour', 'Potato', 'Dal', 'Milk', 'Butter', 'Paneer', 'Eggs']
  },
  meat: {
    staples: ['Rice', 'Dal', 'Wheat Flour', 'Quinoa', 'Oats'],
    common: ['Salt', 'Oil', 'Sugar', 'Water', 'Haldi', 'Red Chilli Powder', 'Jeera'],
    missing: ['Green chilli', 'Tomato', 'Onion', 'Rice', 'Wheat Flour', 'Potato', 'Dal', 'Milk', 'Butter', 'Paneer', 'Eggs', 'Chicken']
  }
};

export default function HomePage() {
  // Selected state for each section.
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedMissingIngredients, setSelectedMissingIngredients] = useState<string[]>([]);
  const [fridgeInput, setFridgeInput] = useState<string>('');
  const [extrasInput, setExtrasInput] = useState<string>('');
  const [results, setResults] = useState<RecipeSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [drawerError, setDrawerError] = useState<string | null>(null);
  const [activeRecipe, setActiveRecipe] = useState<RecipeDetail | null>(null);
  const latestRequestId = useRef<string | null>(null);

  useEffect(() => {
    setError(null);

    if (!selectedDiet) {
      setSelectedIngredients([]);
      setSelectedMissingIngredients([]);
      return;
    }
    const config = dietaryIngredients[selectedDiet as keyof typeof dietaryIngredients];
    if (!config) {
      setSelectedIngredients([]);
      setSelectedMissingIngredients([]);
      return;
    }
    setSelectedIngredients((prev) => {
      const filtered = prev.filter((item) => config.common.includes(item));
      return filtered.length === prev.length ? prev : filtered;
    });
    setSelectedMissingIngredients((prev) => {
      const filtered = prev.filter((item) => config.missing.includes(item));
      return filtered.length === prev.length ? prev : filtered;
    });
  }, [selectedDiet]);

  // Handler invoked when the user clicks "Generate".  It posts the
  // collected input to the API and updates the results state.
  const handleGenerate = async () => {
    if (!selectedDiet) {
      setError('Please choose a food preference first.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const dietKey = selectedDiet as keyof typeof dietaryIngredients;
      const config = dietaryIngredients[dietKey];

      if (!config) {
        throw new Error('Unknown food preference selection.');
      }

      const staplesPool = config.missing ?? [];
      const availableStaples = staplesPool.filter(
        (item) => !selectedMissingIngredients.includes(item)
      );

      const trimmedFridge = fridgeInput.trim();
      const trimmedExtras = extrasInput.trim();

      const needToUseTokens: string[] = [...selectedIngredients];
      if (trimmedFridge.length > 0) {
        needToUseTokens.push(trimmedFridge);
      }
      const needToUseRaw = needToUseTokens.join(', ').trim();

      const body: UserInput = {
        staplesSelected: availableStaples.map((item) => item.toLowerCase()),
        cuisinesAllowed: allCuisineIds,
        needToUseRaw,
        diet: selectedDiet || undefined
      };

      if (trimmedExtras.length > 0) {
        body.haveRaw = trimmedExtras;
      }

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }
      const data = await res.json();
      setResults(data.results as RecipeSummary[]);
    } catch (err: any) {
      setError(err.message ?? 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeSelect = async (id: string) => {
    setDrawerOpen(true);
    latestRequestId.current = id;

    if (activeRecipe?.id === id) {
      setDrawerError(null);
      return;
    }

    setDrawerLoading(true);
    setDrawerError(null);
    setActiveRecipe(null);

    try {
      const response = await fetch(`/api/recipe/${id}`);
      if (!response.ok) {
        throw new Error('Unable to load recipe right now.');
      }
      const data = (await response.json()) as RecipeDetail;
      if (latestRequestId.current === id) {
        setActiveRecipe(data);
      }
    } catch (err) {
      if (latestRequestId.current === id) {
        const message = err instanceof Error ? err.message : 'Unexpected error';
        setDrawerError(message);
      }
    } finally {
      if (latestRequestId.current === id) {
        setDrawerLoading(false);
      }
    }
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    latestRequestId.current = null;
    setDrawerError(null);
    setDrawerLoading(false);
  };

  const handleDrawerRetry = () => {
    if (latestRequestId.current) {
      void handleRecipeSelect(latestRequestId.current);
    }
  };



  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="relative flex-1">
        <BackgroundGrid />

        <section className="relative z-10 flex justify-center px-4 pb-12 pt-16">
          <div className="flex w-full max-w-[343px] flex-col items-center gap-8">
            <div className="w-full min-h-[165px] text-center font-ibm-plex-mono text-[10px] leading-[15px] tracking-[-0.05em] text-text">
              <p className="mb-4">Helluuu 👋</p>
              <p className="mb-4">
                We were tireddddd of asking "aaj kya khana hai?" EVERY. SINGLE. DAY. wasting groceries, or eating the same boring food on loop just because we didn't know the possibilities.
              </p>
              <p className="mb-4">
                So we made this little thing, it started as a personal project to rescue our sanity — and now we're sharing it with you.
              </p>
              <p>
                Hope you like it, laugh with it, and finally say with full confidence: "Yesss, aaj ye banate hai!"
              </p>
            </div>

            <FoodPreferenceSection
              selectedDiet={selectedDiet}
              onDietChange={setSelectedDiet}
            />

            {selectedDiet && (
              <>
                <IngredientsSection
                  selectedIngredients={selectedIngredients}
                  onIngredientsChange={setSelectedIngredients}
                  ingredients={dietaryIngredients[selectedDiet as keyof typeof dietaryIngredients]?.common || []}
                />

                <MissingIngredientsSection
                  selectedMissingIngredients={selectedMissingIngredients}
                  onMissingIngredientsChange={setSelectedMissingIngredients}
                  ingredients={dietaryIngredients[selectedDiet as keyof typeof dietaryIngredients]?.missing || []}
                />

                <FridgeInputSection
                  value={fridgeInput}
                  onChange={setFridgeInput}
                />

                <ExtrasInputSection
                  value={extrasInput}
                  onChange={setExtrasInput}
                />
              </>
            )}

            <GenerateButton
              onClick={handleGenerate}
              loading={loading}
              disabled={loading}
            />

            {error && (
              <p className="font-ibm-plex-mono text-[12px] text-red-500">
                {error}
              </p>
            )}
          </div>
        </section>

        {results.length > 0 && (
          <div className="relative z-10 px-4 pb-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-4 text-center font-ibm-plex-mono text-[16px] font-semibold">
                Results
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {results.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} onSelect={handleRecipeSelect} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <RecipeDrawer
        open={drawerOpen}
        recipe={activeRecipe}
        loading={drawerLoading}
        error={drawerError}
        onClose={handleDrawerClose}
        onRetry={handleDrawerRetry}
      />
    </div>
  );
}
