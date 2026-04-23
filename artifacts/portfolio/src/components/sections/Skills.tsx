import { ScrollReveal } from "../ScrollReveal";

export function Skills({ skills, certs }: { skills: any, certs: any[] }) {
  const categories = [
    { title: "Core Focus", items: skills.core },
    { title: "Advanced Methods", items: skills.advanced },
    { title: "Languages", items: skills.programming },
    { title: "Tools & Infrastructure", items: skills.tools }
  ];

  return (
    <section id="skills" className="py-24 border-t border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <ScrollReveal>
          <h2 className="text-3xl font-display font-bold sticky top-24">Expertise</h2>
        </ScrollReveal>
        
        <div className="md:col-span-2 space-y-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {categories.map((cat, idx) => (
              <ScrollReveal key={cat.title} delay={idx * 0.1}>
                <div>
                  <h3 className="text-lg font-bold mb-4">{cat.title}</h3>
                  <ul className="space-y-2">
                    {cat.items.map((item: string) => (
                      <li key={item} className="text-muted-foreground flex gap-3">
                        <span className="text-primary/50">&rsaquo;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {certs && certs.length > 0 && (
            <ScrollReveal>
              <div className="pt-8 border-t border-border/50">
                <h3 className="text-lg font-bold mb-6">Certifications</h3>
                <div className="space-y-4">
                  {certs.map((cert, idx) => (
                    <div key={idx} className="flex justify-between items-baseline">
                      <div>
                        <div className="font-medium">{cert.name}</div>
                        <div className="text-sm text-muted-foreground">{cert.issuer}</div>
                      </div>
                      <div className="text-sm font-mono text-muted-foreground">{cert.year}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}