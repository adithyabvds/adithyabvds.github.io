import { ScrollReveal } from "../ScrollReveal";

export function Experience({ experience }: { experience: any[] }) {
  return (
    <section id="experience" className="py-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <ScrollReveal>
          <h2 className="text-4xl font-display font-bold sticky top-32">Experience</h2>
        </ScrollReveal>
        
        <div className="md:col-span-2 space-y-8">
          {experience.map((job, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="glass-card p-8 md:p-10 group">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{job.role}</h3>
                    <div className="text-primary font-medium mt-1">{job.company} &middot; {job.location}</div>
                  </div>
                  <span className="text-sm font-mono text-primary/80 bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap lg:self-start">
                    {job.start} — {job.end}
                  </span>
                </div>
                <ul className="space-y-4">
                  {job.bullets.map((bullet: string, bIdx: number) => (
                    <li key={bIdx} className="text-muted-foreground flex gap-4 leading-relaxed">
                      <span className="text-primary/50 mt-1.5 shrink-0">&bull;</span>
                      <span className="text-sm md:text-base">{bullet}</span>
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