import { GigApp, HeatPoint, ScoreResult, ZipCentroid } from "@/lib/types";

export const gigApps: GigApp[] = [
  { id: "uber", name: "Uber", type: "rideshare", theme: "bg-slate-900" },
  { id: "lyft", name: "Lyft", type: "rideshare", theme: "bg-pink-500" },
  { id: "spark", name: "Spark", type: "grocery", theme: "bg-orange-500" },
  { id: "instacart", name: "Instacart", type: "grocery", theme: "bg-emerald-500" },
  { id: "doordash", name: "DoorDash", type: "delivery", theme: "bg-red-500" },
  { id: "gopuff", name: "GoPuff", type: "delivery", theme: "bg-indigo-500" },
  { id: "amazonflex", name: "Amazon Flex", type: "delivery", theme: "bg-blue-500" },
  { id: "shipt", name: "Shipt", type: "errand", theme: "bg-emerald-700" }
];

const appTypeBase: Record<GigApp["type"], number> = {
  rideshare: 65,
  delivery: 58,
  grocery: 54,
  errand: 50
};

const bestTimesMap: Record<GigApp["type"], string> = {
  rideshare: "7–9am, 4–7pm",
  delivery: "11am–2pm, 6–9pm",
  grocery: "9am–1pm, 5–7pm",
  errand: "10am–1pm, 4–6pm"
};

const reasonMap: Record<GigApp["type"], string[]> = {
  rideshare: ["Commute peaks increase ride requests", "Dense corridors boost short trips"],
  delivery: ["Meal times drive order spikes", "Apartment clusters favor quick drops"],
  grocery: ["Weekday restocks keep baskets steady", "Suburban routes stay efficient"],
  errand: ["Afternoon errands stay consistent", "Smaller batches mean quick turns"]
};

const densityBoost: Record<ZipCentroid["density"], number> = {
  urban: 1.12,
  mixed: 1.05,
  suburban: 0.96
};

const dayBoost = (day: number) => {
  if (day === 0 || day === 6) return 1.08;
  if (day === 5) return 1.04;
  return 1.0;
};

const timeBoost = (hour: number) => {
  const morning = hour >= 6 && hour <= 10 ? 1.18 : 1.0;
  const midday = hour >= 11 && hour <= 14 ? 1.08 : 1.0;
  const evening = hour >= 16 && hour <= 20 ? 1.2 : 1.0;
  const late = hour >= 21 || hour <= 4 ? 0.9 : 1.0;
  return morning * midday * evening * late;
};

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, value));

const confidenceLabel = (score: number) => {
  if (score >= 75) return "High" as const;
  if (score >= 55) return "Med" as const;
  return "Low" as const;
};

export const scoreGigApps = (zipData: ZipCentroid, now = new Date()) => {
  const hour = now.getHours();
  const day = now.getDay();
  const weatherBoost = 1;
  return gigApps
    .map((app) => {
      const base = appTypeBase[app.type];
      const multiplier =
        timeBoost(hour) * dayBoost(day) * densityBoost[zipData.density] * weatherBoost;
      const variance = (Math.sin(hour + app.name.length) + 1.5) * 6;
      const score = clamp(base * multiplier + variance);
      return {
        appId: app.id,
        score: Math.round(score),
        confidence: confidenceLabel(score),
        bestTimes: bestTimesMap[app.type],
        reasons: reasonMap[app.type]
      } as ScoreResult;
    })
    .sort((a, b) => b.score - a.score);
};

export const generateHeatPoints = (zipData: ZipCentroid, topScore: number) => {
  const points: HeatPoint[] = [];
  const baseIntensity = Math.min(1, topScore / 100);

  for (let i = -3; i <= 3; i += 1) {
    for (let j = -3; j <= 3; j += 1) {
      const distance = Math.sqrt(i * i + j * j);
      const falloff = Math.max(0.2, 1 - distance / 5);
      const jitterLat = (Math.random() - 0.5) * 0.002;
      const jitterLng = (Math.random() - 0.5) * 0.002;
      points.push({
        lat: zipData.lat + i * 0.01 + jitterLat,
        lng: zipData.lng + j * 0.01 + jitterLng,
        intensity: Number((baseIntensity * falloff).toFixed(2))
      });
    }
  }

  return points;
};
