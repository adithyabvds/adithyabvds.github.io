import React, { useEffect, useState } from "react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { ResumePrint } from "@/components/ResumePrint";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Loader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div className="ios-spinner text-primary">
        <div/><div/><div/><div/><div/><div/><div/><div/>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const { data, loading, error } = usePortfolioData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [loading]);

  if (error || (!loading && !data)) {
    return <div className="min-h-screen flex items-center justify-center font-mono text-sm text-destructive">Error loading portfolio</div>;
  }

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 overflow-x-hidden">
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>
      
      {/* Ambient background blobs */}
      <div className="ambient-blob blob-1 print-hidden" />
      <div className="ambient-blob blob-2 print-hidden" />
      <div className="ambient-blob blob-3 print-hidden" />

      {data && (
        <>
          <ResumePrint data={data} />
          
          <div className="print-hidden">
            {/* Navigation */}
            <motion.nav 
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-50 pointer-events-none"
            >
              <div className="glass-pill px-6 h-14 flex items-center justify-between pointer-events-auto relative">
                <a href="#hero" className="font-display font-bold text-lg tracking-tight hover:text-primary transition-colors z-10">
                  {data.profile.name.split(' ')[0]}
                  <span className="text-primary">.</span>
                </a>
                
                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-2 text-sm font-medium relative z-10">
                  {navLinks.map(link => (
                    <a 
                      key={link.href}
                      href={link.href} 
                      className={`relative px-4 py-2 transition-colors ${activeSection === link.href.slice(1) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {activeSection === link.href.slice(1) && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-white/10 rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  ))}
                  <div className="w-px h-6 bg-white/10 mx-2" />
                  <button 
                    onClick={() => window.print()}
                    className="glass-cta bg-primary/20 text-primary-foreground px-5 py-2 rounded-full font-medium"
                  >
                    Resume
                  </button>
                </div>

                {/* Mobile Nav Toggle */}
                <button 
                  className="md:hidden p-2 text-foreground z-10"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>

              {/* Mobile Nav Menu */}
              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 16, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden absolute left-4 right-4 glass-panel rounded-2xl p-4 flex flex-col gap-2 pointer-events-auto"
                  >
                    {navLinks.map(link => (
                      <a 
                        key={link.href}
                        href={link.href} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-xl transition-colors ${activeSection === link.href.slice(1) ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:bg-white/5'}`}
                      >
                        {link.label}
                      </a>
                    ))}
                    <button 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.print();
                      }}
                      className="w-full mt-2 glass-cta bg-primary/20 text-primary-foreground px-4 py-3 rounded-xl font-medium"
                    >
                      Download Resume
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.nav>
            
            {/* Main Content */}
            <main className="container mx-auto px-6 max-w-6xl">
              <Hero data={data} />
              <About bio={data.bio} education={data.education} />
              <Experience experience={data.experience} />
              <Projects projects={data.projects} sparklabs={data.sparklabs} />
              <Skills skills={data.skills} certs={data.certs} />
              <Contact profile={data.profile} contact={data.contact} />
            </main>

            <footer className="py-8 text-center text-sm text-muted-foreground mt-12 mb-8">
              <p>&copy; {new Date().getFullYear()} {data.profile.name}. Designed & Built with intent.</p>
            </footer>
          </div>
        </>
      )}
    </div>
  );
}