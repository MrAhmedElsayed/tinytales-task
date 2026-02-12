# Tinytales Frontend Task

Next.js app implementing:
- Authentication flow (Register, Login, Verify) with provided API.
- Dashboard after login with welcome text and user data.
- Pixel-focused responsive product details page based on provided Figma/screenshots.

## Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui (editable local components)

## Setup
1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=https://tinytales.trendline.marketing/api
```

3. Run the app:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Routes
- `/` login page
- `/register` register page
- `/verify` verify account page
- `/dashboard` simple dashboard (task requirement)
- `/product-details` responsive product details UI page

## Task Notes
- Verification test code: `123456`
- Token is saved in localStorage after auth.
- Dashboard fetches `/auth/user-data`.
- Logout calls `/auth/logout` and clears local storage.
- Breadcrumb uses a local shadcn component in `components/ui/breadcrumb.tsx` and is editable.

## Checks
```bash
npm run lint
npm run build
```
