import { ScrollReveal } from "../ScrollReveal";

export function About({ bio, education }: { bio: any, education: any[] }) {
  return (
    <section id="about" className="py-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <ScrollReveal>
          <h2 className="text-4xl font-display font-bold sticky top-32">About</h2>
        </ScrollReveal>
        
        <div className="md:col-span-2 space-y-16">
          <ScrollReveal delay={0.1}>
            <div className="glass-card p-8 md:p-10">
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground font-medium">
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
                        <h4 className="font-bold text-xl mb-1">{edu.degree}</h4>
                        <div className="text-muted-foreground">{edu.institution} &middot; {edu.location}</div>
                      </div>
                      <div className="text-sm font-mono text-primary/80 bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap self-start">
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