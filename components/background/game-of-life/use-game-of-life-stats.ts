import { useEffect, useState } from "react";

interface Statistics {
  id: 1;
  deaths: number;
  rebirths: number;
}

export function useGameOfLifeStats() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  useEffect(() => {
    let mounted = true;
    let currentController: AbortController | null = null;

    async function loadData() {
      // abort any previous in-flight request (optional, but nice)
      currentController?.abort();
      const controller = new AbortController();
      currentController = controller;

      try {
        const res = await fetch("/api/statistics", {
          method: "GET",
          headers: { Accept: "application/json" },
          cache: "no-store",
          signal: controller.signal,
        });

        if (!res.ok) {
          console.error(`Request failed: ${res.status} ${res.statusText}`);
          return;
        }

        const data = (await res.json()) as Statistics;
        if (mounted) setStatistics(data);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        console.error(e);
      }
    }

    loadData(); // initial fetch immediately
    const id = setInterval(loadData, 10_000);

    return () => {
      mounted = false;
      clearInterval(id);
      currentController?.abort();
    };
  }, []);

  return { statistics };
}