import { ScrollReveal } from "../ScrollReveal";

export function About({ bio, education }: { bio: any, education: any[] }) {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <ScrollReveal>
          <div className="sticky top-32">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px bg-white/10 flex-grow max-w-[40px] print-hidden" />
              <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">Background</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold">About</h2>
          </div>
        </ScrollReveal>
        
        <div className="md:col-span-2 space-y-16">
          <ScrollReveal delay={0.1}>
            <div className="glass-card p-8 md:p-10">
              <p className="text-base md:text-lg text-muted-foreground font-medium">
                {bio.longBio}
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            <ScrollReveal>
              <h3 className="text-2xl font-display font-bold px-2">Education</h3>
            </ScrollReveal>
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <div className="glass-card p-6 md:p-8 group relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div>
                        <h4 className="font-bold text-lg md:text-xl mb-1">{edu.degree}</h4>
                        <div className="text-sm text-muted-foreground">{edu.institution} &middot; {edu.location}</div>
                      </div>
                      <div className="text-xs font-mono text-primary/80 bg-primary/10 px-3 py-1 rounded-md whitespace-nowrap self-start">
                        {edu.start} — {edu.end}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}