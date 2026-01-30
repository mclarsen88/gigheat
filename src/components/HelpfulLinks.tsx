import Link from "next/link";

const sections = [
  {
    title: "Open Your Gig Apps",
    links: [
      { label: "Uber Driver login", href: "https://drivers.uber.com/" },
      { label: "Lyft Driver login", href: "https://www.lyft.com/drive" },
      { label: "DoorDash Dasher login", href: "https://www.doordash.com/dasher/login/" },
      { label: "Instacart Shopper login", href: "https://shoppers.instacart.com/login" },
      { label: "Spark Driver login", href: "https://drive4spark.walmart.com/" },
      { label: "Amazon Flex login", href: "https://flex.amazon.com/" },
      { label: "Shipt Shopper login", href: "https://www.shipt.com/be-a-shopper/" },
      { label: "GoPuff Driver login", href: "https://www.gopuff.com/go/drive" }
    ]
  },
  {
    title: "Check Traffic & Fuel",
    links: [
      { label: "Google Maps traffic", href: "https://www.google.com/maps" },
      { label: "Waze live map", href: "https://www.waze.com/live-map" },
      { label: "GasBuddy", href: "https://www.gasbuddy.com/" }
    ]
  },
  {
    title: "Weather Radar (More rain = more orders)",
    links: [{ label: "Weather radar for the entered ZIP", href: "https://www.weather.com/" }]
  },
  {
    title: "Gig Strategy & Tools",
    links: [
      { label: "IRS mileage deduction page", href: "https://www.irs.gov/tax-professionals/standard-mileage-rates" },
      { label: "Stride Tax", href: "https://stridehealth.com/" },
      { label: "Everlance", href: "https://www.everlance.com/" }
    ]
  }
];

const LinkIcon = () => (
  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-metro/10 text-metro">
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 7h10v10" />
      <path d="M7 17L17 7" />
    </svg>
  </div>
);

export default function HelpfulLinks({ zip }: { zip: string }) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8">
      <div className="rounded-3xl bg-white px-6 py-6 shadow-metro">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Helpful Links</p>
            <h2 className="text-lg font-semibold text-ink">Open the tools you need fast</h2>
          </div>
          <span className="text-xs text-slate-400">Tap-friendly cards</span>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-slate-100 bg-mist px-4 py-4">
              <h3 className="text-sm font-semibold text-ink">{section.title}</h3>
              <div className="mt-3 grid gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.label.includes("Weather radar") ? `https://www.weather.com/weather/today/l/${zip || "33701"}` : link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5"
                  >
                    <span>{link.label}</span>
                    <LinkIcon />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
