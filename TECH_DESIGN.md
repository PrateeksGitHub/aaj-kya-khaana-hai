# Fridge‑to‑Recipe – Technical Design (MVP)

## Overview

This document describes the architecture and key implementation details for the
Fridge‑to‑Recipe MVP.  The goal is to build a simple, extensible web app that
suggests recipes based on ingredients a user has on hand, preferred cuisines, dietary
choices and optional nutrition constraints.  The design emphasises ease of development
and deployment over completeness: there is no separate backend service, no heavy
machine‑learning components and no database beyond a static JSON file.

## Architecture

### Frontend

* **Framework**: Next.js 14 with the App Router and TypeScript.  This allows
  server‑rendered pages under `/recipe/[id]`, API routes in the same codebase and a
  modern React front‑end for the main page.
* **State management**: component‑level `useState` and `useEffect`.  Because this is an
  MVP there is no global store; the only shared state is the generated recipe list on
  the index page.
* **UI components**: A small set of reusable components implement pills for
  selecting staples, cuisines and diets, inputs for ingredient lists and nutrition
  constraints, and cards for displaying recipe summaries.  These components use
  Tailwind CSS utility classes for styling.  Shadcn/ui or other component libraries
  could be integrated later but are not required.

### Backend

* **API routes**: Two API handlers are defined under `app/api`: one to generate
  recipe suggestions (`/api/generate`), and another to fetch full recipe details
  (`/api/recipe/:id`).  These handlers run on the same server as the Next.js
  application and return JSON responses.
* **Data storage**: Recipes are stored in a static JSON file at `data/recipes.json`.
  This file is loaded synchronously by the API handlers and parsed into TypeScript
  types.  Using a JSON file avoids the need for an external database and keeps
  hosting costs minimal.  If you wish to store more recipes or allow runtime writes
  you could replace this with SQLite (via the [better‑sqlite3](https://github.com/WiseLibs/better-sqlite3)
  library) or Vercel Postgres.
* **Ingredient alias map**: The parser uses a simple dictionary (`data/ingredient_aliases.json`)
  to normalise synonyms (e.g. `dahi` → `yogurt`).  This MVP does not include an LLM
  for free text parsing; instead, the interface instructs users to supply
  comma‑separated lists.  Extending the alias map or adding more robust tokenisation
  is straightforward.

## Data Model

### Recipe

Each recipe is defined by the following fields:

* `id`: unique string identifier.
* `name`: the human‑readable name of the dish.
* `cuisines`: array of strings.  A recipe can belong to multiple cuisines (e.g.
  `"Indian"` and `"Asian"`).
* `diet`: one of `"vegan"`, `"vegetarian"`, `"eggetarian"`, or `"meat"`.
* `ingredients`: array of canonical ingredient names.
* `steps`: array of instructions for preparing the dish.
* `servings`: number of servings the recipe yields.
* `caloriesPerServing`: approximate calories per serving.
* `proteinPerServing`: approximate grams of protein per serving.

The data file can also include optional `variations` and `notes` fields if you wish
to provide suggestions or substitutions.

### User Input

On the client the form collects the following data:

* `staplesSelected`: list of staple IDs selected by the user (e.g. `"rice"`, `"dal"`).
* `cuisinesAllowed`: list of cuisines the user is willing to see.  The UI starts
  with all cuisines selected and the user can deselect any they don’t want.
* `needToUseRaw`: a comma‑separated list of items the user needs to use up.
* `haveRaw`: (optional) a comma‑separated list of additional ingredients.
* `diet`: a string representing the dietary preference; if left blank the API will
  return any diet.
* `maxCalories`: (optional) maximum allowed calories per serving.
* `minProtein`: (optional) minimum required protein per serving.

The API normalises these fields into a canonical form using simple string
processing and the alias map.

## Parsing and Normalisation

The parser performs three steps:

1. **Tokenisation** – splits the raw `needToUseRaw` and `haveRaw` strings on commas,
   trims whitespace and lowercases the result.
2. **Alias mapping** – looks up each token in `ingredient_aliases.json` and
   replaces it with a canonical term if present (e.g. `curd` → `yogurt`).
3. **De‑duplication** – removes empty strings and duplicates.

Because the input format is constrained (comma‑separated) there is no need for an
LLM or complex natural language processing.  If more advanced parsing becomes
desirable you can swap the `parseInputs` function for one backed by a language
model, leaving the rest of the pipeline unchanged.

## Matching and Scoring

The API handler for `/api/generate` follows these steps:

1. **Canonicalise input** using the parser described above.
2. **Load recipes** from `recipes.json` into memory.
3. **Filter** recipes based on user preferences:
   * Keep only recipes that contain at least one `needToUse` ingredient.
   * Remove recipes whose `cuisines` array does not intersect the allowed cuisines.
   * If a `diet` is specified, drop recipes with a different diet.
   * If `maxCalories` is provided, drop recipes whose `caloriesPerServing` exceed it.
   * If `minProtein` is provided, drop recipes whose `proteinPerServing` are below it.
4. **Compute key matches** – for each recipe compute the intersection of its
   ingredients with the user’s `needToUse`, `have` and `staples`.  These values are
   returned to the client for display.
5. **Score and sort** – assign a simple score to each remaining recipe:
   * 0.6 × fraction of `needToUse` covered.
   * 0.2 × fraction of `have` covered (capped to avoid over‑weighting extras).
   * 0.1 × whether all `staplesSelected` are present.
   * 0.1 × nutritional fit (1 if within bounds, 0.5 if slightly over/under).
   Sort recipes in descending order of this score.
6. **Return** a truncated list (e.g. top 10) to the client along with the
   `keyMatches` and basic nutrition info.

## Endpoints

### `POST /api/generate`

Consumes a JSON body corresponding to the user input described above.  Responds with
an array of `RecipeSummary` objects:

* `id`, `name`, `cuisines`, `diet` – copied from the data set.
* `caloriesPerServing`, `proteinPerServing` – numeric nutrition estimates.
* `keyMatches` – array of canonical ingredient names that matched the user’s input.

### `GET /api/recipe/:id`

Returns the full recipe record from the data set with all fields.  If the ID is
unknown the response status is 404.

## Client Components

* `PillToggleGroup` – renders a group of selectable pills with a remove button.
  Used for staples, cuisines and diets.
* `IngredientInput` – simple input component for entering comma‑separated
  ingredients.
* `NutritionConstraint` – two number inputs for maximum calories and minimum
  protein.
* `DietSelector` – pill group specialised for choosing a dietary preference.
* `RecipeCard` – displays summary information about a recipe result.  Each card
  links to its detail page via Next.js’s `Link` component.

## Extensibility

The current MVP is intentionally small, but the design leaves room for growth:

* **Richer data** – expand `recipes.json` with more recipes, multiple dietary tags
  and variations.  Alternatively integrate a database to store recipes and user
  submissions.
* **AI integration** – replace the string parser with an LLM to understand free
  text and build a generative recipe model for unmatched ingredient combinations.
* **User accounts** – persist favourite recipes, pantry profiles and dietary
  preferences using authentication.
* **Better nutrition** – compute nutrition from ingredient lists by integrating
  `data/nutrition.json` or a third‑party API rather than relying on per‑recipe
  estimates.
* **Internationalisation** – the UI and data are written in English; use Next.js
  i18n features to support additional languages.

---

This document reflects the state of the MVP as of September 2025 and can serve as
a starting point for future iterations.