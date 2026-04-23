import { useState, useEffect } from "react";
import { loadAllPortfolioData } from "@/lib/loadData";

export function usePortfolioData() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await loadAllPortfolioData();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to fetch portfolio data:", err);
          setError(err instanceof Error ? err : new Error("Failed to fetch data"));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
