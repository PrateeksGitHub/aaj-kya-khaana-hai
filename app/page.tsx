'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from './components/Header';
import BackgroundGrid from './components/BackgroundGrid';
import FoodPreferenceSection from './components/FoodPreferenceSection';
import IngredientsSection from './components/IngredientsSection';
import MissingIngredientsSection from './components/MissingIngredientsSection';
import FridgeInputSection from './components/FridgeInputSection';
import ExtrasInputSection from './components/ExtrasInputSection';
import GenerateButton from './components/GenerateButton';
import RecipeCard from './components/RecipeCard';
import { RecipeSummary, UserInput } from './lib/types';

// Define the selectable options for staples and cuisines.  These values are
// referenced by ID in the code and displayed by their label.
const stapleOptions = [
  { id: 'rice', label: 'Rice' },
  { id: 'dal', label: 'Dal' },
  { id: 'atta', label: 'Atta' }
];

const cuisineOptions = [
  { id: 'Indo‑Chinese', label: 'Indo‑Chinese' },
  { id: 'Indian', label: 'Indian' },
  { id: 'Asian', label: 'Asian' },
  { id: 'Chinese', label: 'Chinese' },
  { id: 'Italian', label: 'Italian' },
  { id: 'Mexican', label: 'Mexican' }
];

// Dietary choices.  The empty ID represents no preference.
const dietOptions = [
  { id: '', label: 'Any' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'eggetarian', label: 'Eggetarian' },
  { id: 'meat', label: 'Meat' }
];

// Dietary-specific ingredient data
const dietaryIngredients = {
  vegan: {
    staples: ['Rice', 'Dal', 'Wheat Flour', 'Quinoa', 'Oats'],
    common: ['Salt', 'Oil', 'Sugar', 'Water', 'Haldi', 'Red Chilli Powder', 'Jeera', 'Cumin', 'Coriander'],
    missing: ['Green chilli', 'Tomato', 'Onion', 'Potato', 'Paneer', 'Milk', 'Butter', 'Eggs', 'Chicken', 'Fish']
  },
  vegetarian: {
    staples: ['Rice', 'Dal', 'Wheat Flour', 'Quinoa', 'Oats'],
    common: ['Salt', 'Oil', 'Sugar', 'Water', 'Haldi', 'Red Chilli Powder', 'Jeera', 'Cumin', 'Coriander', 'Paneer', 'Milk', 'Butter'],
    missing: ['Green chilli', 'Tomato', 'Onion', 'Potato', 'Eggs', 'Chicken', 'Fish', 'Meat']
  },
  eggetarian: {
    staples: ['Rice', 'Dal', 'Wheat Flour', 'Quinoa', 'Oats'],
    common: ['Salt', 'Oil', 'Sugar', 'Water', 'Haldi', 'Red Chilli Powder', 'Jeera', 'Cumin', 'Coriander', 'Paneer', 'Milk', 'Butter', 'Eggs'],
    missing: ['Green chilli', 'Tomato', 'Onion', 'Potato', 'Chicken', 'Fish', 'Meat']
  },
  meat: {
    staples: ['Rice', 'Dal', 'Wheat Flour', 'Quinoa', 'Oats'],
    common: ['Salt', 'Oil', 'Sugar', 'Water', 'Haldi', 'Red Chilli Powder', 'Jeera', 'Cumin', 'Coriander', 'Paneer', 'Milk', 'Butter', 'Eggs', 'Chicken', 'Fish'],
    missing: ['Green chilli', 'Tomato', 'Onion', 'Potato']
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

  // Handler invoked when the user clicks "Generate".  It posts the
  // collected input to the API and updates the results state.
  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const body: UserInput = {
        staplesSelected: ['rice', 'dal', 'atta'], // Default staples
        cuisinesAllowed: ['Indian', 'Asian'], // Default cuisines
        needToUseRaw: `${selectedIngredients.join(', ')}, ${fridgeInput}`.trim(),
        haveRaw: extrasInput,
        diet: foodPreferences[0] || '',
        maxCalories: undefined,
        minProtein: undefined
      };
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className={`relative flex flex-row justify-center items-center gap-[10px] w-full bg-background ${
        selectedDiet ? 'min-h-[1121px]' : 'min-h-[500px]'
      }`} style={{ padding: '32px 16px' }}>
        {/* Background Grid */}
        <BackgroundGrid />
        
        {/* Content Container */}
        <div className={`relative flex flex-col justify-center items-center w-full max-w-[343px] md:max-w-[600px] lg:max-w-[800px] z-10 ${
          selectedDiet ? 'min-h-[1057px]' : 'min-h-[400px]'
        }`} style={{ gap: '32px' }}>
          {/* Introduction Text */}
          <div className="w-full max-w-[343px] md:max-w-[600px] lg:max-w-[800px] min-h-[165px] font-ibm-plex-mono text-[10px] md:text-[12px] lg:text-[14px] leading-[15px] md:leading-[18px] lg:leading-[20px] text-center tracking-[-0.05em] text-text">
            <p className="mb-4">
              <span className="text-left">Helluuu 👋</span>
            </p>
            <p className="text-left mb-4">
              We were tireddddd of asking "aaj kya khana hai?" EVERY. SINGLE. DAY. wasting groceries, or eating the same boring food on loop just because we didn't know the possibilities.
            </p>
            <p className="text-left mb-4">
              So we made this little thing, it started as a personal project to rescue our sanity — and now we're sharing it with you.
            </p>
            <p className="text-left">
              Hope you like it, laugh with it, and finally say with full confidence: "Yesss, aaj ye banate hai!"
            </p>
          </div>

          {/* Food Preference Section */}
          <FoodPreferenceSection
            selectedDiet={selectedDiet}
            onDietChange={setSelectedDiet}
          />

          {/* Conditional Sections - Only show when diet is selected */}
          {selectedDiet && (
            <>
              {/* Ingredients Section */}
              <IngredientsSection
                selectedIngredients={selectedIngredients}
                onIngredientsChange={setSelectedIngredients}
                ingredients={dietaryIngredients[selectedDiet as keyof typeof dietaryIngredients]?.common || []}
              />

              {/* Missing Ingredients Section */}
              <MissingIngredientsSection
                selectedMissingIngredients={selectedMissingIngredients}
                onMissingIngredientsChange={setSelectedMissingIngredients}
                ingredients={dietaryIngredients[selectedDiet as keyof typeof dietaryIngredients]?.missing || []}
              />

              {/* Fridge Input Section */}
              <FridgeInputSection
                value={fridgeInput}
                onChange={setFridgeInput}
              />

              {/* Extras Input Section */}
              <ExtrasInputSection
                value={extrasInput}
                onChange={setExtrasInput}
              />
            </>
          )}

          {/* Generate Button */}
          <GenerateButton
            onClick={handleGenerate}
            loading={loading}
            disabled={loading}
          />

          {/* Error Message */}
          {error && (
            <p className="font-ibm-plex-mono text-[12px] text-red-500 text-center">
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="px-4 py-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-ibm-plex-mono text-[16px] font-semibold mb-4 text-center">
              Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}