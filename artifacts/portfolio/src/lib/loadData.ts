const cache = new Map<string, any>();

const BASE = import.meta.env.BASE_URL;

async function safeFetch<T = any>(path: string, fallback: T | null = null): Promise<T | null> {
  const url = `${BASE}${path.replace(/^\//, "")}`;
  if (cache.has(url)) return cache.get(url);
  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) {
      console.warn(`[loadData] Skipped ${path}: HTTP ${res.status}`);
      cache.set(url, fallback);
      return fallback;
    }
    const data = (await res.json()) as T;
    cache.set(url, data);
    return data;
  } catch (err) {
    console.warn(`[loadData] Failed ${path}:`, err);
    cache.set(url, fallback);
    return fallback;
  }
}

function isVisible(item: any): boolean {
  if (!item || typeof item !== "object") return false;
  if (item.enabled === false) return false;
  if (item.visibility && item.visibility !== "public") return false;
  if (item.public === false) return false;
  return true;
}

function sortByOrder<T extends { order?: number; featured?: boolean }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const af = a.featured ? 1 : 0;
    const bf = b.featured ? 1 : 0;
    if (af !== bf) return bf - af;
    const ao = typeof a.order === "number" ? a.order : 9999;
    const bo = typeof b.order === "number" ? b.order : 9999;
    return ao - bo;
  });
}

function normalizeProject(p: any): any {
  return {
    showDetails: true,
    showGithub: false,
    showLive: false,
    public: true,
    enabled: true,
    visibility: "public",
    ...p,
  };
}

async function loadProjectsCollection(): Promise<any[]> {
  const manifest = await safeFetch<any>("data/projects/index.json", []);
  // Backward compat: if index.json is itself an array of projects, just use it.
  if (Array.isArray(manifest)) {
    return sortByOrder(manifest.map(normalizeProject).filter(isVisible));
  }
  const files: string[] = Array.isArray(manifest?.projects) ? manifest.projects : [];
  if (!files.length) return [];
  const items = await Promise.all(
    files.map((file) => safeFetch<any>(`data/projects/${file}`)),
  );
  return sortByOrder(
    items
      .filter(Boolean)
      .map(normalizeProject)
      .filter(isVisible),
  );
}

async function loadCertsCollection(): Promise<any[]> {
  const manifest = await safeFetch<any>("data/certifications/certs.json", []);
  if (Array.isArray(manifest)) {
    return sortByOrder(manifest.filter(isVisible));
  }
  // Optional manifest mode: { certs: ["cert1.json", ...] }
  const files: string[] = Array.isArray(manifest?.certs) ? manifest.certs : [];
  if (!files.length) return [];
  const items = await Promise.all(
    files.map((file) => safeFetch<any>(`data/certifications/${file}`)),
  );
  return sortByOrder(items.filter(Boolean).filter(isVisible));
}

function normalizeCollection<T extends Record<string, any>>(arr: any): T[] {
  if (!Array.isArray(arr)) return [];
  return sortByOrder(arr.filter(isVisible)) as T[];
}

export async function loadAllPortfolioData() {
  const [
    profile,
    hero,
    bio,
    education,
    experience,
    sparklabs,
    skills,
    contact,
    projects,
    certs,
  ] = await Promise.all([
    safeFetch<any>("data/profile/basic.json", {}),
    safeFetch<any>("data/hero/hero.json", {}),
    safeFetch<any>("data/about/bio.json", {}),
    safeFetch<any>("data/education/education.json", []),
    safeFetch<any>("data/experience/experience.json", []),
    safeFetch<any>("data/mega_projects/sparklabs.json", null),
    safeFetch<any>("data/skills/skills.json", {}),
    safeFetch<any>("data/contact/contact.json", {}),
    loadProjectsCollection(),
    loadCertsCollection(),
  ]);

  // Normalize collection-shaped data so visibility/order flags work everywhere.
  const educationList = normalizeCollection(education);
  const experienceList = normalizeCollection(experience);

  // Mega project: filter products by visibility too.
  let sparklabsNormalized = sparklabs;
  if (sparklabs && Array.isArray(sparklabs.products)) {
    sparklabsNormalized = {
      ...sparklabs,
      products: sortByOrder(
        sparklabs.products
          .map((p: any) => ({
            showDetails: true,
            showGithub: false,
            showLive: false,
            public: true,
            enabled: true,
            visibility: "public",
            ...p,
          }))
          .filter(isVisible),
      ),
    };
  }

  return {
    profile: profile ?? {},
    hero: hero ?? {},
    bio: bio ?? {},
    education: educationList,
    experience: experienceList,
    projects,
    sparklabs: sparklabsNormalized,
    skills: skills ?? {},
    certs,
    contact: contact ?? {},
  };
}

export function clearPortfolioCache() {
  cache.clear();
}
