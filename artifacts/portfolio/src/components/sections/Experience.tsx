import { ScrollReveal } from "../ScrollReveal";

export function Experience({ experience }: { experience: any[] }) {
  return (
    <section id="experience" className="py-24 lg:py-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <ScrollReveal>
          <div className="sticky top-32">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px bg-white/10 flex-grow max-w-[40px] print-hidden" />
              <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">Career</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold">Experience</h2>
          </div>
        </ScrollReveal>
        
        <div className="md:col-span-2 space-y-8">
          {experience.map((job, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="glass-card p-8 md:p-10 group">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{job.role}</h3>
                    <div className="text-primary text-sm font-medium mt-1">{job.company} &middot; {job.location}</div>
                  </div>
                  <span className="text-xs font-mono text-primary/80 bg-primary/10 px-3 py-1 rounded-md whitespace-nowrap lg:self-start">
                    {job.start} — {job.end}
                  </span>
                </div>
                <ul className="space-y-4">
                  {job.bullets.map((bullet: string, bIdx: number) => (
                    <li key={bIdx} className="text-muted-foreground flex gap-4 text-sm md:text-base">
                      <span className="text-primary/50 mt-1 shrink-0">&bull;</span>
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