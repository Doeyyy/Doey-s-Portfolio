import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectsContext";

const Projects = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();

  return (
    <section id="work" className="py-32 px-6 md:px-16 lg:px-24">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-display)]"
      >
        Selected Work
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold tracking-tight mb-16"
      >
        All Projects
      </motion.h2>

      <div className="space-y-0 divide-y divide-border">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            onClick={() => navigate(`/work/${project.slug}`)}
            className="group py-10 md:py-14 cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-baseline gap-4 mb-2">
                  <h3 className="text-2xl md:text-4xl font-bold tracking-tight group-hover:text-gradient transition-all duration-300">
                    {project.title}
                  </h3>
                  <span className="text-muted-foreground text-sm font-[family-name:var(--font-display)]">{project.year}</span>
                </div>
                <p className="text-muted-foreground max-w-lg">{project.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground border border-border px-4 py-1.5 rounded-full font-[family-name:var(--font-display)]">
                  {project.category}
                </span>
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xl">→</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
