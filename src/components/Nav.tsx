import { motion } from "framer-motion";

const Nav = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 py-6 bg-background/80 backdrop-blur-md"
    >
      <a href="#" className="text-lg font-bold font-[family-name:var(--font-display)] tracking-tight">
        Doey's Portfolio<span className="text-primary">.</span>
      </a>
      <div className="hidden md:flex items-center gap-8">
        {["About", "Work", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-display)] tracking-wider uppercase"
          >
            {item}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Nav;
