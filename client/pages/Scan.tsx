import { FormEvent, useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeCameraScanConfig } from "html5-qrcode";
import {
  ShieldCheck,
  TriangleAlert,
  ScanLine,
  Loader2,
  RefreshCw,
  Keyboard,
  ShieldQuestion,
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

const Scan = () => {
  const [isPreparing, setIsPreparing] = useState(true);
  const [cameraMessage, setCameraMessage] = useState("Initialising camera...");
  const [verification, setVerification] = useState<VerificationResult>({
    status: "idle",
    message: "Awaiting scan.",
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
        setCameraMessage("Camera access is not supported on this device. Try manual verification.");
        setIsPreparing(false);
        return;
      }

      try {
        const cameras = await Html5Qrcode.getCameras();
        if (!cameras.length) {
          setCameraMessage("No camera detected. Try connecting a webcam or use manual verification.");
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
          fps: 12,
          qrbox: { width: 260, height: 260 },
          aspectRatio: 1,
        };

        setCameraMessage("Align the QR seal within the frame to verify authenticity.");
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
        setCameraMessage("Unable to start the camera. Check permissions or use manual verification.");
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
            ? "Medicine is Genuine. Verified against MediTrust authenticity records."
            : "Medicine is Genuine. Manual verification succeeded.",
      });
      return;
    }

    setVerification({
      status: "counterfeit",
      raw,
      message: "Counterfeit or Unverified Medicine. Please alert your pharmacist immediately.",
    });
  };

  const handleManualSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!manualEntry.trim()) return;
    evaluateCode(manualEntry, "manual");
    setManualEntry("");
  };

  const handleRescan = async () => {
    setVerification({ status: "idle", message: "Scan the QR seal to verify." });
    isPausedForResult.current = false;
    try {
      await scannerRef.current?.resume();
    } catch (error) {
      setCameraMessage("Unable to resume scanning. Refresh the page to try again.");
    }
  };

  return (
    <div className="space-y-14 pb-12">
      <header className="rounded-[3rem] border border-white/40 bg-white/90 px-6 py-12 shadow-card backdrop-blur-xl lg:px-16 dark:border-white/10 dark:bg-slate-900/80">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              <ScanLine className="h-3.5 w-3.5" />
              Verify instantly
            </span>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Scan medicine QR to confirm it is authentically sourced.
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              MediTrust checks every QR tag with layered blockchain consensus and health authority datasets. Show the QR
              code on your strip or box to start.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-3xl border border-primary/20 bg-primary/5 px-6 py-4 text-sm text-primary dark:border-white/10 dark:bg-slate-900/60">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Quick tip
            </p>
            <p className="text-sm text-primary">
              Hold the QR 10 cm away. Avoid glare for faster validation.
            </p>
          </div>
        </div>
      </header>

      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="rounded-[3rem] border border-white/40 bg-white/95 p-6 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
          <div className="rounded-[2.25rem] border border-primary/15 bg-gradient-to-br from-white via-white to-primary/10 p-6 text-center dark:from-slate-900 dark:via-slate-900 dark:to-primary/20">
            <div className="relative mx-auto flex w-full max-w-sm flex-col items-center gap-4">
              <div className="aspect-square w-full overflow-hidden rounded-[2rem] border border-primary/20 bg-slate-900/5 shadow-inner dark:border-white/10 dark:bg-slate-900/80">
                <div id={QR_READER_ID} className="h-full w-full" />
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
              {verification.status !== "idle" ? (
                <VerificationBanner verification={verification} onRescan={handleRescan} />
              ) : null}
            </div>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="rounded-[3rem] border border-white/40 bg-white/95 p-6 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
            <h2 className="text-lg font-semibold text-foreground">Manual verification</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              No camera? Enter the alphanumeric ID printed below the QR to cross-check the authenticity instantly.
            </p>
            <form onSubmit={handleManualSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Keyboard className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={manualEntry}
                  onChange={(event) => setManualEntry(event.target.value)}
                  placeholder="Enter medicine ID"
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

          <div className="rounded-[3rem] border border-white/40 bg-white/95 p-6 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
            <h2 className="text-lg font-semibold text-foreground">Sample authentic batches</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Try scanning these demo QR IDs during the hackathon to experience the full flow.
            </p>
            <ul className="mt-4 grid gap-3">
              {AUTHENTIC_MEDICINES.map((medicine) => (
                <li
                  key={medicine.id}
                  className="flex items-center justify-between rounded-2xl border border-primary/10 bg-white/70 px-4 py-3 text-sm shadow-sm dark:border-white/10 dark:bg-slate-900/60"
                >
                  <div>
                    <p className="font-semibold text-foreground">{medicine.name}</p>
                    <p className="text-xs text-muted-foreground">{medicine.manufacturer}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
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
  const iconMap: Record<VerificationStatus, JSX.Element> = {
    idle: <ShieldQuestion className="h-6 w-6 text-muted-foreground" />,
    authentic: <ShieldCheck className="h-6 w-6 text-accent" />,
    counterfeit: <TriangleAlert className="h-6 w-6 text-destructive" />,
    error: <TriangleAlert className="h-6 w-6 text-destructive" />,
  };

  const tone =
    verification.status === "authentic"
      ? "bg-accent/15 text-accent"
      : verification.status === "counterfeit"
        ? "bg-destructive/10 text-destructive"
        : "bg-primary/10 text-primary";

  return (
    <div className={"flex w-full flex-col gap-4 rounded-3xl border border-primary/10 p-5 text-left shadow-sm " + tone}>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/40">
          {iconMap[verification.status]}
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
      <p className="text-sm text-muted-foreground">{verification.message}</p>
      {verification.medicine ? (
        <div className="rounded-2xl border border-white/50 bg-white/80 px-4 py-3 text-sm text-foreground shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Verified details
            </span>
            <p className="text-sm font-semibold">{verification.medicine.name}</p>
            <p className="text-xs text-muted-foreground">{verification.medicine.manufacturer}</p>
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
