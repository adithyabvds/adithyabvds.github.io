import { ScrollReveal } from "../ScrollReveal";

export function Experience({ experience }: { experience: any[] }) {
  return (
    <section id="experience" className="py-24 border-t border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <ScrollReveal>
          <h2 className="text-3xl font-display font-bold sticky top-24">Experience</h2>
        </ScrollReveal>
        
        <div className="md:col-span-2 space-y-16">
          {experience.map((job, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                  <h3 className="text-xl font-bold">{job.role}</h3>
                  <span className="text-sm text-muted-foreground font-mono">
                    {job.start} — {job.end}
                  </span>
                </div>
                <div className="text-primary font-medium mb-4">{job.company} &middot; {job.location}</div>
                <ul className="space-y-3">
                  {job.bullets.map((bullet: string, bIdx: number) => (
                    <li key={bIdx} className="text-muted-foreground flex gap-3 leading-relaxed">
                      <span className="text-primary/50 mt-1.5">&bull;</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}