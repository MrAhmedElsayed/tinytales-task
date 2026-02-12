# Tinytales Frontend Task

## Links
- GitHub: [https://github.com/MrAhmedElsayed/tinytales-task](https://github.com/MrAhmedElsayed/tinytales-task)
- Live Demo: [https://tinytales-task.vercel.app/](https://tinytales-task.vercel.app/)

## What Is Included
- Auth flow: Login, Register, Verify account
- Token handling with protected API requests
- Simple dashboard with `Welcome, [User Name]`
- Responsive Product Details UI page

## Tech Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui

## Run Locally
1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=https://tinytales.trendline.marketing/api
```

3. Start development server:

```bash
npm run dev
```

4. Open:

```text
http://localhost:3000
```

## Main Routes
- `/` Login
- `/register` Register
- `/verify` Verify account (test code: `123456`)
- `/dashboard` Dashboard
- `/product-details` Product details UI

## Quality Checks
```bash
npm run lint
npm run build
```
