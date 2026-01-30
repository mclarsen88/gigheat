# GigHeat

GigHeat is a mobile-first demo web app that helps gig workers decide which apps to prioritize for a given ZIP code. It includes a real map with a heatmap overlay, a ranked list of gig apps, and a clear “Demo Data Mode” disclaimer.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

Create a `.env.local` file (optional):

```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
# or
MAPBOX_TOKEN=your_mapbox_token
```

- If the token is set, the map and ZIP geocoding will work for any ZIP.
- If the token is not set, the app shows a friendly warning and supports these sample ZIPs: **33785, 33706, 33701, 33602**.

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import the repo into Vercel.
3. (Optional) add `NEXT_PUBLIC_MAPBOX_TOKEN` in Vercel environment variables.
4. Deploy.

## Demo scoring model

The demo model uses:
- Local time and day-of-week weighting (rush-hour boosts).
- ZIP centroid density labels (urban vs suburban).
- App type weighting (rideshare vs grocery vs delivery).

The code is structured to swap in real data later without changing UI components.

## Extending to real data later

1. Add a serverless API route to fetch real demand signals.
2. Replace `scoreGigApps` with a call to the new endpoint.
3. Update the “Live Mode” toggle once provider connections are ready.
