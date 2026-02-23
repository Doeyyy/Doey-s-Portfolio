import { motion } from "framer-motion";

const About = () => {
  const skills = ["Networking", "Figma", "Aws", "Python", "Ansible", "Django"];

  return (
    <section id="about" className="py-32 px-6 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="grid md:grid-cols-2 gap-16 items-start"
      >
        <div>
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-display)]">About</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            Turning ideas into elegant, functional products.
          </h2>
        </div>
        <div className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
           I’m a person driven by how things work from the ground up. While many focus on either the screen or the circuit, I work in the space where they meet.

            My work spans from designing PCBs and Embedded Systems to building robust Python backends that bring them to life. Every project is an opportunity to bridge the physical and digital worlds—ensuring that every system I build is efficient, connected, and meaningful.

            I believe in building things I truly understand—from the traces on a board to the logic in an API.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Every project is an opportunity to push boundaries and deliver something meaningful. I believe in clean code, thoughtful design, and attention to every detail.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            {skills.map((skill) => (
              <span key={skill} className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground font-[family-name:var(--font-display)]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
