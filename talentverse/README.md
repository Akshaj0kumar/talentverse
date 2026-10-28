# TalentVerse (frontend)
React + Vite + Tailwind + Lucide + Recharts + React Router.

## Run
```
npm install
cp .env.example .env     # VITE_API_BASE_URL=http://localhost:5000
npm run dev              # http://localhost:5173
```
Start your Express backend on port 5000 first (it must allow CORS from http://localhost:5173).

## Backend integration
Only `POST /api/career/profiles` is called (`src/services/api.js`, from Career Analysis). Everything else is mock data in `src/data/mock.js` and `src/services/analysis.js`, with local persistence in `src/services/storage.js`. Replace those two services with API calls as endpoints appear.
Never put the MongoDB URI or Gemini key in a `VITE_` variable - keep them in the backend `.env`.
