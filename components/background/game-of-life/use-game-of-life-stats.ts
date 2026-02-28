import { useEffect, useState } from "react"

interface Statistics {
  id: 1
  deaths: number
  rebirths: number
}

export function useGameOfLifeStats() {
  const [statistics, setStatistics] = useState<Statistics | null>()

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      try {
        const res = await fetch("/api/statistics", {
          method: "GET",
          headers: { Accept: "application/json" },
          cache: "no-store",
          signal: controller.signal
        })

        if (!res.ok) {
          console.error(`Request failed: ${res.status} ${res.statusText}`)
        }

        const data = (await res.json()) as Statistics
        setStatistics(data);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return
      }
    }

    loadData();
    return () => controller.abort();
  }, [])

  return { statistics } 
}