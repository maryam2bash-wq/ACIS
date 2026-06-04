import { useState, useMemo } from "react";
import { useListProjects } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Download, FileText, Music, Mic, Video, Image, Film,
  Package, Archive, Search, CheckCircle2, Clock, X,
  Clapperboard, AlignLeft, ChevronDown, ChevronUp,
  Layers, FolderOpen, ExternalLink, Sparkles,
} from "lucide-react";
import { toast } from "sonner";

const API_BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") + "/api";

const PHASE_META: Record<string, { icon: any; label: string; color: string; ext: string }> = {
  script:     { icon: FileText,    label: "السيناريو",       color: "text-sky-400",     ext: ".txt" },
  storyboard: { icon: Clapperboard,label: "اللوحة المصورة",  color: "text-purple-400",  ext: ".txt" },
  audio:      { icon: Mic,         label: "التعليق الصوتي", color: "text-emerald-400", ext: ".wav" },
  images:     { icon: Image,       label: "الصور",           color: "text-pink-400",    ext: ".png" },
  video:      { icon: Video,       label: "الفيديو",         color: "text-amber-400",   ext: ".mp4" },
  music:      { icon: Music,       label: "الموسيقى",        color: "text-rose-400",    ext: ".mp3" },
  assembly:   { icon: Layers,      label: "التجميع النهائي", color: "text-primary",     ext: ".txt" },
};

type Job = {
  id: string; phase: string; status: string;
  output_url?: string | null; result?: string | null;
  created_at: string; model?: string;
};

type Project = {
  id: string; title?: string; title_ar?: string;
  status?: string; phase?: number; created_at: string;
};

function JobCard({ job, projectTitle }: { job: Job; projectTitle: string }) {
  const meta = PHASE_META[job.phase] ?? { icon: FileText, label: job.phase, color: "text-muted-foreground", ext: ".txt" };
  const Icon = meta.icon;
  const [expanded, setExpanded] = useState(false);
  const hasMedia = !!job.output_url;
  const hasText  = !!job.result;
  const mediaUrl = job.output_url ? `${API_BASE}/media/${job.output_url}` : null;

  function copyResult() {
    if (job.result) {
      navigator.clipboard.writeText(job.result);
      toast.success("تم النسخ ✓");
    }
  }

  return (
    <div className="border border-border/40 bg-card rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          {hasMedia && mediaUrl && (
            <a href={mediaUrl} download={job.output_url}
              className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded border border-current/30 bg-current/5 ${meta.color} hover:bg-current/10 transition-colors font-mono`}>
              <Download size={11} />تحميل
            </a>
          )}
          {hasText && (
            <button onClick={copyResult}
              className="flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded border border-border/40 bg-secondary/40 text-muted-foreground hover:text-foreground hover:border-border/70 transition-colors font-mono">
              نسخ النص
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 text-right">
          <div>
            <div className="flex items-center gap-1.5 justify-end">
              <span className={`font-semibold text-sm ${meta.color}`}>{meta.label}</span>
              <Icon size={14} className={meta.color} />
            </div>
            <div className="text-[10px] font-mono text-muted-foreground/50">{projectTitle}</div>
          </div>
        </div>
      </div>

      {hasText && (
        <>
          <button onClick={() => setExpanded(e => !e)}
            className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-mono text-muted-foreground/50 hover:text-muted-foreground border-t border-border/20 transition-colors">
            <div className="flex items-center gap-1">
              {expanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
              {expanded ? "إخفاء" : "عرض النص"}
            </div>
            <span className="opacity-50">{new Date(job.created_at).toLocaleDateString("ar-SA")}</span>
          </button>
          {expanded && (
            <div className="px-4 pb-3 text-xs leading-relaxed text-muted-foreground font-mono whitespace-pre-wrap max-h-60 overflow-y-auto border-t border-border/20 bg-secondary/10 text-right" dir="rtl">
              {job.result}
            </div>
          )}
        </>
      )}

      {hasMedia && mediaUrl && (
        <div className="px-4 pb-3 border-t border-border/20 bg-secondary/5 pt-2">
          {(job.phase === "audio" || job.phase === "music") ? (
            <audio src={mediaUrl} controls className="w-full h-9 rounded" style={{ colorScheme: "dark" }} preload="metadata" />
          ) : job.phase === "video" ? (
            <video src={mediaUrl} controls className="w-full rounded max-h-40" preload="metadata" />
          ) : (
            <a href={mediaUrl} target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-1.5 text-xs ${meta.color} hover:opacity-70 transition-opacity`}>
              <ExternalLink size={12} />فتح الملف
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function ExportHubPage() {
  const { data: projects, isLoading: pLoad } = useListProjects();
  const [search, setSearch] = useState("");
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [jobsByProject, setJobsByProject] = useState<Record<string, Job[]>>({});
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const completedProjects = useMemo(() =>
    (projects ?? []).filter(p => p.status === "completed" || (p.phase ?? 0) > 0),
    [projects]
  );

  async function loadJobs(projectId: string) {
    if (jobsByProject[projectId]) { setSelectedProject(projectId); return; }
    setLoadingJobs(true);
    try {
      const res = await fetch(`${API_BASE}/production/projects/${projectId}/jobs`);
      const data = await res.json();
      setJobsByProject(prev => ({ ...prev, [projectId]: data.jobs ?? data ?? [] }));
      setSelectedProject(projectId);
    } catch {
      toast.error("فشل تحميل المهام");
    } finally {
      setLoadingJobs(false);
    }
  }

  async function exportMarkdown(projectId: string, title: string) {
    const tid = toast.loading("جارٍ تصدير Markdown...");
    try {
      const url = `${API_BASE}/production/projects/${projectId}/export/markdown`;
      const a = document.createElement("a");
      a.href = url; a.download = `${title}.md`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      toast.success("تم تصدير Markdown ↓", { id: tid });
    } catch { toast.error("فشل التصدير", { id: tid }); }
  }

  async function exportJson(projectId: string, title: string) {
    const tid = toast.loading("جارٍ تصدير JSON...");
    try {
      const url = `${API_BASE}/production/projects/${projectId}/export/json`;
      const a = document.createElement("a");
      a.href = url; a.download = `${title}.json`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      toast.success("تم تصدير JSON ↓", { id: tid });
    } catch { toast.error("فشل التصدير", { id: tid }); }
  }

  const currentProject = completedProjects.find(p => p.id === selectedProject);
  const currentJobs = (selectedProject ? jobsByProject[selectedProject] : null) ?? [];
  const filteredJobs = currentJobs.filter(j => {
    const phaseOk = phaseFilter === "all" || j.phase === phaseFilter;
    const searchOk = !search || (j.result ?? "").toLowerCase().includes(search.toLowerCase());
    return phaseOk && searchOk && j.status === "completed";
  });

  const totalOutputs = Object.values(jobsByProject).flat().filter(j => j.status === "completed").length;

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
            <Package size={24} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">محطة التصدير</h1>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-mono text-xs">Export Hub</Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-0.5">
              جميع مخرجات الذكاء الاصطناعي في مكان واحد · تحميل · تصدير · مشاركة
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold font-mono text-emerald-400">{totalOutputs}</div>
          <div className="text-[10px] font-mono text-muted-foreground">مخرج متاح</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar — Projects List */}
        <div className="lg:col-span-1 space-y-2">
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3 text-right">
            المشاريع ({completedProjects.length})
          </div>
          {pLoad ? (
            Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-16 bg-card" />)
          ) : completedProjects.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground/50 text-sm">
              <Archive size={28} className="mx-auto mb-2 opacity-30" />
              لا توجد مشاريع مكتملة بعد
            </div>
          ) : (
            completedProjects.map(p => {
              const isSelected = selectedProject === p.id;
              const jobs = jobsByProject[p.id] ?? [];
              const completedCount = jobs.filter(j => j.status === "completed").length;
              return (
                <button key={p.id} onClick={() => loadJobs(p.id)}
                  className={`w-full text-right p-3 rounded-xl border transition-all ${
                    isSelected
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                      : "border-border/40 bg-card hover:border-emerald-500/20 hover:bg-emerald-500/5"
                  }`}>
                  <div className="font-semibold text-sm truncate">{p.title_ar || p.title || "مشروع بلا اسم"}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                      p.status === "completed" ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" :
                      "text-amber-400 border-amber-500/30 bg-amber-500/10"
                    }`}>{p.status === "completed" ? "✓ مكتمل" : "جارٍ"}</span>
                    {completedCount > 0 && <span className="text-[9px] font-mono text-muted-foreground/50">{completedCount} مخرج</span>}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Main content */}
        <div className="lg:col-span-3 space-y-4">
          {!selectedProject ? (
            <div className="h-64 flex flex-col items-center justify-center text-muted-foreground/50 border border-dashed border-border/30 rounded-xl">
              <FolderOpen size={32} className="mb-3 opacity-30" />
              <div className="text-sm">اختر مشروعاً من القائمة لعرض مخرجاته</div>
            </div>
          ) : (
            <>
              {/* Project actions */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-border/40 bg-card">
                <div className="flex items-center gap-2">
                  <button onClick={() => exportMarkdown(selectedProject, currentProject?.title_ar || currentProject?.title || "project")}
                    className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-mono">
                    <Download size={12} /> Markdown
                  </button>
                  <button onClick={() => exportJson(selectedProject, currentProject?.title_ar || currentProject?.title || "project")}
                    className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-secondary bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors font-mono">
                    <Download size={12} /> JSON
                  </button>
                </div>
                <div className="text-right">
                  <div className="font-bold">{currentProject?.title_ar || currentProject?.title}</div>
                  <div className="text-[10px] font-mono text-muted-foreground/50">{filteredJobs.length} مخرج مكتمل</div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3 flex-wrap justify-end">
                <div className="relative">
                  <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                  <Input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="بحث في النصوص..."
                    className="pl-8 pr-3 h-8 text-xs w-48 bg-card border-border/40" />
                </div>
                <div className="flex gap-1 flex-wrap justify-end">
                  {[{ key: "all", label: "الكل" }, ...Object.entries(PHASE_META).map(([k, v]) => ({ key: k, label: v.label }))].map(f => (
                    <button key={f.key} onClick={() => setPhaseFilter(f.key)}
                      className={`text-[10px] font-mono px-2.5 py-1 rounded border transition-colors ${
                        phaseFilter === f.key ? "border-primary/40 bg-primary/10 text-primary" : "border-border/30 bg-secondary/30 text-muted-foreground hover:border-border/60"
                      }`}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Jobs grid */}
              {loadingJobs ? (
                <div className="space-y-3">
                  {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-20 bg-card" />)}
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground/50 text-sm border border-dashed border-border/30 rounded-xl">
                  <Sparkles size={24} className="mx-auto mb-2 opacity-30" />
                  لا توجد مخرجات بهذه الفلاتر
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredJobs.map(job => (
                    <JobCard key={job.id} job={job} projectTitle={currentProject?.title_ar || currentProject?.title || ""} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
