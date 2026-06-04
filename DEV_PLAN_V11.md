# خطة التطوير V11 — ACIS
*تاريخ الإصدار: 4 يونيو 2026*

---

## الأهداف الاستراتيجية لـ V11

1. **تجربة الإنتاج الكاملة** — إغلاق الفجوات في خط الإنتاج
2. **تصدير احترافي** — PDF + Final Draft + ZIP
3. **واجهة WS حية** — ربط أحداث WebSocket بواجهة مرئية
4. **استقرار AI** — احتياطيات أقوى عند فشل Qwen
5. **Electron Windows** — توزيع موثوق ومُختبَر

---

## المرحلة الأولى — إصلاحات فورية (V11.0) — أسبوع ١

### ١. WS Progress Bar في Production Page
**الملف**: `artifacts/acis-desktop/src/pages/production.tsx`

ربط أحداث `job_started`، `job_completed`، `job_failed` من WebSocket بـ progress indicator مرئي فوق قائمة المراحل:
- مؤشر دائري (spinner) أثناء التوليد
- شريط تقدم نسبي بين المراحل
- إشعار toast عند الاكتمال أو الفشل

```typescript
// Hook مقترح: useProductionWS(projectId)
// يستمع لـ job_started → يُحدّث حالة المرحلة النشطة
// يستمع لـ job_completed → يُعيد تحميل بيانات المشروع + يُطلق toast success
// يستمع لـ job_failed → يُطلق toast error + يُوقف المؤشر
```

### ٢. تصدير ZIP شامل
**الملف**: `artifacts/api-server/src/routes/production.ts`

نقطة نهاية جديدة: `GET /api/production/projects/:id/export-zip`
- يجمع كل نتائج AI + ملفات وسائط
- يُرجع ملف ZIP للتنزيل المباشر

```typescript
router.get("/projects/:id/export-zip", async (req, res) => {
  // استخدام archiver npm package
  // يشمل: كل نتائج المراحل كـ .txt + ملفات الصوت/الصور
  // يُسمّى: ACIS-{projectTitle}-{date}.zip
});
```

### ٣. استخراج Metadata تلقائي
**الملف**: `artifacts/api-server/src/routes/production.ts`

بعد توليد السيناريو، استخراج تلقائي:
- قائمة الشخصيات (الاسم + الوصف)
- المواقع والأماكن
- تقدير الميزانية (بسيط)

---

## المرحلة الثانية — ميزات جوهرية (V11.1) — أسبوعان ٢-٣

### ٤. تصدير Final Draft (.fdx)
**ملف جديد**: `artifacts/api-server/src/lib/fdx-exporter.ts`

تحويل نص السيناريو إلى صيغة Final Draft XML:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<FinalDraft Type="Script" Version="3">
  <Content>
    <Paragraph Type="Action">...</Paragraph>
    <Paragraph Type="Character">...</Paragraph>
    <Paragraph Type="Dialogue">...</Paragraph>
  </Content>
</FinalDraft>
```

### ٥. قالب ACIS للمشاريع السريعة
**الملف**: `artifacts/acis-desktop/src/pages/production.tsx`

10 قوالب جاهزة مع قصص مكتوبة مسبقاً:
- فيلم رعب قصير
- إعلان تجاري
- وثائقي بيئي
- موسيقى كليب
- فيلم رومانسي
- دراما عائلية
- خيال علمي
- قصة أطفال
- ثريلر سياسي
- كوميديا

### ٦. AI Story Analyzer
**الملف**: `artifacts/api-server/src/routes/production.ts`

نقطة نهاية: `POST /api/production/analyze-story`

تُحلل القصة وتُعيد:
- النوع الأدبي المقترح
- الجمهور المستهدف
- نقاط القوة والضعف السردية
- اقتراحات لإثراء الحبكة
- تقدير تكلفة الإنتاج

---

## المرحلة الثالثة — تحسينات UX (V11.2) — أسبوع ٤

### ٧. تحسينات Dashboard
- بطاقات KPI مع بيانات حقيقية من DB
- رسم بياني لعدد المشاريع المنجزة شهرياً
- عداد الـ tokens المستخدمة (حقيقي)
- إشعارات فورية لاكتمال المراحل

### ٨. محرر النصوص المدمج
**صفحة جديدة**: `artifacts/acis-desktop/src/pages/script-editor.tsx`

محرر نصوص بسيط داخل ACIS:
- تلوين الحوار/الوصف/التوجيهات
- تصدير مباشر إلى PDF أو Final Draft
- حفظ تلقائي في DB
- مقارنة نسختين من السيناريو

### ٩. محسّن الـ Billie Chat
- نافذة تلخيص المحادثة بالذكاء الاصطناعي
- تصدير تاريخ المحادثة كـ PDF
- مقترحات أسئلة ذكية (chips)

---

## المرحلة الرابعة — التوسع (V11.3) — أسابيع ٥-٦

### ١٠. نظام الإشعارات الداخلية
**ملف جديد**: `artifacts/api-server/src/routes/notifications.ts`

- جدول `notifications` في DB
- أيقونة جرس في header مع عداد غير المقروء
- تصنيف الإشعارات: تحذير / نجاح / معلومة

### ١١. لوحة التحليلات المتقدمة
**صفحة جديدة**: `artifacts/acis-desktop/src/pages/analytics.tsx`

- استخدام النماذج عبر الزمن
- وقت التوليد لكل مرحلة
- نجاح/فشل المهام
- مقارنة مشروع بآخر

### ١٢. دعم متعدد المستخدمين (MVP)
- حقل `user_id` في جداول DB
- صفحة تسجيل دخول بسيطة (PIN)
- عزل المشاريع بين المستخدمين

---

## جدول التنفيذ

| الأسبوع | المهام | الأولوية |
|---------|--------|---------|
| 1 | WS Progress Bar + تصدير ZIP | 🔴 عالية |
| 1 | استخراج Metadata | 🔴 عالية |
| 2 | Final Draft export | 🟡 متوسطة |
| 2 | قوالب جديدة (10) | 🟡 متوسطة |
| 3 | Story Analyzer | 🟡 متوسطة |
| 3 | تحسينات Dashboard | 🟢 منخفضة |
| 4 | محرر النصوص | 🟢 منخفضة |
| 4 | نظام الإشعارات | 🟢 منخفضة |
| 5 | التحليلات المتقدمة | 🟢 منخفضة |
| 6 | دعم متعدد المستخدمين | 🔵 مستقبلي |

---

## متطلبات تقنية

### حزم جديدة مطلوبة:
```bash
# Backend
pnpm add archiver          # ZIP creation
pnpm add @types/archiver   # TypeScript types

# Frontend
pnpm add jspdf             # PDF export
pnpm add jspdf-autotable   # جداول في PDF
```

### Schema تغييرات DB:
```sql
-- notifications table
CREATE TABLE notifications (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,  -- 'success' | 'warning' | 'info' | 'error'
  title TEXT NOT NULL,
  message TEXT,
  is_read INTEGER DEFAULT 0,
  project_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- script_versions table
CREATE TABLE script_versions (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  version INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## أهداف الجودة V11

| المؤشر | V10 | هدف V11 |
|--------|-----|---------|
| نتيجة التقييم | 71/100 | 87/100 |
| وقت توليد السيناريو | ~45ث | <30ث (Qwen) |
| حجم تصدير ZIP | غير موجود | <50 MB |
| نسبة نجاح مراحل AI | ~70% | >90% |
| Electron build Windows | ❌ فاشل | ✅ يعمل |

---

## ملاحظات من جلسة V10-V11

### ما تم إنجازه في هذه الجلسة:
- ✅ Gemini API key محفوظ ويعمل
- ✅ enhance-story مُصلح (ترتيب arguments خاطئ)
- ✅ Electron NSIS Arabic language codes مُزالة
- ✅ Electron repository field مُضاف
- ✅ WS notifications تعمل بالفعل (12 نوع حدث)

### ما يحتاج انتباهاً في V11:
- ⚠️ Qwen 403 — يحتاج مفتاح MaaS جديد من Alibaba Console
- ⚠️ Electron Windows build — يُراقَب في GitHub Actions
- ⚠️ production.tsx: WS أحداث موجودة في الـ backend لكن الـ frontend لا يعرضها بشكل مرئي
