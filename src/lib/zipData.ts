import { ZipCentroid } from "@/lib/types";

export const sampleZips: ZipCentroid[] = [
  {
    zip: "33785",
    city: "Indian Rocks Beach",
    state: "FL",
    lat: 27.8803,
    lng: -82.8507,
    density: "suburban"
  },
  {
    zip: "33706",
    city: "St. Pete Beach",
    state: "FL",
    lat: 27.7435,
    lng: -82.7437,
    density: "mixed"
  },
  {
    zip: "33701",
    city: "St. Petersburg",
    state: "FL",
    lat: 27.7707,
    lng: -82.6403,
    density: "urban"
  },
  {
    zip: "33602",
    city: "Downtown Tampa",
    state: "FL",
    lat: 27.9475,
    lng: -82.4584,
    density: "urban"
  }
];

export const sampleZipLabels = sampleZips.map((zip) => zip.zip).join(", ");
