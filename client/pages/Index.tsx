import { Link } from "react-router-dom";
import {
  ScanLine,
  ShieldCheck,
  Microscope,
  MapPinCheckInside,
  Cpu,
  Sparkles,
  RadioTower,
  LineChart,
} from "lucide-react";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Blockchain-backed trust",
    description:
      "Every scan is validated against tamper-proof provenance records so you know exactly where your medicine originated.",
  },
  {
    icon: RadioTower,
    title: "Live pharmacy signals",
    description:
      "Track authentic stock availability nearby with real-time updates from verified pharmacy partners across India.",
  },
  {
    icon: Microscope,
    title: "AI anomaly alerts",
    description:
      "MediTrust flags suspicious batches instantly using pattern recognition tuned for counterfeit medicine markers.",
  },
];

const steps = [
  {
    icon: ScanLine,
    title: "Scan the QR seal",
    description:
      "Point MediTrust at the secure QR printed on the medicine strip or carton to start verification.",
  },
  {
    icon: Cpu,
    title: "Verify authenticity",
    description:
      "We cross-check the medicine ID with trusted blockchain sources and alert you in real time.",
  },
  {
    icon: MapPinCheckInside,
    title: "Find trusted stock",
    description:
      "Locate pharmacies near you where the same authenticated medicine is available right now.",
  },
];

const impactStats = [
  { label: "Counterfeits flagged", value: "12.5k" },
  { label: "Cities monitored", value: "85" },
  { label: "Trusted partners", value: "420+" },
];

export default function Index() {
  return (
    <div className="space-y-24 pb-12">
      <section className="relative overflow-hidden rounded-[3rem] border border-white/40 bg-white/90 px-6 py-16 shadow-card backdrop-blur-xl lg:px-16 lg:py-20 dark:border-white/10 dark:bg-slate-900/80">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-white to-accent/10 opacity-90 dark:from-primary/20 dark:via-slate-900 dark:to-accent/10" />
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              India’s health-tech first mover
            </span>
            <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Stop counterfeit medicines before they reach your family.
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              Over 20% of medicines sold in India face authenticity risks. MediTrust verifies every scan against
              blockchain-proofed supply data and tells you exactly which pharmacies stock the genuine batch.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/scan"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
              >
                <ScanLine className="h-5 w-5" />
                Scan now
              </Link>
              <Link
                to="/pharmacies"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-6 py-3 text-base font-semibold text-primary transition hover:border-primary hover:text-primary"
              >
                Explore pharmacies
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {impactStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-primary/10 bg-white/70 px-4 py-5 text-center text-sm uppercase tracking-[0.3em] text-muted-foreground shadow-sm dark:border-white/10 dark:bg-slate-900/60"
                >
                  <span className="block text-3xl font-bold text-primary sm:text-4xl">{stat.value}</span>
                  <span className="mt-2 block text-[0.7rem] leading-tight text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -rotate-6 rounded-[2rem] bg-gradient-to-br from-primary/60 via-primary to-accent/80 opacity-90 blur-3xl" aria-hidden />
            <div className="relative rounded-[2.5rem] border border-white/50 bg-white/90 p-6 shadow-[0_45px_80px_-45px_rgba(14,116,144,0.45)] dark:border-white/10 dark:bg-slate-900/80">
              <div className="space-y-6">
                <div className="flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Batch MT-45790</p>
                      <p className="text-xs text-muted-foreground">Manufactured • Cipla Labs</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Authentic
                  </span>
                </div>
                <div className="rounded-2xl border border-primary/15 bg-gradient-to-tr from-white via-white to-primary/15 p-5 text-sm leading-relaxed shadow-inner dark:from-slate-900 dark:via-slate-900 dark:to-primary/20">
                  <p className="text-sm text-muted-foreground">
                    “MediTrust’s live blockchain ledger helped us intercept counterfeit strips in Mumbai within minutes of
                    detection. Families trust our shelves again.”
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
                    Wellness Forever Pharmacy
                  </p>
                </div>
                <div className="grid gap-3">
                  {highlights.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-white/70 p-4 text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-card dark:border-white/10 dark:bg-slate-900/60"
                    >
                      <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 rounded-[3rem] border border-white/40 bg-white/90 px-6 py-14 shadow-card backdrop-blur-xl lg:grid-cols-2 lg:gap-16 lg:px-16 dark:border-white/10 dark:bg-slate-900/80">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-accent">
            <LineChart className="h-3.5 w-3.5" />
            Trusted flow
          </span>
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Built for caregivers, pharmacists, and regulators to collaborate in real time.
          </h2>
          <p className="text-base text-muted-foreground">
            Counterfeit detection in India is a collective problem. MediTrust stitches data from regulators, logistics,
            and pharmacy counters to guarantee the medicine you hold is the one prescribed.
          </p>
        </div>
        <div className="grid gap-6">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex items-start gap-4 rounded-3xl border border-primary/15 bg-white/75 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card dark:border-white/10 dark:bg-slate-900/60"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <step.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-base font-semibold text-foreground">{step.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
