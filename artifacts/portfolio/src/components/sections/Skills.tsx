import { ScrollReveal } from "../ScrollReveal";
import { BadgeCheck, ExternalLink } from "lucide-react";

export function Skills({ skills, certs }: { skills: any, certs: any[] }) {
  const categories = [
    { title: "Core Focus", items: skills.core },
    { title: "Advanced Methods", items: skills.advanced },
    { title: "Languages", items: skills.programming },
    { title: "Tools & Infrastructure", items: skills.tools }
  ];

  const visibleCerts = certs?.filter(c => c.public !== false) || [];

  return (
    <section id="skills" className="py-24 lg:py-32 print-avoid-break">
      <div className="mb-12">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-white/10 flex-grow max-w-[40px] print-hidden" />
            <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Expertise</h2>
        </ScrollReveal>
      </div>
      
      <div className="space-y-24">
        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <ScrollReveal key={cat.title} delay={idx * 0.1}>
              <div className="glass-card p-6 md:p-8 h-full bg-white/[0.02] border-white/5 rounded-[20px]">
                <h3 className="text-lg font-bold mb-6 text-foreground tracking-tight">{cat.title}</h3>
                <ul className="space-y-3">
                  {cat.items.map((item: string) => (
                    <li key={item} className="text-muted-foreground flex gap-3 items-center text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 print-hidden" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Certifications Grid */}
        {visibleCerts.length > 0 && (
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-2xl font-display font-bold tracking-tight">Verified Credentials</h3>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleCerts.map((cert, idx) => {
                const title = cert.title || cert.name;
                const date = cert.date || cert.year;
                
                return (
                  <ScrollReveal key={idx} delay={idx * 0.1}>
                    <div className="glass-card flex flex-col h-full p-6 bg-white/[0.02] border-white/5 rounded-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(120,120,255,0.1)] group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 print-hidden" />
                      
                      <div className="relative z-10 flex-grow">
                        <div className="flex items-center gap-2 mb-4">
                          <BadgeCheck className="w-4 h-4 text-primary" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {cert.issuer}
                          </span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-foreground mb-2 leading-snug line-clamp-2">
                          {title}
                        </h4>
                        
                        {cert.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-6">
                            {cert.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="relative z-10 flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <div className="text-xs font-mono text-muted-foreground/80">
                          {date}
                        </div>
                        
                        {cert.link && (
                          <a 
                            href={cert.link}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="glass-cta inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-foreground transition-colors print-hidden border border-white/10"
                          >
                            Certificate <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
