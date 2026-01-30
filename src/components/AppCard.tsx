import { GigApp, ScoreResult } from "@/lib/types";

interface AppCardProps {
  app: GigApp;
  score: ScoreResult;
  rank: number;
}

const IconBadge = ({ label }: { label: string }) => (
  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
    <svg viewBox="0 0 48 48" className="h-8 w-8">
      <rect x="4" y="4" width="40" height="40" rx="12" fill="currentColor" opacity="0.12" />
      <text
        x="24"
        y="28"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="currentColor"
        fontFamily="Inter, sans-serif"
      >
        {label}
      </text>
    </svg>
  </div>
);

export default function AppCard({ app, score, rank }: AppCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <IconBadge label={app.name.slice(0, 2).toUpperCase()} />
          <div>
            <p className="text-sm font-semibold text-ink">{app.name}</p>
            <p className="text-xs text-slate-500">Rank #{rank}</p>
          </div>
        </div>
        <span className="rounded-full bg-metro/10 px-3 py-1 text-xs font-semibold text-metro">
          Estimated (Demo)
        </span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Activity score</p>
          <p className="text-2xl font-semibold text-ink">{score.score}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Confidence</p>
          <p className="text-sm font-semibold text-ink">{score.confidence}</p>
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Best times</p>
        <p className="text-sm font-semibold text-ink">{score.bestTimes}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Why</p>
        <ul className="list-disc space-y-1 pl-4 text-sm text-slate-600">
          {score.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
