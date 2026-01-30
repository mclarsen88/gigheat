"use client";

interface DataSourcesModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DataSourcesModal({ open, onClose }: DataSourcesModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-metro">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Data Sources (Demo)</h2>
          <button
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-4 space-y-4 text-sm text-slate-600">
          <p>
            GigHeat is running in <span className="font-semibold">Demo Data Mode</span>. We do not
            connect to official real-time gig provider APIs yet.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Time-of-day + day-of-week weighting to mimic rush-hour demand.</li>
            <li>ZIP centroid density labels to estimate city vs suburb intensity.</li>
            <li>Optional weather hook (offline placeholder) for future expansion.</li>
          </ul>
          <p className="rounded-2xl bg-mist px-4 py-3 text-xs text-slate-500">
            When we connect real providers, scores and confidence will update automatically and the
            “Live Mode” toggle will unlock.
          </p>
        </div>
      </div>
    </div>
  );
}
