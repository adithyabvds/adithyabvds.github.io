import { ScrollReveal } from "../ScrollReveal";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export function Hero({ data }: { data: any }) {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const yParallax = useTransform(scrollY, [0, 500], [0, 80]);
  
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !window.matchMedia("(hover: hover)").matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      }
      
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  const words = data.hero.headline.split(" ");
  const line1 = words.slice(0, 2).join(" ");
  const line2 = words.slice(2).join(" ");

  const titleVariants = {
    hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.08 + 0.1,
        duration: 0.7,
        ease: "easeOut"
      }
    })
  };

  const handlePulse = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.classList.remove('pulsing');
    void el.offsetWidth;
    el.classList.add('pulsing');
  };

  return (
    <section id="hero" className="min-h-[100dvh] flex flex-col justify-center pt-24 pb-24 lg:py-32 relative">
      <div className="absolute inset-0 w-full h-full bg-grid-overlay pointer-events-none z-[-1] print-hidden" />
      <motion.div 
        style={{ y: prefersReducedMotion ? 0 : yParallax }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-[-1] print-hidden" 
      />
      
      <div 
        ref={glowRef}
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[80px] pointer-events-none z-[-1] hidden md:block print-hidden"
        style={{ transform: 'translate(-50%, -50%)', willChange: 'transform' }}
      />
      
      <div className="flex flex-col items-start max-w-4xl relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-sm font-medium text-primary mb-8 tag-pulse cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new opportunities
          </div>
        </ScrollReveal>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6 text-balance leading-[1.05]">
          <motion.span 
            custom={0} initial="hidden" animate="visible" variants={titleVariants}
            className="text-gradient animate-gradient-sweep block"
          >
            {line1}
          </motion.span>
          <motion.span 
            custom={1} initial="hidden" animate="visible" variants={titleVariants}
            className="text-foreground block"
          >
            {line2}
          </motion.span>
        </h1>
        
        <ScrollReveal delay={0.2}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 font-medium">
            {data.hero.subheadline}
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={(e) => { handlePulse(e); setTimeout(() => window.print(), 200); }}
              className="glass-cta btn-pulse-ring bg-primary/20 text-white px-8 py-4 font-semibold text-lg relative"
            >
              <span className="relative z-10">{data.hero.ctas.primary}</span>
            </button>
            <a 
              href="#projects"
              onClick={handlePulse as any}
              className="glass-cta btn-pulse-ring bg-white/5 text-white px-8 py-4 font-semibold text-lg relative shine-sweep"
            >
              <span className="relative z-10">{data.hero.ctas.secondary}</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}