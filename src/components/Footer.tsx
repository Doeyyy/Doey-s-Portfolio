const Footer = () => {
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/Doeyyy" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/oluwasomidotun-omole-5485a3272/" },
    { name: "Twitter", url: "#" },
  ];

  return (
    <footer className="px-6 md:px-16 lg:px-24 py-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm text-muted-foreground">© 2026 — All rights reserved</p>
      <div className="flex gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            // Opens actual URLs in a new tab, but keeps '#' links in the same tab
            target={link.url !== "#" ? "_blank" : undefined}
            rel={link.url !== "#" ? "noopener noreferrer" : undefined}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;