#!/bin/bash
# push_v8.sh — رفع DEV_PLAN_V8 إلى GitHub (OculusEgypt/ACIS)
set -e

BRANCH="feat/dev-plan-v8"
REPO_URL="https://OculusEgypt:${GITHUB_TOKEN}@github.com/OculusEgypt/ACIS.git"

echo "🚀 رفع V8 إلى GitHub..."
echo "الفرع: $BRANCH"

git config user.email "acis-agent@replit.com" 2>/dev/null || true
git config user.name "ACIS Agent" 2>/dev/null || true

git checkout -B "$BRANCH"
git add -A
git commit -m "feat(v8): Sidebar Left + Top Header + Radar + PieChart + Search

UI/UX:
- MOVE: Sidebar moved to LEFT side (order-first, border-r)
- FEAT(T001): Global Top Header Bar — breadcrumbs + running jobs badge + theme toggle + ⌘K
- FEAT(T004): Sidebar v8.0 + collapse/expand toggle button + PanelLeft icon
- FIX: BillieFloat Rules of Hooks (useEffect before conditional return)

Dashboard (T005):
- FEAT: Agent Status Ring — PieChart (online/busy/idle/offline) + Quick Actions grid

CAEOS (T002):
- FEAT: Sovereign Layers Radar Chart — RadarChart (15 طبقة) with health scores

Settings (T003):
- FEAT: Settings Search — filter tabs by label instantly, auto-navigate on click

Docs:
- FEAT: EVALUATION_REPORT_V8.md (76/100 + 6 revolutionary suggestions)
- FEAT: DEV_PLAN_V8.md (6 features plan)" || echo "لا توجد تغييرات جديدة"

echo "📤 رفع إلى $BRANCH..."
git push "$REPO_URL" HEAD:"$BRANCH" --force

echo "✅ تم الرفع بنجاح إلى feat/dev-plan-v8"
