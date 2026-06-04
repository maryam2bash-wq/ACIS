---
name: ACIS V7 Plan and Features
description: DEV_PLAN_V7 session — white screen fix, AI Director, Export Center, and other improvements
---

# ACIS V7 — دروس الجلسة

## الشاشة البيضاء (Critical Bug Pattern)
**السبب:** `toast` من `sonner` غير مُستورد في billie.tsx — Vite يُجمِّع لكن runtime error يُفشل التحميل.
**الدرس:** أي استخدام لـ `toast.loading/success/error` يتطلب `import { toast } from "sonner"` صريحاً في نفس الملف.
**How to apply:** قبل إضافة toast لأي ملف تحقق من وجود الاستيراد بـ `grep "import.*toast" <file>`.

## AI Director — النمط الصحيح
- Backend: `POST /projects/:id/auto-run` يُشغّل المراحل في `setImmediate` ويُعيد الاستجابة فوراً
- يستخدم WebSocket `broadcast("director_phase_done", {...})` لكل مرحلة
- Frontend: يُشغّل fetch ثم يُراقب مهام المشروع كل 5 ثوانٍ حتى تكتمل
- Progress bar مبني على `directorPhaseIdx` state

## Export Endpoints
- `GET /projects/:id/export/markdown` → response Content-Disposition attachment
- `GET /projects/:id/export/json` → JSON منظم
- Frontend: `document.createElement("a")` مع href مباشر للـ endpoint

## إنشاء مهام GitHub (project_tasks)
- `filePath` مطلوب ويجب أن يكون تحت `.local/tasks/`
- أنشئ الملف أولاً بـ `write`, ثم اعطِ المسار لـ `bulkCreateProjectTasks`

## git push pattern (V4 pattern يظل مطلوباً)
```bash
git push "https://OculusEgypt:${GITHUB_TOKEN}@github.com/OculusEgypt/ACIS.git" HEAD:feat/branch-name --force
```
- `git remote set-url` محظور في Sandbox
- استخدم `project_tasks` دائماً للـ git add/commit/push
