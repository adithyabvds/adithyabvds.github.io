import { ScrollReveal } from "../ScrollReveal";

export function Skills({ skills, certs }: { skills: any, certs: any[] }) {
  const categories = [
    { title: "Core Focus", items: skills.core },
    { title: "Advanced Methods", items: skills.advanced },
    { title: "Languages", items: skills.programming },
    { title: "Tools & Infrastructure", items: skills.tools }
  ];

  return (
    <section id="skills" className="py-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <ScrollReveal>
          <h2 className="text-4xl font-display font-bold sticky top-32">Expertise</h2>
        </ScrollReveal>
        
        <div className="md:col-span-2 space-y-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((cat, idx) => (
              <ScrollReveal key={cat.title} delay={idx * 0.1}>
                <div className="glass-card p-6 md:p-8 h-full bg-white/5">
                  <h3 className="text-xl font-bold mb-6 text-foreground">{cat.title}</h3>
                  <ul className="space-y-3">
                    {cat.items.map((item: string) => (
                      <li key={item} className="text-muted-foreground flex gap-3 items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {certs && certs.length > 0 && (
            <ScrollReveal delay={0.2}>
              <div className="glass-card p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-6 px-2">Certifications</h3>
                <div className="space-y-4">
                  {certs.map((cert, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-xl hover:bg-white/5 transition-colors gap-2">
                      <div>
                        <div className="font-medium text-lg">{cert.name}</div>
                        <div className="text-sm text-primary/80">{cert.issuer}</div>
                      </div>
                      <div className="text-sm font-mono text-muted-foreground bg-white/5 px-3 py-1 rounded-md sm:self-start">
                        {cert.year}
                      </div>
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