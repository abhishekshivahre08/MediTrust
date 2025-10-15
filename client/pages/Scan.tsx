import { FormEvent, useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeCameraScanConfig } from "html5-qrcode";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Fingerprint,
  Keyboard,
  Loader2,
  MapPinCheckInside,
  RefreshCw,
  ScanLine,
  ShieldCheck,
  ShieldQuestion,
  TriangleAlert,
} from "lucide-react";
import { AUTHENTIC_MEDICINES, MedicineRecord, findMedicineById } from "@/data/medicines";

const QR_READER_ID = "mediTrust-qr-reader";

type VerificationStatus = "idle" | "authentic" | "counterfeit" | "error";

type VerificationResult = {
  status: VerificationStatus;
  message: string;
  medicine?: MedicineRecord;
  raw?: string;
};

const guidance = [
  {
    icon: Fingerprint,
    title: "Dual factor validation",
    description: "QR signatures are matched with manufacturing ledgers and transport custody proofs before approval.",
  },
  {
    icon: Activity,
    title: "Signal health",
    description: "Heartbeat indicators show scan volume per city so you instantly know nationwide authenticity trends.",
  },
  {
    icon: MapPinCheckInside,
    title: "Pharmacy routing",
    description: "Successful scans unlock pharmacist directions and verified stock data within a 5 km radius.",
  },
];

const callouts = [
  {
    icon: CheckCircle2,
    tone: "text-accent",
    label: "Green band",
    copy: "Genuine medicine verified on MediTrust blockchain ledger.",
  },
  {
    icon: CircleAlert,
    tone: "text-primary",
    label: "Amber band",
    copy: "Review required. Batch flagged for further inspection by regulators.",
  },
  {
    icon: TriangleAlert,
    tone: "text-destructive",
    label: "Red band",
    copy: "Counterfeit or unverified. Do not dispense and escalate immediately.",
  },
];

const Scan = () => {
  const [isPreparing, setIsPreparing] = useState(true);
  const [cameraMessage, setCameraMessage] = useState("Initialising camera...");
  const [verification, setVerification] = useState<VerificationResult>({
    status: "idle",
    message: "Align the QR seal within the frame to begin.",
  });
  const [manualEntry, setManualEntry] = useState("");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isPausedForResult = useRef(false);

  useEffect(() => {
    let isCancelled = false;

    const mountScanner = async () => {
      if (typeof window === "undefined") return;
      if (!document.getElementById(QR_READER_ID)) return;

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraMessage("Camera access unavailable. Use manual verification instead.");
        setIsPreparing(false);
        return;
      }

      try {
        const cameras = await Html5Qrcode.getCameras();
        if (!cameras.length) {
          setCameraMessage("No camera detected. Connect a webcam or use manual verification.");
          setIsPreparing(false);
          return;
        }

        if (isCancelled) return;

        const html5QrCode = new Html5Qrcode(QR_READER_ID, {
          formatsToSupport: [
            Html5Qrcode.SUPPORTED_FORMATS.QR_CODE,
            Html5Qrcode.SUPPORTED_FORMATS.DATA_MATRIX,
          ],
        });
        scannerRef.current = html5QrCode;

        const config: Html5QrcodeCameraScanConfig = {
          fps: 15,
          qrbox: { width: 280, height: 280 },
          aspectRatio: 1,
        };

        setCameraMessage("Hold the pack steady. MediTrust will validate within seconds.");
        setIsPreparing(false);

        await html5QrCode.start(
          { deviceId: { exact: cameras[0].id } },
          config,
          (decodedText) => {
            if (isPausedForResult.current) return;
            evaluateCode(decodedText, "scan");
            html5QrCode.pause(true);
            isPausedForResult.current = true;
          },
          () => undefined
        );
      } catch (error) {
        setCameraMessage("Unable to start camera. Check permissions or verify manually.");
        setIsPreparing(false);
      }
    };

    mountScanner();

    return () => {
      isCancelled = true;
      async function teardown() {
        try {
          if (scannerRef.current) {
            if (scannerRef.current.isScanning) {
              await scannerRef.current.stop();
            }
            await scannerRef.current.clear();
          }
        } catch (error) {
          console.warn("Failed to dispose scanner", error);
        }
      }
      void teardown();
    };
  }, []);

  const evaluateCode = (raw: string, source: "scan" | "manual") => {
    const record = findMedicineById(raw);
    if (record) {
      setVerification({
        status: "authentic",
        medicine: record,
        raw,
        message:
          source === "scan"
            ? "Medicine is Genuine. Batch provenance confirmed via MediTrust ledger."
            : "Medicine is Genuine. Manual verification succeeded.",
      });
      return;
    }

    setVerification({
      status: "counterfeit",
      raw,
      message: "Counterfeit or Unverified Medicine detected. Quarantine stock and alert authorities.",
    });
  };

  const handleManualSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!manualEntry.trim()) return;
    evaluateCode(manualEntry, "manual");
    setManualEntry("");
  };

  const handleRescan = async () => {
    setVerification({ status: "idle", message: "Align the QR seal within the frame to begin." });
    isPausedForResult.current = false;
    try {
      await scannerRef.current?.resume();
    } catch (error) {
      setCameraMessage("Unable to resume scanning. Refresh the page to try again.");
    }
  };

  return (
    <div className="space-y-20 pb-16">
      <header className="relative overflow-hidden rounded-[3.5rem] border border-white/40 bg-white/95 px-6 py-14 shadow-[0_40px_90px_-50px_rgba(12,74,110,0.55)] backdrop-blur-2xl lg:px-20 dark:border-white/10 dark:bg-slate-900/80">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/20" aria-hidden />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="pill-badge bg-primary/10 text-primary">
              <ScanLine className="h-3.5 w-3.5" />
              Real-time medicine check
            </span>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
              Scan a QR seal to verify the medicine before it reaches your patients.
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              MediTrust inspects certificates from manufacturers, distributors, and regulators in milliseconds. Follow the
              steps below to complete an authenticity check with full traceability.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground/90">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                <ShieldCheck className="h-4 w-4" /> Secure session
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                <ArrowRight className="h-4 w-4" /> Blockchain match in &lt; 400ms
              </span>
            </div>
          </div>
          <div className="glass-panel space-y-4 rounded-[2.75rem] border border-primary/15 bg-white/80 p-6 text-sm shadow-inner dark:border-white/10 dark:bg-slate-900/70">
            <p className="text-base font-semibold text-foreground">Scan essentials</p>
            <ul className="grid gap-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                Position the QR within the glowing frame and avoid reflections.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                A status ribbon will highlight if the medicine is genuine or requires escalation.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary/70" />
                Verified scans unlock nearby pharmacy stock data instantly.
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
        <div className="space-y-6">
          <div className="rounded-[3.25rem] border border-white/40 bg-white/95 p-6 shadow-card backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/80">
            <div className="rounded-[2.5rem] border border-primary/15 bg-gradient-to-br from-white via-white to-primary/10 p-6 text-center dark:from-slate-900 dark:via-slate-900 dark:to-primary/20">
              <div className="relative mx-auto flex w-full max-w-md flex-col items-center gap-5">
                <div className="relative aspect-square w-full overflow-hidden rounded-[2.25rem] border border-primary/25 bg-slate-900/5 shadow-inner dark:border-white/10 dark:bg-slate-900/80">
                  <div id={QR_READER_ID} className="h-full w-full" />
                  <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] border border-dashed border-primary/30" aria-hidden />
                </div>
                <p className="text-sm text-muted-foreground">
                  {isPreparing ? (
                    <span className="inline-flex items-center gap-2 text-primary">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {cameraMessage}
                    </span>
                  ) : (
                    cameraMessage
                  )}
                </p>
                <VerificationBanner verification={verification} onRescan={handleRescan} />
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[3.25rem] border border-primary/10 bg-white/90 p-6 dark:border-white/10 dark:bg-slate-900/75">
            <h2 className="text-lg font-semibold text-foreground">Colour-coded outcomes</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Every result uses internationally recognised colour bands so pharmacists know exactly how to respond.
            </p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-3">
              {callouts.map((item) => (
                <li key={item.label} className="glass-panel flex flex-col gap-2 rounded-3xl border border-primary/10 bg-white/80 p-4 text-sm dark:border-white/10 dark:bg-slate-900/60">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-white/50 ${item.tone}`}>
                    <item.icon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="glass-panel rounded-[3.25rem] border border-primary/10 bg-white/90 p-6 dark:border-white/10 dark:bg-slate-900/75">
            <h2 className="text-lg font-semibold text-foreground">Manual verification</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter the alphanumeric ID printed beneath the QR code to cross-check authenticity without a camera.
            </p>
            <form onSubmit={handleManualSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Keyboard className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={manualEntry}
                  onChange={(event) => setManualEntry(event.target.value)}
                  placeholder="Type medicine ID (e.g. MED001)"
                  className="w-full rounded-full border border-primary/20 bg-white/70 px-11 py-3 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-slate-900/70"
                  aria-label="Medicine ID"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card transition hover:-translate-y-0.5"
              >
                Verify ID
              </button>
            </form>
          </div>

          <div className="glass-panel rounded-[3.25rem] border border-primary/10 bg-white/90 p-6 dark:border-white/10 dark:bg-slate-900/75">
            <h2 className="text-lg font-semibold text-foreground">Scan guidance</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Share these best practices with pharmacists and caregivers to keep verification fast and reliable.
            </p>
            <ul className="mt-5 grid gap-4">
              {guidance.map((item) => (
                <li key={item.title} className="glass-panel flex gap-3 rounded-3xl border border-primary/10 bg-white/80 p-4 text-sm dark:border-white/10 dark:bg-slate-900/60">
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel rounded-[3.25rem] border border-primary/10 bg-white/90 p-6 text-sm dark:border-white/10 dark:bg-slate-900/75">
            <h2 className="text-lg font-semibold text-foreground">Sample authentic batches</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Try scanning these demo IDs during the hackathon to experience the full verification flow.
            </p>
            <ul className="mt-5 grid gap-3">
              {AUTHENTIC_MEDICINES.map((medicine) => (
                <li
                  key={medicine.id}
                  className="flex items-center justify-between rounded-3xl border border-primary/10 bg-white/80 px-5 py-4 text-sm shadow-sm dark:border-white/10 dark:bg-slate-900/60"
                >
                  <div>
                    <p className="font-semibold text-foreground">{medicine.name}</p>
                    <p className="text-xs text-muted-foreground">{medicine.manufacturer}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    {medicine.id}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
};

interface VerificationBannerProps {
  verification: VerificationResult;
  onRescan: () => void;
}

const VerificationBanner = ({ verification, onRescan }: VerificationBannerProps) => {
  const tones: Record<VerificationStatus, string> = {
    idle: "bg-primary/10 text-primary",
    authentic: "bg-accent/20 text-accent",
    counterfeit: "bg-destructive/15 text-destructive",
    error: "bg-destructive/15 text-destructive",
  };

  const icons: Record<VerificationStatus, JSX.Element> = {
    idle: <ShieldQuestion className="h-6 w-6" />,
    authentic: <ShieldCheck className="h-6 w-6" />,
    counterfeit: <TriangleAlert className="h-6 w-6" />,
    error: <TriangleAlert className="h-6 w-6" />,
  };

  return (
    <div className={`glass-panel flex w-full flex-col gap-4 rounded-3xl border border-primary/15 p-5 text-left shadow-sm ${tones[verification.status]}`}>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/60 text-inherit">
          {icons[verification.status]}
        </span>
        <div className="space-y-1">
          <p className="text-base font-semibold">
            {verification.status === "authentic"
              ? "Medicine is Genuine"
              : verification.status === "counterfeit"
                ? "Counterfeit or Unverified Medicine"
                : verification.message}
          </p>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Scan reference {verification.raw ?? "N/A"}
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground/90">{verification.message}</p>
      {verification.medicine ? (
        <div className="rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-sm text-foreground shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Verified details</span>
            <p className="text-sm font-semibold">{verification.medicine.name}</p>
            <p className="text-xs text-muted-foreground">{verification.micine?.manufacturer}</p>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={onRescan}
        className="inline-flex items-center gap-2 self-start rounded-full border border-primary/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary transition hover:border-primary"
      >
        <RefreshCw className="h-4 w-4" />
        Scan again
      </button>
    </div>
  );
};

export default Scan;
