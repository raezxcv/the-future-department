import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  INVENTIONS,
  CATEGORIES,
  PHASES,
  InventionCategory,
  PhaseCode
} from '../data/inventions';
import {
  Search,
  LayoutGrid,
  Table,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | InventionCategory>('ALL');
  const [selectedPhase, setSelectedPhase] = useState<'ALL' | PhaseCode>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'GRID' | 'LEDGER'>('GRID');
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedCardIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredInventions = useMemo(() => {
    return INVENTIONS.filter((inv) => {
      const matchesCat = selectedCategory === 'ALL' || inv.category === selectedCategory;
      const matchesPhase = selectedPhase === 'ALL' || inv.phaseCode === selectedPhase;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        inv.number.toLowerCase().includes(q) ||
        inv.code.toLowerCase().includes(q) ||
        inv.title.toLowerCase().includes(q) ||
        inv.subtitle.toLowerCase().includes(q) ||
        inv.summary.toLowerCase().includes(q) ||
        inv.materials.some((m) => m.material.toLowerCase().includes(q));
      return matchesCat && matchesPhase && matchesQuery;
    });
  }, [selectedCategory, selectedPhase, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedPhase('ALL');
    setSearchQuery('');
  };

  return (
    <div className="bg-[#0A0B0A] min-h-screen">
      {/* Page Header & Speculative Classification */}
      <section className="border-b border-[#262A27] bg-[#0F1110] py-12 sm:py-16">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 border border-[#C6FF00] bg-[#141615] px-3 py-1 font-mono-tech text-xs text-[#C6FF00]">
                <span>ARCHIVE MATRIX // SPECIMENS TFD-014 TO TFD-036</span>
              </div>
              <h1 className="mt-4 font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#F4F4F0] leading-[0.96]">
                Speculative Apparatus Registry.
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm text-[#DCDCD6] leading-relaxed">
                Six non-commercial counterfactual inventions investigating municipal memory, forensic air sampling, domestic kinetic storage, urban acoustic refuge, biological e-waste mining, and bilateral resource diplomacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Instrumentation Console */}
      <section className="sticky top-[65px] z-30 border-b border-[#262A27] bg-[#0A0B0A]/95 backdrop-blur-xs">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8 py-4">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by apparatus category">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`mech-press px-3 py-1.5 font-mono-tech text-[11px] border transition-colors ${
                    selectedCategory === cat
                      ? 'border-[#C6FF00] bg-[#C6FF00] text-[#0A0B0A] font-bold'
                      : 'border-[#262A27] bg-[#141615] text-[#9DA29D] hover:border-[#9DA29D] hover:text-[#F4F4F0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Phase Filter + Search + View Switcher */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Phase Select */}
              <div className="flex items-center gap-1" role="group" aria-label="Filter by development phase">
                {PHASES.map((ph) => (
                  <button
                    key={ph}
                    type="button"
                    onClick={() => setSelectedPhase(ph)}
                    className={`mech-press px-2.5 py-1.5 font-mono-tech text-[11px] border ${
                      selectedPhase === ph
                        ? 'border-[#F4F4F0] bg-[#F4F4F0] text-[#0A0B0A] font-bold'
                        : 'border-[#262A27] bg-[#141615] text-[#9DA29D] hover:text-[#F4F4F0]'
                    }`}
                  >
                    {ph === 'ALL' ? 'ALL PHASES' : ph}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative flex-1 sm:flex-initial sm:w-64">
                <label htmlFor="archive-search-input" className="sr-only">
                  Search inventions by number, title, or material
                </label>
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9DA29D]"
                  aria-hidden="true"
                />
                <input
                  id="archive-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ID, title, substrate..."
                  className="w-full border border-[#262A27] bg-[#141615] pl-9 pr-3 py-1.5 font-mono-tech text-xs text-[#F4F4F0] placeholder:text-[#9DA29D] focus:border-[#C6FF00]"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-[#262A27] bg-[#141615]" role="group" aria-label="Archive layout mode">
                <button
                  type="button"
                  onClick={() => setViewMode('GRID')}
                  className={`mech-press flex items-center gap-1.5 px-3 py-1.5 font-mono-tech text-[11px] ${
                    viewMode === 'GRID'
                      ? 'bg-[#C6FF00] text-[#0A0B0A] font-bold'
                      : 'text-[#9DA29D] hover:text-[#F4F4F0]'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>GRID</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('LEDGER')}
                  className={`mech-press flex items-center gap-1.5 px-3 py-1.5 font-mono-tech text-[11px] ${
                    viewMode === 'LEDGER'
                      ? 'bg-[#C6FF00] text-[#0A0B0A] font-bold'
                      : 'text-[#9DA29D] hover:text-[#F4F4F0]'
                  }`}
                >
                  <Table className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>LEDGER</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Status Bar */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#262A27] font-mono-tech text-[11px] text-[#9DA29D]">
            <div aria-live="polite">
              SHOWING <strong className="text-[#C6FF00]">{filteredInventions.length}</strong> OF{' '}
              <strong className="text-[#F4F4F0]">{INVENTIONS.length}</strong> SPECULATIVE INVENTIONS
            </div>
            {(selectedCategory !== 'ALL' || selectedPhase !== 'ALL' || searchQuery !== '') && (
              <button
                type="button"
                onClick={resetFilters}
                className="mech-press inline-flex items-center gap-1 text-[#C6FF00] hover:underline"
              >
                <RotateCcw className="h-3 w-3" />
                <span>CLEAR ACTIVE FILTERS</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          {filteredInventions.length === 0 ? (
            <div className="border border-[#262A27] bg-[#141615] p-12 text-center">
              <div className="font-mono-tech text-sm text-[#C6FF00] font-bold">
                ZERO SPECIMENS MATCHING QUERY PARAMETERS
              </div>
              <p className="mt-2 text-sm text-[#9DA29D]">
                No counterfactual apparatus matched your current category, phase, or substrate filter.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mech-press mt-6 inline-flex items-center gap-2 bg-[#C6FF00] px-5 py-2.5 font-mono-tech text-xs font-bold text-[#0A0B0A]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>RESTORE ALL 06 SPECIMENS</span>
              </button>
            </div>
          ) : viewMode === 'GRID' ? (
            /* ARCHITECTURAL 2-COLUMN BRUTALIST GRID */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredInventions.map((inv) => {
                const isExpanded = !!expandedCardIds[inv.id];
                return (
                  <article
                    key={inv.id}
                    className="border border-[#262A27] bg-[#111312] flex flex-col justify-between"
                  >
                    <div>
                      {/* Card Top Metadata Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#262A27] bg-[#141615] px-5 py-3 font-mono-tech text-xs">
                        <span className="text-[#C6FF00] font-bold">{inv.category}</span>
                        <span className="border border-[#262A27] bg-[#0A0B0A] px-2.5 py-0.5 text-[11px] text-[#DCDCD6]">
                          {inv.status}
                        </span>
                      </div>

                      {/* Hero Image + Oversized Monumental Project Number */}
                      <div className="relative overflow-hidden border-b border-[#262A27] bg-[#0A0B0A] plate-zoom">
                        <Link to={`/projects/${inv.id}`} className="block">
                          <img
                            src={inv.images.hero.src}
                            alt={inv.images.hero.alt}
                            className="plate-img w-full h-72 sm:h-80 object-cover"
                          />
                        </Link>
                        {/* Monumental Number Badge */}
                        <div className="pointer-events-none absolute bottom-0 left-0 bg-[#0A0B0A]/92 border-t border-r border-[#262A27] px-4 py-2">
                          <span className="font-display text-5xl sm:text-6xl font-bold leading-none text-[#C6FF00] tabular-nums">
                            {inv.number}
                          </span>
                        </div>
                        {/* Speculative Stamp */}
                        <div className="pointer-events-none absolute top-3 right-3 bg-[#0A0B0A]/90 border border-[#262A27] px-2.5 py-1 font-mono-tech text-[10px] text-[#DCDCD6] flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 text-[#C6FF00]" aria-hidden="true" />
                          <span>SPECULATIVE PROTOTYPE // HORIZON {inv.horizonYear}</span>
                        </div>
                      </div>

                      {/* Core Content */}
                      <div className="p-6 sm:p-8">
                        <div className="font-mono-tech text-xs text-[#9DA29D]">{inv.code}</div>
                        <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#F4F4F0]">
                          <Link to={`/projects/${inv.id}`} className="hover:text-[#C6FF00] transition-colors">
                            {inv.title}
                          </Link>
                        </h2>
                        <div className="mt-0.5 font-mono-tech text-xs text-[#C6FF00]">
                          {inv.subtitle}
                        </div>

                        <p className="mt-4 text-sm text-[#DCDCD6] leading-relaxed">
                          {inv.summary}
                        </p>

                        {/* Quick Spec Telemetry Bar */}
                        <div className="mt-6 grid grid-cols-3 border border-[#262A27] bg-[#0A0B0A] divide-x divide-[#262A27] font-mono-tech text-xs">
                          <div className="p-3">
                            <div className="text-[10px] text-[#9DA29D]">MASS</div>
                            <div className="mt-0.5 font-bold text-[#F4F4F0] tabular-nums">{inv.massKg}</div>
                          </div>
                          <div className="p-3">
                            <div className="text-[10px] text-[#9DA29D]">ENVELOPE</div>
                            <div className="mt-0.5 font-bold text-[#F4F4F0] tabular-nums">{inv.dimensionsMm}</div>
                          </div>
                          <div className="p-3">
                            <div className="text-[10px] text-[#9DA29D]">HORIZON</div>
                            <div className="mt-0.5 font-bold text-[#C6FF00] tabular-nums">{inv.horizonYear}</div>
                          </div>
                        </div>

                        {/* Expandable Technical Details Accordion */}
                        <div className="mt-5 border border-[#262A27] bg-[#141615]">
                          <button
                            type="button"
                            onClick={() => toggleExpand(inv.id)}
                            aria-expanded={isExpanded}
                            className="mech-press w-full flex items-center justify-between px-4 py-3 font-mono-tech text-xs text-[#DCDCD6] hover:text-[#C6FF00]"
                          >
                            <span>
                              {isExpanded ? 'HIDE TECHNICAL BOM & LIMITATIONS' : 'EXPAND TECHNICAL BOM & LIMITATIONS'}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-[#C6FF00]" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-[#9DA29D]" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="border-t border-[#262A27] bg-[#0A0B0A] p-4 space-y-4 text-xs">
                              <div>
                                <div className="font-mono-tech text-[11px] font-bold text-[#C6FF00] mb-2">
                                  PRIMARY BILL OF MATERIALS (BOM):
                                </div>
                                <ul className="space-y-1.5 font-mono-tech text-[11px]">
                                  {inv.materials.map((m) => (
                                    <li key={m.part} className="flex justify-between gap-2 border-b border-[#1E2220] pb-1">
                                      <span className="text-[#F4F4F0]">{m.part}:</span>
                                      <span className="text-[#9DA29D] text-right">{m.material} ({m.grade})</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <div className="font-mono-tech text-[11px] font-bold text-[#FF4D00] mb-1">
                                  KEY THERMODYNAMIC / PHYSICAL LIMITATION:
                                </div>
                                <p className="text-[#DCDCD6] leading-relaxed">
                                  {inv.limitations[0]}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Action Bar */}
                    <div className="border-t border-[#262A27] bg-[#141615] px-6 py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        {(['hero', 'material', 'context', 'technical'] as const).map((k) => (
                          <img
                            key={k}
                            src={inv.images[k].src}
                            alt=""
                            className="h-8 w-10 object-cover border border-[#262A27]"
                          />
                        ))}
                        <span className="font-mono-tech text-[10px] text-[#9DA29D] hidden sm:inline">
                          04 PLATES
                        </span>
                      </div>

                      <Link
                        to={`/projects/${inv.id}`}
                        className="mech-press inline-flex items-center gap-2 bg-[#C6FF00] px-5 py-2.5 font-mono-tech text-xs font-bold text-[#0A0B0A] hover:bg-[#d4ff33]"
                      >
                        <span>INSPECT DOSSIER #{inv.number}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* TECHNICAL SPECIFICATION LEDGER TABLE VIEW */
            <div className="border border-[#262A27] bg-[#0A0B0A] overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono-tech text-xs">
                <thead>
                  <tr className="border-b border-[#262A27] bg-[#141615] text-[#C6FF00]">
                    <th className="p-4">NO.</th>
                    <th className="p-4">PLATE</th>
                    <th className="p-4">APPARATUS &amp; CODE</th>
                    <th className="p-4">CATEGORY</th>
                    <th className="p-4">STATUS</th>
                    <th className="p-4">PRIMARY SUBSTRATES</th>
                    <th className="p-4">MASS / HORIZON</th>
                    <th className="p-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262A27]">
                  {filteredInventions.map((inv) => (
                    <tr key={inv.id} className="hover:bg-[#141615] transition-colors">
                      <td className="p-4 font-display text-3xl font-bold text-[#C6FF00] tabular-nums">
                        {inv.number}
                      </td>
                      <td className="p-4">
                        <img
                          src={inv.images.hero.src}
                          alt={inv.title}
                          className="h-14 w-20 object-cover border border-[#262A27]"
                        />
                      </td>
                      <td className="p-4">
                        <div className="font-sans text-base font-bold text-[#F4F4F0]">{inv.title}</div>
                        <div className="text-[11px] text-[#9DA29D]">{inv.code} · {inv.subtitle}</div>
                      </td>
                      <td className="p-4 text-[#DCDCD6]">{inv.category}</td>
                      <td className="p-4">
                        <span className="border border-[#262A27] bg-[#0A0B0A] px-2 py-1 text-[11px] text-[#F4F4F0]">
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-4 text-[11px] text-[#9DA29D] max-w-xs">
                        {inv.materials.slice(0, 2).map((m) => m.material).join(' + ')}
                      </td>
                      <td className="p-4 tabular-nums">
                        <div className="text-[#F4F4F0] font-bold">{inv.massKg}</div>
                        <div className="text-[#C6FF00] text-[11px]">{inv.horizonYear}</div>
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          to={`/projects/${inv.id}`}
                          className="mech-press inline-flex items-center gap-1 bg-[#C6FF00] px-3.5 py-2 font-bold text-[#0A0B0A]"
                        >
                          <span>OPEN</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

