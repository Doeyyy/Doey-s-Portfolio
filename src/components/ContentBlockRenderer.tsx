import { motion } from "framer-motion";
import type { ContentBlock } from "@/types/content";

const ContentBlockRenderer = ({ block, index }: { block: ContentBlock; index: number }) => {
  const delay = Math.min(index * 0.05, 0.3);

  switch (block.type) {
    case "heading":
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.6 }}
          className="mb-4 mt-14 first:mt-0"
        >
          <h2 className="text-primary text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-display)]">
            {block.content}
          </h2>
        </motion.div>
      );

    case "text":
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-foreground/90 text-lg leading-relaxed">{block.content}</p>
        </motion.div>
      );

    case "image":
      return (
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.7 }}
          className="mb-10 -mx-4 md:-mx-8"
        >
          <div className="overflow-hidden rounded-xl border border-border">
            <img
              src={block.src}
              alt={block.alt}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-sm text-muted-foreground text-center font-[family-name:var(--font-display)]">
              {block.caption}
            </figcaption>
          )}
        </motion.figure>
      );

    case "video":
      return (
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.7 }}
          className="mb-10 -mx-4 md:-mx-8"
        >
          <div className="overflow-hidden rounded-xl border border-border bg-card aspect-video">
            <video
              src={block.src}
              controls
              className="w-full h-full object-cover"
              preload="metadata"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-sm text-muted-foreground text-center font-[family-name:var(--font-display)]">
              {block.caption}
            </figcaption>
          )}
        </motion.figure>
      );

    case "gallery":
      return (
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.7 }}
          className="mb-10 -mx-4 md:-mx-8"
        >
          <div className={`grid gap-3 ${block.images.length === 1 ? "grid-cols-1" : block.images.length === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
            {block.images.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-border aspect-[4/3]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-sm text-muted-foreground text-center font-[family-name:var(--font-display)]">
              {block.caption}
            </figcaption>
          )}
        </motion.figure>
      );

    default:
      return null;
  }
};

export default ContentBlockRenderer;
