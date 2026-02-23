const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 py-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm text-muted-foreground">© 2025 — All rights reserved</p>
      <div className="flex gap-6">
        {["GitHub", "LinkedIn", "Twitter"].map((link) => (
          <a key={link} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {link}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
