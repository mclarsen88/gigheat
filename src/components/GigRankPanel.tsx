"use client";

import { useState } from "react";
import { GigApp, ScoreResult } from "@/lib/types";
import AppCard from "@/components/AppCard";

interface GigRankPanelProps {
  apps: GigApp[];
  scores: ScoreResult[];
  demoMode: boolean;
  onOpenDataSources: () => void;
}

export default function GigRankPanel({
  apps,
  scores,
  demoMode,
  onOpenDataSources
}: GigRankPanelProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="relative h-full">
      <div className="hidden h-full flex-col gap-4 lg:flex">
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Switch Mode</p>
              <p className="text-base font-semibold text-ink">Demo Data Mode</p>
            </div>
            <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              <span
                className={`rounded-full px-3 py-1 ${
                  demoMode ? "bg-metro text-white" : ""
                }`}
              >
                Demo
              </span>
              <span className="rounded-full px-3 py-1 text-slate-400">
                Live
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Scores are estimated. Uses demo inputs only.
            </span>
            <button
              className="text-xs font-semibold text-metro"
              onClick={onOpenDataSources}
            >
              Data Sources
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Live Mode: Connect data providers.
          </p>
        </div>
        <div className="flex flex-col gap-4 overflow-y-auto pb-4 pr-2">
          {scores.map((score, index) => {
            const app = apps.find((item) => item.id === score.appId);
            if (!app) return null;
            return <AppCard key={score.appId} app={app} score={score} rank={index + 1} />;
          })}
        </div>
      </div>

      <div className="lg:hidden">
        <button
          className="fixed bottom-24 left-1/2 z-40 w-40 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg"
          onClick={() => setSheetOpen(true)}
        >
          View rankings
        </button>
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-white shadow-sheet transition-transform ${
            sheetOpen ? "translate-y-0" : "translate-y-[78%]"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <button
              className="h-2 w-16 rounded-full bg-slate-200"
              onClick={() => setSheetOpen((prev) => !prev)}
            />
            <button
              className="text-xs font-semibold text-metro"
              onClick={onOpenDataSources}
            >
              Data Sources
            </button>
          </div>
          <div className="max-h-[55vh] overflow-y-auto px-4 pb-24 pt-4">
            <div className="mb-4 rounded-2xl border border-slate-200 bg-mist px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Switch Mode</p>
              <div className="mt-2 flex items-center rounded-full border border-slate-200 bg-white p-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                <span className="rounded-full bg-metro px-3 py-1 text-white">Demo</span>
                <span className="rounded-full px-3 py-1 text-slate-400">Live</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">Connect data providers to unlock Live Mode.</p>
            </div>
            <div className="flex flex-col gap-4">
              {scores.map((score, index) => {
                const app = apps.find((item) => item.id === score.appId);
                if (!app) return null;
                return (
                  <AppCard key={score.appId} app={app} score={score} rank={index + 1} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
