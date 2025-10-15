import { Link } from "react-router-dom";
import {
  ActivitySquare,
  Atom,
  BadgeCheck,
  Camera,
  Fingerprint,
  HeartPulse,
  MapPinCheckInside,
  Network,
  ShieldCheck,
  Sparkle,
  Waves,
} from "lucide-react";

const impactStats = [
  { label: "Authenticity checks", value: "52k", hint: "Blockchain validated" },
  { label: "Cities covered", value: "118", hint: "Across India" },
  { label: "Trusted partners", value: "640+", hint: "Hospitals & pharmacies" },
];

const credibilityPillars = [
  {
    icon: ShieldCheck,
    title: "Cryptographic provenance",
    description:
      "Aggregated manufacturing proofs and cold-chain signatures guarantee each batch is tamper-free before it reaches retail.",
  },
  {
    icon: MapPinCheckInside,
    title: "Live pharmacy telemetry",
    description:
      "Inventory signals from verified pharmacies sync every 60 seconds so caregivers can route patients to genuine stock.",
  },
  {
    icon: Fingerprint,
    title: "Patient-first privacy",
    description:
      "Edge verification keeps personal data on-device while assuring regulators of compliance transparency for every scan.",
  },
];

const flowSteps = [
  {
    title: "Scan",
    icon: Camera,
    caption:
      "Capture the secure QR seal from any MediTrust-enabled medicine strip or carton.",
  },
  {
    title: "Validate",
    icon: ActivitySquare,
    caption:
      "We reconcile manufacturing, logistics, and regulator attestations in under 400ms.",
  },
  {
    title: "Locate",
    icon: Network,
    caption:
      "Surface the nearest partner pharmacy stocking the exact verified batch.",
  },
  {
    title: "Treat",
    icon: HeartPulse,
    caption:
      "Clinicians and caregivers act with confidence knowing authenticity is assured.",
  },
];

const differentiators = [
  {
    icon: Waves,
    title: "Signal intelligence",
    body: "Counterfeit hotspots are mapped using district-wise anomaly detection so outreach teams tackle the right clusters first.",
  },
  {
    icon: BadgeCheck,
    title: "Regulator dashboard",
    body: "Health authorities receive notarised ledgers for rapid intervention without exposing private patient data.",
  },
  {
    icon: Atom,
    title: "Developer friendly",
    body: "Open APIs let pharmacies and insurers embed authentic-medicine checks directly inside their existing systems.",
  },
];

export default function Index() {
  return (
    <div className="space-y-24 pb-20 lg:space-y-32">
      <section className="relative overflow-hidden rounded-[3.5rem] border border-white/40 bg-white/90 px-6 py-16 shadow-[0_55px_120px_-60px_rgba(12,74,110,0.55)] backdrop-blur-2xl lg:px-20 lg:py-20 dark:border-white/10 dark:bg-slate-900/75">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"
          aria-hidden
        />
        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <span className="pill-badge bg-primary/10 text-primary">
              <Sparkle className="h-3.5 w-3.5" />
              Rebuild medicine trust
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Every scan tells the story of a genuine, safe medicine journey.
              </h1>
              <p className="text-base text-muted-foreground sm:text-lg">
                Counterfeit medicines endanger millions. MediTrust combines
                blockchain provenance, live supply intelligence, and
                pharmacy-grade telemetry so you can validate authenticity before
                the first dose is dispensed.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/scan"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-semibold text-primary-foreground shadow-card transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                Start a scan
              </Link>
              <Link
                to="/pharmacies"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-7 py-3 text-base font-semibold text-primary transition hover:border-primary hover:text-primary"
              >
                View pharmacy network
              </Link>
            </div>
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {impactStats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-panel rounded-3xl px-5 py-6 text-center text-sm uppercase tracking-[0.3em] text-muted-foreground"
                >
                  <dt className="text-4xl font-bold text-primary sm:text-5xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-2 text-[0.7rem] leading-tight">
                    {stat.label}
                    <span className="block text-[0.55rem] normal-case tracking-[0.12em] text-muted-foreground/80">
                      {stat.hint}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div
              className="absolute inset-0 -rotate-6 rounded-[3rem] bg-gradient-to-br from-primary/40 via-primary/10 to-accent/40 blur-3xl"
              aria-hidden
            />
            <div className="relative space-y-5 rounded-[2.75rem] border border-white/40 bg-white/85 p-6 shadow-[0_50px_90px_-45px_rgba(12,74,110,0.55)] dark:border-white/10 dark:bg-slate-900/70">
              <div className="glass-panel rounded-[2.5rem] border border-primary/15 bg-gradient-to-tr from-white via-white to-primary/10 p-6 text-left shadow-inner dark:from-slate-900 dark:via-slate-900 dark:to-primary/15">
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary">
                  Real-time signal
                </p>
                <p className="mt-4 text-lg font-semibold text-foreground">
                  407 verified doses dispensed in the last 60 minutes across
                  Mumbai, Pune, and Ahmedabad.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  MediTrust auto-flags anomalies so field agents can intervene
                  before counterfeit stock circulates.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {credibilityPillars.map((item) => (
                  <article
                    key={item.title}
                    className="glass-panel flex flex-col gap-3 rounded-3xl border border-primary/10 bg-white/75 p-5 text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-card dark:border-white/10 dark:bg-slate-900/60"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 rounded-[3.5rem] border border-white/40 bg-white/90 px-6 py-14 shadow-card backdrop-blur-2xl lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-20 dark:border-white/10 dark:bg-slate-900/75">
        <div className="space-y-5">
          <span className="pill-badge bg-accent/15 text-accent">
            How it works
          </span>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Authenticity verification stitched into every moment of the care
            journey.
          </h2>
          <p className="text-base text-muted-foreground">
            MediTrust blends on-device cryptography, regulatory attestations,
            and pharmacy inventory bridges. The result is a seamless experience
            that earns trust from clinicians, caregivers, and policy makers
            alike.
          </p>
        </div>
        <ol className="relative grid gap-6">
          <div
            className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-primary/40 via-primary/10 to-accent/40"
            aria-hidden
          />
          {flowSteps.map((step, index) => (
            <li
              key={step.title}
              className="glass-panel relative flex gap-5 rounded-3xl px-6 py-5 shadow-sm"
            >
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card">
                <step.icon className="h-5 w-5" />
                <span className="absolute -left-10 font-semibold text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <div className="space-y-1">
                <p className="text-base font-semibold text-foreground">
                  {step.title}
                </p>
                <p className="text-sm text-muted-foreground">{step.caption}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-[3.5rem] border border-white/40 bg-white/90 px-6 py-14 shadow-card backdrop-blur-2xl lg:px-20 dark:border-white/10 dark:bg-slate-900/75">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="space-y-4">
            <span className="pill-badge bg-primary/10 text-primary">
              Why MediTrust
            </span>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Built with India’s medicine safety mission at heart.
            </h2>
            <p className="text-base text-muted-foreground">
              Counterfeit seizures grew 26% last year, while rural access to
              genuine stock dropped sharply. MediTrust equips pharmacists,
              regulators, and caregivers with contextual insights so every
              patient receives authentic treatment.
            </p>
            <div className="glass-panel rounded-[2.5rem] border border-primary/10 bg-gradient-to-br from-primary/10 via-transparent to-accent/15 px-6 py-5 text-sm text-foreground">
              <p className="text-base font-semibold text-primary">
                “We restored confidence across our 180 outlets in less than two
                weeks. Patients now ask for their MediTrust verification before
                purchase.”
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Wellness Forever Pharmacy Collective
              </p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {differentiators.map((item) => (
              <article
                key={item.title}
                className="glass-panel flex flex-col gap-3 rounded-3xl border border-primary/10 bg-white/80 p-5 text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-card dark:border-white/10 dark:bg-slate-900/60"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[3.5rem] border border-white/50 bg-gradient-to-br from-primary/90 via-primary to-accent/80 px-6 py-16 shadow-[0_50px_110px_-60px_rgba(12,74,110,0.75)] text-primary-foreground lg:px-20 lg:py-20">
        <div
          className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),transparent_60%)] opacity-70 lg:block"
          aria-hidden
        />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Join India’s most trusted network for authentic medicines.
            </h2>
            <p className="text-base text-primary-foreground/85">
              Whether you are a pharmacy chain, hospital group, or regulator,
              MediTrust helps you restore faith in every prescription.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/scan"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-base font-semibold text-primary shadow-card transition hover:-translate-y-0.5"
              >
                Experience the demo
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3 text-base font-semibold text-primary-foreground/90 transition hover:border-white"
              >
                Meet the team
              </Link>
            </div>
          </div>
          <div className="glass-panel rounded-[3rem] border border-white/40 bg-white/10 p-6 text-sm text-primary-foreground">
            <p className="text-lg font-semibold">Launch-ready modules</p>
            <ul className="mt-4 grid gap-3 text-sm">
              {[
                "QR authenticity verification",
                "Live stock dashboard",
                "Counterfeit heatmaps",
                "Regulator compliance exports",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
