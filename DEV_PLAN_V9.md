# خطة التطوير V9 — ACIS
**الفرع:** feat/dev-plan-v9 | **التاريخ:** 4 يونيو 2026

---

## الهدف
تحويل ACIS من نظام إدارة إلى مسرح ذكاء اصطناعي حي — 5 ميزات ثورية.

---

## T001 — Orchestra View في صفحة ACIS (acis.tsx)
**الفكرة:** إضافة وضع "Orchestra View" يعرض الوكلاء كشبكة متحركة بدلاً من القائمة
**التنفيذ:**
- زر تبديل بين عرض القائمة الحالي وعرض الأوركسترا
- كل وكيل: بطاقة دائرية مع حلقة متحركة عند الانشغال
- ألوان حسب النظام (ACIS/NEXUS/CAEOS/BILLIE)
- عداد التنفيذات اليوم داخل كل بطاقة
- نقر على الوكيل → فتح لوحة execution سريعة

**الملفات:** `artifacts/acis-desktop/src/pages/acis.tsx`

---

## T002 — Production Gantt Timeline (production.tsx)
**الفكرة:** إضافة قسم Gantt مرئي فوق قائمة المشاريع
**التنفيذ:**
- شريط زمني أفقي لكل مشروع نشط
- 7 مراحل كأشرطة ملونة (script=purple، storyboard=blue، ...)
- حالة كل مرحلة: pending=رمادي، running=نابض، completed=أخضر، failed=أحمر
- وقت البدء والانتهاء المقدّر فوق كل شريط
- قابل للطي/التوسيع

**الملفات:** `artifacts/acis-desktop/src/pages/production.tsx`

---

## T003 — Billie Voice Input حقيقي (billie.tsx)
**الفكرة:** تكامل Web Speech API مع زر المايكروفون الموجود
**التنفيذ:**
- استخدام `window.SpeechRecognition || window.webkitSpeechRecognition`
- اللغة: `ar-SA` عربي أساسي
- حالات المايكروفون: idle / listening / transcribing
- عرض النص المُستمَع وقت حقيقي في input
- Fallback أنيق لو المتصفح لا يدعم

**الملفات:** `artifacts/acis-desktop/src/pages/billie.tsx`

---

## T004 — AI Cost Intelligence في Dashboard (dashboard.tsx)
**الفكرة:** بطاقة تكلفة ذكية تحسب الإنفاق الفعلي
**التنفيذ:**
- سعر Gemini: $0.075 لكل مليون token (flash-lite)
- سعر Qwen: $0.0005 لكل 1000 token (تقديري)
- حساب: total_tokens → estimated_cost_usd
- عرض: اليوم / هذا الأسبوع / الإجمالي
- مقارنة بين النموذجين: أي أرخص
- إشعار تحذير لو تجاوز $1/يوم

**الملفات:** `artifacts/acis-desktop/src/pages/dashboard.tsx`

---

## T005 — NEXUS Eisenhower Matrix (nexus.tsx)
**الفكرة:** إضافة وضع مصفوفة Eisenhower بجانب Kanban
**التنفيذ:**
- زر تبديل: Kanban | مصفوفة
- 4 ربعات: (عاجل+مهم) / (غير عاجل+مهم) / (عاجل+غير مهم) / (غير عاجل+غير مهم)
- تصنيف تلقائي: urgent+high → ربع 1، high+low urgency → ربع 2
- بطاقات صغيرة قابلة للنقر
- ألوان مختلفة لكل ربع

**الملفات:** `artifacts/acis-desktop/src/pages/nexus.tsx`

---

## الجدول الزمني
| الكود | الميزة | الأولوية | الحالة |
|-------|---------|----------|--------|
| T001 | Orchestra View | 🔴 عالية | ⏳ قيد التنفيذ |
| T002 | Production Gantt | 🔴 عالية | ⏳ قيد التنفيذ |
| T003 | Voice Input | 🟡 متوسطة | ⏳ قيد التنفيذ |
| T004 | Cost Intelligence | 🟡 متوسطة | ⏳ قيد التنفيذ |
| T005 | Eisenhower Matrix | 🟢 منخفضة | ⏳ قيد التنفيذ |

---

## الرفع على GitHub
الفرع: `feat/dev-plan-v9` على `OculusEgypt/ACIS`
