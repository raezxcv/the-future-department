import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { INVENTIONS, ImagePlate } from '../data/inventions';
import { InteractiveSchematic } from '../components/InteractiveSchematic';
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  X,
  AlertTriangle,
  Crosshair,
  ChevronDown,
  ChevronUp,
  Layers,
  ShieldAlert,
  Cpu
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const currentIndex = INVENTIONS.findIndex((inv) => inv.id === id);
  const invention = currentIndex >= 0 ? INVENTIONS[currentIndex] : INVENTIONS[0];
  const resolvedIndex = currentIndex >= 0 ? currentIndex : 0;

  const prevInvention = INVENTIONS[(resolvedIndex - 1 + INVENTIONS.length) % INVENTIONS.length];
  const nextInvention = INVENTIONS[(resolvedIndex + 1) % INVENTIONS.length];

  const plateKeys: ('hero' | 'material' | 'context' | 'technical')[] = [
    'hero',
    'material',
    'context',
    'technical'
  ];

  const [activePlateKey, setActivePlateKey] = useState<'hero' | 'material' | 'context' | 'technical'>('hero');
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [activeHotspotId, setActiveHotspotId] = useState<string>(invention.callouts[0]?.id || 'c1');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [expandedStepIdx, setExpandedStepIdx] = useState<number | null>(0);

  // Reset plate and hotspot when navigating between inventions
  useEffect(() => {
    setActivePlateKey('hero');
    setActiveHotspotId(invention.callouts[0]?.id || 'c1');
    setExpandedStepIdx(0);
  }, [invention.id]);

  // Keyboard support for Lightbox modal (Escape, Left, Right)
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') {
        const idx = plateKeys.indexOf(activePlateKey);
        setActivePlateKey(plateKeys[(idx + 1) % plateKeys.length]);
      }
      if (e.key === 'ArrowLeft') {
        const idx = plateKeys.indexOf(activePlateKey);
        setActivePlateKey(plateKeys[(idx - 1 + plateKeys.length) % plateKeys.length]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, activePlateKey]);

  const activePlate: ImagePlate = invention.images[activePlateKey];
  const activeHotspot = invention.callouts.find((c) => c.id === activeHotspotId) || invention.callouts[0];

  return (
    <div className="bg-[#0A0B0A] min-h-screen">
      {/* Top 6-Apparatus Rapid Switcher Strip */}
      <div className="border-b border-[#262A27] bg-[#141615]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono-tech text-xs">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-[#9DA29D] hover:text-[#C6FF00]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>BACK TO ARCHIVE MATRIX</span>
            </Link>
            <span className="text-[#454945]">/</span>
            <span className="text-[#C6FF00] font-bold">{invention.code}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1" role="navigation" aria-label="Switch apparatus dossier">
            {INVENTIONS.map((item) => {
              const isCurrent = item.id === invention.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(`/projects/${item.id}`)}
                  className={`mech-press px-2.5 py-1 font-mono-tech text-xs border tabular-nums ${
                    isCurrent
                      ? 'border-[#C6FF00] bg-[#C6FF00] text-[#0A0B0A] font-bold'
                      : 'border-[#262A27] bg-[#0A0B0A] text-[#9DA29D] hover:border-[#9DA29D] hover:text-[#F4F4F0]'
                  }`}
                >
                  #{item.number}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 1: Apparatus Dossier Header & 4-Plate Interactive Studio Viewer */}
      <section className="border-b border-[#262A27]">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-12">
          {/* Left 5 Columns: Monumental Number, Classification & Concept Thesis */}
          <div className="p-6 sm:p-10 border-b border-[#262A27] lg:col-span-5 lg:border-b-0 lg:border-r flex flex-col justify-between">
            <div>
              {/* Speculative Warning Stamp */}
              <div className="border border-[#C6FF00]/60 bg-[#151B11] p-3 font-mono-tech text-[11px] text-[#DCDCD6] flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 text-[#C6FF00] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-bold text-[#C6FF00]">SPECULATIVE CLASSIFICATION:</span>{' '}
                  {invention.speculativeNotice}
                </div>
              </div>

              {/* Monumental Project Number + Status */}
              <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-[#262A27] pb-4">
                <span className="font-display text-6xl sm:text-8xl font-bold leading-none text-[#C6FF00] tabular-nums">
                  {invention.number}
                </span>
                <div className="text-right font-mono-tech text-xs">
                  <div className="text-[#F4F4F0] font-bold">{invention.category}</div>
                  <div className="mt-1 text-[#9DA29D]">{invention.status}</div>
                </div>
              </div>

              <h1 className="mt-6 font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F4F0] leading-[0.98]">
                {invention.title}
              </h1>
              <div className="mt-2 font-mono-tech text-sm text-[#C6FF00]">
                {invention.subtitle} // HORIZON {invention.horizonYear}
              </div>

              <p className="mt-5 text-base text-[#DCDCD6] leading-relaxed">
                {invention.concept}
              </p>
            </div>

            {/* Primary Envelope Metadata Table */}
            <div className="mt-8 border border-[#262A27] bg-[#141615] divide-y divide-[#262A27] font-mono-tech text-xs">
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-[#9DA29D]">ARCHIVE DESIGNATION</span>
                <span className="font-bold text-[#F4F4F0]">{invention.code}</span>
              </div>
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-[#9DA29D]">GRAVIMETRIC MASS</span>
                <span className="font-bold text-[#F4F4F0] tabular-nums">{invention.massKg}</span>
              </div>
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-[#9DA29D]">OUTER ENVELOPE</span>
                <span className="font-bold text-[#F4F4F0] tabular-nums">{invention.dimensionsMm}</span>
              </div>
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-[#9DA29D]">ENERGETIC REGIME</span>
                <span className="font-bold text-[#C6FF00] text-right">{invention.powerRegime}</span>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: 4-Plate Photographic Viewer + Interactive Hotspots + Lightbox */}
          <div className="bg-[#0F1110] p-6 sm:p-10 lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Plate Switcher Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Photographic plates">
                  {plateKeys.map((key, idx) => {
                    const isSelected = activePlateKey === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActivePlateKey(key)}
                        className={`mech-press px-3 py-2 font-mono-tech text-xs border ${
                          isSelected
                            ? 'border-[#C6FF00] bg-[#C6FF00] text-[#0A0B0A] font-bold'
                            : 'border-[#262A27] bg-[#141615] text-[#9DA29D] hover:text-[#F4F4F0]'
                        }`}
                      >
                        0{idx + 1} · {key.toUpperCase()}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  {activePlateKey === 'hero' && (
                    <button
                      type="button"
                      onClick={() => setShowHotspots((prev) => !prev)}
                      className={`mech-press inline-flex items-center gap-1.5 px-3 py-2 font-mono-tech text-xs border ${
                        showHotspots
                          ? 'border-[#C6FF00] bg-[#161D11] text-[#C6FF00]'
                          : 'border-[#262A27] bg-[#141615] text-[#9DA29D]'
                      }`}
                    >
                      <Crosshair className="h-3.5 w-3.5" />
                      <span>{showHotspots ? 'CALLOUTS: ON' : 'CALLOUTS: OFF'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="mech-press inline-flex items-center gap-1.5 border border-[#262A27] bg-[#141615] px-3 py-2 font-mono-tech text-xs text-[#F4F4F0] hover:border-[#C6FF00] hover:text-[#C6FF00]"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>FULLSCREEN PLATE</span>
                  </button>
                </div>
              </div>

              {/* Main Plate Frame */}
              <div className="relative overflow-hidden border border-[#262A27] bg-[#0A0B0A]">
                <img
                  src={activePlate.src}
                  alt={activePlate.alt}
                  onClick={() => setLightboxOpen(true)}
                  className="w-full h-[340px] sm:h-[460px] object-cover cursor-zoom-in"
                />

                {/* Top Overlay Label */}
                <div className="pointer-events-none absolute top-3 left-3 bg-[#0A0B0A]/90 border border-[#262A27] px-3 py-1 font-mono-tech text-[11px] text-[#C6FF00]">
                  {activePlate.label}
                </div>
                <div className="pointer-events-none absolute top-3 right-3 bg-[#0A0B0A]/90 border border-[#262A27] px-3 py-1 font-mono-tech text-[11px] text-[#9DA29D] hidden sm:block">
                  {activePlate.cameraMeta}
                </div>

                {/* Interactive Callout Pins on Hero Plate */}
                {activePlateKey === 'hero' && showHotspots && (
                  <div className="absolute inset-0 pointer-events-none">
                    {invention.callouts.map((c, idx) => {
                      const isPinned = c.id === activeHotspotId;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspotId(c.id);
                          }}
                          style={{ left: `${c.x}%`, top: `${c.y}%` }}
                          className={`absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center font-mono-tech text-xs font-bold border-2 transition-transform ${
                            isPinned
                              ? 'border-[#0A0B0A] bg-[#C6FF00] text-[#0A0B0A] scale-115 shadow-lg'
                              : 'border-[#C6FF00] bg-[#0A0B0A]/90 text-[#C6FF00] hover:scale-110'
                          }`}
                          aria-label={`Inspect hardware callout ${c.code}: ${c.name}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Plate Caption & Active Hotspot Detail */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 border border-[#262A27] bg-[#141615] p-4">
                <div className="md:col-span-7">
                  <div className="font-mono-tech text-[11px] text-[#9DA29D]">
                    PHOTOGRAPHIC ARCHIVE NOTE:
                  </div>
                  <p className="mt-1 text-xs text-[#DCDCD6] leading-relaxed">
                    {activePlate.caption}
                  </p>
                </div>
                <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-[#262A27] pt-3 md:pt-0 md:pl-4">
                  <div className="font-mono-tech text-[11px] text-[#C6FF00] font-bold">
                    PINNED HARDWARE CALLOUT [{activeHotspot.code}]:
                  </div>
                  <div className="mt-0.5 font-sans text-xs font-bold text-[#F4F4F0]">
                    {activeHotspot.name} ({activeHotspot.materialRef})
                  </div>
                  <p className="mt-1 text-xs text-[#9DA29D] leading-relaxed">
                    {activeHotspot.detail}
                  </p>
                </div>
              </div>
            </div>

            {/* 4-Plate Thumbnail Strip */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {plateKeys.map((key, idx) => {
                const p = invention.images[key];
                const isSelected = activePlateKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActivePlateKey(key)}
                    className={`mech-press text-left border p-2 transition-colors ${
                      isSelected
                        ? 'border-[#C6FF00] bg-[#161D11]'
                        : 'border-[#262A27] bg-[#141615] hover:border-[#9DA29D]'
                    }`}
                  >
                    <img
                      src={p.src}
                      alt={p.alt}
                      className="w-full h-20 object-cover border border-[#262A27]"
                    />
                    <div className="mt-2 font-mono-tech text-[10px] font-bold text-[#C6FF00]">
                      PLATE 0{idx + 1}
                    </div>
                    <div className="font-mono-tech text-[11px] text-[#F4F4F0] truncate capitalize">
                      {key} Study
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: The Future Problem & Operational Mechanics (How It Might Work) */}
      <section className="border-b border-[#262A27] py-16 sm:py-20">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 5 Cols: The Future Problem & Projected Impact */}
            <div className="lg:col-span-5 space-y-8">
              <div className="border border-[#262A27] bg-[#141615] p-6 sm:p-8">
                <div className="font-mono-tech text-xs font-bold text-[#C6FF00]">
                  01 // THE COUNTERFACTUAL PROBLEM
                </div>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#F4F4F0]">
                  Why present-day infrastructure fails this threshold.
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#DCDCD6] leading-relaxed">
                  {invention.problem}
                </p>
              </div>

              <div className="border border-[#262A27] bg-[#111312] p-6 sm:p-8">
                <div className="font-mono-tech text-xs font-bold text-[#C6FF00]">
                  02 // PROJECTED CIVIC &amp; ECOLOGICAL IMPACT
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold text-[#F4F4F0]">
                  Systemic consequence of physical deployment.
                </h3>
                <p className="mt-4 text-sm sm:text-base text-[#DCDCD6] leading-relaxed">
                  {invention.impact}
                </p>
              </div>
            </div>

            {/* Right 7 Cols: How It Might Work (4-Stage Expandable Operational Sequence) */}
            <div className="lg:col-span-7">
              <div className="border border-[#262A27] bg-[#141615] p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-6 border-b border-[#262A27]">
                  <div>
                    <div className="font-mono-tech text-xs font-bold text-[#C6FF00]">
                      03 // OPERATIONAL MECHANICS (HOW IT MIGHT WORK)
                    </div>
                    <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#F4F4F0]">
                      Four-stage physical operating sequence.
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setExpandedStepIdx(expandedStepIdx === null ? 0 : null)}
                    className="mech-press border border-[#262A27] bg-[#0A0B0A] px-3 py-1.5 font-mono-tech text-xs text-[#9DA29D] hover:text-[#C6FF00]"
                  >
                    {expandedStepIdx === null ? 'EXPAND FIRST' : 'COLLAPSE ALL'}
                  </button>
                </div>

                <div className="mt-6 space-y-3">
                  {invention.howItMightWork.map((st, idx) => {
                    const isOpen = expandedStepIdx === idx || expandedStepIdx === -1;
                    return (
                      <div
                        key={st.step}
                        className={`border transition-colors ${
                          isOpen
                            ? 'border-[#C6FF00] bg-[#0A0B0A]'
                            : 'border-[#262A27] bg-[#0F1110]'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedStepIdx(isOpen ? null : idx)}
                          aria-expanded={isOpen}
                          className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left"
                        >
                          <div className="flex items-center gap-4">
                            <span className="font-mono-tech text-xs font-bold bg-[#C6FF00] text-[#0A0B0A] px-2.5 py-1">
                              {st.step}
                            </span>
                            <span className="font-display text-lg sm:text-xl font-bold text-[#F4F4F0]">
                              {st.title}
                            </span>
                          </div>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-[#C6FF00] shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-[#9DA29D] shrink-0" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="border-t border-[#262A27] px-4 pb-5 pt-4 sm:px-5">
                            <p className="text-sm text-[#DCDCD6] leading-relaxed">
                              {st.mechanism}
                            </p>
                            <div className="mt-3 inline-block border border-[#262A27] bg-[#141615] px-3 py-1 font-mono-tech text-xs text-[#C6FF00]">
                              TELEMETRY BENCHMARK // {st.telemetry}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Interactive Vector CAD Schematic & Live Parameter Simulator */}
      <section className="border-b border-[#262A27] py-16 sm:py-20 bg-[#0D0F0E]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 font-mono-tech text-xs font-bold text-[#C6FF00]">
                <Cpu className="h-4 w-4" aria-hidden="true" />
                <span>04 // INTERACTIVE TECHNICAL DIAGRAM &amp; TELEMETRY SIMULATOR</span>
              </div>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-[#F4F4F0]">
                Inspect sub-assemblies and stress-test operating parameters.
              </h2>
            </div>
            <div className="font-mono-tech text-xs text-[#9DA29D]">
              CLICK NODES [1–4] ON BLUEPRINT OR DRAG PARAMETER SLIDER
            </div>
          </div>

          <InteractiveSchematic invention={invention} />
        </div>
      </section>

      {/* SECTION 4: Materials BOM & Engineering Specifications (Architectural Concrete Surface) */}
      <section className="concrete-surface border-b border-[#262A27] py-16 sm:py-20">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 7 Cols: Material Bill of Materials (BOM) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-[#0A0B0A] px-3 py-1 font-mono-tech text-xs font-bold text-[#C6FF00]">
                <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                <span>05 // METALLURGICAL &amp; LITHIC BILL OF MATERIALS (BOM)</span>
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold text-[#0A0B0A]">
                Physical substrates and mass distribution.
              </h2>

              <div className="mt-6 border border-[#0A0B0A] bg-[#F4F4F0] overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono-tech text-xs text-[#0A0B0A]">
                  <thead>
                    <tr className="border-b border-[#0A0B0A] bg-[#0A0B0A] text-[#C6FF00]">
                      <th className="p-3.5">SUB-ASSEMBLY</th>
                      <th className="p-3.5">MATERIAL SUBSTRATE</th>
                      <th className="p-3.5">GRADE / SPEC</th>
                      <th className="p-3.5">MASS %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#B8B9B2]">
                    {invention.materials.map((mat) => (
                      <tr key={mat.part}>
                        <td className="p-3.5 font-bold">{mat.part}</td>
                        <td className="p-3.5">
                          <div className="font-semibold">{mat.material}</div>
                          <div className="font-sans text-[11px] text-[#454945] mt-0.5">
                            {mat.property}
                          </div>
                        </td>
                        <td className="p-3.5 text-[#1B1E1C]">{mat.grade}</td>
                        <td className="p-3.5 font-bold tabular-nums">{mat.massShare}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right 5 Cols: 6 Metrology & Tolerance Specifications */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 bg-[#0A0B0A] px-3 py-1 font-mono-tech text-xs font-bold text-[#C6FF00]">
                <span>06 // METROLOGY &amp; OPERATING TOLERANCES</span>
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold text-[#0A0B0A]">
                Benchmarked performance envelope.
              </h2>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 border border-[#0A0B0A] bg-[#F4F4F0] divide-y sm:divide-y-0 sm:divide-x divide-[#B8B9B2]">
                {invention.specs.map((sp) => (
                  <div key={sp.label} className="p-4 border-b border-[#B8B9B2]">
                    <div className="font-mono-tech text-[10px] text-[#454945]">{sp.label}</div>
                    <div className="mt-1 font-mono-tech text-lg font-bold text-[#0A0B0A] tabular-nums">
                      {sp.value}
                    </div>
                    <div className="mt-0.5 font-mono-tech text-[11px] text-[#1B1E1C]">
                      TOL: {sp.tolerance}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Physical Limitations & Ethical Considerations */}
      <section className="border-b border-[#262A27] py-16 sm:py-20 bg-[#0A0B0A]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 6 Cols: Thermodynamic & Physical Limitations */}
            <div className="lg:col-span-6 border border-[#262A27] bg-[#141615] p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono-tech text-xs font-bold text-[#FF4D00]">
                <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                <span>07 // PHYSICAL, THERMODYNAMIC &amp; OPERATIONAL LIMITATIONS</span>
              </div>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#F4F4F0]">
                Where this apparatus breaks, stalls, or requires human stewardship.
              </h2>
              <p className="mt-2 text-xs font-mono-tech text-[#9DA29D]">
                Every speculative machine is subject to conservation laws and material fatigue:
              </p>

              <ul className="mt-6 space-y-4">
                {invention.limitations.map((lim, i) => (
                  <li
                    key={i}
                    className="border-l-2 border-[#FF4D00] bg-[#0A0B0A] p-4 text-sm text-[#DCDCD6] leading-relaxed"
                  >
                    <span className="font-mono-tech text-xs font-bold text-[#FF4D00] block mb-1">
                      CONSTRAINT 0{i + 1}
                    </span>
                    {lim}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right 6 Cols: Ethical Considerations & Political Externalities */}
            <div className="lg:col-span-6 border border-[#262A27] bg-[#141615] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="font-mono-tech text-xs font-bold text-[#C6FF00]">
                  08 // ETHICAL CONSIDERATIONS &amp; GOVERNANCE RISKS
                </div>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#F4F4F0]">
                  Who gains leverage, and how this hardware could be misused.
                </h2>

                <blockquote className="mt-4 border border-[#C6FF00]/50 bg-[#151B11] p-4 font-mono-tech text-xs text-[#F4F4F0] leading-relaxed">
                  “{invention.ethicalConsiderations.thesis}”
                </blockquote>

                <div className="mt-6 space-y-4">
                  {invention.ethicalConsiderations.dilemmas.map((d) => (
                    <div key={d.title} className="border border-[#262A27] bg-[#0A0B0A] p-4">
                      <h3 className="font-display text-lg font-bold text-[#C6FF00]">
                        {d.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-[#DCDCD6] leading-relaxed">
                        {d.analysis}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#262A27] font-mono-tech text-[11px] text-[#9DA29D]">
                REVIEWED BY TFD SPECULATIVE LAW &amp; FORENSIC ETHICS FELLOWSHIP (ZURICH)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Previous / Next Apparatus Dossier Navigation */}
      <section className="bg-[#141615]">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#262A27]">
          <Link
            to={`/projects/${prevInvention.id}`}
            className="group p-6 sm:p-10 flex items-center justify-between hover:bg-[#1B1E1C] transition-colors"
          >
            <div>
              <div className="font-mono-tech text-xs text-[#9DA29D] flex items-center gap-1.5">
                <ArrowLeft className="h-3.5 w-3.5 text-[#C6FF00]" />
                <span>PREVIOUS SPECIMEN DOSSIER</span>
              </div>
              <div className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#F4F4F0] group-hover:text-[#C6FF00]">
                #{prevInvention.number} — {prevInvention.title}
              </div>
              <div className="mt-1 font-mono-tech text-xs text-[#9DA29D]">
                {prevInvention.category} · {prevInvention.horizonYear}
              </div>
            </div>
          </Link>

          <Link
            to={`/projects/${nextInvention.id}`}
            className="group p-6 sm:p-10 flex items-center justify-between text-right hover:bg-[#1B1E1C] transition-colors"
          >
            <div className="w-full">
              <div className="font-mono-tech text-xs text-[#9DA29D] flex items-center justify-end gap-1.5">
                <span>NEXT SPECIMEN DOSSIER</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#C6FF00]" />
              </div>
              <div className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#F4F4F0] group-hover:text-[#C6FF00]">
                #{nextInvention.number} — {nextInvention.title}
              </div>
              <div className="mt-1 font-mono-tech text-xs text-[#9DA29D]">
                {nextInvention.category} · {nextInvention.horizonYear}
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Fullscreen High-Resolution Plate Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${invention.title} photographic plate viewer`}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0A0B0A]/95 p-4 sm:p-8"
        >
          <div className="flex items-center justify-between border-b border-[#262A27] pb-4">
            <div className="font-mono-tech text-xs">
              <span className="text-[#C6FF00] font-bold">{activePlate.label}</span>
              <span className="mx-2 text-[#9DA29D]">//</span>
              <span className="text-[#F4F4F0]">{invention.title}</span>
              <span className="ml-3 text-[#9DA29D] hidden sm:inline">[{activePlate.cameraMeta}]</span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="mech-press inline-flex items-center gap-1.5 bg-[#C6FF00] px-3.5 py-1.5 font-mono-tech text-xs font-bold text-[#0A0B0A]"
            >
              <X className="h-4 w-4" />
              <span>CLOSE [ESC]</span>
            </button>
          </div>

          <div className="my-4 flex-1 flex items-center justify-center overflow-hidden">
            <img
              src={activePlate.src}
              alt={activePlate.alt}
              className="max-h-[72vh] max-w-full object-contain border border-[#262A27]"
            />
          </div>

          <div className="border-t border-[#262A27] pt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-[#DCDCD6] max-w-3xl font-mono-tech">
              {activePlate.caption}
            </p>
            <div className="flex items-center gap-2">
              {plateKeys.map((k, idx) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setActivePlateKey(k)}
                  className={`mech-press px-3 py-1.5 font-mono-tech text-xs border ${
                    activePlateKey === k
                      ? 'border-[#C6FF00] bg-[#C6FF00] text-[#0A0B0A] font-bold'
                      : 'border-[#262A27] bg-[#141615] text-[#9DA29D]'
                  }`}
                >
                  0{idx + 1} · {k.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
