import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { useProjects } from "@/contexts/ProjectsContext";
import type { ProjectData, ContentBlock } from "@/types/content";
import { genId } from "@/types/content";
import axios from "axios";
import { uploadMedia } from "@/api";
import {
  ArrowLeft, Plus, Type, Heading, ImageIcon, Video, LayoutGrid,
  Trash2, GripVertical, Save, Eye, X, ChevronDown
} from "lucide-react";

// --- Utility for Base64 (Cover Image only) ---
const handleFileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
};

// --- Secure Token Gate ---
const PasswordGate = ({ onUnlock }: { onUnlock: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await axios.post('http://localhost:8000/api/api-token-auth/', {
        username,
        password
      });

      if (response.data.token) {
        sessionStorage.setItem("studio-token", response.data.token);
        sessionStorage.setItem("studio-auth", "true");
        onUnlock();
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Studio Access</h1>
          <p className="text-muted-foreground text-sm">Authenticate to access the CMS.</p>
        </div>
        
        <div className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(false); }}
            placeholder="Username"
            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-[family-name:var(--font-display)]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Password"
            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-[family-name:var(--font-display)]"
          />
        </div>

        {error && <p className="text-destructive text-sm">Authentication failed. Check your credentials.</p>}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-[family-name:var(--font-display)] text-sm tracking-wider uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Enter Studio'}
        </button>
      </motion.form>
    </div>
  );
};

// --- Block Editor Component ---
const BlockEditor = ({ block, onChange, onDelete }: {
  block: ContentBlock;
  onChange: (updated: ContentBlock) => void;
  onDelete: () => void;
}) => {
  const typeLabels: Record<string, string> = {
    text: "Text",
    heading: "Heading",
    image: "Image",
    video: "Video",
    gallery: "Gallery",
  };

  const typeIcons: Record<string, React.ReactNode> = {
    text: <Type className="w-3.5 h-3.5" />,
    heading: <Heading className="w-3.5 h-3.5" />,
    image: <ImageIcon className="w-3.5 h-3.5" />,
    video: <Video className="w-3.5 h-3.5" />,
    gallery: <LayoutGrid className="w-3.5 h-3.5" />,
  };

  return (
    <Reorder.Item value={block} id={block.id} className="relative">
      <motion.div
        layout
        className="bg-card border border-border rounded-xl p-4 mb-3 group"
      >
        {/* Block header */}
        <div className="flex items-center gap-2 mb-3">
          <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab active:cursor-grabbing" />
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-[family-name:var(--font-display)] uppercase tracking-wider">
            {typeIcons[block.type]}
            {typeLabels[block.type]}
          </span>
          <button onClick={onDelete} className="ml-auto text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Block content */}
        {(block.type === "text" || block.type === "heading") && (
          <textarea
            value={block.content}
            onChange={(e) => onChange({ ...block, content: e.target.value })}
            placeholder={block.type === "heading" ? "Section heading..." : "Write your content..."}
            className={`w-full bg-transparent border-0 resize-none focus:outline-none text-foreground placeholder:text-muted-foreground/50 ${
              block.type === "heading"
                ? "text-primary text-sm tracking-[0.2em] uppercase font-[family-name:var(--font-display)] min-h-[2.5rem]"
                : "text-base leading-relaxed min-h-[5rem]"
            }`}
            rows={block.type === "heading" ? 1 : 3}
          />
        )}

        {block.type === "image" && (
          <div className="space-y-3">
            {block.src ? (
              <div className="relative rounded-lg overflow-hidden border border-border">
                <img src={block.src} alt={block.alt} className="w-full h-48 object-cover" />
                <button
                  onClick={() => onChange({ ...block, src: "", alt: "" })}
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm p-1.5 rounded-full text-muted-foreground hover:text-destructive"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                <ImageIcon className="w-6 h-6 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Click to upload image to S3</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const s3Url = await uploadMedia(file);
                        onChange({ ...block, src: s3Url, alt: file.name });
                      } catch (error) {
                        console.error("Upload failed", error);
                        alert("Failed to upload image to S3.");
                      }
                    }
                  }}
                />
              </label>
            )}
            <input
              value={block.caption || ""}
              onChange={(e) => onChange({ ...block, caption: e.target.value })}
              placeholder="Caption (optional)"
              className="w-full bg-transparent border-0 text-sm text-muted-foreground focus:outline-none placeholder:text-muted-foreground/50"
            />
          </div>
        )}

        {block.type === "video" && (
          <div className="space-y-3">
            {block.src ? (
              <div className="relative rounded-lg overflow-hidden border border-border">
                <video src={block.src} className="w-full h-48 object-cover" controls preload="metadata" />
                <button
                  onClick={() => onChange({ ...block, src: "" })}
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm p-1.5 rounded-full text-muted-foreground hover:text-destructive"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                <Video className="w-6 h-6 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Click to upload video to S3</span>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const s3Url = await uploadMedia(file);
                        onChange({ ...block, src: s3Url });
                      } catch (error) {
                        console.error("Upload failed", error);
                        alert("Failed to upload video to S3.");
                      }
                    }
                  }}
                />
              </label>
            )}
            <input
              value={block.caption || ""}
              onChange={(e) => onChange({ ...block, caption: e.target.value })}
              placeholder="Caption (optional)"
              className="w-full bg-transparent border-0 text-sm text-muted-foreground focus:outline-none placeholder:text-muted-foreground/50"
            />
          </div>
        )}

        {block.type === "gallery" && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {block.images.map((img, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden border border-border aspect-[4/3]">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  <button
                    onClick={() => {
                      const next = block.images.filter((_, j) => j !== i);
                      onChange({ ...block, images: next });
                    }}
                    className="absolute top-1 right-1 bg-background/80 backdrop-blur-sm p-1 rounded-full text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors aspect-[4/3]">
                <Plus className="w-5 h-5 text-muted-foreground" />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={async (e) => {
                    const files = Array.from(e.target.files || []);
                    try {
                      // Upload all selected files to S3 concurrently
                      const newImages = await Promise.all(
                        files.map(async (f) => {
                          const s3Url = await uploadMedia(f);
                          return { src: s3Url, alt: f.name };
                        })
                      );
                      onChange({ ...block, images: [...block.images, ...newImages] });
                    } catch (error) {
                      console.error("Upload failed", error);
                      alert("Failed to upload gallery images to S3.");
                    }
                  }}
                />
              </label>
            </div>
            <input
              value={block.caption || ""}
              onChange={(e) => onChange({ ...block, caption: e.target.value })}
              placeholder="Gallery caption (optional)"
              className="w-full bg-transparent border-0 text-sm text-muted-foreground focus:outline-none placeholder:text-muted-foreground/50"
            />
          </div>
        )}
      </motion.div>
    </Reorder.Item>
  );
};

// --- Add Block Menu ---
const AddBlockMenu = ({ onAdd }: { onAdd: (type: ContentBlock["type"]) => void }) => {
  const [open, setOpen] = useState(false);

  const blockTypes: { type: ContentBlock["type"]; label: string; icon: React.ReactNode }[] = [
    { type: "heading", label: "Heading", icon: <Heading className="w-4 h-4" /> },
    { type: "text", label: "Text", icon: <Type className="w-4 h-4" /> },
    { type: "image", label: "Image", icon: <ImageIcon className="w-4 h-4" /> },
    { type: "video", label: "Video", icon: <Video className="w-4 h-4" /> },
    { type: "gallery", label: "Gallery", icon: <LayoutGrid className="w-4 h-4" /> },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-center gap-2 text-sm font-[family-name:var(--font-display)] uppercase tracking-wider"
      >
        <Plus className="w-4 h-4" />
        Add Block
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute left-0 right-0 mt-2 bg-card border border-border rounded-xl overflow-hidden z-10 shadow-lg"
          >
            {blockTypes.map((bt) => (
              <button
                key={bt.type}
                onClick={() => { onAdd(bt.type); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {bt.icon}
                {bt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Project Editor ---
const ProjectEditor = ({ initial, onSave, onCancel }: {
  initial?: ProjectData;
  onSave: (project: ProjectData) => void;
  onCancel: () => void;
}) => {
  const [project, setProject] = useState<ProjectData>(
    initial || {
      slug: "",
      title: "",
      category: "",
      description: "",
      year: new Date().getFullYear().toString(),
      image: "",
      featured: false,
      meta: { role: "", timeline: "", tools: [] },
      content: [],
    }
  );
  const [toolInput, setToolInput] = useState("");
  const navigate = useNavigate();

  const updateField = <K extends keyof ProjectData>(key: K, value: ProjectData[K]) =>
    setProject((p) => ({ ...p, [key]: value }));

  const updateMeta = <K extends keyof ProjectData["meta"]>(key: K, value: ProjectData["meta"][K]) =>
    setProject((p) => ({ ...p, meta: { ...p.meta, [key]: value } }));

  const addBlock = (type: ContentBlock["type"]) => {
    let block: ContentBlock;
    const id = genId();
    switch (type) {
      case "text": block = { id, type: "text", content: "" }; break;
      case "heading": block = { id, type: "heading", content: "" }; break;
      case "image": block = { id, type: "image", src: "", alt: "" }; break;
      case "video": block = { id, type: "video", src: "" }; break;
      case "gallery": block = { id, type: "gallery", images: [] }; break;
    }
    setProject((p) => ({ ...p, content: [...p.content, block] }));
  };

  const updateBlock = (index: number, updated: ContentBlock) => {
    setProject((p) => ({
      ...p,
      content: p.content.map((b, i) => (i === index ? updated : b)),
    }));
  };

  const deleteBlock = (index: number) => {
    setProject((p) => ({ ...p, content: p.content.filter((_, i) => i !== index) }));
  };

  const handleSave = () => {
    const slug = project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const payload = { ...project, slug };
    
    // Clean the image field for Django backend
    if (payload.image === "") {
      (payload as any).image = null; 
    }

    onSave(payload);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Top actions */}
      <div className="flex items-center justify-between mb-8 sticky top-20 z-30 bg-background/80 backdrop-blur-md py-4 -mx-4 px-4 rounded-xl">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-display)] tracking-wider uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancel
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => {
              handleSave();
              const slug = project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              navigate(`/work/${slug}`);
            }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground border border-border px-4 py-2 rounded-lg hover:text-foreground transition-colors font-[family-name:var(--font-display)]"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-[family-name:var(--font-display)] tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>

      {/* Project meta fields */}
      <div className="space-y-6 mb-12">
        <div>
          <label className="text-xs text-muted-foreground font-[family-name:var(--font-display)] uppercase tracking-wider mb-2 block">Cover Image</label>
          {project.image ? (
            <div className="relative rounded-xl overflow-hidden border border-border h-48">
              <img src={project.image} alt="Cover" className="w-full h-full object-cover" />
              <button
                onClick={() => updateField("image", "")}
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm p-1.5 rounded-full text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
              <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Upload cover image</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      // Uses Base64 encoding exclusively for Cover Image so DRF Base64ImageField validates
                      const dataUrl = await handleFileToDataUrl(file); 
                      updateField("image", dataUrl); 
                    } catch (error) {
                      console.error("Upload failed", error);
                      alert("Failed to process cover image.");
                    }
                  }
                }}
              />
            </label>
          )}
        </div>

        <input
          value={project.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Project Title"
          className="w-full bg-transparent text-4xl font-bold tracking-tight text-foreground placeholder:text-muted-foreground/30 focus:outline-none border-b border-border pb-4"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input value={project.category} onChange={(e) => updateField("category", e.target.value)} placeholder="Category" className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring" />
          <input value={project.year} onChange={(e) => updateField("year", e.target.value)} placeholder="Year" className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring" />
          <input value={project.meta.role} onChange={(e) => updateMeta("role", e.target.value)} placeholder="Your Role" className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring" />
          <input value={project.meta.timeline} onChange={(e) => updateMeta("timeline", e.target.value)} placeholder="Timeline" className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>

        <textarea
          value={project.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Short description..."
          rows={2}
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring resize-none"
        />

        <div>
          <label className="text-xs text-muted-foreground font-[family-name:var(--font-display)] uppercase tracking-wider mb-2 block">Tools</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.meta.tools.map((tool) => (
              <span key={tool} className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-border text-sm text-muted-foreground">
                {tool}
                <button onClick={() => updateMeta("tools", project.meta.tools.filter((t) => t !== tool))}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <input
            value={toolInput}
            onChange={(e) => setToolInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && toolInput.trim()) {
                e.preventDefault();
                updateMeta("tools", [...project.meta.tools, toolInput.trim()]);
                setToolInput("");
              }
            }}
            placeholder="Add tool (press Enter)"
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring w-48"
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={project.featured}
            onChange={(e) => updateField("featured", e.target.checked)}
            className="w-4 h-4 accent-primary"
          />
          <span className="text-sm text-muted-foreground">Featured project</span>
        </label>
      </div>

      {/* Content blocks */}
      <div className="mb-8">
        <h3 className="text-primary text-sm tracking-[0.3em] uppercase mb-6 font-[family-name:var(--font-display)]">Content</h3>
        <Reorder.Group
          axis="y"
          values={project.content}
          onReorder={(newContent) => setProject((p) => ({ ...p, content: newContent }))}
        >
          {project.content.map((block, i) => (
            <BlockEditor
              key={block.id}
              block={block}
              onChange={(updated) => updateBlock(i, updated)}
              onDelete={() => deleteBlock(i)}
            />
          ))}
        </Reorder.Group>
        <AddBlockMenu onAdd={addBlock} />
      </div>
    </div>
  );
};

// --- Main Studio Page ---
const Studio = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("studio-auth") === "true");
  const { projects, saveProject, deleteProject } = useProjects();
  const [editing, setEditing] = useState<string | null>(null); // slug or "new"
  const navigate = useNavigate();

  if (!authed) return <PasswordGate onUnlock={() => setAuthed(true)} />;

  if (editing) {
    const initial = editing === "new" ? undefined : projects.find((p) => p.slug === editing);
    return (
      <div className="min-h-screen bg-background px-6 md:px-16 lg:px-24 pt-24 pb-32">
        <ProjectEditor
          initial={initial}
          onSave={(project) => {
            saveProject(project);
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 md:px-16 lg:px-24 pt-24 pb-32">
      {/* Header */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 lg:px-24 py-6 bg-background/80 backdrop-blur-md flex items-center justify-between"
      >
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-display)] tracking-wider uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          Doey's Portfolio
        </button>
        <span className="text-sm text-muted-foreground font-[family-name:var(--font-display)] tracking-wider uppercase">Studio</span>
      </motion.nav>

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Projects</h1>
            <p className="text-muted-foreground">Create and edit your case studies.</p>
          </div>
          <button
            onClick={() => setEditing("new")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-[family-name:var(--font-display)] tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            New
          </button>
        </div>

        <div className="space-y-3">
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-5 flex items-center gap-5 group hover:border-primary/30 transition-colors"
            >
              {project.image && (
                <div className="w-20 h-14 rounded-lg overflow-hidden border border-border flex-shrink-0">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold tracking-tight truncate">{project.title || "Untitled"}</h3>
                <p className="text-sm text-muted-foreground truncate">{project.category} · {project.year}</p>
              </div>
              <div className="flex items-center gap-2">
                {project.featured && (
                  <span className="text-xs text-primary border border-primary/30 px-2 py-0.5 rounded-full font-[family-name:var(--font-display)]">
                    Featured
                  </span>
                )}
                <button
                  onClick={() => setEditing(project.slug)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm("Delete this project?")) deleteProject(project.slug);
                  }}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-lg hover:bg-secondary"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Studio;