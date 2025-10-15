import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { Menu, X, ShieldCheck, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Home", to: "/" },
  { label: "Scan", to: "/scan" },
  { label: "Pharmacies", to: "/pharmacies" },
  { label: "About", to: "/about" },
];

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" aria-hidden />
      <div className="fixed inset-0 -z-20 bg-mesh-blue opacity-50" aria-hidden />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-white/40 bg-white/80 shadow-glow backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
          <div className="flex items-center justify-between px-6 py-4">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-primary">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <span className="flex flex-col leading-tight text-foreground">
                <span className="text-base font-medium text-muted-foreground">
                  MediTrust
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Authentic Care
                </span>
              </span>
            </Link>
            <nav className="hidden items-center gap-2 lg:flex">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-card"
                        : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/scan"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-card transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                <ScanLine className="h-4 w-4" />
                Scan Now
              </Link>
            </nav>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-white text-primary shadow-sm transition hover:border-primary hover:text-primary lg:hidden dark:border-white/10 dark:bg-slate-900"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          {isMenuOpen ? (
            <div className="border-t border-white/70 bg-white/90 px-6 pb-6 pt-2 backdrop-blur-lg dark:border-white/10 dark:bg-slate-900/95">
              <div className="flex flex-col gap-3">
                {navigation.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      cn(
                        "rounded-2xl px-4 py-2 text-base font-medium transition",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Link
                  to="/scan"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2 text-base font-semibold text-primary-foreground shadow-card"
                >
                  <ScanLine className="h-5 w-5" />
                  Scan Now
                </Link>
              </div>
            </div>
          ) : null}
        </header>

        <main className="mt-8 flex-1">
          <Outlet />
        </main>

        <footer className="mt-12 rounded-3xl border border-white/40 bg-white/80 px-6 py-6 text-sm text-muted-foreground shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} MediTrust. Built to restore confidence in every
              dose.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em]">
              <span>Reliable</span>
              <span>Secure</span>
              <span>Connected</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
