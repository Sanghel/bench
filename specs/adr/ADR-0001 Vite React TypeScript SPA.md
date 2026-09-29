---
adr: ADR-0001
title: Vite + React + TypeScript SPA
status: accepted
date: 2026-09-28
tags: [adr]
---

# ADR-0001 — Vite + React + TypeScript SPA

## Context

Every bench tool runs in the browser ("Runs locally", "Works offline"). There's no backend and no SEO-critical dynamic content. The footer credits React + TypeScript. Next.js was considered because the user cited the Next.js/Vercel docs as the visual reference.

## Decision

A client-only SPA: **Vite 8 + React 19 + TypeScript 6 (strict)**, `react-router-dom` 7, `zustand` 5 for global UI state, `lucide-react` for icons, CSS Modules plus CSS custom properties for styling. Package manager: **pnpm**. Tests: Vitest + Testing Library + happy-dom.

## Consequences

- Static build (`dist/`) can go on any static host — see DEC-003.
- No UI kit (the FMF fronts use antd). Components are hand-built to match the Ink × Cobalt design, see [[ADR-0002 Ink × Cobalt design system]].
- A Next.js visual style is a design choice, not a framework requirement.
