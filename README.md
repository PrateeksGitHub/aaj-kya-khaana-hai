# Fridge‑to‑Recipe

## Overview

Fridge‑to‑Recipe is a minimal full‑stack application that helps you decide what to cook based on
ingredients you already have.  Users select staple items, add comma‑separated lists of things
they need to use up and things they have, choose preferred cuisines and dietary preferences,
optionally set calorie and protein limits, and then generate a shortlist of recipes.  Each recipe
shows matched ingredients along with an estimated nutritional profile and links to full
preparation steps.  The project is designed as an **MVP** – the logic is simple, the UI is
straightforward and the entire stack runs on a single Next.js server so you can deploy to
platforms like Vercel without maintaining a separate backend.

## Features

* One‑page interface built with React (Next.js app router).
* Predefined list of staples and cuisines; users can deselect any they don’t want.
* Free text inputs for ingredients you **need to use** and ingredients you **have** (comma
  separated).  A small alias map normalises common ingredient synonyms.
* Dietary choices: `vegan`, `vegetarian`, `eggetarian`, `meat`, or leave unrestricted.
* Optional calorie and protein constraints per serving.
* Generates a ranked list of recipes from a small local JSON catalogue, matching required
  ingredients and filtering by cuisine/dietary preferences and nutrition goals.
* Clicking a recipe opens a detail page with ingredients, steps and variations.

## Prerequisites

This project uses **Next.js 14** with TypeScript.  You’ll need a recent version of Node.js
(>= 18) and npm installed locally.

## Getting Started

Clone or download this repository and install dependencies:

```bash
cd fridge-to-recipe
npm install
```

Run the development server on <http://localhost:3000>:

```bash
npm run dev
```

Open <http://localhost:3000> in your browser to view the app.  As you edit files under `app/`
the page will reload.

## Build and Deploy

To generate a production build:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

The project is designed to be deployable to Vercel.  You can connect this repository to a
Vercel account and deploy without additional configuration; Vercel will automatically detect
the Next.js framework.

### Styling Note

The UI components in this repository include utility class names from
[Tailwind CSS](https://tailwindcss.com/).  If you do not already have Tailwind
installed you can either remove or replace these classes with your own CSS or
add Tailwind to the project.  To add Tailwind run:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then add the required `@tailwind base; @tailwind components; @tailwind utilities;`
directives to your global stylesheet and configure the content paths in
`tailwind.config.js` to include the files under `app/`.

## Data and Extensibility

Recipe data lives in `data/recipes.json`.  Each record contains a unique ID, name,
cuisines (array), diet classification, list of ingredient names, preparation steps, and
nutritional estimates per serving.  The default data set is intentionally small; feel free to
expand it by adding more recipes to the JSON file or replacing it with your own collection.

Ingredient normalisation is handled by a simple alias map in `data/ingredient_aliases.json`.
If you find the parser isn’t recognising common terms you can extend this map.

The nutrition values supplied in the recipe data are approximate.  This MVP does not
compute nutrition dynamically; instead, each recipe includes its own calorie and protein
estimates.  For more accurate results you could integrate a third‑party nutrition API or
expand `data/nutrition.json` and build a proper estimator.

## Contributing

This project is intentionally lightweight and does not include a test suite.  If you wish to
extend it further – such as adding new components, improving the scoring algorithm,
internationalising the interface or integrating an AI model – contributions are welcome!

---

© 2025 Your Name