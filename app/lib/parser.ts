import { CanonicalInput, UserInput } from './types';
import aliases from '../../data/ingredient_aliases.json';

/**
 * Split a raw string into an array of tokens.  Tokens are separated by
 * commas, semicolons or newlines.  Whitespace is trimmed and empty tokens
 * removed.
 */
function splitAndTrim(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/[,;\n]+/)
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t.length > 0);
}

/**
 * Map ingredient tokens to canonical names using the alias map.  If a token
 * appears in the alias file its value is returned; otherwise the original
 * token is used.  Duplicate values are removed.
 */
function canonicalise(tokens: string[]): string[] {
  const out: string[] = [];
  tokens.forEach((t) => {
    const canonical = (aliases as Record<string, string>)[t] ?? t;
    if (!out.includes(canonical)) {
      out.push(canonical);
    }
  });
  return out;
}

/**
 * Convert a UserInput object into its canonical form.  This involves splitting
 * the raw ingredient strings, mapping through the alias file and deduplicating.
 */
export function parseUserInput(input: UserInput): CanonicalInput {
  const needToUseTokens = splitAndTrim(input.needToUseRaw);
  const haveTokens = splitAndTrim(input.haveRaw);
  const canonicalNeed = canonicalise(needToUseTokens);
  const canonicalHave = canonicalise(haveTokens);
  const canonicalStaples = canonicalise(input.staplesSelected.map((s) => s.toLowerCase()));
  const canonicalCuisines = input.cuisinesAllowed.map((c) => c);
  return {
    needToUse: canonicalNeed,
    have: canonicalHave,
    staples: canonicalStaples,
    cuisines: canonicalCuisines,
    diet: input.diet && input.diet.length > 0 ? input.diet : undefined,
    maxCalories: input.maxCalories,
    minProtein: input.minProtein
  };
}