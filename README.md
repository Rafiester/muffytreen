# Muffytreen 🌳

A beautiful modern web application built with **Nuxt 3** and enhanced with rich, interactive UI components.

## 🚀 Built With Antigravity & Vibe Coding

This project was built and developed using **Antigravity**, a powerful agentic AI coding assistant powered by **Gemini Flash** (using the Gemini 3.5 Flash model). 

It was built entirely via **Vibe Coding**—leveraging advanced AI to speed up prototyping, component integration, and feature development.

## Features

- **Nuxt 3** – Vue 3 framework for building server-rendered and static web applications.
- **Rich Aesthetics** – Stunning, modern design elements and premium animations.
- **Interactive UI Componentry** – Includes custom elements like the animated, chaotic `<ElectricBorder />` wrapper.
- **Tailwind CSS** – Styling and utility classes for rapid UI development.

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Install Dependencies

```bash
npm install
```

### Run the Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Build for Production

To build the application for production deployment:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🛠️ Tech Stack & Tools

- **Core:** Nuxt 3 (Vue 3, TypeScript)
- **Styling:** Tailwind CSS
- **AI Builder:** Antigravity (Powered by Gemini Flash)
- **Methodology:** Vibe Coding

## 🚀 Deploying to Vercel

To deploy this Nuxt 3 application with Supabase integration to **Vercel**, follow these steps:

### 1. Set Up Your Environment Variables

Configure the following environment variables in your **Vercel Project Settings** (`Settings -> Environment Variables`):

| Variable Name | Description / Example Value |
| --- | --- |
| `DATABASE_URL` | Transaction Mode connection string. E.g.: `postgresql://postgres.awfdwhgeboiwgnflzqoi:[YOUR-PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | Session Mode direct connection string (Port 5432). E.g.: `postgresql://postgres.awfdwhgeboiwgnflzqoi:[YOUR-PASSWORD]@db.awfdwhgeboiwgnflzqoi.supabase.co:5432/postgres` |
| `VITE_SUPABASE_URL` | Your Supabase Project API endpoint. E.g.: `https://awfdwhgeboiwgnflzqoi.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase Project **Anon / Public Key** |

*Optional (for broad framework support):*
- `NEXT_PUBLIC_SUPABASE_URL` = `https://awfdwhgeboiwgnflzqoi.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `[Your Supabase Anon Key]`

### 2. Deploy via Vercel CLI or Github

1. Connect your Github repository to Vercel.
2. Select **Nuxt** as the Framework Preset (Vercel detects this automatically).
3. Add the environment variables listed above.
4. Click **Deploy**.

