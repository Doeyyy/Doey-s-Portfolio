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

    case "video": {
      let videoUrl = block.src;

      // 1. Check if the browser is going to think it's a local file.
      // If it doesn't start with http, force your absolute Cloudinary URL onto it!
      if (videoUrl && !videoUrl.startsWith('http')) {
        const cleanPath = videoUrl.startsWith('/') ? videoUrl.slice(1) : videoUrl;
        videoUrl = `https://res.cloudinary.com/dvivrsime/${cleanPath}`;
      }

      // 2. Ensure Cloudinary routes it through the video player and adds .mp4
      if (videoUrl && videoUrl.includes('cloudinary.com')) {
        videoUrl = videoUrl.replace('/image/upload/', '/video/upload/');
        if (!videoUrl.match(/\.(mp4|webm|ogg)$/i)) {
          videoUrl += '.mp4';
        }
      }

      return (
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.7 }}
          className="mb-10 -mx-4 md:-mx-8"
        >
          {/* REMOVED 'aspect-video' from here */}
          <div className="overflow-hidden rounded-xl border border-border bg-black/5 flex justify-center">
            <video
              src={videoUrl}
              controls
              playsInline
              muted
              /* CHANGED to h-auto max-h-[85vh] so it never overflows the screen */
              className="w-full h-auto max-h-[85vh] object-contain"
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
    }

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