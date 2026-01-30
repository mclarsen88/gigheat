"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl, { Map, GeoJSONSource } from "mapbox-gl";
import type { FeatureCollection, Geometry } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";
import { HeatPoint, ZipCentroid } from "@/lib/types";

interface MapViewProps {
  center: ZipCentroid | null;
  heatPoints: HeatPoint[];
}

const toGeoJson = (points: HeatPoint[]) => ({
  type: "FeatureCollection" as const,
  features: points.map((point) => ({
    type: "Feature" as const,
    properties: { intensity: point.intensity },
    geometry: {
      type: "Point" as const,
      coordinates: [point.lng, point.lat]
    }
  }))
});

export default function MapView({ center, heatPoints }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const geoJson = useMemo(() => toGeoJson(heatPoints), [heatPoints]);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !mapToken) return;

    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: center ? [center.lng, center.lat] : [-82.6403, 27.7707],
      zoom: 11,
      attributionControl: false
    });

    mapRef.current = map;

    map.on("load", () => {
      map.addSource("heat", {
        type: "geojson",
        data: geoJson
      });

      map.addLayer({
        id: "heatmap-layer",
        type: "heatmap",
        source: "heat",
        paint: {
          "heatmap-weight": ["get", "intensity"],
          "heatmap-intensity": 1.2,
          "heatmap-radius": 26,
          "heatmap-opacity": 0.75,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(79, 124, 255, 0)",
            0.2,
            "rgba(79, 124, 255, 0.5)",
            0.4,
            "rgba(79, 124, 255, 0.8)",
            0.7,
            "rgba(79, 124, 255, 0.95)",
            1,
            "rgba(57, 95, 230, 1)"
          ]
        }
      });

      setMapLoaded(true);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [center, geoJson, mapToken]);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;
    const source = mapRef.current.getSource("heat") as GeoJSONSource | undefined;
    if (source) {
      source.setData(geoJson as FeatureCollection<Geometry>);
    }
    if (center) {
      mapRef.current.easeTo({ center: [center.lng, center.lat], zoom: 12 });
    }
  }, [center, geoJson, mapLoaded]);

  if (!mapToken) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl border border-slate-200 bg-white/70 p-8 text-center text-sm text-slate-500">
        Mapbox token missing. Add <span className="font-semibold">NEXT_PUBLIC_MAPBOX_TOKEN</span> to view the live map.
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-metro">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
}
