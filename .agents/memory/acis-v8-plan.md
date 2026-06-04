---
name: ACIS V8 Plan and Features
description: DEV_PLAN_V8 session — sidebar moved left, Global Top Header, BillieFloat hooks fix, RadarChart, PieChart, Settings Search
---

# ACIS V8 — دروس الجلسة

## Rules of Hooks في BillieFloat (Critical)
**المشكلة:** `if (location === "/billie") return null;` كان قبل `useEffect` → يكسر ترتيب الـ hooks.
**الحل:** نقل الـ early return إلى ما بعد جميع الـ hooks.
**Why:** Rules of Hooks تمنع أي hook بعد conditional return — هذا يسبب "Invalid hook call" runtime error.
**How to apply:** في أي مكون يحتاج early return → ضع كل الـ hooks أولاً، ثم الشرط.

## نقل Sidebar لليسار
- أزل `order-last` واستبدل بـ `order-first`
- غيّر `border-l` → `border-r`
- الـ `dir="rtl"` لا يغيّر ترتيب flex — فقط اتجاه النص.
**Why:** في RTL، flex لا يُعكس تلقائياً — يجب استخدام order لتحديد جانب الشريط.

## Global Top Header Pattern
- يُضاف داخل `<div className="flex-1 flex flex-col h-screen ...">` قبل `<main>`
- ارتفاع ثابت: `h-11 shrink-0 border-b border-border/40 bg-card/60`
- يحتوي: breadcrumbs (PAGE_NAMES mapping) + running jobs badge + theme toggle + ⌘K
- `setTheme` و`setSidebarCompact` من `useUI()` — يجب destructure كلاهما

## Recharts في CAEOS RadarChart
- استخدم `Tooltip as RTooltip` لتجنب تعارض الأسماء مع مكونات أخرى
- `PolarRadiusAxis domain={[60, 100]}` لتوسيع نطاق الرسم
- 15 نقطة بيانات تناسب RadarChart جيداً
- البيانات: إما من `layerStatuses.find(l => l.id === layer.id)?.health` أو قيمة افتراضية

## Settings Search Pattern
- `settingsSearch` state + input مع X للمسح
- `TABS.filter(t => !search || t.label.includes(search))` — بسيط وفعّال
- عند النقر: `setTab(t.id); setSettingsSearch("")` لتنظيف البحث

## Dashboard Agent PieChart
- استخدم IIFE `(() => {...})()` داخل JSX لتجنب إنشاء مكون منفصل
- `PieChart > Pie > Cell` مع `innerRadius` + `outerRadius` للـ donut chart
- ضع العداد المركزي بـ `absolute inset-0 flex flex-col items-center justify-center pointer-events-none`
