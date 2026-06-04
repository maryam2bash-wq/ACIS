# DEV_PLAN_V7 — خطة التطوير الثورية

> **التاريخ:** 2026-06-04 | **الإصدار المستهدف:** V7.0 | **الفرع:** feat/dev-plan-v7

---

## الأهداف الاستراتيجية

تحويل ACIS من "أداة مراقبة" إلى "منصة إنتاج ذكية كاملة" بـ 6 ميزات ثورية.

---

## T001 — AI Director (المخرج الذكي) ✅ مُنفَّذ

### Backend
- `POST /api/production/projects/:id/auto-run` — يُشغّل جميع المراحل تلقائياً
- مراحل متسلسلة: script → storyboard → audio → images → music → assembly
- WebSocket events: `director_started`, `director_phase_done`, `director_complete`, `director_failed`
- إعادة المحاولة التلقائية عند الفشل (max 2 retries)

### Frontend
- زر "AI Director" بارز في صفحة الإنتاج
- شاشة تقدم حية مع مؤشر المرحلة الحالية
- إشعار عند اكتمال المشروع كاملاً

---

## T002 — مركز التصدير ✅ مُنفَّذ

### Backend
- `GET /api/production/projects/:id/export/markdown` — تصدير كـ Markdown شامل
- `GET /api/production/projects/:id/export/json` — تصدير كـ JSON منظم

### Frontend
- زر تصدير في بطاقة المشروع
- خيار Markdown أو JSON
- نسخ مباشر للـ Clipboard

---

## T003 — لوحة التحكم المحسّنة ✅ مُنفَّذ

- بطاقات إحصائية منقّحة مع trend indicators (↑↓)
- رسم بياني للأداء الأسبوعي (من البيانات الحقيقية)
- "Quick Actions" panel — تشغيل agent مباشر من لوحة التحكم
- مؤشر "وقت التشغيل المستمر" لكل وكيل

---

## T004 — بحث داخل المحادثات ✅ مُنفَّذ

### Backend  
- `GET /api/conversations/:id/search?q=` — بحث في رسائل محادثة

### Frontend
- حقل بحث في شريط المحادثات
- تمييز النتائج في الرسائل

---

## T005 — CAEOS: تعزيز الوظائف ✅ مُنفَّذ

- إضافة تاريخ درجات الأخلاقيات (7 أيام)
- رسم بياني radar للطبقات الـ15
- زر "تحليل فوري" يُشغّل CAEOS على آخر نشاط للنظام
- نظام "إنذار أخلاقي" يُرسل تنبيهاً عند الدرجة < 70

---

## T006 — مقارن الوكلاء ✅ مُنفَّذ

- صفحة "مقارنة الوكلاء" داخل Dashboard
- رسوم بيانية: زمن الاستجابة، معدل النجاح، الرموز المُستخدَمة
- فلتر حسب النموذج والنظام والفترة الزمنية

---

## ملاحظات التنفيذ

- **الأولوية:** T001 → T002 → T003 → T005 → T004 → T006
- **المعتمد على الـ WS Singleton** — لا اتصالات إضافية
- **TaskType الصحيح:** `text_simple` لا `text_fast`
- **لا force push** — يُستخدم project_tasks للـ git

---

## الفرع
`feat/dev-plan-v7` على حساب OculusEgypt
