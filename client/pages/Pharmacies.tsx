const samplePharmacies = [
  {
    name: "Parle Medico",
    status: "Paracetamol Available",
    tone: "bg-accent/10 text-accent",
  },
  {
    name: "Wellness Forever",
    status: "Out of Stock",
    tone: "bg-destructive/10 text-destructive",
  },
  {
    name: "Apollo Pharmacy",
    status: "Limited Azithromycin",
    tone: "bg-primary/10 text-primary",
  },
];

export default function Pharmacies() {
  return (
    <div className="space-y-10 pb-12">
      <header className="rounded-[3rem] border border-white/40 bg-white/90 px-6 py-12 shadow-card backdrop-blur-xl lg:px-16 dark:border-white/10 dark:bg-slate-900/80">
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
          Nearby Pharmacies
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          We are mapping trusted partners around you with live inventory
          insights. This section will soon feature an interactive map powered by
          real data feeds. Let us know when you are ready to build the full
          experience.
        </p>
      </header>

      <section className="rounded-[3rem] border border-dashed border-primary/30 bg-white/60 px-6 py-10 text-sm text-muted-foreground shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
        <p className="text-base font-semibold text-foreground">
          Preview of pharmacy signals
        </p>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Ask Fusion to complete this page when you want geolocation, Google
          Maps overlays, and live stock alerts wired in. Until then, here is a
          static mock to help visualise the flow.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {samplePharmacies.map((pharmacy) => (
            <li
              key={pharmacy.name}
              className="rounded-3xl border border-primary/15 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/70"
            >
              <p className="text-base font-semibold text-foreground">
                {pharmacy.name}
              </p>
              <span
                className={`mt-3 inline-flex rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${pharmacy.tone}`}
              >
                {pharmacy.status}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-8 rounded-2xl bg-primary/5 px-5 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
          Placeholder view — prompt again for full build
        </p>
      </section>
    </div>
  );
}
