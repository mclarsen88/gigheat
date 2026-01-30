"use client";

import { sampleZipLabels } from "@/lib/zipData";

interface ZipSearchBarProps {
  zip: string;
  onZipChange: (zip: string) => void;
  onSubmit: () => void;
  error?: string;
}

export default function ZipSearchBar({
  zip,
  onZipChange,
  onSubmit,
  error
}: ZipSearchBarProps) {
  return (
    <div className="sticky top-0 z-40 w-full bg-mist/90 px-4 pb-3 pt-4 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">GigHeat</p>
          <h1 className="text-lg font-semibold text-ink">
            Metro demand snapshot for gig workers
          </h1>
        </div>
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
          <label className="flex w-full flex-col text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            ZIP code
            <input
              value={zip}
              onChange={(event) => onZipChange(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-base font-medium text-ink shadow-sm focus:border-metro focus:outline-none focus:ring-2 focus:ring-metro/40"
              placeholder="Enter ZIP"
              inputMode="numeric"
              maxLength={5}
            />
          </label>
          <button
            onClick={onSubmit}
            className="rounded-xl bg-metro px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-metro-dark"
          >
            Update
          </button>
        </div>
      </div>
      <div className="mx-auto mt-2 max-w-5xl text-xs text-slate-500">
        {error ? (
          <span className="text-rose-500">{error}</span>
        ) : (
          <span>Demo ZIPs available: {sampleZipLabels}</span>
        )}
      </div>
    </div>
  );
}
