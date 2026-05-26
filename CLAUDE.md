# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (uses --webpack flag, not Turbopack)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

**Premo Heritage** is a luxury villa booking website for a property in Sri Lanka. Stack: Next.js 16 App Router, Firebase (Auth + Firestore), Tailwind CSS v4, Framer Motion, Resend for email.

### Routing & Layout

All pages live under `app/`. The root layout (`app/layout.tsx`) wraps the app in `AuthProvider` (Firebase auth context) and loads Google Fonts. `SiteChrome` (`app/components/SiteChrome.tsx`) wraps page content and conditionally suppresses the Header/Footer on `/admin/*` routes.

### Component Organization

Components live in `app/components/` and are grouped by page: `home/`, `about/`, `booking/`, `contact/`, `destinations/`, `admin/`. All pages and most components use `"use client"`.

### Firebase

- `app/lib/firebase.ts` — initializes the Firebase app from `NEXT_PUBLIC_*` env vars
- `app/lib/firestore.ts` — Firestore helpers
- `app/contexts/AuthContext.tsx` — provides `user`, `loading`, and `logout` via `useAuth()`

**Firestore collections:**
- `bookings` — guest bookings (`guestName`, `guestEmail`, `guestPhone`, `checkIn`, `checkOut`, `nights`, `status`, `whatsappMessage`, `createdAt`)
- `blockedDates` — admin-managed unavailable dates (`date`, `reason`, `createdAt`, `createdBy`)

### API Routes

`app/api/contact/route.ts` — POST endpoint. Accepts `{ fullName, email, phone, message }`, sends email via Resend to `premoheritage@gmail.com`.

### Styling

Tailwind CSS v4 (PostCSS plugin). Custom font utilities defined in `tailwind.config.ts`:
- `font-primary` → Cormorant Garamond (serif, headings)
- `font-secondary` → Lato (sans-serif, body)


