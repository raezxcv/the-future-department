import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { INVENTIONS } from '../data/inventions';
import { STUDIO_PRINCIPLES } from '../data/researchData';
import { ArrowRight, ArrowUpRight, Sliders, Layers, Compass } from 'lucide-react';

export const DepartmentPage: React.FC = () => {
  const [selectedInventionId, setSelectedInventionId] = useState<string>(INVENTIONS[0].id);
  const [horizonScrubYear, setHorizonScrubYear] = useState<number>(2034);

  const activePreview = INVENTIONS.find((i) => i.id === selectedInventionId) || INVENTIONS[0];

  // Match horizon scrubber year to closest counterfactual milestone
  const getHorizonScenario = (yr: number) => {
    if (yr <= 2031) {
      return {
        code: 'SIGNAL 2031 // URBAN AEROSOL LITIGATION',
        apparatus: INVENTIONS[1], // TFD-019
        trigger: 'Municipal API blackouts leave ring-road residents without admissible PM2.5 brake-dust evidence.',
        response: 'Deployment of TFD-019 Atmospheric Taxonomist 31-day borosilicate capillary samplers on motorway piers.'
      };
    }
    if (yr <= 2032) {
      return {
        code: 'SIGNAL 2032 // ACOUSTIC COMMONS COLLAPSE',
        apparatus: INVENTIONS[3], // TFD-027
        trigger: 'Arterial freight corridors exceed 84 dBA Lden while acoustic refuge is privatized into consumer earbuds.',
        response: 'Installation of TFD-027 precast geopolymer Helmholtz monoliths carving 2.4m public silent shadows.'
      };
    }
    if (yr <= 2033) {
      return {
        code: 'SIGNAL 2033 // LITHIUM SUPPLY RESTRICTION',
        apparatus: INVENTIONS[2], // TFD-023
        trigger: 'Multi-family housing fire codes restrict chemical battery banks amidst 80% intermittent wind/solar grids.',
        response: 'Commissioning of TFD-023 Circadian Ballast 68 kg UHPFRC vacuum flywheels for diurnal apartment buffering.'
      };
    }
    if (yr <= 2034) {
      return {
        code: 'SIGNAL 2034 // MUNICIPAL BIT-ROT THRESHOLD',
        apparatus: INVENTIONS[0], // TFD-014
        trigger: 'Legacy magnetic and solid-state municipal archives fail 50-year hydrological treaty audit requirements.',
        response: 'Inauguration of TFD-014 Lithic Memory Archive femtolaser-etched volcanic basalt vaults (500-year rating).'
      };
    }
    if (yr <= 2035) {
      return {
        code: 'SIGNAL 2035 // E-WASTE EXPORT MORATORIUM',
        apparatus: INVENTIONS[4], // TFD-031
        trigger: 'Trans-boundary e-waste shipment bans require neighborhood repair co-ops to reclaim PCB metals locally.',
        response: 'Rollout of TFD-031 Mycelial Solder Reclaimer 34°C rotary bio-leaching drums and titanium cathode combs.'
      };
    }
    return {
      code: 'SIGNAL 2036+ // ALPINE AQUIFER DEPLETION',
      apparatus: INVENTIONS[5], // TFD-036
      trigger: 'Upstream industrial water extraction exceeds summer glacial recharge behind opaque spreadsheet models.',
      response: 'Adoption of TFD-036 Tactile Treaty Terminal coupling bilateral allocation sliders to 185 N hydrostatic dampers.'
    };
  };

  const scenario = getHorizonScenario(horizonScrubYear);

  return (
    <div>
      {/* SECTION 1: Brutalist Asymmetric Split Hero */}
      <section className="border-b border-[#262A27] bg-[#0A0B0A]">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-12">
          {/* Left 7 Columns: Manifesto & Counterfactual Horizon Scrubber */}
          <div className="flex flex-col justify-between border-b border-[#262A27] p-6 sm:p-10 lg:col-span-7 lg:border-b-0 lg:border-r">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#C6FF00] bg-[#141615] px-3 py-1 font-mono-tech text-xs text-[#C6FF00]">
                <span>DEPT. FOR COUNTERFACTUAL INDUSTRIAL SYSTEMS</span>
                <span>//</span>
                <span>EST. BASEL · ROTTERDAM · ZURICH</span>
              </div>

              <h1 className="mt-6 font-display text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-[#F4F4F0] leading-[0.96]">
                Counterfactual hardware for problems that do not exist yet.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-[#DCDCD6] leading-relaxed max-w-2xl">
                The Future Department is a speculative industrial design institution. We investigate emerging civic, ecological, and energetic fragilities (2029–2045) by fabricating full-scale physical machines from cast iron, volcanic basalt, borosilicate glass, and geopolymer concrete.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/projects"
                  className="mech-press inline-flex items-center gap-3 bg-[#C6FF00] px-6 py-3.5 font-mono-tech text-xs font-bold text-[#0A0B0A] hover:bg-[#d4ff33]"
                >
                  <span>INSPECT ALL 06 INVENTIONS</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/research"
                  className="mech-press inline-flex items-center gap-2 border border-[#262A27] bg-[#141615] px-5 py-3.5 font-mono-tech text-xs text-[#F4F4F0] hover:border-[#C6FF00] hover:text-[#C6FF00]"
                >
                  <span>RESEARCH METHODOLOGY &amp; LAB</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Live Interactive Device: Counterfactual Horizon Scrubber (2029–2038) */}
            <div className="mt-10 border border-[#262A27] bg-[#141615] p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#262A27]">
                <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#C6FF00]">
                  <Sliders className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>INTERACTIVE COUNTERFACTUAL HORIZON SCRUBBER</span>
                </div>
                <span className="font-mono-tech text-lg font-bold text-[#F4F4F0] tabular-nums">
                  YEAR: <span className="text-[#C6FF00]">{horizonScrubYear}</span>
                </span>
              </div>

              <div className="my-4">
                <label htmlFor="horizon-year-slider" className="sr-only">
                  Select counterfactual projection year between 2030 and 2037
                </label>
                <input
                  id="horizon-year-slider"
                  type="range"
                  min={2030}
                  max={2037}
                  step={1}
                  value={horizonScrubYear}
                  onChange={(e) => setHorizonScrubYear(Number(e.target.value))}
                  className="w-full accent-[#C6FF00] cursor-pointer h-2 bg-[#0A0B0A]"
                />
                <div className="mt-1.5 flex justify-between font-mono-tech text-[11px] text-[#9DA29D] tabular-nums">
                  <span>2030</span>
                  <span>2031</span>
                  <span>2032</span>
                  <span>2033</span>
                  <span>2034</span>
                  <span>2035</span>
                  <span>2036</span>
                  <span>2037</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#0A0B0A] border border-[#262A27] p-4">
                <div className="md:col-span-8">
                  <div className="font-mono-tech text-[11px] font-bold text-[#C6FF00]">
                    {scenario.code}
                  </div>
                  <p className="mt-1 text-xs text-[#9DA29D] leading-relaxed">
                    <strong className="text-[#F4F4F0]">Projected Friction:</strong> {scenario.trigger}
                  </p>
                  <p className="mt-1 text-xs text-[#DCDCD6] leading-relaxed">
                    <strong className="text-[#C6FF00]">TFD Apparatus:</strong> {scenario.response}
                  </p>
                </div>
                <div className="md:col-span-4 flex md:justify-end">
                  <Link
                    to={`/projects/${scenario.apparatus.id}`}
                    className="mech-press inline-flex items-center gap-2 border border-[#C6FF00] bg-[#141615] px-3.5 py-2 font-mono-tech text-xs font-bold text-[#C6FF00] hover:bg-[#C6FF00] hover:text-[#0A0B0A]"
                  >
                    <span>OPEN #{scenario.apparatus.number}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Studio Foundry Hero Plate & Telemetry */}
          <div className="flex flex-col justify-between bg-[#0F1110] lg:col-span-5">
            <div className="relative overflow-hidden border-b border-[#262A27] plate-zoom">
              <img
                src="/images/studio/department-foundry-hero.png"
                alt="The Future Department prototyping foundry workbench in Basel holding cast ductile iron and borosilicate glass prototypes aligned by an acid-green datum laser"
                className="plate-img w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#0A0B0A]/90 border border-[#262A27] px-3 py-1.5 font-mono-tech text-[11px] text-[#F4F4F0]">
                <span className="text-[#C6FF00] font-bold">FIG 00.1</span> // BASEL METROLOGY &amp; PROTOTYPING BAY
              </div>
              <div className="absolute bottom-4 right-4 bg-[#0A0B0A]/90 border border-[#C6FF00] px-2.5 py-1 font-mono-tech text-[11px] text-[#C6FF00]">
                DATUM LASER: 532 nm CALIBRATED
              </div>
            </div>

            {/* Foundry Institutional Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 divide-y sm:divide-y-0 lg:divide-y divide-x divide-[#262A27] font-mono-tech">
              <div className="p-4 sm:p-5">
                <div className="text-[11px] text-[#9DA29D]">ACTIVE INVENTIONS</div>
                <div className="mt-1 text-2xl font-bold text-[#F4F4F0] tabular-nums">06 UNITS</div>
                <div className="mt-0.5 text-[11px] text-[#C6FF00]">TFD-014 → TFD-036</div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="text-[11px] text-[#9DA29D]">ARCHIVAL HORIZON</div>
                <div className="mt-1 text-2xl font-bold text-[#F4F4F0] tabular-nums">500 YRS</div>
                <div className="mt-0.5 text-[11px] text-[#9DA29D]">ZERO-CLOUD HARDWARE</div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="text-[11px] text-[#9DA29D]">PRIMARY SUBSTRATES</div>
                <div className="mt-1 text-lg font-bold text-[#F4F4F0]">BASALT · IRON · GLASS</div>
                <div className="mt-0.5 text-[11px] text-[#9DA29D]">POST-EXTRACTIVE BOM</div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="text-[11px] text-[#9DA29D]">COMMERCIAL STATUS</div>
                <div className="mt-1 text-lg font-bold text-[#C6FF00]">FICTIONAL / R&amp;D</div>
                <div className="mt-0.5 text-[11px] text-[#9DA29D]">SPECULATIVE INSTITUTION</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Current Projects Interactive Archival Ledger */}
      <section className="border-b border-[#262A27] bg-[#0A0B0A] py-16 sm:py-24">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-8 border-b border-[#262A27]">
            <div>
              <div className="font-mono-tech text-xs text-[#C6FF00] font-bold">
                CURRENT SPECIMEN LEDGER // VOL. XIV
              </div>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F4F0]">
                Six speculative inventions under investigation.
              </h2>
            </div>
            <Link
              to="/projects"
              className="mech-press inline-flex items-center gap-2 border border-[#C6FF00] bg-[#141615] px-5 py-3 font-mono-tech text-xs font-bold text-[#C6FF00] hover:bg-[#C6FF00] hover:text-[#0A0B0A]"
            >
              <span>OPEN FILTERABLE ARCHIVE MATRIX</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Interactive Split: 6-Row Specimen Index + Live Preview Console */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 border border-[#262A27]">
            {/* Left 7 Cols: Brutalist Numbered Ledger Rows */}
            <div className="divide-y divide-[#262A27] lg:col-span-7 lg:border-r lg:border-[#262A27]">
              {INVENTIONS.map((inv) => {
                const isSelected = inv.id === selectedInventionId;
                return (
                  <div
                    key={inv.id}
                    onMouseEnter={() => setSelectedInventionId(inv.id)}
                    className={`transition-colors p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer ${
                      isSelected ? 'bg-[#161B14]' : 'bg-[#0A0B0A] hover:bg-[#141615]'
                    }`}
                    onClick={() => setSelectedInventionId(inv.id)}
                  >
                    <div className="flex items-start sm:items-center gap-5">
                      <span
                        className={`font-display text-4xl sm:text-5xl font-bold leading-none tabular-nums ${
                          isSelected ? 'text-[#C6FF00]' : 'text-[#454945]'
                        }`}
                      >
                        {inv.number}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 font-mono-tech text-[11px]">
                          <span className="text-[#C6FF00] font-bold">{inv.category}</span>
                          <span className="text-[#9DA29D]">•</span>
                          <span className="text-[#9DA29D]">HORIZON {inv.horizonYear}</span>
                        </div>
                        <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-[#F4F4F0]">
                          {inv.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-[#9DA29D]">{inv.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t border-[#262A27] sm:border-t-0">
                      <span className="font-mono-tech text-[11px] border border-[#262A27] bg-[#141615] px-2.5 py-1 text-[#DCDCD6]">
                        {inv.phaseCode}
                      </span>
                      <Link
                        to={`/projects/${inv.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="mech-press inline-flex items-center gap-1.5 bg-[#C6FF00] px-3.5 py-2 font-mono-tech text-xs font-bold text-[#0A0B0A] hover:bg-[#d4ff33]"
                        aria-label={`Inspect full dossier for ${inv.title}`}
                      >
                        <span>DOSSIER</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right 5 Cols: Active Specimen Live Inspection Console */}
            <div className="bg-[#141615] p-6 sm:p-8 flex flex-col justify-between lg:col-span-5">
              <div>
                <div className="flex items-center justify-between gap-2 font-mono-tech text-xs">
                  <span className="bg-[#C6FF00] px-2 py-0.5 font-bold text-[#0A0B0A]">
                    SPECIMEN PREVIEW // #{activePreview.number}
                  </span>
                  <span className="text-[#9DA29D]">{activePreview.code}</span>
                </div>

                <div className="mt-4 overflow-hidden border border-[#262A27] bg-[#0A0B0A]">
                  <img
                    src={activePreview.images.hero.src}
                    alt={activePreview.images.hero.alt}
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                </div>

                <div className="mt-5">
                  <div className="font-mono-tech text-[11px] text-[#C6FF00]">
                    {activePreview.status}
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-bold text-[#F4F4F0]">
                    {activePreview.title} — {activePreview.subtitle}
                  </h3>
                  <p className="mt-3 text-sm text-[#DCDCD6] leading-relaxed">
                    {activePreview.summary}
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2.5 font-mono-tech text-xs">
                  <div className="border border-[#262A27] bg-[#0A0B0A] p-3">
                    <div className="text-[10px] text-[#9DA29D]">APPARATUS MASS</div>
                    <div className="mt-0.5 font-bold text-[#F4F4F0] tabular-nums">{activePreview.massKg}</div>
                  </div>
                  <div className="border border-[#262A27] bg-[#0A0B0A] p-3">
                    <div className="text-[10px] text-[#9DA29D]">ENVELOPE DIMENSIONS</div>
                    <div className="mt-0.5 font-bold text-[#F4F4F0] tabular-nums">{activePreview.dimensionsMm}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#262A27] flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono-tech text-[11px] text-[#9DA29D]">
                  4 PHOTOGRAPHIC PLATES + CAD SIMULATOR
                </span>
                <Link
                  to={`/projects/${activePreview.id}`}
                  className="mech-press inline-flex items-center gap-2 bg-[#C6FF00] px-5 py-2.5 font-mono-tech text-xs font-bold text-[#0A0B0A]"
                >
                  <span>OPEN FULL ENGINEERING DOSSIER</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Design Philosophy & Anti-Hype Doctrine (Architectural Concrete Surface) */}
      <section className="concrete-surface border-b border-[#262A27] py-16 sm:py-24">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#B8B9B2]">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-[#0A0B0A] px-3 py-1 font-mono-tech text-xs font-bold text-[#C6FF00]">
                <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                <span>INSTITUTIONAL DESIGN DOCTRINE</span>
              </div>
              <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#0A0B0A] leading-[1.02]">
                Why we build counterfactual machines in cast iron and stone.
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-end">
              <p className="text-base text-[#1B1E1C] leading-relaxed">
                Most visions of the future fall into two exhausted camps: frictionless corporate glass interfaces that pretend material limits do not exist, or dystopian cinema props. The Future Department operates as a serious industrial design research foundry—testing tomorrow’s civic dilemmas through physical weight, repairable mechanics, and thermodynamic honesty.
              </p>
            </div>
          </div>

          {/* 4 Studio Principles Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[#0A0B0A] bg-[#F4F4F0] divide-y md:divide-y-0 md:divide-x divide-[#0A0B0A]">
            {STUDIO_PRINCIPLES.map((p) => (
              <article key={p.number} className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[#B8B9B2] pb-3">
                    <span className="font-display text-4xl font-bold text-[#0A0B0A] tabular-nums">
                      {p.number}
                    </span>
                    <span className="bg-[#0A0B0A] px-2 py-0.5 font-mono-tech text-[10px] font-bold text-[#C6FF00]">
                      DOCTRINE AXIOM
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-[#0A0B0A] leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 font-mono-tech text-xs font-semibold text-[#1B1E1C]">
                    “{p.axiom}”
                  </p>
                </div>
                <p className="mt-4 text-sm text-[#262A27] leading-relaxed">
                  {p.body}
                </p>
              </article>
            ))}
          </div>

          {/* Comparative Paradigm Ledger */}
          <div className="mt-12 border border-[#0A0B0A] bg-[#0A0B0A] text-[#F4F4F0] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#262A27]">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#C6FF00]" aria-hidden="true" />
                <h3 className="font-mono-tech text-xs font-bold uppercase tracking-wider text-[#C6FF00]">
                  PARADIGM CONTRAST // SILICON VALLEY DEFAULT VS. THE FUTURE DEPARTMENT
                </h3>
              </div>
              <span className="font-mono-tech text-xs text-[#9DA29D]">
                COUNTERFACTUAL HARDWARE AUDIT
              </span>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left border-collapse font-mono-tech text-xs">
                <thead>
                  <tr className="border-b border-[#262A27] text-[#9DA29D]">
                    <th className="py-3 pr-4">DESIGN DIMENSION</th>
                    <th className="py-3 px-4">CONVENTIONAL TECH PARADIGM</th>
                    <th className="py-3 pl-4 text-[#C6FF00]">THE FUTURE DEPARTMENT STANDARD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262A27]">
                  <tr>
                    <td className="py-3.5 pr-4 font-bold text-[#F4F4F0]">Data &amp; Memory Lifespan</td>
                    <td className="py-3.5 px-4 text-[#9DA29D]">5–12 Year Cloud / Flash Migration Cycle</td>
                    <td className="py-3.5 pl-4 text-[#DCDCD6]">500-Year Femtolaser-Etched Volcanic Basalt (TFD-014)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-bold text-[#F4F4F0]">Environmental Sensing</td>
                    <td className="py-3.5 px-4 text-[#9DA29D]">Ephemeral API Dashboards &amp; Black-Box Calibration</td>
                    <td className="py-3.5 pl-4 text-[#DCDCD6]">Physical 31-Day Soot-Stained Glass Cassettes (TFD-019)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-bold text-[#F4F4F0]">Domestic Energy Storage</td>
                    <td className="py-3.5 px-4 text-[#9DA29D]">Extractive Lithium/Cobalt Pouches Hidden in Walls</td>
                    <td className="py-3.5 pl-4 text-[#DCDCD6]">68 kg UHPFRC Concrete &amp; Steel Vacuum Flywheel (TFD-023)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-bold text-[#F4F4F0]">Resource Governance</td>
                    <td className="py-3.5 px-4 text-[#9DA29D]">Frictionless Algorithmic Spreadsheets</td>
                    <td className="py-3.5 pl-4 text-[#DCDCD6]">185-Newton Coupled Hydrostatic Balance Console (TFD-036)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
