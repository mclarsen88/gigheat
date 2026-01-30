export type GigAppType = "rideshare" | "delivery" | "grocery" | "errand";

export interface GigApp {
  id: string;
  name: string;
  type: GigAppType;
  theme: string;
}

export interface ScoreResult {
  appId: string;
  score: number;
  confidence: "Low" | "Med" | "High";
  bestTimes: string;
  reasons: string[];
}

export interface HeatPoint {
  lat: number;
  lng: number;
  intensity: number;
}

export interface ZipCentroid {
  zip: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  density: "urban" | "suburban" | "mixed";
}
