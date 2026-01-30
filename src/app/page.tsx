"use client";

import { useMemo, useState } from "react";
import MapView from "@/components/MapView";
import ZipSearchBar from "@/components/ZipSearchBar";
import GigRankPanel from "@/components/GigRankPanel";
import DataSourcesModal from "@/components/DataSourcesModal";
import HelpfulLinks from "@/components/HelpfulLinks";
import { generateHeatPoints, gigApps, scoreGigApps } from "@/lib/demoScoring";
import { sampleZips } from "@/lib/zipData";
import { ScoreResult, ZipCentroid } from "@/lib/types";

const defaultZip = sampleZips[2];

const lookupZip = async (zip: string, token?: string): Promise<ZipCentroid | null> => {
  const match = sampleZips.find((item) => item.zip === zip);
  if (match) return match;
  if (!token) return null;

  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${zip}.json?types=postcode&access_token=${token}`
  );
  if (!response.ok) return null;
  const data = await response.json();
  const feature = data?.features?.[0];
  if (!feature?.center) return null;

  return {
    zip,
    city: feature.text || "Unknown",
    state: feature.context?.find((context: { id: string }) => context.id?.includes("region"))?.text || "",
    lat: feature.center[1],
    lng: feature.center[0],
    density: "mixed"
  };
};

export default function Home() {
  const [zip, setZip] = useState(defaultZip.zip);
  const [zipData, setZipData] = useState<ZipCentroid>(defaultZip);
  const [scores, setScores] = useState<ScoreResult[]>(scoreGigApps(defaultZip));
  const [heatPoints, setHeatPoints] = useState(generateHeatPoints(defaultZip, scores[0]?.score ?? 60));
  const [error, setError] = useState<string | undefined>();
  const [showSources, setShowSources] = useState(false);
  const [loading, setLoading] = useState(false);

  const demoMode = true;

  const mapToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const handleSubmit = async () => {
    const trimmed = zip.trim();
    if (!/^\d{5}$/.test(trimmed)) {
      setError("Enter a valid 5-digit ZIP code.");
      return;
    }
    setLoading(true);
    const data = await lookupZip(trimmed, mapToken);
    if (!data) {
      setError(
        "ZIP lookup unavailable in demo build—use sample ZIPs: 33785, 33706, 33701, 33602."
      );
      setLoading(false);
      return;
    }
    const newScores = scoreGigApps(data);
    setZip(trimmed);
    setZipData(data);
    setScores(newScores);
    setHeatPoints(generateHeatPoints(data, newScores[0]?.score ?? 60));
    setError(undefined);
    setLoading(false);
  };

  const scoreSummary = useMemo(() => scores.slice(0, 3), [scores]);

  return (
    <div className="min-h-screen bg-mist">
      <ZipSearchBar zip={zip} onZipChange={setZip} onSubmit={handleSubmit} error={error} />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-20 pt-6 lg:grid lg:grid-cols-[1.4fr_0.9fr]">
        <section className="flex flex-col gap-4">
          <div className="rounded-3xl border border-slate-100 bg-white px-5 py-5 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Demo Data Mode</p>
                <h2 className="text-lg font-semibold text-ink">
                  Heat snapshot for {zipData.city}, {zipData.state}
                </h2>
                <p className="text-sm text-slate-500">
                  Estimated activity for {zipData.zip}. {loading ? "Updating..." : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-metro/10 px-3 py-1 text-xs font-semibold text-metro">
                  Estimated (Demo)
                </span>
                <button
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500"
                  disabled
                >
                  Live Mode Locked
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {scoreSummary.map((score) => {
                const app = gigApps.find((item) => item.id === score.appId);
                if (!app) return null;
                return (
                  <div key={app.id} className="rounded-2xl border border-slate-100 bg-mist px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{app.name}</p>
                    <p className="text-xl font-semibold text-ink">{score.score}</p>
                    <p className="text-xs text-slate-500">Confidence: {score.confidence}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="h-[52vh] min-h-[320px] w-full">
            <MapView center={zipData} heatPoints={heatPoints} />
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white px-5 py-5 shadow-sm">
            <h3 className="text-sm font-semibold text-ink">Demo modeling inputs</h3>
            <p className="mt-2 text-sm text-slate-500">
              Scores are generated from time-of-day demand curves, day-of-week weighting, and a
              city/suburb proxy from the ZIP centroid. No official gig-provider data is used.
            </p>
          </div>
        </section>
        <aside className="relative">
          <GigRankPanel
            apps={gigApps}
            scores={scores}
            demoMode={demoMode}
            onOpenDataSources={() => setShowSources(true)}
          />
        </aside>
      </main>
      <HelpfulLinks zip={zip} />
      <DataSourcesModal open={showSources} onClose={() => setShowSources(false)} />
    </div>
  );
}
