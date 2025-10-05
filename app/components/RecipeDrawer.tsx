'use client';

import { useEffect, useRef } from 'react';
import { RecipeDetail } from '../lib/types';

type RecipeDrawerProps = {
  open: boolean;
  recipe: RecipeDetail | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onRetry: () => void;
};

function getStepLabel(index: number): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let value = index;
  let label = '';

  do {
    label = alphabet[value % alphabet.length] + label;
    value = Math.floor(value / alphabet.length) - 1;
  } while (value >= 0);

  return label;
}

export default function RecipeDrawer({
  open,
  recipe,
  loading,
  error,
  onClose,
  onRetry
}: RecipeDrawerProps) {
  const paperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        paperRef.current?.scrollTo({ top: 0 });
      });
    }
  }, [open, recipe?.id]);

  if (!open) {
    return null;
  }

  const showContent = !loading && !error && recipe;

  return (
    <div
      className="fixed inset-0 z-40"
      role="dialog"
      aria-modal="true"
      aria-label={recipe ? recipe.name : 'Recipe drawer'}
    >
      <button
        type="button"
        className="absolute inset-0 z-0 h-full w-full bg-black/35 backdrop-blur-sm"
        aria-label="Close recipe drawer"
        onClick={onClose}
      />

      <div className="relative z-10 flex h-full w-full items-end justify-center px-4 pb-6">
        <div className="relative w-full max-w-[420px] overflow-hidden rounded-[32px] border border-[#FF7265]/30 bg-white shadow-[0_-24px_48px_rgba(0,0,0,0.2)]">
          <div className="absolute inset-x-0 top-0 h-2 bg-[#FF7265]" aria-hidden="true" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#FF7265] bg-white text-[#FF7265] shadow-[0_4px_12px_rgba(255,114,101,0.25)] transition hover:bg-[#FF7265] hover:text-white"
            aria-label="Close recipe"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M2 2L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div
            ref={paperRef}
            className="recipe-drawer-paper relative overflow-y-auto pb-12 pr-12 pl-24 pt-20"
            style={{ maxHeight: 'calc(100vh - 160px)' }}
          >

            {loading && (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <p className="font-ibm-plex-mono text-sm font-semibold tracking-[-0.05em] text-gray-600">
                  Loading your recipe…
                </p>
              </div>
            )}

            {error && !loading && (
              <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
                <p className="font-ibm-plex-mono text-sm font-semibold tracking-[-0.05em] text-gray-700">
                  {error}
                </p>
                <button
                  type="button"
                  onClick={onRetry}
                  className="rounded-full bg-[#FF7265] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:bg-[#e0554a]"
                >
                  Try Again
                </button>
              </div>
            )}

            {showContent && recipe && (
              <div className="space-y-8">
                <div className="font-caveat text-[38px] leading-none text-[#292929]">
                  Ese Banate Hai
                </div>

                <div className="space-y-4">
                  <div className="space-y-1 font-ibm-plex-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-[#FF7265]">
                    <span>Recipe</span>
                    <p className="text-[18px] tracking-[-0.03em] text-black uppercase">
                      {recipe.name}
                    </p>
                    <p className="text-[10px] font-medium normal-case tracking-[-0.01em] text-gray-600">
                      {recipe.cuisines.join(', ')} • {recipe.diet} • {recipe.caloriesPerServing} kcal • {recipe.proteinPerServing} g protein
                    </p>
                  </div>
                  <div className="-ml-24 -mr-12">
                    <span className="recipe-drawer-title-line w-full" aria-hidden="true" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-ibm-plex-mono text-sm font-bold uppercase tracking-[0.2em] text-[#FF7265]">
                    Ingredients
                  </h3>
                  <ul className="space-y-1 pl-4 font-ibm-plex-mono text-[12px] font-bold leading-[21px] tracking-[-0.05em] text-black">
                    {recipe.ingredients.map((ingredient) => (
                      <li key={ingredient} className="list-disc">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-ibm-plex-mono text-sm font-bold uppercase tracking-[0.2em] text-[#FF7265]">
                    Steps
                  </h3>
                  <ol className="space-y-2 font-ibm-plex-mono text-[12px] font-bold leading-[21px] tracking-[-0.05em] text-black">
                    {recipe.steps.map((step, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="uppercase">{getStepLabel(index)}.</span>
                        <span className="flex-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {recipe.variations && recipe.variations.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-ibm-plex-mono text-sm font-bold uppercase tracking-[0.2em] text-[#FF7265]">
                      Variations
                    </h3>
                    <ul className="space-y-1 pl-4 font-ibm-plex-mono text-[12px] font-bold leading-[21px] tracking-[-0.05em] text-black">
                      {recipe.variations.map((variation, index) => (
                        <li key={index} className="list-disc">
                          {variation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
