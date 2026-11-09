import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { INVENTIONS } from '../data/inventions';
import { Menu, X, ArrowUpRight, AlertTriangle, Compass } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu and scroll to top on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  const isDetailRoute = location.pathname.startsWith('/projects/tfd-');
  const currentDetailId = isDetailRoute ? location.pathname.split('/')[2] : 'tfd-014';

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0B0A] text-[#F4F4F0] selection:bg-[#C6FF00] selection:text-[#0A0B0A]">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-[#C6FF00] focus:text-[#0A0B0A] focus:px-4 focus:py-2 focus:font-mono-tech focus:font-bold"
      >
        Skip to primary archive content
      </a>

      {/* Top Institutional Classification Strip */}
      <div className="border-b border-[#262A27] bg-[#141615] px-4 py-1.5 text-xs">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono-tech text-[11px] text-[#DCDCD6]">
            <span className="inline-flex items-center gap-1 bg-[#C6FF00] px-1.5 py-0.5 font-bold text-[#0A0B0A]">
              <AlertTriangle className="h-3 w-3" aria-hidden="true" />
              SPECULATIVE ARCHIVE
            </span>
            <span>
              ALL APPARATUS ARE FICTIONAL COUNTERFACTUAL PROTOTYPES FOR RESEARCH INQUIRY (2029–2045)
            </span>
          </div>
          <div className="hidden items-center gap-4 font-mono-tech text-[11px] text-[#9DA29D] xl:flex tabular-nums">
            <span>BASEL // ROTTERDAM // ZURICH</span>
            <span>•</span>
            <span>ARCHIVE VOL. XIV — 06 ACTIVE SPECIMENS</span>
          </div>
        </div>
      </div>

      {/* Main Brutalist Header Bar */}
      <header className="sticky top-0 z-40 border-b border-[#262A27] bg-[#0A0B0A]/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-[1600px] items-stretch justify-between">
          {/* Brand Identity Block */}
          <Link
            to="/"
            className="flex items-center gap-3.5 border-r border-[#262A27] px-4 py-3.5 sm:px-6 hover:bg-[#141615] transition-colors"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#C6FF00] bg-[#C6FF00] font-mono-tech text-sm font-bold text-[#0A0B0A]">
              TFD
            </div>
            <div>
              <div className="font-display text-sm sm:text-base font-bold tracking-tight text-[#F4F4F0] leading-none">
                THE FUTURE DEPARTMENT
              </div>
              <div className="mt-1 font-mono-tech text-[10px] tracking-wider text-[#9DA29D]">
                STUDIO FOR THINGS THAT DO NOT EXIST YET
              </div>
            </div>
          </Link>

          {/* Desktop Primary 4-Page Navigation */}
          <nav
            aria-label="Primary institutional navigation"
            className="hidden lg:flex items-stretch"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `mech-press flex items-center gap-2 border-r border-[#262A27] px-5 font-mono-tech text-xs transition-colors ${
                  isActive
                    ? 'bg-[#C6FF00] text-[#0A0B0A] font-bold'
                    : 'text-[#DCDCD6] hover:bg-[#141615] hover:text-[#C6FF00]'
                }`
              }
            >
              <span className="opacity-70">01</span>
              <span>DEPARTMENT</span>
            </NavLink>

            <NavLink
              to="/projects"
              end
              className={({ isActive }) =>
                `mech-press flex items-center gap-2 border-r border-[#262A27] px-5 font-mono-tech text-xs transition-colors ${
                  isActive
                    ? 'bg-[#C6FF00] text-[#0A0B0A] font-bold'
                    : 'text-[#DCDCD6] hover:bg-[#141615] hover:text-[#C6FF00]'
                }`
              }
            >
              <span className="opacity-70">02</span>
              <span>PROJECTS</span>
              <span className="ml-1 border border-current px-1 text-[10px] tabular-nums">06</span>
            </NavLink>

            <NavLink
              to={`/projects/${currentDetailId}`}
              className={() =>
                `mech-press flex items-center gap-2 border-r border-[#262A27] px-5 font-mono-tech text-xs transition-colors ${
                  isDetailRoute
                    ? 'bg-[#C6FF00] text-[#0A0B0A] font-bold'
                    : 'text-[#DCDCD6] hover:bg-[#141615] hover:text-[#C6FF00]'
                }`
              }
            >
              <span className="opacity-70">03</span>
              <span>PROJECT DETAIL</span>
              <span className="ml-1 border border-current px-1 text-[10px] uppercase tabular-nums">
                {currentDetailId.toUpperCase()}
              </span>
            </NavLink>

            <NavLink
              to="/research"
              className={({ isActive }) =>
                `mech-press flex items-center gap-2 border-r border-[#262A27] px-5 font-mono-tech text-xs transition-colors ${
                  isActive
                    ? 'bg-[#C6FF00] text-[#0A0B0A] font-bold'
                    : 'text-[#DCDCD6] hover:bg-[#141615] hover:text-[#C6FF00]'
                }`
              }
            >
              <span className="opacity-70">04</span>
              <span>RESEARCH</span>
            </NavLink>
          </nav>

          {/* Direct Specimen Jump Selector (Desktop) */}
          <div className="hidden 2xl:flex items-center gap-2 px-4">
            <label htmlFor="header-specimen-jump" className="font-mono-tech text-[11px] text-[#9DA29D] flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-[#C6FF00]" aria-hidden="true" />
              <span>DOSSIER JUMP:</span>
            </label>
            <select
              id="header-specimen-jump"
              value={isDetailRoute ? currentDetailId : ''}
              onChange={(e) => {
                if (e.target.value) navigate(`/projects/${e.target.value}`);
              }}
              className="border border-[#262A27] bg-[#141615] px-2.5 py-1.5 font-mono-tech text-xs text-[#F4F4F0] hover:border-[#C6FF00] cursor-pointer"
            >
              <option value="" disabled>
                SELECT APPARATUS [014–036]
              </option>
              {INVENTIONS.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  #{inv.number} — {inv.title}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="mech-press flex lg:hidden items-center justify-center border-l border-[#262A27] px-5 text-[#F4F4F0] hover:bg-[#141615] hover:text-[#C6FF00]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-[#262A27] bg-[#0A0B0A] lg:hidden">
            <nav aria-label="Mobile institutional navigation" className="grid grid-cols-1 divide-y divide-[#262A27]">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center justify-between px-5 py-4 font-mono-tech text-sm ${
                    isActive ? 'bg-[#C6FF00] text-[#0A0B0A] font-bold' : 'text-[#F4F4F0]'
                  }`
                }
              >
                <span>01 // DEPARTMENT OVERVIEW</span>
                <ArrowUpRight className="h-4 w-4" />
              </NavLink>
              <NavLink
                to="/projects"
                end
                className={({ isActive }) =>
                  `flex items-center justify-between px-5 py-4 font-mono-tech text-sm ${
                    isActive ? 'bg-[#C6FF00] text-[#0A0B0A] font-bold' : 'text-[#F4F4F0]'
                  }`
                }
              >
                <span>02 // PROJECTS ARCHIVE [06 SPECIMENS]</span>
                <ArrowUpRight className="h-4 w-4" />
              </NavLink>
              <NavLink
                to={`/projects/${currentDetailId}`}
                className={() =>
                  `flex items-center justify-between px-5 py-4 font-mono-tech text-sm ${
                    isDetailRoute ? 'bg-[#C6FF00] text-[#0A0B0A] font-bold' : 'text-[#F4F4F0]'
                  }`
                }
              >
                <span>03 // PROJECT DETAIL DOSSIER ({currentDetailId.toUpperCase()})</span>
                <ArrowUpRight className="h-4 w-4" />
              </NavLink>
              <NavLink
                to="/research"
                className={({ isActive }) =>
                  `flex items-center justify-between px-5 py-4 font-mono-tech text-sm ${
                    isActive ? 'bg-[#C6FF00] text-[#0A0B0A] font-bold' : 'text-[#F4F4F0]'
                  }`
                }
              >
                <span>04 // RESEARCH METHODOLOGY &amp; LAB</span>
                <ArrowUpRight className="h-4 w-4" />
              </NavLink>
            </nav>

            {/* Quick Apparatus Links in Mobile Drawer */}
            <div className="border-t border-[#262A27] bg-[#141615] p-4">
              <div className="mb-2 font-mono-tech text-[11px] text-[#9DA29D]">
                DIRECT SPECIMEN ACCESS:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {INVENTIONS.map((inv) => (
                  <Link
                    key={inv.id}
                    to={`/projects/${inv.id}`}
                    className="border border-[#262A27] bg-[#0A0B0A] px-3 py-2 font-mono-tech text-xs text-[#DCDCD6] hover:border-[#C6FF00] hover:text-[#C6FF00]"
                  >
                    <span className="font-bold text-[#C6FF00]">#{inv.number}</span> · {inv.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Landmark */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Brutalist Institutional Footer */}
      <footer className="border-t border-[#262A27] bg-[#0A0B0A] text-[#DCDCD6]">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 divide-y divide-[#262A27] md:grid-cols-12 md:divide-y-0 md:divide-x">
            {/* Col 1: Institution Statement */}
            <div className="p-6 sm:p-8 md:col-span-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center bg-[#C6FF00] font-mono-tech text-xs font-bold text-[#0A0B0A]">
                  TFD
                </span>
                <span className="font-display text-lg font-bold text-[#F4F4F0]">
                  THE FUTURE DEPARTMENT
                </span>
              </div>
              <p className="mt-4 text-sm text-[#9DA29D] leading-relaxed max-w-md">
                An independent speculative industrial design institution investigating counterfactual infrastructure, post-extractive machines, and civic instruments for problems emerging between 2029 and 2045.
              </p>
              <div className="mt-5 border border-[#262A27] bg-[#141615] p-3 font-mono-tech text-[11px] text-[#DCDCD6]">
                <span className="text-[#C6FF00] font-bold">DISCLOSURE:</span> Every apparatus documented in this archive is a fictional, non-commercial speculative research concept designed for critical inquiry. None is presented as existing commercial technology.
              </div>
            </div>

            {/* Col 2: Six Inventions Index */}
            <div className="p-6 sm:p-8 md:col-span-4">
              <h2 className="font-mono-tech text-xs font-bold uppercase tracking-wider text-[#C6FF00]">
                SPECIMEN LEDGER [TFD-014 — TFD-036]
              </h2>
              <ul className="mt-4 space-y-2 font-mono-tech text-xs">
                {INVENTIONS.map((inv) => (
                  <li key={inv.id}>
                    <Link
                      to={`/projects/${inv.id}`}
                      className="group flex items-center justify-between py-1 text-[#9DA29D] hover:text-[#F4F4F0]"
                    >
                      <span>
                        <span className="text-[#C6FF00] font-bold">#{inv.number}</span> — {inv.title}
                      </span>
                      <span className="text-[11px] opacity-70 group-hover:text-[#C6FF00]">
                        [{inv.horizonYear}] →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Navigation & Foundry Coordinates */}
            <div className="p-6 sm:p-8 md:col-span-3 flex flex-col justify-between">
              <div>
                <h2 className="font-mono-tech text-xs font-bold uppercase tracking-wider text-[#C6FF00]">
                  INSTITUTIONAL DIRECTORY
                </h2>
                <ul className="mt-4 space-y-2 font-mono-tech text-xs">
                  <li>
                    <Link to="/" className="text-[#9DA29D] hover:text-[#C6FF00]">
                      01 // DEPARTMENT MANIFESTO
                    </Link>
                  </li>
                  <li>
                    <Link to="/projects" className="text-[#9DA29D] hover:text-[#C6FF00]">
                      02 // PROJECTS MATRIX (06)
                    </Link>
                  </li>
                  <li>
                    <Link to="/projects/tfd-014" className="text-[#9DA29D] hover:text-[#C6FF00]">
                      03 // APPARATUS TECHNICAL DOSSIERS
                    </Link>
                  </li>
                  <li>
                    <Link to="/research" className="text-[#9DA29D] hover:text-[#C6FF00]">
                      04 // RESEARCH &amp; MATERIAL LAB
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#262A27] font-mono-tech text-[11px] text-[#9DA29D] tabular-nums">
                <div>FOUNDRY HQ: DREISPITZ SEKTOR B, BASEL</div>
                <div className="mt-1">LAT 47.5342° N // LON 7.6085° E</div>
                <div className="mt-1 text-[#F4F4F0]">ISSN 2941-014X (OPEN CIVIC ARCHIVE)</div>
              </div>
            </div>
          </div>

          {/* Monumental Wordmark Close */}
          <div className="border-t border-[#262A27] px-4 py-6 sm:px-8 flex flex-wrap items-center justify-between gap-4">
            <div className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F4F0]">
              THE FUTURE DEPARTMENT — VOL. XIV
            </div>
            <div className="font-mono-tech text-xs text-[#9DA29D]">
              COUNTERFACTUAL INDUSTRIAL DESIGN STUDIO © 2026–2045
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

