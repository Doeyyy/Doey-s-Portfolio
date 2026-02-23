import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectsContext";

const FeaturedWork = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="py-32 px-6 md:px-16 lg:px-24">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-display)]"
      >
        Featured
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold tracking-tight mb-16"
      >
        Highlighted Work
      </motion.h2>

      <div className="grid gap-8 md:gap-12">
        {featured.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => navigate(`/work/${project.slug}`)}
            className="group cursor-pointer relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors duration-500"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image side */}
              <div className="relative overflow-hidden h-[250px] md:h-[400px] lg:h-[450px]">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50 hidden md:block z-10" />
              </div>

              {/* Content side */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-muted-foreground border border-border px-3 py-1 rounded-full font-[family-name:var(--font-display)]">
                    {project.category}
                  </span>
                  <span className="text-sm text-muted-foreground font-[family-name:var(--font-display)]">
                    {project.year}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                  {project.description}
                </p>

                <div className="flex items-center gap-3 text-primary text-sm tracking-[0.2em] uppercase font-[family-name:var(--font-display)]">
                  View Case Study
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedWork;
