# Fixo ⚡ — Hyperlocal On-Demand Services Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Fixo** is an ultra-premium, production-ready web application built for hyperlocal on-demand home and utility services. Designed with an **Apple-grade Deep Glassmorphism** design system, Fixo connects customers with vetted, verified blue-collar professionals (plumbers, electricians, painters, cleaners, maids, cooks) in under 30 minutes with transparent pricing, live budget negotiation, and full anti-fraud identity verification.

---

## 🌟 What's New in This Version

### 1. 🔀 Dedicated Customer & Partner Dashboards
- **Customer Dashboard (`/dashboard`)**: Hyperlocal talent discovery, real-time reactive user profile and greeting, live worker cards, price negotiation modal, active bookings tracker, and dynamic address switcher.
- **Service Partner Dashboard (`/partner-dashboard`)**: Dedicated interface for verified service providers featuring:
  - **Live Online / Offline Toggle**: Instant availability switch with glowing status pulse.
  - **Incoming Job Requests & Counter-Offers**: Live stream of customer requests displaying distance, customer proposed budget vs. worker base rate.
  - **Negotiation Response Engine**: Accept customer rate, propose counter-offer, or decline.
  - **Daily Revenue & Metrics Tracker**: Direct earnings calculation, completed job counts, and 5-star customer ratings.
  - **Government ID Verification Drawer**: Display of verified credentials and anti-fraud authentication seal.

### 2. 🛡️ Mandatory Government ID Upload & Anti-Fraud Security
- Built directly into the **Service Partner Registration** flow (`/auth`):
  - Supported IDs: **Aadhaar Card (UIDAI)**, **PAN Card**, **Driving License**, and **Voter ID (EPIC)**.
  - Form validation with format masks.
  - Drag-and-drop document upload with simulated AI scanning and national registry verification.
  - Prevents fraudulent accounts, scams, and unauthorized impersonators.

### 3. 👤 Real-Time Session & Working User Menus
- **Persistent User State (`src/lib/userStore.ts`)**: The actual name and profile entered during signup or login persists in `localStorage` and dynamically updates the header, avatar initial, and welcome greeting.
- **Interactive "My Profile" Modal**: Instant editing of full legal name, email address, and phone number with immediate sync across the interface.
- **Interactive "My Bookings" Modal**: Complete lifecycle tracking of all dispatches (ETA countdown, arriving status, negotiated price, and cancellation action).
- **Interactive "Address Switcher" Modal**: Switch between preset localities (Indiranagar, Koramangala, Whitefield, HSR Layout, Mumbai) or add custom street addresses.

### 4. 🚀 60fps GPU-Accelerated Animations
- Zero animation lag or stutter. Enhanced with hardware-accelerated transforms (`transform-gpu`, `will-change: transform, opacity`) and optimized modal spring physics.

---
---

## 🌍 United Nations Sustainable Development Goals (UNSDGs)

Fixo aligns with the following United Nations Sustainable Development Goals through its focus on local employment opportunities, digital innovation, and inclusive access to services.

<p align="center">
  <a href="https://sdgs.un.org/goals/goal8">
    <img src="https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-08.jpg" alt="SDG 8: Decent Work and Economic Growth" width="180"/>
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://sdgs.un.org/goals/goal9">
    <img src="https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-09.jpg" alt="SDG 9: Industry, Innovation and Infrastructure" width="180"/>
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://sdgs.un.org/goals/goal10">
    <img src="https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-10.jpg" alt="SDG 10: Reduced Inequalities" width="180"/>
  </a>
</p>

### 🎯 Our Contribution

- **SDG 8 — Decent Work and Economic Growth:** Supports local service professionals by connecting them with potential customers and providing digital tools for managing bookings and earnings.
- **SDG 9 — Industry, Innovation and Infrastructure:** Uses a modern digital platform to improve local service discovery, booking, and service-partner management.
- **SDG 10 — Reduced Inequalities:** Aims to expand digital opportunities for independent workers and small local service providers.

**Primary Goal:** SDG 8 — Decent Work and Economic Growth.

*These goals represent Fixo's intended contributions; actual impact depends on platform adoption and implementation.*

---

## 📁 Project Architecture

```
fixo/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   └── page.tsx           # Dual-persona onboarding & Govt ID anti-fraud verification
│   │   ├── dashboard/
│   │   │   └── page.tsx           # Customer discovery, profile, bookings & address switcher
│   │   ├── partner-dashboard/
│   │   │   └── page.tsx           # Service partner portal with incoming job negotiations & earnings
│   │   ├── globals.css            # GPU-accelerated deep glassmorphism utility classes
│   │   ├── layout.tsx             # Root layout with font injection & SEO metadata
│   │   └── page.tsx               # High-converting Apple-style landing page
│   ├── components/
│   │   ├── CTA.tsx                # High-impact conversion callout
│   │   ├── Features.tsx           # Core USP & feature highlights
│   │   ├── Footer.tsx             # Glassmorphic footer with quick links
│   │   ├── Hero.tsx               # Hero banner with floating badges & metrics
│   │   ├── HowItWorks.tsx         # 3-step visual workflow timeline
│   │   ├── Navbar.tsx             # Floating frosted navbar with scroll dynamics
│   │   └── Testimonials.tsx       # Verified customer & worker testimonials
│   └── lib/
│       └── userStore.ts           # Reactive user state, address switcher & booking persistence
├── package.json                   # Scripts and dependencies
├── postcss.config.mjs             # PostCSS configuration
├── tailwind.config.ts             # Custom glass tokens, shadows, animations & gradients
├── tsconfig.json                  # Strict TypeScript configuration
└── next.config.mjs                # Production Next.js configuration
```

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Open the project folder
cd fixo

# 2. Install dependencies (if not already installed)
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser:
- Test Customer Login: Select **Customer**, enter your name, and visit `/dashboard`.
- Test Partner Onboarding: Select **Service Partner**, upload Government ID, and visit `/partner-dashboard`.

---

## 🚢 Zero-Config Vercel Deployment

```bash
npm i -g vercel
vercel
```
Or connect your GitHub repository directly to Vercel. Next.js App Router will be auto-detected.
