import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-display)]">
          Get in Touch
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
          Let's create something{" "}
          <span className="text-gradient">remarkable</span> together.
        </h2>
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          Have a project in mind or just want to chat? I'm always open to new ideas and collaborations.
        </p>
        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-[family-name:var(--font-display)] text-sm tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
        >
          Say Hello
        </a>
      </motion.div>
    </section>
  );
};

export default Contact;
