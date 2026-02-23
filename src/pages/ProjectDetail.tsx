import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useProjects } from "@/contexts/ProjectsContext";
import ContentBlockRenderer from "@/components/ContentBlockRenderer";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getProject } = useProjects();
  const project = slug ? getProject(slug) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <button onClick={() => navigate("/")} className="text-primary underline">
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 lg:px-24 py-6 bg-background/80 backdrop-blur-md"
      >
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-display)] tracking-wider uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </motion.nav>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden"
      >
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 -mt-32 px-6 md:px-16 lg:px-24 max-w-4xl mx-auto pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-muted-foreground border border-border px-3 py-1 rounded-full font-[family-name:var(--font-display)]">
              {project.category}
            </span>
            <span className="text-sm text-muted-foreground font-[family-name:var(--font-display)]">
              {project.year}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">{project.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl">{project.description}</p>
        </motion.div>

        {/* Meta grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 py-10 border-y border-border mb-16"
        >
          <div>
            <p className="text-sm text-muted-foreground font-[family-name:var(--font-display)] uppercase tracking-wider mb-2">Role</p>
            <p className="text-foreground">{project.meta.role}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-[family-name:var(--font-display)] uppercase tracking-wider mb-2">Timeline</p>
            <p className="text-foreground">{project.meta.timeline}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-sm text-muted-foreground font-[family-name:var(--font-display)] uppercase tracking-wider mb-2">Tools</p>
            <div className="flex flex-wrap gap-2">
              {project.meta.tools.map((tool) => (
                <span key={tool} className="px-3 py-1 rounded-full border border-border text-sm text-muted-foreground">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content blocks */}
        <div>
          {project.content.map((block, i) => (
            <ContentBlockRenderer key={block.id} block={block} index={i} />
          ))}
        </div>

        {/* Back CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-10 border-t border-border"
        >
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-3 text-primary text-sm tracking-[0.2em] uppercase font-[family-name:var(--font-display)] hover:gap-5 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
