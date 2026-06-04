import { Link, useLocation } from "wouter";
import {
  Activity, BrainCircuit, MonitorPlay, MessageSquare,
  Film, Building2, Shield, Cpu, ChevronLeft, Settings2, Archive,
  Crosshair, Sun, Moon, PanelLeft, ChevronRight, Package,
} from "lucide-react";
import { useGetSystemMetrics } from "@workspace/api-client-react";
import { useUI } from "../contexts/ui-settings";
import { NotificationsPanel } from "./notifications-panel";
import { useRunningJobsCount } from "../hooks/use-ws-notifications";

const NAV_SECTIONS = [
  {
    label: "القيادة",
    labelEn: "COMMAND",
    items: [
      { href: "/", label: "العمليات", labelEn: "Operations", icon: Activity, sub: "لوحة التحكم" },
      { href: "/billie", label: "بيليه", labelEn: "Billie", icon: BrainCircuit, sub: "المشرف الأعلى" },
      { href: "/mission-control", label: "مركز التحكم", labelEn: "Mission Control", icon: Crosshair, sub: "جميع المهام الجارية", badge: true },
    ],
  },
  {
    label: "الأنظمة الذكية",
    labelEn: "AI SYSTEMS",
    items: [
      { href: "/acis", label: "ACIS السينمائي", labelEn: "ACIS Cinematic", icon: MonitorPlay, sub: "الإنتاج الفني" },
      { href: "/production", label: "من القصة للرؤية", labelEn: "Storyboard → Vision", icon: Film, sub: "خط الإنتاج", badge: true },
      { href: "/nexus", label: "نيكسوس المكتبي", labelEn: "NEXUS Office OS", icon: Building2, sub: "الذكاء المؤسسي" },
      { href: "/caeos", label: "كايوس / سيرفكس", labelEn: "CAEOS / SERVX", icon: Shield, sub: "الذكاء الدستوري" },
    ],
  },
  {
    label: "التواصل",
    labelEn: "COMMS",
    items: [
      { href: "/conversations", label: "تواصل الوكلاء", labelEn: "Agent Comms", icon: MessageSquare, sub: "محادثة مباشرة" },
      { href: "/archive", label: "أرشيف النتائج", labelEn: "Results Archive", icon: Archive, sub: "مخرجات الذكاء الاصطناعي" },
      { href: "/export-hub", label: "مركز التصدير", labelEn: "Export Hub", icon: Package, sub: "تحميل ملفات المشاريع" },
    ],
  },
  {
    label: "الإدارة",
    labelEn: "ADMIN",
    items: [
      { href: "/settings", label: "الإعدادات", labelEn: "Settings", icon: Settings2, sub: "تحكم شامل بالنظام" },
    ],
  },
];

const PAGE_NAMES: Record<string, string> = {
  "/": "لوحة القيادة",
  "/billie": "بيليه — المشرف الأعلى",
  "/mission-control": "مركز التحكم الموحد",
  "/acis": "ACIS السينمائي",
  "/production": "من القصة للرؤية",
  "/nexus": "نيكسوس المكتبي",
  "/caeos": "كايوس / سيرفكس",
  "/conversations": "تواصل الوكلاء",
  "/archive": "أرشيف النتائج",
  "/export-hub": "مركز التصدير",
  "/settings": "الإعدادات",
};

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { data: metrics } = useGetSystemMetrics();
  const { theme, sidebarCompact, setTheme, setSidebarCompact } = useUI();
  const runningCount = useRunningJobsCount();

  const healthScore = metrics?.system_health ?? 94;
  const healthColor = healthScore >= 90 ? "text-emerald-400" : healthScore >= 70 ? "text-amber-400" : "text-red-400";
  const currentPageName = PAGE_NAMES[location] ?? "ACIS";

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden selection:bg-primary/30" dir="rtl">
      {/* ── Sidebar — يسار ── */}
      <div className={`${sidebarCompact ? "w-14" : "w-60"} border-r border-border/50 bg-card flex flex-col z-10 shrink-0 order-first transition-all duration-200`}>

        {/* Logo + Collapse Toggle */}
        <div className="p-3 border-b border-border/50 flex items-center gap-2 overflow-hidden">
          <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-lg shadow-primary/10 shrink-0">
            <Cpu size={18} />
          </div>
          {!sidebarCompact && (
            <div className="min-w-0 flex-1">
              <div className="font-bold text-sm tracking-wider text-foreground leading-none">ACIS</div>
              <div className="text-[9px] text-primary font-mono tracking-[0.2em] mt-0.5">مركز القيادة v8.0</div>
            </div>
          )}
          <button
            onClick={() => setSidebarCompact(!sidebarCompact)}
            className="p-1 rounded hover:bg-secondary text-muted-foreground/50 hover:text-muted-foreground transition-colors shrink-0"
            title="طي/توسيع الشريط">
            <PanelLeft size={12} className={`transition-transform duration-200 ${sidebarCompact ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
          {NAV_SECTIONS.map(section => (
            <div key={section.label}>
              {!sidebarCompact && (
                <div className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-[0.15em] mb-1.5 px-2 text-right">
                  {section.label}
                </div>
              )}
              <div className="space-y-0.5">
                {section.items.map(item => {
                  const active = location === item.href;
                  return (
                    <Link key={item.href} href={item.href}>
                      <div
                        title={sidebarCompact ? item.label : undefined}
                        className={`flex items-center gap-2.5 px-2 py-2 rounded cursor-pointer transition-all group border ${
                          sidebarCompact ? "justify-center" : ""
                        } ${
                          active
                            ? "bg-primary/10 text-primary border-primary/25 shadow-sm shadow-primary/10"
                            : "text-muted-foreground border-transparent hover:bg-secondary hover:text-foreground hover:border-border/50"
                        }`}
                      >
                        <div className="relative shrink-0">
                          <item.icon size={15} className={active ? "text-primary" : "group-hover:text-foreground"} />
                          {(item as any).badge && runningCount > 0 && (
                            <span className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 rounded-full bg-primary text-[8px] font-bold text-primary-foreground flex items-center justify-center animate-pulse">
                              {runningCount > 9 ? "9+" : runningCount}
                            </span>
                          )}
                        </div>
                        {!sidebarCompact && (
                          <>
                            {active && <ChevronLeft size={10} className="text-primary/50 shrink-0 -mr-1" />}
                            <div className="flex-1 min-w-0 text-right">
                              <div className="flex items-center gap-1.5 justify-end">
                                <div className="text-xs font-semibold truncate">{item.label}</div>
                                {(item as any).badge && runningCount > 0 && (
                                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary/20 text-primary text-[9px] font-bold border border-primary/30">
                                    {runningCount}
                                  </span>
                                )}
                              </div>
                              <div className={`text-[10px] font-mono truncate ${active ? "text-primary/60" : "text-muted-foreground/50"}`}>
                                {item.sub}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Status Footer */}
        <div className={`p-3 border-t border-border/50 space-y-2 ${sidebarCompact ? "flex flex-col items-center gap-2" : ""}`}>
          <NotificationsPanel compact={sidebarCompact} />

          {sidebarCompact ? (
            <div className={`w-2 h-2 rounded-full ${healthScore >= 90 ? "bg-emerald-400" : healthScore >= 70 ? "bg-amber-400" : "bg-red-400"} animate-pulse`} title={`الصحة: ${healthScore}%`} />
          ) : (
            <>
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className={healthColor}>{healthScore}%</span>
                <span className="text-muted-foreground">الصحة</span>
              </div>
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${healthScore >= 90 ? "bg-emerald-400" : healthScore >= 70 ? "bg-amber-400" : "bg-red-400"}`}
                  style={{ width: `${healthScore}%` }}
                />
              </div>
              <button
                onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }))}
                className="w-full flex items-center justify-between text-[10px] font-mono text-muted-foreground/50 hover:text-muted-foreground border border-border/30 hover:border-border/60 rounded px-2 py-1 transition-colors group"
                title="⌘K — بحث عالمي">
                <span className="group-hover:text-foreground/60 transition-colors">بحث عالمي</span>
                <kbd className="bg-secondary border border-border/40 px-1 py-0.5 rounded text-[9px]">⌘K</kbd>
              </button>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground justify-end">
                <span className="opacity-40">v8.0</span>
                <span className="ml-auto">النظام سليم</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">

        {/* Global Top Header Bar */}
        <div className="h-11 shrink-0 border-b border-border/40 bg-card/60 backdrop-blur-sm flex items-center justify-between px-5 z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground" dir="rtl">
            <span className="text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-default">ACIS</span>
            <ChevronRight size={10} className="text-muted-foreground/30" />
            <span className="text-foreground/80 font-semibold">{currentPageName}</span>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-1.5">
            {/* Running Jobs Badge */}
            {runningCount > 0 && (
              <Link href="/mission-control">
                <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20 transition-colors animate-pulse">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {runningCount} {runningCount === 1 ? "مهمة جارية" : "مهام جارية"}
                </button>
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 rounded border border-border/40 hover:border-border/70 text-muted-foreground hover:text-foreground transition-colors"
              title={theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن"}>
              {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
            </button>

            {/* Global Search */}
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }))}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-border/40 hover:border-border/70 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors">
              <span>بحث</span>
              <kbd className="bg-secondary border border-border/40 px-1 rounded text-[9px] leading-tight">⌘K</kbd>
            </button>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,220,255,0.04),transparent)]" />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8 z-0 relative" dir="rtl">
          {children}
        </main>
      </div>
    </div>
  );
}
