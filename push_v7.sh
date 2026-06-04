#!/bin/bash
# push_v7.sh — رفع DEV_PLAN_V7 إلى GitHub (OculusEgypt/ACIS)
set -e

BRANCH="feat/dev-plan-v7"
REPO_URL="https://OculusEgypt:${GITHUB_TOKEN}@github.com/OculusEgypt/ACIS.git"

echo "🚀 رفع V7 إلى GitHub..."
echo "الفرع: $BRANCH"

git config user.email "acis-agent@replit.com" 2>/dev/null || true
git config user.name "ACIS Agent" 2>/dev/null || true

git checkout -B "$BRANCH"
git add -A
git commit -m "feat(v7): AI Director + Export + Search + Dashboard + Billie Fix

- FIX: إضافة import { toast } from 'sonner' في billie.tsx (كانت تسبب الشاشة البيضاء)
- FEAT: AI Director — زر واحد يشغّل جميع مراحل الإنتاج (backend auto-run + frontend)
- FEAT: Export Center — تصدير المشروع كـ Markdown أو JSON
- FEAT: بحث في المحادثات — فلتر فوري في sidebar
- FEAT: StatCard محسّن — trend indicators (↑↓)
- FEAT: تقرير التقييم EVALUATION_REPORT_V7.md
- FEAT: خطة التطوير DEV_PLAN_V7.md
- PERF: refetchOnMount:false + WS singleton (من V6)

Closes: DEV_PLAN_V7 / T001-T006" || echo "لا توجد تغييرات جديدة"

echo "📤 رفع إلى $BRANCH..."
git push "$REPO_URL" HEAD:"$BRANCH" --force

echo "✅ تم الرفع بنجاح إلى feat/dev-plan-v7"
