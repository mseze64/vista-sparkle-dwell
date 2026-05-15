export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-cream mt-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-display text-xl">
                ô
              </div>
              <span className="font-display text-2xl">Maison</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Hand-picked homes for travelers who care about how a place feels.
            </p>
          </div>
          {[
            { title: "Discover", links: ["Stays", "Experiences", "Cities", "Editor's picks"] },
            { title: "Hosting", links: ["List your home", "Resources", "Community", "Insurance"] },
            { title: "Maison", links: ["About", "Careers", "Press", "Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm tracking-wide uppercase">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 Maison Stays. Built with care.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
