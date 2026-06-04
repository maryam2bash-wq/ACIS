#!/bin/bash
# push_v9.sh — رفع DEV_PLAN_V9 إلى GitHub (OculusEgypt/ACIS)
set -e

BRANCH="feat/dev-plan-v9"
REPO_URL="https://OculusEgypt:${GITHUB_TOKEN}@github.com/OculusEgypt/ACIS.git"

echo "🚀 رفع V9 إلى GitHub..."
echo "الفرع: $BRANCH"

git config user.email "acis-agent@replit.com" 2>/dev/null || true
git config user.name "ACIS Agent" 2>/dev/null || true

git checkout -B "$BRANCH"
git add -A
git commit -m "feat(v9): Orchestra View + Gantt + Voice + Cost Intelligence + Eisenhower

ACIS (T001 — Orchestra View):
- FEAT: وضع أوركسترا جديد — 19 وكيل كبطاقات متحركة مصنّفة حسب النظام
- FEAT: حلقة نابضة animate-ping للوكلاء المشغولين
- FEAT: تفاصيل الوكيل عند النقر (لوحة تفصيلية)
- FEAT: تبويب جديد 'أوركسترا الوكلاء' بين Studio وQuick Execute

Production (T002 — Gantt Timeline):
- FEAT: شريط Gantt فوق قائمة المشاريع
- FEAT: 7 مراحل كأشرطة ملونة (أخضر=مكتمل، نابض=جارٍ، رمادي=معلق، أحمر=فشل)
- FEAT: يظهر فقط عند وجود مشاريع (حتى 5 مشاريع)

Billie (T003 — Voice Input):
- FEAT: مكوّن VoiceChatInput مستقل مع Web Speech API حقيقي
- FEAT: ar-SA كلغة التعرف الصوتي
- FEAT: عرض نص interim وقت حقيقي أثناء الكلام
- FEAT: زر مايكروفون أحمر نابض أثناء الاستماع
- FEAT: Fallback أنيق إذا المتصفح لا يدعم Speech API

Dashboard (T004 — AI Cost Intelligence):
- FEAT: بطاقة 'ذكاء التكلفة' — تظهر فقط عند وجود بيانات
- FEAT: حساب تقديري: Gemini ($0.075/M token) + Qwen ($0.0005/K token)
- FEAT: مقارنة بين النموذجين — أيهما أكثر كفاءة
- FEAT: تحذير amber عند تجاوز $0.50

NEXUS (T005 — Eisenhower Matrix):
- FEAT: تبويب 'مصفوفة الأولويات' جديد
- FEAT: 4 ربعات: افعل الآن / جدوِل / فوِّض / اقتل
- FEAT: تصنيف تلقائي حسب priority (urgent/high/medium/low)
- FEAT: نقر على المهمة يفتح نتيجتها

Docs:
- FEAT: EVALUATION_REPORT_V9.md (95/100 + 6 اقتراحات ثورية)
- FEAT: DEV_PLAN_V9.md (خطة التطوير المنفّذة)" || echo "لا توجد تغييرات جديدة"

echo "📤 رفع إلى $BRANCH..."
git push "$REPO_URL" HEAD:"$BRANCH" --force

echo ""
echo "✅ تم الرفع بنجاح!"
echo "   الرابط: https://github.com/OculusEgypt/ACIS/tree/$BRANCH"
