export interface MethodologyStage {
  index: string;
  code: string;
  title: string;
  duration: string;
  deliverable: string;
  description: string;
  validationProtocol: string;
}

export interface ResearchMember {
  id: string;
  code: string;
  name: string;
  role: string;
  discipline: string;
  background: string;
  leadApparatus: string[];
  monograph: string;
}

export interface MaterialSpecimen {
  code: string;
  name: string;
  classification: 'LITHIC / MINERAL' | 'METALLURGICAL' | 'BIOLOGICAL / HYBRID' | 'OPTICAL / VITREOUS';
  density: string;
  serviceHorizon: string;
  embodiedEnergy: string;
  usedIn: string;
  notes: string;
}

export interface StudioPrinciple {
  number: string;
  title: string;
  axiom: string;
  body: string;
}

export const METHODOLOGY_STAGES: MethodologyStage[] = [
  {
    index: '01',
    code: 'METH-A // SIGNAL EXTRAPOLATION',
    title: 'Counterfactual Horizon Auditing',
    duration: 'Weeks 01–06',
    deliverable: 'Failure-Mode Brief & Thermodynamic Boundary Sheet',
    description:
      'We begin not by forecasting consumer trends, but by auditing municipal, ecological, and infrastructural fragility points projected between 2029 and 2045—where software abstractions fail under physical scarcity.',
    validationProtocol: 'Cross-examined against IPCC AR7 regional hydrology tables, EU Critical Raw Materials directives, and municipal civil-defense failure logs.'
  },
  {
    index: '02',
    code: 'METH-B // SUBSTRATE CONSTRAINT',
    title: 'Post-Extractive Material Pairing',
    duration: 'Weeks 07–14',
    deliverable: 'Sintered / Cast Material Coupons & Accelerated Aging Logs',
    description:
      'Every project is forbidden from relying on un-repairable pouches, proprietary cloud APIs, or rare-earth supply chains where abundant mineral, cast-ferrous, or biological alternatives can perform the mechanical work.',
    validationProtocol: '1,000-hour salt-fog, DIN 4102 furnace exposure, and 50,000-cycle mechanical fatigue testing in our Basel metrology bay.'
  },
  {
    index: '03',
    code: 'METH-C // PHYSICAL FABRICATION',
    title: 'Full-Scale Non-Commercial Prototyping',
    duration: 'Weeks 15–28',
    deliverable: '1:1 Working Speculative Apparatus & Orthographic Dossier',
    description:
      'We machine, cast, and assemble 1:1 physical hardware—never vapourware renders. If a speculative concept requires a Geneva wheel, a Helmholtz cavity, or a Halbach array, the mechanism must physically index on the bench.',
    validationProtocol: 'Complete bill of materials (BOM), dimensional tolerances, and teardown photographs archived under open civic license.'
  },
  {
    index: '04',
    code: 'METH-D // PUBLIC FRICTION',
    title: 'Civic Deployment & Ethical Stress-Testing',
    duration: 'Weeks 29–36',
    deliverable: 'Public Field Trial & Adversarial Ethics Memorandum',
    description:
      'Prototypes are installed in real motorway underpasses, repair cooperatives, and watershed council rooms to surface political friction, unintended externalities, and potential institutional misuse before any technology is commercialized.',
    validationProtocol: 'Published with an unredacted Limitations & Ethical Dilemmas section directly attached to the hardware.'
  }
];

export const RESEARCH_TEAM: ResearchMember[] = [
  {
    id: 'm-01',
    code: 'TFD-PI // 01',
    name: 'Dr.-Ing. Lukas Vonderach',
    role: 'Founding Director & Principal Mechanical Architect',
    discipline: 'Precision Horology & Heavy Industrial Kinematics',
    background:
      'Former lead metrologist at ETH Zurich Institute for Machine Tools and Manufacturing; 18 years designing passive mechanical actuators and long-horizon geological instrumentation.',
    leadApparatus: ['TFD-014', 'TFD-036'],
    monograph: 'Against Cloud Amnesia: Five-Century Civic Mechanisms (Basel University Press, 2025)'
  },
  {
    id: 'm-02',
    code: 'TFD-PI // 02',
    name: 'Ir. Saskia van der Zee',
    role: 'Head of Material Substrates & Geopolymers',
    discipline: 'Inorganic Silicate Chemistry & Lithic Sintering',
    background:
      'Trained at TU Delft Faculty of Civil Engineering and Geosciences; specializes in alkali-activated blast-furnace slag concretes and vitrified basalt data substrates.',
    leadApparatus: ['TFD-014', 'TFD-023', 'TFD-027'],
    monograph: 'Post-Portland Monoliths: Structural Stone from Industrial Tailings (Rotterdam, 2024)'
  },
  {
    id: 'm-03',
    code: 'TFD-PI // 03',
    name: 'Dr. Kenji Takahashi',
    role: 'Principal Investigator, Urban Acoustics & Waveguides',
    discipline: 'Architectural Metamaterials & Active Phase Control',
    background:
      'Previously acoustic research fellow at Empa Dübendorf; develops passive sub-wavelength Helmholtz labyrinths for high-density European transit corridors.',
    leadApparatus: ['TFD-027'],
    monograph: 'The Privatization of Quiet: Earbuds and the Abandonment of the Acoustic Commons (2025)'
  },
  {
    id: 'm-04',
    code: 'TFD-PI // 04',
    name: 'Dr. Mireille Chavanon',
    role: 'Lead Biometallurgist & Mycelial Systems',
    discipline: 'Chemolithotrophic Leaching & Fungal Materiality',
    background:
      'Biochemical engineer formerly with EPFL Environmental Microbiology Laboratory; pioneers low-temperature bio-hydrometallurgy for community repair workshops.',
    leadApparatus: ['TFD-031', 'TFD-027'],
    monograph: 'Metabolic Refineries: Delaminating the Anthropocene at 34 °C (Geneva, 2026)'
  },
  {
    id: 'm-05',
    code: 'TFD-PI // 05',
    name: 'Dipl.-Des. Tomas Lindqvist',
    role: 'Director of Industrial Art Direction & Human Factors',
    discipline: 'Tactile Interface Hardware & Vernier Legibility',
    background:
      'Industrial designer trained in Stockholm and Offenbach; focuses on non-screen mechanical state indicators, high-contrast safety anodizing, and field-repairable enclosures.',
    leadApparatus: ['TFD-019', 'TFD-023'],
    monograph: 'Zero-Watt Legibility: Why Critical Instruments Should Never Require a Firmware Update (2024)'
  },
  {
    id: 'm-06',
    code: 'TFD-PI // 06',
    name: 'Prof. Nora Al-Mansoor, LL.M.',
    role: 'Senior Fellow, Speculative Law & Forensic Ethics',
    discipline: 'Environmental Tort Evidence & Trans-Boundary Treaties',
    background:
      'Legal scholar and technology critic researching how physical instrumentation reshapes burden-of-proof standards in urban pollution and watershed disputes.',
    leadApparatus: ['TFD-019', 'TFD-036'],
    monograph: 'Admissible Matter: Physical Sensors as Litigation Architecture (Zurich, 2025)'
  }
];

export const MATERIAL_SPECIMENS: MaterialSpecimen[] = [
  {
    code: 'MAT-01 // TFD-LITH-04',
    name: 'Vitrified Icelandic Tholeiitic Basalt',
    classification: 'LITHIC / MINERAL',
    density: '2.94 g/cm³',
    serviceHorizon: '> 1,000 Years',
    embodiedEnergy: '4.8 MJ/kg',
    usedIn: 'TFD-014 (Archival Data Platters)',
    notes: 'Sintered and optically lapped to Ra < 8 nm; withstands 1,120 °C and concentrated hydrofluoric/sulfuric acid exposure.'
  },
  {
    code: 'MAT-02 // TFD-GEO-75',
    name: 'Slag-Alkali Geopolymer Concrete',
    classification: 'LITHIC / MINERAL',
    density: '2.42 g/cm³',
    serviceHorizon: '120 Years (XF4 Freeze-Thaw)',
    embodiedEnergy: '0.62 MJ/kg',
    usedIn: 'TFD-027 (Acoustic Monolith) & TFD-023 (Stator Base)',
    notes: 'Formulated from 78% steel-mill blast-furnace slag and sodium silicate activator; 70% lower CO₂ footprint than CEM I.'
  },
  {
    code: 'MAT-03 // EN-GJS-800',
    name: 'Sand-Cast Austempered Ductile Iron',
    classification: 'METALLURGICAL',
    density: '7.15 g/cm³',
    serviceHorizon: '250+ Years',
    embodiedEnergy: '18.2 MJ/kg (92% Recycled Scrap)',
    usedIn: 'TFD-014 (Vault Pressure Bell)',
    notes: 'Spheroidal graphite microstructure provides superior vibration damping and subterranean corrosion resistance.'
  },
  {
    code: 'MAT-04 // 18Ni(300)',
    name: 'Vacuum-Melted Maraging Steel',
    classification: 'METALLURGICAL',
    density: '8.00 g/cm³',
    serviceHorizon: '40+ Years (150k Cycles)',
    embodiedEnergy: '46.0 MJ/kg',
    usedIn: 'TFD-023 (Flywheel Containment Bell & Prestress Rim)',
    notes: 'Yield strength 2,000 MPa; prevents catastrophic brittle fragmentation under 18,500 RPM rotational stress.'
  },
  {
    code: 'MAT-05 // MYC-GAN-95',
    name: 'Mineralized Ganoderma Mycelium Core',
    classification: 'BIOLOGICAL / HYBRID',
    density: '0.095 g/cm³',
    serviceHorizon: '15–25 Years (Encapsulated)',
    embodiedEnergy: '1.1 MJ/kg (Carbon-Negative Growth)',
    usedIn: 'TFD-027 (Helmholtz Acoustic Labyrinth Damping)',
    notes: 'Grown on agricultural hemp hurds and mineralized with sodium borate for Class B1 fire retardancy and NRC 0.88 absorption.'
  },
  {
    code: 'MAT-06 // BORO-33',
    name: 'Low-Iron Borosilicate 3.3 Glass',
    classification: 'OPTICAL / VITREOUS',
    density: '2.23 g/cm³',
    serviceHorizon: '100+ Years',
    embodiedEnergy: '14.5 MJ/kg',
    usedIn: 'TFD-019 (Capillary Slides) & TFD-031 (Bioreactor Drum)',
    notes: 'Low thermal expansion (3.3 × 10⁻⁶ K⁻¹) and chemical inertness at pH 1.5 bio-leaching conditions.'
  }
];

export const STUDIO_PRINCIPLES: StudioPrinciple[] = [
  {
    number: '01',
    title: 'PALPABLE EXTERNALITIES OVER CLOUD ABSTRACTION',
    axiom: 'If a machine consumes a finite resource, its physical operation must make that threshold felt.',
    body: 'Contemporary interfaces seduce users with frictionless glass screens that hide megawatt server loads, cobalt tailings, and aquifer depletion. Our apparatus re-couples human action to physical resistance—via hydrostatic dampers, centrifugal governors, and visible soot accumulation.'
  },
  {
    number: '02',
    title: 'ZERO-FIRMWARE LONGEVITY',
    axiom: 'Civic hardware must outlive the corporation or municipality that commissioned it.',
    body: 'Whenever a state transition, measurement, or archival lookup can be executed through Geneva mechanisms, vernier scales, Keplerian optics, or Helmholtz cavities rather than an encrypted microcontroller, we choose the mechanical path.'
  },
  {
    number: '03',
    title: 'FORENSIC COUNTERFACTUAL HONESTY',
    axiom: 'Speculative design is an instrument of public inquiry, never a venture-capital pitch deck.',
    body: 'Every invention developed in The Future Department is explicitly labeled as a fictional, non-commercial speculative research artifact. We publish thermodynamic ceilings, maintenance burdens, and ethical failure modes alongside every prototype.'
  },
  {
    number: '04',
    title: 'REPAIRABLE MINERAL ABUNDANCE',
    axiom: 'Build from stone, iron, slag, brass, and glass that a local foundry can recast.',
    body: 'We prioritize sand-cast ductile iron, sintered volcanic basalt, geopolymer slag concrete, and standard metric fasteners—ensuring any municipal workshop can disassemble, inspect, and repair the apparatus with standard tools.'
  }
];

export const STUDIO_LOCATIONS = [
  {
    code: 'LAB-01 // BASEL FOUNDRY & METROLOGY',
    city: 'Basel, Switzerland',
    address: 'Dreispitz Industriestrasse 44, Sektor B, 4053 Basel',
    focus: 'Heavy casting, lithic laser ablation, high-vacuum flywheel testing, and precision CNC horology.',
    coordinates: '47.5342° N, 7.6085° E',
    hours: 'Thu–Sat 13:00–18:00 CET (By Archival Appointment)'
  },
  {
    code: 'LAB-02 // ROTTERDAM FIELD ANNEX',
    city: 'Rotterdam, Netherlands',
    address: 'Keileweg 28, Merwe-Vierhavens (M4H), 3029 BS Rotterdam',
    focus: 'Precast geopolymer acoustics, urban arterial air-sampling rigs, and biometallurgical reactors.',
    coordinates: '51.9084° N, 4.4267° E',
    hours: 'Fri 10:00–17:00 CET (Open Municipal Testing Bay)'
  },
  {
    code: 'LAB-03 // ZURICH ARCHIVAL VAULT',
    city: 'Zurich, Switzerland',
    address: 'Hohlstrasse 418, Sub-Level III, 8048 Zürich',
    focus: 'Long-duration subterranean environmental chambers, watershed diplomacy consoles, and legal forensics.',
    coordinates: '47.3861° N, 8.4972° E',
    hours: 'Institutional & Curatorial Research Access Only'
  }
];

