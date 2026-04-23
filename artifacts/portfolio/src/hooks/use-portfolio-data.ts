import { useState, useEffect } from 'react';

export function usePortfolioData() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const basePath = import.meta.env.BASE_URL;
        
        const [
          profile, hero, bio, education, experience, 
          projects, sparklabs, skills, certs, contact
        ] = await Promise.all([
          fetch(`${basePath}data/profile/basic.json`).then(res => res.json()),
          fetch(`${basePath}data/hero/hero.json`).then(res => res.json()),
          fetch(`${basePath}data/about/bio.json`).then(res => res.json()),
          fetch(`${basePath}data/education/education.json`).then(res => res.json()),
          fetch(`${basePath}data/experience/experience.json`).then(res => res.json()),
          fetch(`${basePath}data/projects/index.json`).then(res => res.json()),
          fetch(`${basePath}data/mega_projects/sparklabs.json`).then(res => res.json()),
          fetch(`${basePath}data/skills/skills.json`).then(res => res.json()),
          fetch(`${basePath}data/certifications/certs.json`).then(res => res.json()),
          fetch(`${basePath}data/contact/contact.json`).then(res => res.json()),
        ]);

        setData({
          profile, hero, bio, education, experience, 
          projects, sparklabs, skills, certs, contact
        });
      } catch (err) {
        console.error('Failed to fetch portfolio data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}