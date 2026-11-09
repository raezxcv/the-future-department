export type PhaseCode = 'PHASE I' | 'PHASE II' | 'PHASE III';

export type InventionCategory =
  | 'CIVIC INFRASTRUCTURE'
  | 'ECOLOGICAL INSTRUMENTS'
  | 'DOMESTIC ENERGETICS'
  | 'PUBLIC SPACE SYSTEMS'
  | 'CIRCULAR MANUFACTURING'
  | 'GOVERNANCE HARDWARE';

export interface OperationalStep {
  step: string;
  title: string;
  mechanism: string;
  telemetry: string;
}

export interface MaterialSpec {
  part: string;
  material: string;
  grade: string;
  massShare: string;
  property: string;
}

export interface TechnicalSpecItem {
  label: string;
  value: string;
  tolerance: string;
}

export interface ImagePlate {
  key: 'hero' | 'material' | 'context' | 'technical';
  label: string;
  src: string;
  alt: string;
  caption: string;
  cameraMeta: string;
  aspect: string;
}

export interface SubAssemblyCallout {
  id: string;
  code: string;
  name: string;
  x: number;
  y: number;
  detail: string;
  materialRef: string;
}

export interface Invention {
  id: string;
  number: string;
  code: string;
  title: string;
  subtitle: string;
  category: InventionCategory;
  status: string;
  phaseCode: PhaseCode;
  horizonYear: string;
  massKg: string;
  dimensionsMm: string;
  powerRegime: string;
  speculativeNotice: string;
  summary: string;
  concept: string;
  problem: string;
  howItMightWork: OperationalStep[];
  materials: MaterialSpec[];
  specs: TechnicalSpecItem[];
  impact: string;
  limitations: string[];
  ethicalConsiderations: {
    thesis: string;
    dilemmas: { title: string; analysis: string }[];
  };
  images: {
    hero: ImagePlate;
    material: ImagePlate;
    context: ImagePlate;
    technical: ImagePlate;
  };
  callouts: SubAssemblyCallout[];
  simulator: {
    title: string;
    parameterLabel: string;
    unit: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    formulaNote: string;
  };
}

export const INVENTIONS: Invention[] = [
  {
    id: 'tfd-014',
    number: '014',
    code: 'TFD-014 // LMA-500',
    title: 'Lithic Memory Archive',
    subtitle: 'Cold-Duration Civic Data Vessel',
    category: 'CIVIC INFRASTRUCTURE',
    status: 'PHASE III — MATERIAL ENDURANCE TRIAL',
    phaseCode: 'PHASE III',
    horizonYear: '2034–2534',
    massKg: '142.0 kg',
    dimensionsMm: '380 Ø × 640 mm',
    powerRegime: '0.0 W (Manual Geneva Drive + Passive Solar/Ambient Optics)',
    speculativeNotice:
      'SPECULATIVE ARTIFACT // FICTIONAL COUNTERFACTUAL PROTOTYPE. Investigates non-electronic municipal record preservation across five-century horizons.',
    summary:
      'A zero-electricity municipal vault that femtolaser-etches constitutional treaties, aquifer tables, and toxic waste coordinates onto stacked discs of sintered volcanic basalt, readable optically via a hand-cranked Keplerian microscope.',
    concept:
      'The Lithic Memory Archive (TFD-014) rejects the assumption that long-term civilization memory belongs in air-conditioned hyperscale server farms. Designed for municipal flood-vaults and alpine hydrological treaties, the apparatus stores 24 platters of optically polished Icelandic basalt inside a sand-cast ductile iron pressure bell. Rather than encoding binary streams requiring proprietary decoders, each platter carries both human-readable micro-typographic cartography at 120× optical magnification and concentric high-density phase-grating rings.',
    problem:
      'Magnetic LTO tape requires migration every 15 to 20 years; NAND flash memory suffers charge leakage within a decade when unpowered; cloud storage depends on uninterrupted corporate solvency, lithium supply chains, and megawatt cooling grids. Consequently, 21st-century municipalities possess no physically sovereign medium capable of surviving a 500-year infrastructure interruption while remaining legible to future citizens using basic optics.',
    howItMightWork: [
      {
        step: 'STAGE 01',
        title: 'Femtosecond Sub-Surface Basalt Ablation',
        mechanism:
          'During archival inscription at the foundry, a 1030 nm femtosecond laser focuses 40 microns beneath the vitrified surface of a 140 mm sintered basalt platter, creating birefringent nanogratings with a melting threshold above 1,100 °C.',
        telemetry: 'Track pitch: 1.8 μm // Thermal stability: ≤ 1,120 °C'
      },
      {
        step: 'STAGE 02',
        title: 'Geneva-Wheel Mechanical Platter Indexing',
        mechanism:
          'Turning the exterior acid-green anodized torque crank advances a six-slot brass Geneva mechanism inside the cast-iron housing, vertically selecting one of 24 basalt platters and swinging it into the focal plane without electrical motors.',
        telemetry: 'Indexing torque: 1.4 N·m // Positional repeatability: ±2.5 μm'
      },
      {
        step: 'STAGE 03',
        title: 'Keplerian Dual-Path Optical Inspection',
        mechanism:
          'Ambient daylight or a hand-wound dynamo LED enters a synthetic corundum prism array, illuminating the selected basalt platter for direct binocular reading at 40× (human text/maps) or 200× (diffraction metadata).',
        telemetry: 'Optical resolution: 0.9 μm // Field of view: 4.2 mm'
      },
      {
        step: 'STAGE 04',
        title: 'Hermetic Metal-Seated Flood Seal',
        mechanism:
          'When the indexing lever is returned to its vertical lock detent, a knife-edge indium-copper gasket compresses against the cast-iron flange, isolating the optical stack from groundwater submersion up to 4 bar.',
        telemetry: 'Ingress rating: IP68-500Y // Gasket creep life: > 450 yrs'
      }
    ],
    materials: [
      {
        part: 'Primary Pressure Housing',
        material: 'Sand-Cast Austempered Ductile Iron',
        grade: 'EN-GJS-800-8',
        massShare: '68.4%',
        property: 'High compressive strength, graphitic corrosion resistance in subterranean vaults'
      },
      {
        part: 'Archival Data Platters (×24)',
        material: 'Sintered Tholeiitic Volcanic Basalt',
        grade: 'TFD-LITH-04 (Vitrified)',
        massShare: '14.2%',
        property: 'Zero magnetic susceptibility, Mohs hardness 6.5, acid/alkali inertness'
      },
      {
        part: 'Optical Stage & Objective Lenses',
        material: 'Synthetic Monocrystalline Corundum (Sapphire)',
        grade: 'Al₂O₃ Optical Grade A',
        massShare: '4.8%',
        property: 'Scratch-proof optical window (Mohs 9), zero yellowing over centuries'
      },
      {
        part: 'Geneva Indexer & Torque Crank',
        material: 'C36000 Free-Machining Brass & 7075-T6 Aluminum',
        grade: 'Hard-Anodized #C6FF00',
        massShare: '12.6%',
        property: 'Dry-lubricated non-galling gear mesh; high-visibility safety lock indication'
      }
    ],
    specs: [
      { label: 'DESIGN ARCHIVAL HORIZON', value: '500 Years', tolerance: '±40 yrs (Accelerated Aging)' },
      { label: 'PLATTER CAPACITY', value: '24 Discs × 18,000 Micro-Pages', tolerance: '432,000 Pages Total' },
      { label: 'OPTICAL MAGNIFICATION', value: '40× / 120× / 200×', tolerance: 'Turret-Selectable' },
      { label: 'THERMAL SURVIVABILITY', value: '1,120 °C Peak', tolerance: 'DIN 4102 Furnace Tested' },
      { label: 'HYDROSTATIC SEAL RATING', value: '0.4 MPa (40 m Head)', tolerance: 'Indium Knife-Edge' },
      { label: 'STANDBY POWER DRAW', value: '0.00 Watts', tolerance: '100% Passive Mechanical' }
    ],
    impact:
      'Shifts municipal record-keeping from ephemeral subscription cloud infrastructure to civic permanence. By making climate baselines, indigenous land treaties, and nuclear/chemical remediation maps physically indestructible and optically readable without software, local governments gain an immutable baseline against historical revisionism or grid collapse.',
    limitations: [
      'Write-Once Read-Many (WORM) constraint: once femtolaser-ablated at the foundry, basalt platters cannot be edited or patched in situ—errata require inserting a supplemental platter.',
      'Low data throughput: retrieving records is deliberately slow and physical (manual crank indexing and optical scanning), unsuitable for real-time algorithmic querying.',
      'Seismic brittle-fracture risk: while basalt resists fire and flood, peak ground accelerations above 1.4 g can shatter un-damped platters if the bronze leaf-spring suspension fatigues.'
    ],
    ethicalConsiderations: {
      thesis:
        'When a medium lasts five centuries, the act of selecting who curates the archive becomes an exercise of intergenerational political power.',
      dilemmas: [
        {
          title: 'Canonization of Present Bias',
          analysis:
            'Etching flawed contemporary property boundaries or biased bureaucratic classifications into 500-year stone risks lending geological authority to temporary political injustices.'
        },
        {
          title: 'Hazardous Knowledge Persistence',
          analysis:
            'Archiving toxic industrial site maps protects future excavators, yet also creates a permanent treasure map for bad actors seeking legacy heavy-metal or radiological repositories.'
        }
      ]
    },
    images: {
      hero: {
        key: 'hero',
        label: 'PLATE 01 // HERO APPARATUS',
        src: '/images/projects/tfd-014-hero.png',
        alt: 'Lithic Memory Archive cast-iron cylindrical vault showing internal stack of 24 black basalt platters, brass optical turret, and acid-green hand-crank lever',
        caption: 'Fig 14.1 — TFD-014 full-scale prototype on concrete metrology plinth. Cutaway inspection window exposes the 24-platter basalt stack and central C36000 brass spindle.',
        cameraMeta: '50mm Medium-Format · f/8 · Raking Strobe · 4:3',
        aspect: '4/3'
      },
      material: {
        key: 'material',
        label: 'PLATE 02 // MATERIAL MICROGRAPH',
        src: '/images/projects/tfd-014-material.png',
        alt: 'Macro view of sintered black volcanic basalt platter showing concentric green-diffracting femtolaser data rings and brass retaining hub',
        caption: 'Fig 14.2 — 100mm macro study of sintered Icelandic basalt platter TFD-LITH-04 under 532 nm oblique inspection light, showing concentric 1.8 μm ablation tracks.',
        cameraMeta: '100mm 2:1 Macro · f/5.6 · Fiber-Optic Ring · 4:3',
        aspect: '4/3'
      },
      context: {
        key: 'context',
        label: 'PLATE 03 // FIELD DEPLOYMENT',
        src: '/images/projects/tfd-014-context.png',
        alt: 'Lithic Memory Archive mounted on a concrete pedestal inside a brutalist subterranean municipal flood vault',
        caption: 'Fig 14.3 — Subterranean installation study inside Municipal Civil Defense Vault IV, Zurich-West (depth -18.5 m).',
        cameraMeta: '24mm Tilt-Shift · f/8 · Fluorescent Vault Ambient · 16:9',
        aspect: '16/9'
      },
      technical: {
        key: 'technical',
        label: 'PLATE 04 // ORTHOGRAPHIC KNOLLING',
        src: '/images/projects/tfd-014-technical.png',
        alt: 'Top-down knolling layout of disassembled basalt platters, brass Geneva wheel, sapphire lenses, and acid-green torque crank',
        caption: 'Fig 14.4 — Disassembled sub-assembly verification prior to indium gasket torquing: basalt discs, six-slot Geneva wheel, corundum optics, and 7075-T6 lever.',
        cameraMeta: '65mm Flat-Field Zenith · f/11 · Softbox · 4:3',
        aspect: '4/3'
      }
    },
    callouts: [
      {
        id: 'c1',
        code: 'A-01',
        name: 'Keplerian Sapphire Ocular',
        x: 50,
        y: 16,
        detail: 'Turret-selectable 40× / 120× / 200× binocular optics ground from synthetic corundum.',
        materialRef: 'Al₂O₃ Grade A'
      },
      {
        id: 'c2',
        code: 'B-04',
        name: 'Sintered Basalt Platter Stack',
        x: 48,
        y: 44,
        detail: '24 vitrified volcanic basalt discs etched via 1030 nm femtosecond laser pulses.',
        materialRef: 'TFD-LITH-04'
      },
      {
        id: 'c3',
        code: 'C-02',
        name: 'Geneva Torque Indexer',
        x: 73,
        y: 38,
        detail: 'Hand-cranked 6-slot brass mechanism converting rotary input into discrete 4.5 mm platter steps.',
        materialRef: 'C36000 / 7075-T6'
      },
      {
        id: 'c4',
        code: 'D-09',
        name: 'Indium-Seated Flood Flange',
        x: 38,
        y: 69,
        detail: 'Austempered ductile iron base with cold-welded indium knife-edge seal rated to 0.4 MPa.',
        materialRef: 'EN-GJS-800-8'
      }
    ],
    simulator: {
      title: 'OPTICAL MAGNIFICATION & ARCHIVAL HORIZON SIMULATOR',
      parameterLabel: 'Archive Elapsed Time Horizon',
      unit: 'Years',
      min: 25,
      max: 500,
      step: 25,
      defaultValue: 250,
      formulaNote: 'Arrhenius glass-transition relaxation model at T_vault = 285 K vs. magnetic/NAND bit-decay.'
    }
  },
  {
    id: 'tfd-019',
    number: '019',
    code: 'TFD-019 // ATX-031',
    title: 'Atmospheric Taxonomist',
    subtitle: 'Micro-Particulate Stratigraphy Sampler',
    category: 'ECOLOGICAL INSTRUMENTS',
    status: 'PHASE II — FIELD CALIBRATION',
    phaseCode: 'PHASE II',
    horizonYear: '2031',
    massKg: '28.4 kg',
    dimensionsMm: '620 × 410 × 145 mm',
    powerRegime: '4.2 W Continuous (Corona Precipitator + Clockwork Stepper)',
    speculativeNotice:
      'SPECULATIVE ARTIFACT // FICTIONAL COUNTERFACTUAL PROTOTYPE. Explores physical forensic evidence collection for urban air-quality litigation.',
    summary:
      'A façade-mounted stainless-steel air collector that precipitates urban aerosols onto 31 vertical borosilicate glass capillary slides—one per day of the month—rendering invisible PM2.5 pollution as a physical, admissible bar chart of soot, brake dust, and pollen.',
    concept:
      'Modern smart-city air quality monitors translate toxic particulate matter into ephemeral JSON payloads that disappear whenever municipal budgets shift or sensor vendors deprecate an API. The Atmospheric Taxonomist (TFD-019) rejects digital abstraction in favor of direct physical deposition. Bolted at breathing height (1.6 m) along arterial roadways, the instrument advances an acid-green anodized electrostatic carriage across 31 borosilicate slides over a calendar month. Each slide accumulates a stratified physical core of that day’s atmosphere: black diesel carbon at the base, rust-red copper-iron brake pad dust in the mid-band, and yellow biological pollen at the crown.',
    problem:
      'Communities bordering logistics corridors and ring-roads suffer acute respiratory and cardiovascular harm from non-exhaust vehicular emissions (tire elastomers and metallic brake wear), yet digital consumer PM2.5 laser-scattering counters lack chemical specificity and cannot be introduced as physical forensic specimens in environmental tort proceedings.',
    howItMightWork: [
      {
        step: 'STAGE 01',
        title: 'Isokinetic Louvered Intake',
        mechanism:
          'A machined brass ventral louver array draws 2.0 liters/minute of ambient street air via a low-pulsation bronze diaphragm pump, matching local wind velocity to prevent particle size fractionation.',
        telemetry: 'Volumetric flow: 2.0 L/min ±1.5% // Cutoff: PM10 to PM0.3'
      },
      {
        step: 'STAGE 02',
        title: 'Differential Corona-Discharge Precipitation',
        mechanism:
          'Particulates pass a 4.8 kV tungsten corona wire mounted inside the movable acid-green indexing carriage, acquiring a electrostatic charge proportional to their aerodynamic diameter and dielectric constant.',
        telemetry: 'Corona potential: +4.8 kV DC // Collection efficiency: 97.4%'
      },
      {
        step: 'STAGE 03',
        title: 'Elutriated Glass-Slide Stratigraphy',
        mechanism:
          'As air rises through the active day’s vertical borosilicate capillary slot, dense metallic brake particulates precipitate low on the slide while lighter carbon soot and organic aerosols settle into distinct upper strata.',
        telemetry: 'Slide dimensions: 12 × 180 × 2.0 mm // 31 Daily Slots'
      },
      {
        step: 'STAGE 04',
        title: 'Tamper-Evident Forensic Cassette Lock',
        mechanism:
          'At 24:00 UTC each midnight, a lead-screw advances the carriage by 14.5 mm to the next glass slide and thermally crimps a fluoropolymer seal across the completed slide for chain-of-custody lab XRF analysis.',
        telemetry: 'Step pitch: 14.50 mm // Chain-of-custody: ISO-17025 physical seal'
      }
    ],
    materials: [
      {
        part: 'Weatherproof Façade Enclosure',
        material: 'Bead-Blasted Marine Stainless Steel',
        grade: 'AISI 316L (2.5 mm Gauge)',
        massShare: '58.0%',
        property: 'Pitting resistance against road-salt aerosols and nitric acid rain'
      },
      {
        part: '31-Day Deposition Cassettes',
        material: 'Low-Iron Optical Borosilicate Glass',
        grade: 'SCHOTT Borofloat 33',
        massShare: '19.5%',
        property: 'Zero background fluorescence during post-collection Raman spectroscopy'
      },
      {
        part: 'Intake Louvers & Diaphragm Pump',
        material: 'Architectural Silicon Bronze',
        grade: 'C65500',
        massShare: '14.0%',
        property: 'Static-dissipative intake path preventing premature particle wall-loss'
      },
      {
        part: 'Electrostatic Indexing Carriage',
        material: 'CNC 6082-T6 Aluminum & PTFE Insulators',
        grade: 'Anodized #C6FF00',
        massShare: '8.5%',
        property: 'High-visibility daily position marker readable from 25 meters across traffic'
      }
    ],
    specs: [
      { label: 'SAMPLING CYCLE', value: '31 Discrete Days', tolerance: '24h / Capillary Slide' },
      { label: 'VOLUMETRIC AIR THROUGHPUT', value: '2.88 m³ / Day', tolerance: '89.3 m³ Monthly Core' },
      { label: 'PARTICLE FRACTIONATION', value: '0.3 μm – 10.0 μm', tolerance: '3-Band Gravity/Charge' },
      { label: 'PRECIPITATOR VOLTAGE', value: '4,800 V DC', tolerance: 'Current-Limited 0.4 mA' },
      { label: 'OPTICAL OPACITY READOUT', value: 'Direct Daylight Backlit', tolerance: 'No Screen Required' },
      { label: 'MOUNTING SPEC', value: '4× M12 Expansion Anchors', tolerance: 'Concrete Pier / Façade' }
    ],
    impact:
      'Transforms air quality from an invisible statistical dispute into undeniable public architecture. Passersby can literally see whether Tuesday’s thermal inversion or Friday’s freight surge blackened the glass, while tenant unions can unclip the monthly cassette and bring the physical soot into court.',
    limitations: [
      'Humidity agglomeration: when relative humidity exceeds 88% (dense fog), hygroscopic aerosol swelling blurs the boundary between metallic brake dust and carbon soot strata.',
      'Monthly manual cassette exchange: requires a physical technician or civic steward to unlock the chassis every 31 days and load a fresh sterile borosilicate rack.',
      'High-voltage ozone trace: the 4.8 kV corona wire generates ~4 ppb localized ozone inside the chimney, preventing internal biological viability testing of captured spores.'
    ],
    ethicalConsiderations: {
      thesis:
        'Visible forensic proof redistributes environmental power, but also immediately triggers property-value and surveillance conflicts.',
      dilemmas: [
        {
          title: 'Redlining by Visible Soot',
          analysis:
            'Landlords and municipal mortgage lenders may weaponize public façade soot-racks to depress residential valuations or deny insurance in working-class industrial districts rather than remediating the emission source.'
        },
        {
          title: 'Atmospheric Counter-Forensics',
          analysis:
            'Industrial emitters adjacent to a sampler could deploy localized water-mist cannons near the intake louver to artificially scrub the 2.0 L/min sample stream without cleaning the wider neighborhood air.'
        }
      ]
    },
    images: {
      hero: {
        key: 'hero',
        label: 'PLATE 01 // HERO APPARATUS',
        src: '/images/projects/tfd-019-hero.png',
        alt: 'Atmospheric Taxonomist brushed stainless-steel wall unit displaying 31 vertical glass slides stained with varying heights of urban soot and an acid-green indexing carriage',
        caption: 'Fig 19.1 — TFD-019 elevation showing a completed 31-day urban particulate core. The acid-green carriage sits locked on Day 23 following an arterial freight spike.',
        cameraMeta: '70mm Medium-Format · f/8 · Cross-Lit Backlight · 4:3',
        aspect: '4/3'
      },
      material: {
        key: 'material',
        label: 'PLATE 02 // MATERIAL MICROGRAPH',
        src: '/images/projects/tfd-019-material.png',
        alt: 'Backlit macro of four borosilicate glass capillary slides showing stratified layers of black diesel soot, rust-red brake dust, and yellow pollen',
        caption: 'Fig 19.2 — Transmitted-light macro of slides #14–#17: bottom black stratum (PM2.5 elemental carbon), mid ochre stratum (Fe/Cu brake wear), upper amber band (pollen/silica).',
        cameraMeta: '105mm Macro · f/8 · 5000K Transmitted Table · 4:3',
        aspect: '4/3'
      },
      context: {
        key: 'context',
        label: 'PLATE 03 // FIELD DEPLOYMENT',
        src: '/images/projects/tfd-019-context.png',
        alt: 'Atmospheric Taxonomist bolted to a weathered concrete highway overpass pier with blurred traffic behind',
        caption: 'Fig 19.3 — Field trial installation on Pier 09 of the A2 Osttangente motorway viaduct, Basel. Mounted at 1.65 m pedestrian inhalation height.',
        cameraMeta: '35mm Documentary Prime · f/5.6 · Overcast Daylight · 16:9',
        aspect: '16/9'
      },
      technical: {
        key: 'technical',
        label: 'PLATE 04 // CHASSIS CUTAWAY',
        src: '/images/projects/tfd-019-technical.png',
        alt: 'Open-chassis view showing copper high-voltage corona transformers, tungsten wire grid, brass vacuum pump, and acid-green timing belt',
        caption: 'Fig 19.4 — Internal service bay exposing the triple step-up HV potted coils, tungsten corona ionization plane, and synchronous slide-indexing belt.',
        cameraMeta: '60mm Isometric Macro · f/11 · Rim Strobe · 4:3',
        aspect: '4/3'
      }
    },
    callouts: [
      {
        id: 'c1',
        code: 'A-01',
        name: '31-Slide Borosilicate Rack',
        x: 46,
        y: 44,
        detail: 'Removable cassette of 31 optical Borofloat-33 capillary slides, one per day of the calendar month.',
        materialRef: 'Borofloat 33'
      },
      {
        id: 'c2',
        code: 'B-03',
        name: 'Electrostatic Corona Carriage',
        x: 64,
        y: 38,
        detail: 'Acid-green anodized carriage housing the +4.8 kV tungsten corona charging wire.',
        materialRef: '6082-T6 / Tungsten'
      },
      {
        id: 'c3',
        code: 'C-07',
        name: 'Isokinetic Bronze Louver',
        x: 50,
        y: 72,
        detail: 'Static-dissipative silicon bronze intake array regulated to 2.0 L/min.',
        materialRef: 'C65500 Bronze'
      },
      {
        id: 'c4',
        code: 'D-02',
        name: '316L Weather Bulkhead',
        x: 20,
        y: 26,
        detail: 'Bead-blasted marine stainless steel frame with tamper-evident forensic anchor bolts.',
        materialRef: 'AISI 316L'
      }
    ],
    simulator: {
      title: 'DAILY PARTICULATE STRATIGRAPHY & SOOT OPTICAL DENSITY INSPECTOR',
      parameterLabel: 'Selected Calendar Day Slide',
      unit: 'Day',
      min: 1,
      max: 31,
      step: 1,
      defaultValue: 23,
      formulaNote: 'Beer-Lambert optical attenuation OD = -log10(I/I0) across carbon, metallic brake-wear, and bio-aerosol bands.'
    }
  },
  {
    id: 'tfd-023',
    number: '023',
    code: 'TFD-023 // CBL-068',
    title: 'Circadian Ballast',
    subtitle: 'Grid-Synchronous Domestic Flywheel',
    category: 'DOMESTIC ENERGETICS',
    status: 'PHASE II — KINETIC PROTOTYPE',
    phaseCode: 'PHASE II',
    horizonYear: '2033',
    massKg: '118.0 kg (68.0 kg Rotor)',
    dimensionsMm: '440 Ø × 780 mm',
    powerRegime: '3.2 kWh Kinetic Storage // 18,500 RPM Max',
    speculativeNotice:
      'SPECULATIVE ARTIFACT // FICTIONAL COUNTERFACTUAL PROTOTYPE. Investigates non-chemical, mineral-abundant domestic energy storage coupled to grid carbon intensity.',
    summary:
      'A floor-standing vacuum-sealed concrete and maraging-steel flywheel for apartments that spins up only during regional wind/solar surplus and physically communicates grid scarcity through an audible harmonic hum and mechanical aperture.',
    concept:
      'Chemical home batteries (LiFePO4 / NMC) conceal the ecological cost of cobalt, lithium, and finite cycle-life behind silent white plastic wall-boxes, encouraging households to treat electricity as an infinite, time-agnostic commodity. The Circadian Ballast (TFD-023) replaces electrochemistry with pure rotational inertia. Constructed from ultra-high-performance fiber-reinforced concrete (UHPFRC) prestressed inside a maraging-steel rim and levitated on passive Halbach magnetic bearings inside a 0.1 mbar vacuum bell, the 68 kg rotor stores 3.2 kWh of kinetic energy with a 40-year zero-degradation lifespan.',
    problem:
      'As urban electrical grids transition to 80%+ intermittent wind and solar generation, peak evening residential loads require massive short-duration buffering. Deploying chemical lithium batteries in every apartment creates severe fire-load hazards in multi-family housing and requires battery cell replacement every 10–12 years.',
    howItMightWork: [
      {
        step: 'STAGE 01',
        title: 'Grid-Frequency Synchronous Spin-Up',
        mechanism:
          'When regional grid frequency exceeds 50.02 Hz (indicating midday solar or nocturnal wind curtailment), the brushless coreless stator accelerates the 68 kg concrete-steel rotor up to 18,500 RPM.',
        telemetry: 'Charge efficiency: 91.8% // Max rim velocity: 380 m/s'
      },
      {
        step: 'STAGE 02',
        title: 'Passive Halbach Magnetic Levitation',
        mechanism:
          'A permanent-magnet Halbach array in the lower concrete pedestal offloads 98% of the rotor’s axial weight without active power draw, while ceramic-hybrid touchdown bearings guard against seismic jolts.',
        telemetry: 'Vacuum pressure: 0.08 mbar // Self-discharge: 1.9% / hour'
      },
      {
        step: 'STAGE 03',
        title: 'Mechanical Iris State-of-Charge Aperture',
        mechanism:
          'Centrifugal governor weights coupled via a magnetic Eddy-current clutch dilate an acid-green anodized iris shutter behind the front borosilicate viewport—wide open at 18,500 RPM, closed black at rest.',
        telemetry: 'Visual readout: 0%–100% mechanical iris // 0.0 W display draw'
      },
      {
        step: 'STAGE 04',
        title: 'Tactile Scarcity Governor Load-Shedding',
        mechanism:
          'When rotor speed drops below 6,000 RPM during a dunkelflaute (wind/solar lull), a mechanical contactor physically throttles high-draw resistive circuits (ovens, dryers) unless the resident manually holds the override lever.',
        telemetry: 'Continuous discharge: 4.5 kW // Peak surge: 9.0 kW (30 s)'
      }
    ],
    materials: [
      {
        part: 'Inertial Rotor Core',
        material: 'Ultra-High-Performance Steel-Fiber Concrete (UHPFRC)',
        grade: 'Ductal-TFD 190 MPa',
        massShare: '44.0%',
        property: 'Low embodied carbon mass core with zero critical-mineral extraction'
      },
      {
        part: 'Prestressed Rotor Rim & Vacuum Bell',
        material: 'Spun Maraging Steel & Laminated Silicon Steel',
        grade: '18Ni(300) / M19 Electrical',
        massShare: '38.5%',
        property: '2,000 MPa hoop tensile containment and Halbach magnetic flux return'
      },
      {
        part: 'Acoustic & Seismic Pedestal Base',
        material: 'Cast Slag-Cement Concrete with Cork Elastomer Footing',
        grade: 'CEM III/B',
        massShare: '13.5%',
        property: 'Isolates 308 Hz rotational harmonics from apartment timber/concrete slabs'
      },
      {
        part: 'Centrifugal Tachometer Iris Shutter',
        material: 'CNC 7075 Aluminum & Borosilicate Sight Glass',
        grade: 'Anodized #C6FF00',
        massShare: '4.0%',
        property: 'Zero-power optical state-of-charge indication across the room'
      }
    ],
    specs: [
      { label: 'USABLE KINETIC CAPACITY', value: '3.20 kWh', tolerance: '6,000–18,500 RPM Window' },
      { label: 'CYCLE DEGRADATION LIFE', value: '> 150,000 Cycles', tolerance: '40-Year Design Service' },
      { label: 'ROTOR ROTATING MASS', value: '68.0 kg', tolerance: 'Dynamic Balance G0.4' },
      { label: 'CHAMBER VACUUM LEVEL', value: '0.08 mbar', tolerance: 'Regenerative Molecular Drag' },
      { label: 'ACOUSTIC FLOOR AT 1m', value: '34.0 dBA (18.5k RPM)', tolerance: 'Tonal Harmonic Hum' },
      { label: 'CRITICAL MINERAL CONTENT', value: '0.0 g Lithium / Cobalt', tolerance: 'Fe / Si / Ca Matrix' }
    ],
    impact:
      'Re-materializes domestic energy consumption. Instead of treating electricity as an invisible utility, residents develop an intuitive circadian literacy: cooking, laundering, and heating when the apartment’s physical ballast is spun full of midday sun or coastal wind.',
    limitations: [
      'High parasitic standing loss: aerodynamic drag and eddy currents bleed ~1.9% of stored energy per hour, making the flywheel suitable only for 6-to-18-hour diurnal shifting, never seasonal storage.',
      'Gyroscopic precession torque: tilting or moving the 118 kg unit while spun up generates up to 420 N·m of orthogonal torque; requires rigid structural floor bolting.',
      'Slab load concentration: 118 kg over a 0.15 m² footprint exceeds unreinforced timber joist limits in pre-1920 walk-up apartments without a spreader plate.'
    ],
    ethicalConsiderations: {
      thesis:
        'Coupling domestic comfort directly to instantaneous renewable supply exposes the socioeconomic inequality of time-flexibility.',
      dilemmas: [
        {
          title: 'Chrono-Stratified Energy Poverty',
          analysis:
            'Remote knowledge workers can easily align laundry and cooking with midday solar spin-up peaks, whereas shift workers returning home at 23:00 face depleted flywheels and punitive grid tariffs.'
        },
        {
          title: 'Containment Anxiety in Dense Housing',
          analysis:
            'Living beside a 68 kg mass spinning at Mach 1.1 rim speed introduces psychological friction in domestic spaces, demanding absolute transparency in containment metallurgy.'
        }
      ]
    },
    images: {
      hero: {
        key: 'hero',
        label: 'PLATE 01 // HERO APPARATUS',
        src: '/images/projects/tfd-023-hero.png',
        alt: 'Circadian Ballast cylindrical domestic flywheel with dark maraging-steel upper bell, raw concrete base, and circular acid-green tachometer aperture',
        caption: 'Fig 23.1 — TFD-023 prototype showing the spun 18Ni(300) vacuum containment bell bolted to the UHPFRC pedestal base. Iris shutter indicates 78% rotational charge.',
        cameraMeta: '50mm Medium-Format · f/6.3 · Cylindrical Key Light · 4:3',
        aspect: '4/3'
      },
      material: {
        key: 'material',
        label: 'PLATE 02 // MATERIAL MICROGRAPH',
        src: '/images/projects/tfd-023-material.png',
        alt: 'Macro view of the interface between honed fiber-reinforced concrete rotor, silicon-steel magnetic laminations, and acid-green balancing pins',
        caption: 'Fig 23.2 — Radial cross-section of the rotor rim: Ductal-TFD concrete core interference-fitted into stacked M19 electrical steel laminations with #C6FF00 G0.4 balance pins.',
        cameraMeta: '90mm Macro · f/5.6 · Grazing Directional Strobe · 4:3',
        aspect: '4/3'
      },
      context: {
        key: 'context',
        label: 'PLATE 03 // FIELD DEPLOYMENT',
        src: '/images/projects/tfd-023-context.png',
        alt: 'Circadian Ballast standing in the corner of a minimalist concrete and birch apartment with a heavy braided steel conduit to the breaker box',
        caption: 'Fig 23.3 — Domestic installation inside a 64 m² cooperative apartment in Zurich-Kalkbreite, hard-wired to the sub-panel via armored flexible conduit.',
        cameraMeta: '28mm Wide Prime · f/4 · Dusk Window Light · 16:9',
        aspect: '16/9'
      },
      technical: {
        key: 'technical',
        label: 'PLATE 04 // EXPLODED AXIS',
        src: '/images/projects/tfd-023-technical.png',
        alt: 'Vertical exploded assembly showing upper steel vacuum bell, acid-green fluoroelastomer O-ring, concrete flywheel rotor, and copper levitation stator',
        caption: 'Fig 23.4 — Hoisted vertical disassembly on the foundry test stand: vacuum bell (top), Viton/anodized seal ring, 68 kg UHPFRC rotor, and coreless copper Halbach stator (bottom).',
        cameraMeta: '75mm Telephoto · f/8 · Symmetrical Rim Strobe · 4:3',
        aspect: '4/3'
      }
    },
    callouts: [
      {
        id: 'c1',
        code: 'A-01',
        name: '18Ni(300) Vacuum Bell',
        x: 50,
        y: 23,
        detail: 'Spun maraging steel containment vessel evacuated to 0.08 mbar with 2,000 MPa hoop burst rating.',
        materialRef: 'Maraging 300'
      },
      {
        id: 'c2',
        code: 'B-02',
        name: 'Centrifugal Tachometer Iris',
        x: 50,
        y: 35,
        detail: 'Eddy-current coupled acid-green mechanical iris indicating stored kinetic Wh without electronics.',
        materialRef: '7075-T6 / Borofloat'
      },
      {
        id: 'c3',
        code: 'C-05',
        name: 'Bolted Vacuum Flange & Seal',
        x: 38,
        y: 51,
        detail: '12-bolt M10 high-vacuum flange with regenerative molecular drag pump port.',
        materialRef: 'AISI 304 / Viton'
      },
      {
        id: 'c4',
        code: 'D-08',
        name: 'UHPFRC Stator Pedestal',
        x: 50,
        y: 66,
        detail: 'Cast steel-fiber concrete base housing the passive Halbach magnetic levitation array.',
        materialRef: 'Ductal-TFD 190'
      }
    ],
    simulator: {
      title: 'ROTATIONAL INERTIA & KINETIC STORAGE TELEMETRY SIMULATOR',
      parameterLabel: 'Flywheel Rotational Velocity',
      unit: 'RPM',
      min: 3000,
      max: 18500,
      step: 500,
      defaultValue: 14500,
      formulaNote: 'Kinetic Energy E_k = ½ · I · ω² where Rotor Moment of Inertia I = 1.18 kg·m².'
    }
  },
  {
    id: 'tfd-027',
    number: '027',
    code: 'TFD-027 // ATR-144',
    title: 'Acoustic Territorializer',
    subtitle: 'Phase-Nullifying Urban Monolith',
    category: 'PUBLIC SPACE SYSTEMS',
    status: 'PHASE I — ACOUSTIC BENCHMARK',
    phaseCode: 'PHASE I',
    horizonYear: '2032',
    massKg: '1,840.0 kg',
    dimensionsMm: '2400 × 920 × 1380 mm',
    powerRegime: '18.0 W (Piezoelectric Phase Array) / Passive Helmholtz below 400 Hz',
    speculativeNotice:
      'SPECULATIVE ARTIFACT // FICTIONAL COUNTERFACTUAL PROTOTYPE. Investigates de-privatizing urban silence through architectural metamaterial street furniture.',
    summary:
      'A brutalist precast geopolymer concrete street bench perforated with 144 tuned Helmholtz resonance cavities and an active piezoelectric horn array that carves a 2.4-meter silent acoustic shadow inside 85 dBA traffic corridors—without headphones.',
    concept:
      'In contemporary cities, acoustic refuge has been privatized into consumer noise-canceling earbuds—leaving public transit islands, elderly pedestrians, and outdoor civic workers exposed to chronic 80+ dBA arterial noise that elevates cortisol and cardiovascular mortality. The Acoustic Territorializer (TFD-027) reclaims silence as public infrastructure. Cast as a 1.8-tonne cantilevered slag-alkali geopolymer monolith, its interior is honeycombed with 144 labyrinthine Helmholtz resonators tuned between 65 Hz and 420 Hz (heavy diesel engine and tire-cavity roar), paired with 16 weatherproof piezoelectric phase-inversion horns that project a localized destructive-interference zone across the seating bench.',
    problem:
      'The World Health Organization identifies environmental road-traffic noise above 53 dB Lden as the second-largest environmental health hazard in Western Europe, yet conventional highway noise walls cannot be erected along urban boulevards, tram islands, or pedestrian crossings.',
    howItMightWork: [
      {
        step: 'STAGE 01',
        title: 'Broadband Sub-400 Hz Helmholtz Absorption',
        mechanism:
          'Incoming low-frequency tire and diesel rumble enters 144 spun-brass neck apertures cast into the monolith’s rear and upper fascia, driving air columns inside internal concrete labyrinths where acoustic energy dissipates as heat in mycelium foam.',
        telemetry: 'Passive attenuation: -11.4 dB (80–380 Hz band)'
      },
      {
        step: 'STAGE 02',
        title: 'Boundary-Layer Reference Microphone Array',
        mechanism:
          'Eight flush-mounted stainless MEMS pressure transducers on the traffic-facing flank sample the incoming acoustic wavefront 1.8 milliseconds before it diffracts around the cantilevered concrete hood.',
        telemetry: 'DSP latency: 0.14 ms (Analog/FPGA hybrid filter)'
      },
      {
        step: 'STAGE 03',
        title: 'Piezoelectric Phase-Inverted Waveguide Projection',
        mechanism:
          'Sixteen acid-green polyurethane waveguide horns in the central seating zone emit an anti-phase pressure wave (180° phase shift) across the 400 Hz–1,800 Hz human speech and siren band, creating a 2.4 m diameter quiet shadow.',
        telemetry: 'Active zone insertion loss: -16.8 dBA @ seated head height'
      },
      {
        step: 'STAGE 04',
        title: 'Manual Brass Neck-Ring Seasonal Retuning',
        mechanism:
          'Because the speed of sound shifts with winter/summer air temperature (331 m/s at 0 °C vs. 349 m/s at 30 °C), municipal maintenance crews rotate the knurled brass Helmholtz collars by 90° each equinox to adjust neck length.',
        telemetry: 'Thermal pitch compensation: -10 °C to +35 °C'
      }
    ],
    materials: [
      {
        part: 'Cantilevered Monolith & Bench Body',
        material: 'Slag-Alkali Precast Geopolymer Concrete',
        grade: 'TFD-GEO-75 (78% Blast-Furnace Slag)',
        massShare: '86.2%',
        property: 'High acoustic impedance mismatch (Z = 8.4 MRayl) and 70% lower CO₂ than Portland cement'
      },
      {
        part: 'Internal Labyrinth Damping Cores',
        material: 'Mineralized Ganoderma Mycelium Acoustic Foam',
        grade: 'Density 95 kg/m³ (Borate-Treated)',
        massShare: '5.4%',
        property: 'Tortuous open-cell hyphal structure with NRC 0.88 absorption coefficient'
      },
      {
        part: 'Tunable Resonator Throats (×144)',
        material: 'Spun & Knurled Naval Brass',
        grade: 'C46400',
        massShare: '6.1%',
        property: 'Corrosion-proof threaded acoustic necks allowing manual seasonal frequency tuning'
      },
      {
        part: 'Active Phase-Cancellation Waveguides (×16)',
        material: 'Cast Shore-90A Polyurethane & Ceramic Piezo Drivers',
        grade: 'RAL-Acid #C6FF00',
        massShare: '2.3%',
        property: 'Hydrophobic acoustic horn throats demarcating the active phase-null seating zone'
      }
    ],
    specs: [
      { label: 'COMBINED INSERTION LOSS', value: '-18.2 dBA Peak', tolerance: 'Seated Ear Plane (1.15 m)' },
      { label: 'RESONATOR MATRIX COUNT', value: '144 Tuned Cavities', tolerance: '12 Sub-Bands (65–420 Hz)' },
      { label: 'SILENT SHADOW FOOTPRINT', value: '2.40 m × 1.10 m', tolerance: '3-Person Seating Envelope' },
      { label: 'ACTIVE ARRAY POWER', value: '18.0 Watts Nominal', tolerance: 'Tram-Catenary / Solar Trickle' },
      { label: 'STRUCTURAL MASS', value: '1,840 kg', tolerance: 'Forklift / Crane Socketed' },
      { label: 'WEATHER INGRESS', value: 'Freeze-Thaw XF4', tolerance: 'Self-Draining Weep Channels' }
    ],
    impact:
      'Establishes acoustic commons in hostile urban infrastructure. By carving an un-gated pocket of 62 dBA calm inside an 80+ dBA boulevard without requiring smartphones, subscriptions, or earbuds, public space becomes habitable again for unmediated conversation and rest.',
    limitations: [
      'Spatial comb-filtering at zone boundary: stepping across the outer edge of the 2.4 m destructive-interference cone produces a momentary +3 dB constructive phase-ringing artifact.',
      'High-frequency diffraction limit: frequencies above 2,200 Hz (screeching steel tram flanges on tight curves) have wavelengths too short (<15 cm) for wide-area active phase cancellation and rely solely on the concrete hood’s physical shadow.',
      'Urban detritus fouling: resonator throats require quarterly compressed-air clearing to prevent autumn leaves or litter from detuning the Helmholtz cavities.'
    ],
    ethicalConsiderations: {
      thesis:
        'Creating localized islands of silence in noisy cities raises acute questions of spatial triage, warning-signal masking, and hostile urbanism.',
      dilemmas: [
        {
          title: 'Acoustic Hazard Masking',
          analysis:
            'Over-attenuating the 500–1,500 Hz band risks muting approaching emergency vehicle sirens or reversing lorry alarms for visually impaired pedestrians seated inside the acoustic shadow.'
        },
        {
          title: 'Symptom Palliation vs. Source Reduction',
          analysis:
            'Municipalities might deploy decorative silence monoliths as an excuse to avoid politically difficult speed-limit reductions, freight restrictions, or low-noise porous asphalt resurfacing.'
        }
      ]
    },
    images: {
      hero: {
        key: 'hero',
        label: 'PLATE 01 // HERO APPARATUS',
        src: '/images/projects/tfd-027-hero.png',
        alt: 'Acoustic Territorializer brutalist precast concrete bench perforated with 3 rows of brass Helmholtz resonator rings and central acid-green phase-canceling horns',
        caption: 'Fig 27.1 — TFD-027 full-scale precast geopolymer monolith in the TFD semi-anechoic test bay. Central #C6FF00 waveguides mark the active destructive-interference seating zone.',
        cameraMeta: '40mm Medium-Format · f/8 · Hard Architectural Key · 4:3',
        aspect: '4/3'
      },
      material: {
        key: 'material',
        label: 'PLATE 02 // MATERIAL MICROGRAPH',
        src: '/images/projects/tfd-027-material.png',
        alt: 'Macro 2x2 grid of conical Helmholtz resonator apertures in slag concrete with knurled brass rings and perforated acid-green mesh over mycelium foam',
        caption: 'Fig 27.2 — Detail of four 125 Hz Helmholtz throats showing exposed blast-furnace slag aggregate, C46400 knurled tuning collars, and acid-green protective mesh.',
        cameraMeta: '100mm Macro · f/8 · Oblique Side Strobe · 4:3',
        aspect: '4/3'
      },
      context: {
        key: 'context',
        label: 'PLATE 03 // FIELD DEPLOYMENT',
        src: '/images/projects/tfd-027-context.png',
        alt: 'Acoustic Territorializer installed on a wet concrete traffic island in Rotterdam with motion-blurred tram and lorry lights behind',
        caption: 'Fig 27.3 — Acoustic benchmark deployment on Westzeedijk arterial tram island, Rotterdam (ambient traffic baseline: 83.4 dBA; bench envelope: 65.2 dBA).',
        cameraMeta: '35mm Prime · f/8 · 1/8s Motion Blur · 16:9',
        aspect: '16/9'
      },
      technical: {
        key: 'technical',
        label: 'PLATE 04 // SAWN CROSS-SECTION',
        src: '/images/projects/tfd-027-technical.png',
        alt: 'Diamond-sawn concrete cross-section revealing internal labyrinth Helmholtz chambers, pale mycelium damping layer, brass neck tubes, and acid-green gaskets',
        caption: 'Fig 27.4 — Diamond-wire saw cut of prototype test block #03 exposing the internal quarter-wave concrete labyrinth, mineralized mycelium core, and brass throat.',
        cameraMeta: '85mm Flat-Field · f/11 · Orthographic Profile · 4:3',
        aspect: '4/3'
      }
    },
    callouts: [
      {
        id: 'c1',
        code: 'A-01',
        name: 'Geopolymer Acoustic Hood',
        x: 32,
        y: 26,
        detail: '1.84-tonne precast slag-alkali concrete monolith providing high-mass acoustic reflection.',
        materialRef: 'TFD-GEO-75'
      },
      {
        id: 'c2',
        code: 'B-06',
        name: 'Tunable Brass Helmholtz Rings',
        x: 28,
        y: 38,
        detail: '144 threaded C46400 brass resonator necks tuned across 12 low-frequency traffic sub-bands.',
        materialRef: 'C46400 Naval Brass'
      },
      {
        id: 'c3',
        code: 'C-04',
        name: 'Piezo Phase-Inversion Horns',
        x: 50,
        y: 38,
        detail: 'Central acid-green waveguide array projecting 180° phase-inverted audio (400–1,800 Hz).',
        materialRef: 'Shore-90A / PZT'
      },
      {
        id: 'c4',
        code: 'D-03',
        name: 'Cantilevered Refuge Slab',
        x: 50,
        y: 60,
        detail: 'Chamfered seating plinth isolated from ground-borne tram vibration via neoprene pads.',
        materialRef: 'TFD-GEO-75'
      }
    ],
    simulator: {
      title: 'HELMHOLTZ RESONANCE & PHASE-CANCELLATION ATTENUATION SIMULATOR',
      parameterLabel: 'Target Urban Traffic Frequency',
      unit: 'Hz',
      min: 60,
      max: 1600,
      step: 20,
      defaultValue: 240,
      formulaNote: 'Helmholtz resonance f_H = (c / 2π) · √(A / (V · L_eff)) coupled with FPGA anti-phase gain.'
    }
  },
  {
    id: 'tfd-031',
    number: '031',
    code: 'TFD-031 // MSR-04B',
    title: 'Mycelial Solder Reclaimer',
    subtitle: 'Biological E-Waste Delaminator',
    category: 'CIRCULAR MANUFACTURING',
    status: 'PHASE III — BIOREACTOR PROTOTYPE',
    phaseCode: 'PHASE III',
    horizonYear: '2035',
    massKg: '46.5 kg (Dry) / 74.0 kg (Wet)',
    dimensionsMm: '740 × 390 × 520 mm',
    powerRegime: '62.0 W (34 °C Incubation + 2 RPM Drum Drive + 1.8 V Electrowinning)',
    speculativeNotice:
      'SPECULATIVE ARTIFACT // FICTIONAL COUNTERFACTUAL PROTOTYPE. Explores decentralized, low-temperature biological metallurgy for neighborhood electronics repair cooperatives.',
    summary:
      'A benchtop rotary bioreactor that uses consortium cultures of chemolithotrophic bacteria and metallophyte fungal mycelium to selectively bio-leach and electroplate tin, silver, copper, and gold from discarded circuit boards at 34 °C without cyanide or smelting.',
    concept:
      'Over 62 million tonnes of electronic waste are discarded annually, yet municipal repair cafés and community workshops can only salvage whole components; damaged multilayer PCBs must be shipped to distant pyrometallurgical smelters operating at 1,200 °C or illegally dumped into open acid baths. The Mycelial Solder Reclaimer (TFD-031) brings closed-loop urban mining to the neighborhood workbench. Within a horizontal borosilicate drum rotating at 2 RPM, a symbiotic culture of *Acidithiobacillus ferrooxidans* and *Aspergillus niger* secretes biogenic organic acids and ferric ions that dissolve solder joints and copper traces over a 72-hour cycle, while a central titanium cathode comb selectively electro-wins dendritic copper, silver, and tin crystals as the cell voltage steps.',
    problem:
      'Conventional hydrometallurgical e-waste recycling relies on aqua regia, cyanide leaching, or energy-intensive smelting—processes that require industrial hazmat permitting and economies of scale, locking local communities out of reclaiming the critical metals embedded in their own discarded hardware.',
    howItMightWork: [
      {
        step: 'STAGE 01',
        title: 'Mycelial Solder Softening & Component Release',
        mechanism:
          'Depopulated or faulted PCBs are slotted into the borosilicate drum at 34 °C. Fungal citric/oxalic organic acids chelate tin-silver-copper (SAC305) solder fillets within 18 hours, allowing intact IC packages to drop into the lower collection tray.',
        telemetry: 'Incubation temp: 34.0 °C ±0.3 °C // Drum rotation: 2.0 RPM'
      },
      {
        step: 'STAGE 02',
        title: 'Chemolithotrophic Ferric Bio-Oxidation',
        mechanism:
          'Autotrophic bacteria continuously regenerate Fe³⁺ oxidizing agents from Fe²⁺ at pH 1.8, solubilizing zero-valent copper, silver, and trace gold from internal PCB vias into the aqueous amber-green leachate.',
        telemetry: 'Redox potential (Eh): +680 mV // pH stabilized: 1.85'
      },
      {
        step: 'STAGE 03',
        title: 'Stepped-Potential Selective Cathodic Comb',
        mechanism:
          'A central titanium harvesting comb steps its cathodic potential via a precision potentiostat—first plating silver at +0.79 V, then dendritic copper at +0.34 V, and tin at -0.14 V vs. SHE onto removable comb teeth.',
        telemetry: 'Copper recovery: 94.2% // Silver purity: 98.1% dendritic'
      },
      {
        step: 'STAGE 04',
        title: 'Closed-Loop Peristaltic Nutrient Regeneration',
        mechanism:
          'Four acid-green anodized peristaltic manifold clamps meter dissolved oxygen, ammonium sulfate nutrient salts, and neutralizing lime through autoclavable silicone lines, recycling 96% of the liquid media across 12 batches.',
        telemetry: 'Zero cyanide / Zero NOx off-gas // Media reuse: 12 cycles'
      }
    ],
    materials: [
      {
        part: 'Rotary Reaction Vessel',
        material: 'Autoclave-Grade Borosilicate 3.3 Cylinder',
        grade: 'ISO 3585 (8.0 mm Wall)',
        massShare: '31.0%',
        property: 'Chemical inertness at pH 1.5 and full optical visibility of dendritic crystal growth'
      },
      {
        part: 'Structural Gantry & End Bulkheads',
        material: 'Hard-Anodized 6061-T6 Aluminum & PEEK Bearings',
        grade: 'MIL-A-8625 Type III Black',
        massShare: '42.5%',
        property: 'Acid-vapor resistant structural frame with dry-running polymer drum rollers'
      },
      {
        part: 'Selective Electrowinning Cathode Comb',
        material: 'Commercially Pure Grade 2 Titanium',
        grade: 'UNS R50400',
        massShare: '14.5%',
        property: 'Passivated oxide surface allows effortless mechanical stripping of plated metal dendrites'
      },
      {
        part: 'Peristaltic Dosing Manifold Clamps (×4)',
        material: 'CNC 7075 Aluminum & Platinum-Cured Silicone',
        grade: 'Anodized #C6FF00',
        massShare: '12.0%',
        property: 'Tool-free quick-release pinch valves isolating bio-leachate during cathode harvest'
      }
    ],
    specs: [
      { label: 'BATCH PCB CAPACITY', value: '3.5 kg Scrap Boards', tolerance: 'Up to 18 ATX/Mobile PCBs' },
      { label: 'CYCLE DURATION', value: '72 Hours Full Leach', tolerance: '18h Solder-Only Mode' },
      { label: 'METAL RECOVERY YIELD', value: '94% Cu / 91% Sn / 89% Ag', tolerance: 'Gravimetric Assay' },
      { label: 'OPERATING TEMPERATURE', value: '34.0 °C Mesophilic', tolerance: '1,160 °C Below Smelting' },
      { label: 'POTENTIOSTAT WINDOW', value: '-0.40 V to +0.95 V', tolerance: '±2 mV Stepped Selectivity' },
      { label: 'BIOSAFETY CONTAINMENT', value: 'BSL-1 Non-Pathogenic', tolerance: '0.22 μm Vent Filter' }
    ],
    impact:
      'Turns neighborhood repair spaces into micro-refineries. Instead of exporting toxic e-waste to the Global South, communities can delaminate broken electronics locally, harvest pure copper and tin-silver granules to recast fresh solder wire, and return clean fiberglass substrates for composite panel pressing.',
    limitations: [
      'Slow biological kinetics: a 72-hour metabolic cycle processes only ~3.5 kg of boards per batch, orders of magnitude slower than industrial shredder-smelters.',
      'Culture poisoning by brominated flame retardants: legacy pre-RoHS circuit boards leaching polybrominated diphenyl ethers (PBDEs) can inhibit fungal hyphal growth unless pre-screened.',
      'Epoxy fiberglass residue: while metals are cleanly solubilized and plated, the remaining woven glass-epoxy laminate still requires mechanical grinding for secondary reuse.'
    ],
    ethicalConsiderations: {
      thesis:
        'Biological metallurgy democratizes material recovery, but introduces living workforces and cottage-industry bio-safety responsibilities.',
      dilemmas: [
        {
          title: 'Informal Domestic Bio-Leaching Hazards',
          analysis:
            'If operated in unventilated domestic kitchens without neutralized effluent checks, accidental spills of pH 1.8 heavy-metal leachate containing dissolved lead from vintage solder could contaminate household plumbing.'
        },
        {
          title: 'Patent Locking of Engineered Strains',
          analysis:
            'If the high-yield metallophyte fungal and bacterial strains are patent-encumbered with terminator genes, community repair workshops simply trade hardware monopolies for biotech licensing dependency.'
        }
      ]
    },
    images: {
      hero: {
        key: 'hero',
        label: 'PLATE 01 // HERO APPARATUS',
        src: '/images/projects/tfd-031-hero.png',
        alt: 'Mycelial Solder Reclaimer benchtop bioreactor with horizontal borosilicate glass drum holding circuit boards in amber-green solution and four acid-green manifold clamps on top',
        caption: 'Fig 31.1 — TFD-031 benchtop reactor at Hour 48 of a PCB delaminating run. Four #C6FF00 peristaltic clamps regulate nutrient and redox buffer circulation.',
        cameraMeta: '55mm Medium-Format · f/8 · Internal + Rim Light · 4:3',
        aspect: '4/3'
      },
      material: {
        key: 'material',
        label: 'PLATE 02 // MATERIAL MICROGRAPH',
        src: '/images/projects/tfd-031-material.png',
        alt: 'Submerged macro inside reactor showing delaminated green PCB grid, white fungal mycelium filaments, and copper/silver dendritic crystals on a titanium comb',
        caption: 'Fig 31.2 — Optical port macro (100mm): white mycelial hyphae chelating solder joints below while dendritic Cu/Ag crystals electro-win onto the Grade 2 titanium cathode comb.',
        cameraMeta: '100mm Submerged Macro · f/8 · Fiber-Optic Side Light · 4:3',
        aspect: '4/3'
      },
      context: {
        key: 'context',
        label: 'PLATE 03 // FIELD DEPLOYMENT',
        src: '/images/projects/tfd-031-context.png',
        alt: 'Two Mycelial Solder Reclaimers running side-by-side on a stainless-steel workbench inside a community electronics repair workshop',
        caption: 'Fig 31.3 — Dual-reactor installation at Reparatur-Genossenschaft Kleinbasel, processing municipal router and laptop e-waste into reusable SAC305 solder ingots.',
        cameraMeta: '35mm Prime · f/5.6 · Workshop Task Lighting · 16:9',
        aspect: '16/9'
      },
      technical: {
        key: 'technical',
        label: 'PLATE 04 // CATHODE HARVEST',
        src: '/images/projects/tfd-031-technical.png',
        alt: 'Extracted titanium cathode comb encrusted with reclaimed sponge-copper alongside the modular peristaltic pump head and acid-green locking collar',
        caption: 'Fig 31.4 — Post-cycle harvest inspection: Grade 2 titanium cathode comb carrying 410 g of 98.4% pure dendritic copper sponge prior to mechanical stripping.',
        cameraMeta: '65mm Macro Prime · f/11 · Metrology Tray · 4:3',
        aspect: '4/3'
      }
    },
    callouts: [
      {
        id: 'c1',
        code: 'A-01',
        name: 'Peristaltic Dosing Manifold',
        x: 42,
        y: 21,
        detail: 'Four acid-green anodized quick-release pinch clamps metering O₂, nutrient salts, and pH buffer.',
        materialRef: '7075-T6 / Silicone'
      },
      {
        id: 'c2',
        code: 'B-04',
        name: 'Titanium Cathode Harvesting Comb',
        x: 50,
        y: 34,
        detail: 'Stepped-potential Grade 2 titanium electrode comb selectively plating Ag, Cu, and Sn dendrites.',
        materialRef: 'Ti Grade 2'
      },
      {
        id: 'c3',
        code: 'C-02',
        name: 'Borosilicate Bio-Leach Drum',
        x: 50,
        y: 50,
        detail: '8 mm wall autoclavable glass drum rotating at 2 RPM at 34.0 °C mesophilic incubation.',
        materialRef: 'Borosilicate 3.3'
      },
      {
        id: 'c4',
        code: 'D-06',
        name: 'Anodized 6061-T6 Gantry',
        x: 21,
        y: 48,
        detail: 'Acid-resistant black anodized structural bulkhead housing thestepper drive and potentiostat.',
        materialRef: '6061-T6 Type III'
      }
    ],
    simulator: {
      title: 'BIO-LEACHING DURATION & SELECTIVE CATHODIC RECOVERY SIMULATOR',
      parameterLabel: 'Bioreactor Incubation Elapsed Time',
      unit: 'Hours',
      min: 6,
      max: 72,
      step: 6,
      defaultValue: 48,
      formulaNote: 'Monod bio-oxidation kinetics coupled with Nernst electrode deposition potential E = E° - (RT/nF)ln(Q).'
    }
  },
  {
    id: 'tfd-036',
    number: '036',
    code: 'TFD-036 // TTT-02W',
    title: 'Tactile Treaty Terminal',
    subtitle: 'Bilateral Resource Ledger',
    category: 'GOVERNANCE HARDWARE',
    status: 'PHASE I — SPECULATIVE APPARATUS',
    phaseCode: 'PHASE I',
    horizonYear: '2036',
    massKg: '94.0 kg',
    dimensionsMm: '980 × 360 × 490 mm',
    powerRegime: '0.0 W (Coupled Hydrostatic & Pin-Tumbler Mechanical Computer)',
    speculativeNotice:
      'SPECULATIVE ARTIFACT // FICTIONAL COUNTERFACTUAL PROTOTYPE. Investigates replacing opaque spreadsheet resource diplomacy with physically coupled mechanical resistance.',
    summary:
      'A two-operator electromechanical negotiation console for trans-boundary watershed governance where upstream water extraction and downstream ecological flow are physically coupled via a gunmetal balance beam and interlocking brass pin-tumblers.',
    concept:
      'When upstream industrial or agricultural ministries negotiate river-basin treaties using cloud spreadsheets, ecological collapse feels frictionless: changing a cell value from 45% to 70% extraction requires zero physical effort, hiding the downstream desiccation of wetlands behind polite policy PDFs. The Tactile Treaty Terminal (TFD-036) is an analog mechanical negotiation table designed for bilateral watershed commissions (such as the Rhine, Danube, or Mekong basins). Seated on opposite sides of a 94 kg cast-concrete plinth, Upstream and Downstream plenipotentiaries adjust 12 monthly brass allocation sliders. Because all 12 sliders are mechanically linked through a differential gunmetal balance beam and hydrostatic oil dampers, pulling more summer irrigation water on the Upstream side physically forces down the Downstream aquifer slider and increases mechanical lever resistance exponentially as the basin approaches ecological minimum flow.',
    problem:
      'Digital integrated-assessment models allow diplomats to sign over-allocated water and carbon treaties by deferring deficits into future decades or fictional efficiency assumptions, detaching political signatures from thermodynamic and hydrological conservation laws.',
    howItMightWork: [
      {
        step: 'STAGE 01',
        title: 'Zero-Sum Differential Pin-Tumbler Coupling',
        mechanism:
          'Twelve vertical satin-brass sliders (Jan–Dec) are mechanically linked across the console via stainless clevis rods. Raising Upstream industrial extraction for August physically depresses Downstream agricultural and wetland head by the exact cubic-meter equivalent.',
        telemetry: '12 Monthly Channels // Mechanical backlash: < 0.04 mm'
      },
      {
        step: 'STAGE 02',
        title: 'Non-Linear Hydrostatic Scarcity Resistance',
        mechanism:
          'As total basin extraction approaches the 75% ecological aquifer threshold, twin borosilicate hydrostatic oil dampers constrict their orifice ports, requiring up to 180 N of two-handed physical force to pull the slider further.',
        telemetry: 'Force feedback: 12 N (Normal) -> 185 N (Ecological Deficit)'
      },
      {
        step: 'STAGE 03',
        title: 'Gunmetal Equilibrium Beam & Lock Interlock',
        mechanism:
          'The central gunmetal bronze balance beam integrates annual recharge versus total extraction. The central acid-green equilibrium locking lever physically cannot drop into its brass gate if net annual aquifer depletion exceeds 0.0%.',
        telemetry: 'Equilibrium gate tolerance: ±0.15° beam tilt'
      },
      {
        step: 'STAGE 04',
        title: 'Dual-Key Mechanical Embossed Treaty Tape',
        mechanism:
          'Only when the acid-green equilibrium lever is locked can both delegates simultaneously depress their side’s stamping cams, cold-embossing the 12 monthly pin heights onto an unbleached cotton-rag archival paper tape.',
        telemetry: 'Output: Cold-embossed rag-paper ledger // Dual-operator stamp'
      }
    ],
    materials: [
      {
        part: 'Bilateral Console Base Plinth',
        material: 'Honed Architectural Basalt-Aggregate Concrete',
        grade: 'C60/75 High-Density',
        massShare: '56.0%',
        property: 'Anchors the console against 185 N manual lever forces without bolting to council tables'
      },
      {
        part: 'Differential Balance Beam & Cams',
        material: 'Centrifugally Cast Admiralty Gunmetal Bronze',
        grade: 'CuSn10Zn2 (LG2)',
        massShare: '22.5%',
        property: 'Self-lubricating bearing pivots and high flexural rigidity across the 980 mm span'
      },
      {
        part: '12-Month Pin-Tumbler Matrix & Linkages',
        material: 'Satin C36000 Brass & Hardened 17-4PH Stainless Steel',
        grade: 'H900 Precision Ground',
        massShare: '16.5%',
        property: 'Zero-creep mechanical interlock pins that physically block over-allocation'
      },
      {
        part: 'Equilibrium Gate Lock & Damper Collars',
        material: 'CNC 7075-T6 Aluminum & Borosilicate Damping Tubes',
        grade: 'Anodized #C6FF00',
        massShare: '5.0%',
        property: 'Immediate visual confirmation across the council chamber when hydrological balance is achieved'
      }
    ],
    specs: [
      { label: 'ALLOCATION RESOLUTION', value: '12 Monthly Vernier Channels', tolerance: '0.5% Basin Flow Step' },
      { label: 'ECOLOGICAL THRESHOLD FORCE', value: '185.0 Newtons Peak', tolerance: 'Progressive Orifice Damper' },
      { label: 'EQUILIBRIUM LOCK GATE', value: '±0.15° Mechanical Deadband', tolerance: 'Blocks Deficit Treaties' },
      { label: 'TREATY OUTPUT MEDIUM', value: '300 gsm Cotton-Rag Tape', tolerance: 'Braille/Vernier Embossed' },
      { label: 'CONSOLE MASS', value: '94.0 kg', tolerance: 'Two-Person Carry Handles' },
      { label: 'COMPUTATIONAL SUBSTRATE', value: '100% Kinematic Linkage', tolerance: 'Zero Firmware / Zero Cloud' }
    ],
    impact:
      'Introduces somatic honesty into environmental diplomacy. Negotiators cannot hide ecological theft behind a macro or a footnote; to demand unsustainable summer water extraction, a delegate must physically strain against a 185-newton damper in full view of the opposing delegation and public observers.',
    limitations: [
      'Annual snowpack recalibration: the central counterweight brass cylinders must be physically weighted each spring by an independent hydrologist to reflect actual alpine snowpack and rainfall recharge.',
      'Bilateral simplification: while effective for two-party upstream/downstream treaties, multi-lateral river basins with 5+ riparian states require chaining multiple differential consoles in series.',
      'Inability to model stochastic flash-floods: kinematic linkages enforce conservation of mass over monthly means but cannot dynamically simulate 48-hour extreme storm surges.'
    ],
    ethicalConsiderations: {
      thesis:
        'Encoding ecological limits into physical hardware exposes the tension between biophysical non-negotiability and democratic political discretion.',
      dilemmas: [
        {
          title: 'Technocratic Lock-In of the Fulcrum',
          analysis:
            'Whoever sets the position of the central fulcrum and counterweight masses prior to the negotiation effectively pre-determines the boundary of what is politically possible.'
        },
        {
          title: 'Coercive Asymmetry Outside the Room',
          analysis:
            'While the console enforces physical symmetry inside the council chamber, an economically dominant upstream state may still use trade or military leverage outside the room to force a downstream delegate to accept a minimal-flow equilibrium.'
        }
      ]
    },
    images: {
      hero: {
        key: 'hero',
        label: 'PLATE 01 // HERO APPARATUS',
        src: '/images/projects/tfd-036-hero.png',
        alt: 'Tactile Treaty Terminal symmetrical console with honed concrete base, tilted gunmetal balance beam, 12 brass pin-tumbler sliders, and central acid-green equilibrium lock',
        caption: 'Fig 36.1 — TFD-036 bilateral elevation. The gunmetal balance beam shows a -2.4° upstream deficit tilt, mechanically preventing the #C6FF00 equilibrium lock from engaging.',
        cameraMeta: '50mm Medium-Format · f/8 · Overhead Downlight · 4:3',
        aspect: '4/3'
      },
      material: {
        key: 'material',
        label: 'PLATE 02 // MATERIAL MICROGRAPH',
        src: '/images/projects/tfd-036-material.png',
        alt: 'Macro view of interlocking satin-brass pin-tumbler sliders with engraved vernier tick marks and horizontal acid-green zero-sum interlock bar',
        caption: 'Fig 36.2 — 90mm macro of the July–October summer drought sliders showing engraved vernier flow graduations and the #C6FF00 zero-sum limit stop.',
        cameraMeta: '90mm Macro · f/5.6 · Raking Side Strobe · 4:3',
        aspect: '4/3'
      },
      context: {
        key: 'context',
        label: 'PLATE 03 // FIELD DEPLOYMENT',
        src: '/images/projects/tfd-036-context.png',
        alt: 'Tactile Treaty Terminal placed across a concrete council table overlooking an alpine hydroelectric reservoir through tall windows',
        caption: 'Fig 36.3 — Field simulation at the Upper Rhine Trans-Boundary Watershed Commission chamber, Grimsel Dam canton border.',
        cameraMeta: '28mm Architectural Prime · f/8 · Alpine Daylight · 16:9',
        aspect: '16/9'
      },
      technical: {
        key: 'technical',
        label: 'PLATE 04 // KINEMATIC UNDERSIDE',
        src: '/images/projects/tfd-036-technical.png',
        alt: 'Inverted view of the console underside showing crossed stainless differential rods, dual glass hydrostatic damping cylinders with acid-green collars, and central brass embossing cam',
        caption: 'Fig 36.4 — Inverted chassis inspection revealing the 17-4PH crossed differential linkage rods, borosilicate hydrostatic oil dampers, and rag-paper embossing cam wheel.',
        cameraMeta: '60mm Isometric Macro · f/11 · Rim Strobe · 4:3',
        aspect: '4/3'
      }
    },
    callouts: [
      {
        id: 'c1',
        code: 'A-01',
        name: 'Equilibrium Interlock Lever',
        x: 50,
        y: 25,
        detail: 'Acid-green anodized lock that physically blocks treaty stamping until net basin deficit = 0.0%.',
        materialRef: '7075-T6 #C6FF00'
      },
      {
        id: 'c2',
        code: 'B-02',
        name: 'Gunmetal Hydrological Beam',
        x: 24,
        y: 28,
        detail: 'Cast CuSn10Zn2 balance beam with spring-snowpack calibration counterweights at each end.',
        materialRef: 'Admiralty Gunmetal'
      },
      {
        id: 'c3',
        code: 'C-12',
        name: '12-Month Brass Pin-Tumblers',
        x: 62,
        y: 44,
        detail: 'Coupled monthly extraction sliders with progressive hydrostatic force resistance up to 185 N.',
        materialRef: 'C36000 / 17-4PH'
      },
      {
        id: 'c4',
        code: 'D-01',
        name: '94 kg Basalt-Concrete Plinth',
        x: 50,
        y: 62,
        detail: 'High-mass C60/75 concrete base housing the crossed differential linkages and paper-tape embosser.',
        materialRef: 'C60/75 Basalt Concrete'
      }
    ],
    simulator: {
      title: 'BILATERAL WATERSHED EXTRACTION & HYDROSTATIC RESISTANCE SIMULATOR',
      parameterLabel: 'Upstream Industrial/Ag Extraction Share',
      unit: '% of Basin Recharge',
      min: 20,
      max: 85,
      step: 1,
      defaultValue: 54,
      formulaNote: 'Coupled conservation: Q_upstream + Q_downstream + Q_ecological_min (25%) ≤ 100% Annual Basin Recharge.'
    }
  }
];

export const CATEGORIES: ('ALL' | InventionCategory)[] = [
  'ALL',
  'CIVIC INFRASTRUCTURE',
  'ECOLOGICAL INSTRUMENTS',
  'DOMESTIC ENERGETICS',
  'PUBLIC SPACE SYSTEMS',
  'CIRCULAR MANUFACTURING',
  'GOVERNANCE HARDWARE'
];

export const PHASES: ('ALL' | PhaseCode)[] = ['ALL', 'PHASE I', 'PHASE II', 'PHASE III'];

