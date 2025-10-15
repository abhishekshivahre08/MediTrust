export default function About() {
  return (
    <div className="space-y-10 pb-12">
      <header className="rounded-[3rem] border border-white/40 bg-white/90 px-6 py-12 shadow-card backdrop-blur-xl lg:px-16 dark:border-white/10 dark:bg-slate-900/80">
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">About MediTrust</h1>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground">
          MediTrust was conceived during a health-tech hackathon to restore trust in medicine authenticity across India.
          Share your team story, mission, and roadmap here to spotlight the people building this movement.
        </p>
      </header>

      <section className="rounded-[3rem] border border-dashed border-primary/30 bg-white/60 px-6 py-10 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
        <h2 className="text-lg font-semibold text-foreground">Ready to personalise?</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          This is a placeholder canvas. Prompt Fusion when you're ready to add team bios, hackathon highlights, or press
          coverage so we can craft a cohesive story section.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {["Our mission", "Team", "Hackathon Journey", "Partners"].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-primary/15 bg-white/80 px-5 py-4 text-sm font-semibold text-muted-foreground shadow-sm dark:border-white/10 dark:bg-slate-900/70"
            >
              {item}
            </div>
          ))}
        </div>
        <p className="mt-8 rounded-2xl bg-primary/5 px-5 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
          Placeholder view — prompt again for full build
        </p>
      </section>
    </div>
  );
}
