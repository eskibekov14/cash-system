Frontend (React + Vite)

Quick start

1) Install Node.js 18+ and pnpm or npm

2) In a new terminal:

   cd frontend
   npm install
   npm run dev

3) Open the printed localhost URL (default http://localhost:5173)

What it includes

- Auth (login) against auth-service
- Menu browsing (categories, items, modifiers) from menu-service
- Cart with modifiers, quantity and live price calculation
- Order placement (takeaway) to order-service (JWT required)

Backend proxies

Vite dev server proxies to backend services to avoid CORS:
- /auth -> http://localhost:18082/api/auth
- /menu -> http://localhost:8080/api
- /order -> http://localhost:8081/api

If your backend runs on different ports/hosts, edit vite.config.ts proxy targets.


