# Starter Data

You are given one mock data file for this challenge.

## File

**`airports.json`** — 34 Indian airports.

## Placement

Place this file where your framework serves static files:

- **Angular**: `src/assets/airports.json` — fetch from `/assets/airports.json`
- **React (CRA / Vite)**: `public/airports.json` — fetch from `/airports.json`
- **Vanilla**: anywhere alongside your `index.html` — fetch from `./airports.json`

## Data shape

```ts
interface Airport {
  code: string;     // IATA code, e.g. "DEL"
  city: string;     // "Delhi"
  country: string;  // "India"
  name: string;     // Full airport name
}
```

## Sample

```json
{ "code": "DEL", "city": "Delhi", "country": "India", "name": "Indira Gandhi International Airport" }
```

## Rules

- Load this file at runtime via `fetch` (or `HttpClient` in Angular).
- Do **not** import it statically (no `import airports from './airports.json'`).
- Do **not** copy-paste the contents into a TypeScript or JavaScript module.
- Do **not** modify the file.
