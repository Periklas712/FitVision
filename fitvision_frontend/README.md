# FitVision · frontend

React 19 + Vite 6 + Tailwind CSS v4 single-page app. See the [project README](../README.md)
for what the app does, the architecture and how to run the whole stack.

```bash
npm install
npm run dev      # dev server with hot reload on http://localhost:5173
npm run build    # production build into dist/ (served by nginx in Docker)
npm run lint
```

The API base URL lives in `src/assets/services/ApiHandler.jsx`.
