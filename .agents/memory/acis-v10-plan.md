---
name: ACIS V10 Plan + Features
description: V10 evaluation, bug fixes, and new features implemented on 2026-06-04
---

## Critical Bugs Fixed in V10
- `export-hub.tsx` was orphaned (built but not registered) — added to App.tsx routes + layout.tsx nav
- `electron/build.sh` defaulted to `--linux`; changed to `--win` (user wants Windows only)
- `electron/package.json` Linux build section removed; Windows (nsis + portable x64) only
- `electron/dist-app/linux-unpacked/` deleted (user confirmed unwanted)
- CAEOS routes (`/score`, `/layers`) actually work — the "under development" warning was incorrect

## New Features Added in V10
- **Dashboard: Recent Projects Widget** — shows last 3 projects with phase progress bar + status badge
- **Mission Control: LiveElapsed** — live per-second elapsed timer for running jobs (uses `created_at`)
- **Settings: Provider Health Monitor** — per-provider test buttons (Gemini / Qwen) inside api-keys tab using existing `testAi()` function
- **Layout nav**: Export Hub (`/export-hub`) added with Package icon

## Files Changed
- `artifacts/acis-desktop/src/App.tsx` — ExportHubPage lazy import + route
- `artifacts/acis-desktop/src/components/layout.tsx` — Package icon import, nav item, PAGE_NAMES
- `artifacts/acis-desktop/src/pages/dashboard.tsx` — Recent Projects widget before "Agents + Activity"
- `artifacts/acis-desktop/src/pages/mission-control.tsx` — LiveElapsed component + usage in JobRow
- `artifacts/acis-desktop/src/pages/settings.tsx` — Provider Health Monitor in api-keys tab
- `artifacts/electron/build.sh` — default target changed to --win
- `artifacts/electron/package.json` — Linux section removed
- `docs/ACIS_V10_EVALUATION_AND_PLAN.md` — full evaluation report + V10 roadmap

## V10 Roadmap (remaining)
- A1: Production AI Wizard (guided project creation)
- A2: Smart Phase Auto-Runner (already built in V7 as AI Director)
- C3: Archive Bulk Export (select multiple + export)
- D1: PWA support
