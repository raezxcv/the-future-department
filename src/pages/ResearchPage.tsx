import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  METHODOLOGY_STAGES,
  RESEARCH_TEAM,
  MATERIAL_SPECIMENS,
  STUDIO_PRINCIPLES,
  STUDIO_LOCATIONS,
  MaterialSpecimen
} from '../data/researchData';
import { INVENTIONS } from '../data/inventions';
import {
  FlaskConical,
  Users,
  CheckCircle2,
  AlertCircle,
  MapPin,
  ArrowUpRight,
  Layers,
  BookOpen
} from 'lucide-react';

export const ResearchPage: React.FC = () => {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [selectedMatClass, setSelectedMatClass] = useState<
    'ALL' | MaterialSpecimen['classification']
  >('ALL');

  // Exhibition / Academic Loan Request Form State
  const [institutionName, setInstitutionName] = useState('');
  const [researcherEmail, setResearcherEmail] = useState('');
  const [requestedSpecimen, setRequestedSpecimen] = useState('TFD-014');
  const [inquiryPurpose, setInquiryPurpose] = useState('CURATORIAL EXHIBITION LOAN');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    refCode: string;
    institution: string;
    email: string;
    specimen: string;
    purpose: string;
  } | null>(null);

  const filteredMaterials =
    selectedMatClass === 'ALL'
      ? MATERIAL_SPECIMENS
      : MATERIAL_SPECIMENS.filter((m) => m.classification === selectedMatClass);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!institutionName.trim() || !researcherEmail.trim() || !researcherEmail.includes('@')) {
      setFormError('Please provide both an affiliating institution name and a valid academic or curatorial email address.');
      return;
    }
    setFormError(null);
    setSubmittedReceipt({
      refCode: `TFD-REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      institution: institutionName.trim(),
      email: researcherEmail.trim(),
      specimen: requestedSpecimen,
      purpose: inquiryPurpose
    });
  };

  return (
    <div className="bg-[#0A0B0A] min-h-screen">
      {/* SECTION 1: Research & Metrology Lab Hero */}
      <section className="border-b border-[#262A27]">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-12">
          <div className="p-6 sm:p-10 border-b border-[#262A27] lg:col-span-6 lg:border-b-0 lg:border-r flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#C6FF00] bg-[#141615] px-3 py-1 font-mono-tech text-xs text-[#C6FF00]">
                <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
                <span>RESEARCH METHODOLOGY, SUBSTRATES &amp; INVESTIGATORS</span>
              </div>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-[#F4F4F0] leading-[0.96]">
                Discipline of the Counterfactual Foundry.
              </h1>
              <p className="mt-6 text-base text-[#DCDCD6] leading-relaxed">
                Speculative design often fails when it stays trapped on screens as glossy renderings. At The Future Department, every fictional inquiry is forced through the constraints of metallurgy, silicate chemistry, mechanical kinematics, and environmental law.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 border border-[#262A27] bg-[#141615] divide-x divide-[#262A27] font-mono-tech text-xs">
              <div className="p-4">
                <div className="text-[10px] text-[#9DA29D]">RESEARCH FELLOWS</div>
                <div className="mt-1 text-2xl font-bold text-[#C6FF00] tabular-nums">06 PIs</div>
              </div>
              <div className="p-4">
                <div className="text-[10px] text-[#9DA29D]">QUALIFIED SUBSTRATES</div>
                <div className="mt-1 text-2xl font-bold text-[#F4F4F0] tabular-nums">06 COUPONS</div>
              </div>
              <div className="p-4">
                <div className="text-[10px] text-[#9DA29D]">EUROPEAN LAB SITES</div>
                <div className="mt-1 text-2xl font-bold text-[#F4F4F0] tabular-nums">03 BAYS</div>
              </div>
            </div>
          </div>

          <div className="bg-[#0F1110] lg:col-span-6 flex flex-col justify-between">
            <div className="relative overflow-hidden border-b border-[#262A27]">
              <img
                src="/images/studio/research-materials-lab.png"
                alt="Hydraulic twin-column material testing rig compressing a cylindrical black volcanic basalt core under green laser micrometer calibration"
                className="w-full h-[360px] sm:h-[440px] object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#0A0B0A]/90 border border-[#262A27] px-3 py-1 font-mono-tech text-[11px] text-[#C6FF00]">
                FIG 04.1 // HYDRAULIC BASALT &amp; GEOPOLYMER COMPRESSION RIG
              </div>
            </div>
            <div className="p-5 sm:p-6 font-mono-tech text-xs text-[#9DA29D] flex flex-wrap items-center justify-between gap-2">
              <span>METROLOGY BAY B-02 // ANTI-VIBRATION GRANITE OPTICAL TABLE</span>
              <span className="text-[#F4F4F0]">LOAD CELL: 250 kN CALIBRATED</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 4-Stage Design Methodology Pipeline */}
      <section className="border-b border-[#262A27] py-16 sm:py-20">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="font-mono-tech text-xs font-bold text-[#C6FF00]">
              01 // 36-WEEK COUNTERFACTUAL RESEARCH PROTOCOL
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl font-bold text-[#F4F4F0]">
              From fragile future signal to physical hardware.
            </h2>
          </div>

          {/* Interactive 4-Tab Pipeline */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 border border-[#262A27]">
            <div className="lg:col-span-5 divide-y divide-[#262A27] border-b lg:border-b-0 lg:border-r border-[#262A27]">
              {METHODOLOGY_STAGES.map((st, idx) => {
                const isSelected = activeStageIdx === idx;
                return (
                  <button
                    key={st.code}
                    type="button"
                    onClick={() => setActiveStageIdx(idx)}
                    className={`w-full text-left p-5 sm:p-6 transition-colors flex items-start justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#C6FF00] text-[#0A0B0A]'
                        : 'bg-[#111312] text-[#F4F4F0] hover:bg-[#141615]'
                    }`}
                  >
                    <div>
                      <div
                        className={`font-mono-tech text-xs font-bold ${
                          isSelected ? 'text-[#0A0B0A]' : 'text-[#C6FF00]'
                        }`}
                      >
                        {st.code}
                      </div>
                      <div className="mt-1 font-display text-xl sm:text-2xl font-bold">
                        {st.title}
                      </div>
                      <div
                        className={`mt-1 font-mono-tech text-xs ${
                          isSelected ? 'text-[#1B1E1C]' : 'text-[#9DA29D]'
                        }`}
                      >
                        DURATION: {st.duration}
                      </div>
                    </div>
                    <span className="font-display text-4xl font-bold leading-none tabular-nums">
                      {st.index}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 bg-[#141615] p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#262A27] font-mono-tech text-xs">
                  <span className="text-[#C6FF00] font-bold">
                    STAGE {METHODOLOGY_STAGES[activeStageIdx].index} SPECIFICATION
                  </span>
                  <span className="border border-[#262A27] bg-[#0A0B0A] px-2.5 py-1 text-[#DCDCD6]">
                    {METHODOLOGY_STAGES[activeStageIdx].duration}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-3xl sm:text-4xl font-bold text-[#F4F4F0]">
                  {METHODOLOGY_STAGES[activeStageIdx].title}
                </h3>

                <p className="mt-4 text-base text-[#DCDCD6] leading-relaxed">
                  {METHODOLOGY_STAGES[activeStageIdx].description}
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-[#262A27] bg-[#0A0B0A] p-4">
                    <div className="font-mono-tech text-[11px] text-[#C6FF00] font-bold">
                      REQUIRED PHYSICAL DELIVERABLE
                    </div>
                    <p className="mt-1.5 text-xs text-[#F4F4F0] leading-relaxed">
                      {METHODOLOGY_STAGES[activeStageIdx].deliverable}
                    </p>
                  </div>
                  <div className="border border-[#262A27] bg-[#0A0B0A] p-4">
                    <div className="font-mono-tech text-[11px] text-[#C6FF00] font-bold">
                      METROLOGY &amp; AUDIT PROTOCOL
                    </div>
                    <p className="mt-1.5 text-xs text-[#DCDCD6] leading-relaxed">
                      {METHODOLOGY_STAGES[activeStageIdx].validationProtocol}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#262A27] flex items-center justify-between font-mono-tech text-xs text-[#9DA29D]">
                <span>PHASE PROGRESSION: {activeStageIdx + 1} / 4</span>
                <button
                  type="button"
                  onClick={() => setActiveStageIdx((activeStageIdx + 1) % METHODOLOGY_STAGES.length)}
                  className="mech-press text-[#C6FF00] font-bold hover:underline"
                >
                  ADVANCE TO NEXT STAGE →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Fictional Multidisciplinary Research Team (Architectural Concrete Surface) */}
      <section className="concrete-surface border-b border-[#262A27] py-16 sm:py-20">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-8 border-b border-[#0A0B0A]">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#0A0B0A] px-3 py-1 font-mono-tech text-xs font-bold text-[#C6FF00]">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                <span>02 // MULTIDISCIPLINARY RESEARCH FELLOWSHIP (FICTIONAL FACULTY)</span>
              </div>
              <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold text-[#0A0B0A]">
                Principal Investigators &amp; Studio Leads.
              </h2>
            </div>
            <p className="text-xs font-mono-tech text-[#1B1E1C] max-w-md">
              NOTE: All investigators and monographs below are part of The Future Department’s speculative institutional framing.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#0A0B0A] bg-[#F4F4F0] divide-y md:divide-x divide-[#0A0B0A]">
            {RESEARCH_TEAM.map((member) => (
              <article key={member.id} className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono-tech text-xs">
                    <span className="bg-[#0A0B0A] px-2.5 py-0.5 font-bold text-[#C6FF00]">
                      {member.code}
                    </span>
                    <span className="text-[#454945] font-semibold">{member.discipline}</span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold text-[#0A0B0A]">
                    {member.name}
                  </h3>
                  <div className="mt-0.5 font-mono-tech text-xs font-bold text-[#1B1E1C]">
                    {member.role}
                  </div>

                  <p className="mt-4 text-sm text-[#262A27] leading-relaxed">
                    {member.background}
                  </p>

                  <div className="mt-4 border-l-2 border-[#0A0B0A] pl-3 py-1">
                    <div className="font-mono-tech text-[10px] text-[#454945] flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>RECENT MONOGRAPH:</span>
                    </div>
                    <div className="mt-0.5 text-xs italic text-[#0A0B0A]">
                      {member.monograph}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#B8B9B2]">
                  <div className="font-mono-tech text-[10px] text-[#454945] mb-2">
                    ASSIGNED APPARATUS DOSSIERS:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.leadApparatus.map((code) => (
                      <Link
                        key={code}
                        to={`/projects/${code.toLowerCase()}`}
                        className="mech-press inline-flex items-center gap-1 bg-[#0A0B0A] px-2.5 py-1 font-mono-tech text-xs font-bold text-[#C6FF00] hover:bg-[#1B1E1C]"
                      >
                        <span>{code}</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Interactive Material Specimen Library */}
      <section className="border-b border-[#262A27] py-16 sm:py-20 bg-[#0A0B0A]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 pb-8 border-b border-[#262A27]">
            <div>
              <div className="inline-flex items-center gap-2 font-mono-tech text-xs font-bold text-[#C6FF00]">
                <Layers className="h-4 w-4" aria-hidden="true" />
                <span>03 // PHYSICAL SUBSTRATE &amp; MATERIAL COUPON ARCHIVE</span>
              </div>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-[#F4F4F0]">
                Qualified post-extractive and long-horizon materials.
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter material substrates">
              {(
                [
                  'ALL',
                  'LITHIC / MINERAL',
                  'METALLURGICAL',
                  'BIOLOGICAL / HYBRID',
                  'OPTICAL / VITREOUS'
                ] as const
              ).map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedMatClass(cls)}
                  className={`mech-press px-3 py-1.5 font-mono-tech text-[11px] border ${
                    selectedMatClass === cls
                      ? 'border-[#C6FF00] bg-[#C6FF00] text-[#0A0B0A] font-bold'
                      : 'border-[#262A27] bg-[#141615] text-[#9DA29D] hover:text-[#F4F4F0]'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((mat) => (
              <div
                key={mat.code}
                className="border border-[#262A27] bg-[#141615] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-mono-tech text-xs">
                    <span className="text-[#C6FF00] font-bold">{mat.code}</span>
                    <span className="border border-[#262A27] bg-[#0A0B0A] px-2 py-0.5 text-[10px] text-[#9DA29D]">
                      {mat.classification}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-[#F4F4F0]">
                    {mat.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#DCDCD6] leading-relaxed">
                    {mat.notes}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#262A27] space-y-2 font-mono-tech text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#9DA29D]">DENSITY:</span>
                    <span className="text-[#F4F4F0] tabular-nums">{mat.density}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9DA29D]">SERVICE HORIZON:</span>
                    <span className="text-[#C6FF00] font-bold tabular-nums">{mat.serviceHorizon}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9DA29D]">EMBODIED ENERGY:</span>
                    <span className="text-[#F4F4F0] tabular-nums">{mat.embodiedEnergy}</span>
                  </div>
                  <div className="pt-2 border-t border-[#262A27] text-[11px] text-[#9DA29D]">
                    USED IN: <strong className="text-[#F4F4F0]">{mat.usedIn}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Studio Principles, Foundry Locations & Exhibition Loan Requisition Form */}
      <section className="py-16 sm:py-20 bg-[#0F1110]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 6 Cols: Studio Locations & Institutional Principles */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="font-mono-tech text-xs font-bold text-[#C6FF00]">
                  04 // STUDIO LABORATORIES &amp; FOUNDRY COORDINATES
                </div>
                <h2 className="mt-2 font-display text-3xl font-bold text-[#F4F4F0]">
                  Three European research bays.
                </h2>

                <div className="mt-6 space-y-4">
                  {STUDIO_LOCATIONS.map((loc) => (
                    <div key={loc.code} className="border border-[#262A27] bg-[#141615] p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-xs">
                        <span className="text-[#C6FF00] font-bold flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                          {loc.code}
                        </span>
                        <span className="text-[#9DA29D] tabular-nums">{loc.coordinates}</span>
                      </div>
                      <div className="mt-2 font-display text-xl font-bold text-[#F4F4F0]">
                        {loc.city} — {loc.address}
                      </div>
                      <p className="mt-1.5 text-xs text-[#DCDCD6] leading-relaxed">
                        {loc.focus}
                      </p>
                      <div className="mt-3 font-mono-tech text-[11px] text-[#9DA29D]">
                        ACCESS: {loc.hours}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compact Principles Recap */}
              <div className="border border-[#262A27] bg-[#141615] p-6">
                <div className="font-mono-tech text-xs font-bold text-[#C6FF00] mb-3">
                  SUMMARY OF INSTITUTIONAL AXIOMS:
                </div>
                <ul className="space-y-2.5 font-mono-tech text-xs">
                  {STUDIO_PRINCIPLES.map((p) => (
                    <li key={p.number} className="flex items-start gap-2.5">
                      <span className="text-[#C6FF00] font-bold">[{p.number}]</span>
                      <span className="text-[#DCDCD6]">
                        <strong className="text-[#F4F4F0]">{p.title}:</strong> {p.axiom}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 6 Cols: Curatorial & Academic Exhibition Loan Request Form */}
            <div className="lg:col-span-6">
              <div className="border border-[#262A27] bg-[#141615] p-6 sm:p-8">
                <div className="font-mono-tech text-xs font-bold text-[#C6FF00]">
                  05 // ARCHIVAL REQUISITION &amp; CURATORIAL LOAN DESK
                </div>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#F4F4F0]">
                  Request physical prototype loan or CAD orthographic package.
                </h2>
                <p className="mt-2 text-xs text-[#9DA29D] leading-relaxed">
                  Museums, architecture biennales, and university research departments may request 1:1 exhibition loans or full ISO-128 technical blueprints.
                </p>

                {submittedReceipt ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-6 border border-[#C6FF00] bg-[#0A0B0A] p-6 space-y-4"
                  >
                    <div className="flex items-center gap-2 font-mono-tech text-sm font-bold text-[#C6FF00]">
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                      <span>REQUISITION LOGGED // {submittedReceipt.refCode}</span>
                    </div>
                    <p className="text-xs text-[#DCDCD6] leading-relaxed">
                      Your archival request has been indexed by the Basel Curatorial Desk. A complete CAD &amp; material coupon dossier has been prepared for:
                    </p>
                    <div className="border border-[#262A27] bg-[#141615] p-4 font-mono-tech text-xs space-y-1.5">
                      <div>
                        <span className="text-[#9DA29D]">INSTITUTION:</span>{' '}
                        <strong className="text-[#F4F4F0]">{submittedReceipt.institution}</strong>
                      </div>
                      <div>
                        <span className="text-[#9DA29D]">CONTACT:</span>{' '}
                        <strong className="text-[#F4F4F0]">{submittedReceipt.email}</strong>
                      </div>
                      <div>
                        <span className="text-[#9DA29D]">SPECIMEN:</span>{' '}
                        <strong className="text-[#C6FF00]">{submittedReceipt.specimen}</strong>
                      </div>
                      <div>
                        <span className="text-[#9DA29D]">CLASSIFICATION:</span>{' '}
                        <strong className="text-[#F4F4F0]">{submittedReceipt.purpose}</strong>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedReceipt(null);
                        setInstitutionName('');
                        setResearcherEmail('');
                        setInquiryNotes('');
                      }}
                      className="mech-press bg-[#C6FF00] px-4 py-2 font-mono-tech text-xs font-bold text-[#0A0B0A]"
                    >
                      SUBMIT ANOTHER REQUISITION
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRequestSubmit} noValidate className="mt-6 space-y-4">
                    {formError && (
                      <div
                        role="alert"
                        className="flex items-center gap-2 border border-[#FF4D00] bg-[#1C110D] p-3 font-mono-tech text-xs text-[#FF4D00]"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="req-institution"
                        className="block font-mono-tech text-xs text-[#DCDCD6] mb-1.5"
                      >
                        AFFILIATED INSTITUTION / MUSEUM / LAB *
                      </label>
                      <input
                        id="req-institution"
                        type="text"
                        required
                        value={institutionName}
                        onChange={(e) => setInstitutionName(e.target.value)}
                        placeholder="e.g., ETH Zurich Dept. of Architecture / Kunsthalle Basel"
                        className="w-full border border-[#262A27] bg-[#0A0B0A] px-3.5 py-2.5 font-mono-tech text-xs text-[#F4F4F0] placeholder:text-[#454945] focus:border-[#C6FF00]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="req-email"
                        className="block font-mono-tech text-xs text-[#DCDCD6] mb-1.5"
                      >
                        CURATORIAL OR ACADEMIC EMAIL *
                      </label>
                      <input
                        id="req-email"
                        type="email"
                        required
                        value={researcherEmail}
                        onChange={(e) => setResearcherEmail(e.target.value)}
                        placeholder="researcher@institution.ch"
                        className="w-full border border-[#262A27] bg-[#0A0B0A] px-3.5 py-2.5 font-mono-tech text-xs text-[#F4F4F0] placeholder:text-[#454945] focus:border-[#C6FF00]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="req-specimen"
                          className="block font-mono-tech text-xs text-[#DCDCD6] mb-1.5"
                        >
                          TARGET SPECIMEN APPARATUS
                        </label>
                        <select
                          id="req-specimen"
                          value={requestedSpecimen}
                          onChange={(e) => setRequestedSpecimen(e.target.value)}
                          className="w-full border border-[#262A27] bg-[#0A0B0A] px-3 py-2.5 font-mono-tech text-xs text-[#F4F4F0] focus:border-[#C6FF00]"
                        >
                          {INVENTIONS.map((inv) => (
                            <option key={inv.id} value={inv.code}>
                              #{inv.number} — {inv.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="req-purpose"
                          className="block font-mono-tech text-xs text-[#DCDCD6] mb-1.5"
                        >
                          REQUISITION TYPE
                        </label>
                        <select
                          id="req-purpose"
                          value={inquiryPurpose}
                          onChange={(e) => setInquiryPurpose(e.target.value)}
                          className="w-full border border-[#262A27] bg-[#0A0B0A] px-3 py-2.5 font-mono-tech text-xs text-[#F4F4F0] focus:border-[#C6FF00]"
                        >
                          <option value="CURATORIAL EXHIBITION LOAN">CURATORIAL EXHIBITION LOAN</option>
                          <option value="ISO-128 CAD BLUEPRINT PACKAGE">ISO-128 CAD BLUEPRINT PACKAGE</option>
                          <option value="MATERIAL COUPON SAMPLE KIT">MATERIAL COUPON SAMPLE KIT</option>
                          <option value="FOUNDRY VISIT APPOINTMENT">FOUNDRY VISIT APPOINTMENT</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="req-notes"
                        className="block font-mono-tech text-xs text-[#DCDCD6] mb-1.5"
                      >
                        EXHIBITION DATES OR RESEARCH CONTEXT (OPTIONAL)
                      </label>
                      <textarea
                        id="req-notes"
                        rows={3}
                        value={inquiryNotes}
                        onChange={(e) => setInquiryNotes(e.target.value)}
                        placeholder="Specify floor-loading capacity (for TFD-027 1,840 kg monolith) or archival inquiry scope..."
                        className="w-full border border-[#262A27] bg-[#0A0B0A] p-3 font-mono-tech text-xs text-[#F4F4F0] placeholder:text-[#454945] focus:border-[#C6FF00]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mech-press w-full bg-[#C6FF00] py-3.5 font-mono-tech text-xs font-bold text-[#0A0B0A] hover:bg-[#d4ff33]"
                    >
                      TRANSMIT ARCHIVAL REQUISITION
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

