import React, { useState } from 'react';
import { Invention } from '../data/inventions';
import { Sliders, RotateCcw, Crosshair, Activity } from 'lucide-react';

interface InteractiveSchematicProps {
  invention: Invention;
}

export const InteractiveSchematic: React.FC<InteractiveSchematicProps> = ({ invention }) => {
  const { simulator, id } = invention;
  const [paramValue, setParamValue] = useState<number>(simulator.defaultValue);
  const [activeLayer, setActiveLayer] = useState<'ALL' | 'MECHANICAL' | 'FLUX'>('ALL');
  const [selectedNode, setSelectedNode] = useState<number>(0);

  // Sync default value when switching between inventions
  React.useEffect(() => {
    setParamValue(invention.simulator.defaultValue);
    setSelectedNode(0);
  }, [invention.id, invention.simulator.defaultValue]);

  // Compute invention-specific physical readouts from paramValue
  const computeTelemetry = () => {
    if (id === 'tfd-014') {
      // paramValue = Years (25 - 500)
      const basaltIntegrity = (100 - paramValue * 0.0008).toFixed(2);
      const nandSurvival = Math.max(0, 100 - paramValue * 6.8).toFixed(1);
      const tapeSurvival = Math.max(0, 100 - paramValue * 3.4).toFixed(1);
      const activePlatter = Math.min(24, Math.max(1, Math.ceil((paramValue / 500) * 24)));
      return [
        { label: 'BASALT LATTICE INTEGRITY', value: `${basaltIntegrity}%`, highlight: true },
        { label: 'INDEXED PLATTER SLOT', value: `DISC #${String(activePlatter).padStart(2, '0')} / 24`, highlight: false },
        { label: 'MAGNETIC LTO SURVIVAL', value: `${tapeSurvival}%`, highlight: false },
        { label: 'NAND FLASH SURVIVAL', value: `${nandSurvival}%`, highlight: false }
      ];
    }
    if (id === 'tfd-019') {
      // paramValue = Day of month (1 - 31)
      const sootUg = Math.round(18 + 46 * Math.abs(Math.sin(paramValue * 0.45)));
      const brakeDustUg = Math.round(9 + 22 * Math.abs(Math.cos(paramValue * 0.31)));
      const opticalDensity = (0.35 + (sootUg + brakeDustUg) / 85).toFixed(2);
      const exceedWho = sootUg > 25 ? 'EXCEEDS WHO 24H LIMIT' : 'WITHIN NOMINAL THRESHOLD';
      return [
        { label: 'ELEMENTAL CARBON (PM2.5)', value: `${sootUg} μg/m³`, highlight: sootUg > 40 },
        { label: 'FE/CU BRAKE ELASTOMER', value: `${brakeDustUg} μg/m³`, highlight: false },
        { label: 'SLIDE OPTICAL DENSITY', value: `${opticalDensity} OD`, highlight: true },
        { label: 'FORENSIC STATUS', value: exceedWho, highlight: sootUg > 25 }
      ];
    }
    if (id === 'tfd-023') {
      // paramValue = RPM (3000 - 18500)
      const ratio = paramValue / 18500;
      const storedKwh = (3.2 * ratio * ratio).toFixed(2);
      const rimSpeedMs = Math.round(380 * ratio);
      const irisOpenPct = Math.round(ratio * 100);
      const acousticDb = (24 + ratio * 10.5).toFixed(1);
      return [
        { label: 'STORED KINETIC ENERGY', value: `${storedKwh} kWh`, highlight: true },
        { label: 'ROTOR RIM VELOCITY', value: `${rimSpeedMs} m/s`, highlight: false },
        { label: 'IRIS SHUTTER APERTURE', value: `${irisOpenPct}% OPEN`, highlight: false },
        { label: 'HARMONIC FLOOR @ 1M', value: `${acousticDb} dBA`, highlight: false }
      ];
    }
    if (id === 'tfd-027') {
      // paramValue = Frequency Hz (60 - 1600)
      const helmholtzLoss = paramValue <= 420 ? -(10.2 + 4.5 * Math.sin((paramValue - 60) / 115)) : -3.4;
      const piezoLoss = paramValue >= 320 ? -(14.8 * Math.sin(((paramValue - 300) / 1400) * Math.PI)) : -1.8;
      const netLoss = Math.min(-4.5, helmholtzLoss + piezoLoss).toFixed(1);
      const mode = paramValue <= 400 ? 'PASSIVE HELMHOLTZ LABYRINTH' : 'ACTIVE PIEZO ANTI-PHASE';
      return [
        { label: 'NET INSERTION LOSS', value: `${netLoss} dBA`, highlight: true },
        { label: 'DOMINANT ATTENUATION MODE', value: mode, highlight: false },
        { label: 'SILENT CONE WIDTH', value: `${(2.6 - paramValue * 0.0004).toFixed(2)} m`, highlight: false },
        { label: 'WAVELENGTH (λ @ 20°C)', value: `${(343 / paramValue).toFixed(2)} m`, highlight: false }
      ];
    }
    if (id === 'tfd-031') {
      // paramValue = Hours (6 - 72)
      const progress = paramValue / 72;
      const cuYield = Math.min(94.2, +(progress * 102).toFixed(1));
      const snYield = Math.min(91.0, +(Math.max(0, (paramValue - 12) / 60) * 95).toFixed(1));
      const voltageStep = paramValue < 24 ? '+0.79 V (Ag)' : paramValue < 54 ? '+0.34 V (Cu)' : '-0.14 V (Sn)';
      const massGrams = Math.round(progress * 415);
      return [
        { label: 'CATHODE PLATED MASS', value: `${massGrams} g`, highlight: true },
        { label: 'COPPER RECOVERY YIELD', value: `${cuYield}%`, highlight: false },
        { label: 'TIN-SILVER SOLDER YIELD', value: `${snYield}%`, highlight: false },
        { label: 'ACTIVE CATHODE POTENTIAL', value: voltageStep, highlight: true }
      ];
    }
    // tfd-036: Upstream Extraction % (20 - 85)
    const ecologicalMin = 25;
    const downstreamShare = Math.max(0, 100 - paramValue - ecologicalMin);
    const leverForceN = Math.round(12 + Math.pow(Math.max(0, paramValue - 40), 1.65) * 0.32);
    const beamTiltDeg = ((paramValue - 45) * 0.14).toFixed(2);
    const lockState = paramValue <= 50 ? 'ENGAGED (TREATY VALID)' : 'BLOCKED (AQUIFER DEFICIT)';
    return [
      { label: 'DOWNSTREAM ALLOCATION', value: `${downstreamShare}% FLOW`, highlight: false },
      { label: 'HYDROSTATIC LEVER FORCE', value: `${leverForceN} N`, highlight: leverForceN > 80 },
      { label: 'GUNMETAL BEAM TILT', value: `${beamTiltDeg}°`, highlight: false },
      { label: 'EQUILIBRIUM INTERLOCK', value: lockState, highlight: paramValue <= 50 }
    ];
  };

  const telemetry = computeTelemetry();

  return (
    <div className="border border-[#262A27] bg-[#0A0B0A] text-[#F4F4F0]">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262A27] bg-[#141615] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="inline-block h-2.5 w-2.5 bg-[#C6FF00]" aria-hidden="true" />
          <span className="font-mono-tech text-xs font-semibold tracking-wider text-[#C6FF00]">
            CAD // ORTHOGRAPHIC KINEMATIC SCHEMATIC
          </span>
          <span className="hidden font-mono-tech text-xs text-[#9DA29D] md:inline">
            [{invention.code}]
          </span>
        </div>

        {/* Layer Switcher */}
        <div className="flex items-center gap-1" role="group" aria-label="Schematic layer visibility">
          {(['ALL', 'MECHANICAL', 'FLUX'] as const).map((layer) => (
            <button
              key={layer}
              type="button"
              onClick={() => setActiveLayer(layer)}
              className={`mech-press px-2.5 py-1 font-mono-tech text-xs border ${
                activeLayer === layer
                  ? 'border-[#C6FF00] bg-[#C6FF00] text-[#0A0B0A] font-bold'
                  : 'border-[#262A27] bg-[#0A0B0A] text-[#9DA29D] hover:text-[#F4F4F0]'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      {/* Main Blueprint Canvas + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Vector Orthographic Diagram (7 cols) */}
        <div className="blueprint-surface relative flex flex-col justify-between border-b border-[#262A27] p-4 sm:p-6 lg:col-span-7 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between font-mono-tech text-[11px] text-[#9DA29D]">
            <span>SCALE 1:5 // PROJECTION: ISO-128 ORTHOGRAPHIC</span>
            <span>TOLERANCE: DIN ISO 2768-mK</span>
          </div>

          <div className="my-4 flex items-center justify-center">
            <svg
              viewBox="0 0 640 400"
              className="w-full max-w-[600px] h-auto select-none"
              role="img"
              aria-label={`Interactive technical schematic for ${invention.title}`}
            >
              {/* Coordinate Crosshairs & Frame */}
              <rect x="12" y="12" width="616" height="376" fill="none" stroke="#262A27" strokeWidth="1.5" />
              <line x1="320" y1="12" x2="320" y2="388" stroke="#1E2320" strokeDasharray="4 4" />
              <line x1="12" y1="200" x2="628" y2="200" stroke="#1E2320" strokeDasharray="4 4" />

              {/* Invention-Specific Dynamic Vector Geometry */}
              {id === 'tfd-014' && (
                <g>
                  {/* Cast-Iron Outer Bell */}
                  <rect x="190" y="70" width="260" height="270" fill="#121513" stroke="#9DA29D" strokeWidth="2" />
                  <rect x="165" y="320" width="310" height="32" fill="#181C1A" stroke="#F4F4F0" strokeWidth="2" />
                  {/* Keplerian Ocular Turret */}
                  <rect x="250" y="34" width="140" height="36" fill="#1B1E1C" stroke="#C6FF00" strokeWidth="1.5" />
                  {/* 24 Basalt Platters */}
                  {Array.from({ length: 16 }).map((_, idx) => {
                    const py = 92 + idx * 13.5;
                    const activeIdx = Math.min(15, Math.floor(((paramValue - 25) / 475) * 15));
                    const isSelected = idx === activeIdx;
                    return (
                      <line
                        key={idx}
                        x1="215"
                        y1={py}
                        x2="425"
                        y2={py}
                        stroke={isSelected ? '#C6FF00' : '#7A7E7A'}
                        strokeWidth={isSelected ? '3.5' : '1.5'}
                      />
                    );
                  })}
                  {/* Optical Path Ray (FLUX Layer) */}
                  {activeLayer !== 'MECHANICAL' && (
                    <g stroke="#C6FF00" strokeWidth="1.5" strokeDasharray="5 3">
                      <line x1="320" y1="34" x2="320" y2={92 + Math.min(15, Math.floor(((paramValue - 25) / 475) * 15)) * 13.5} />
                      <circle
                        cx="320"
                        cy={92 + Math.min(15, Math.floor(((paramValue - 25) / 475) * 15)) * 13.5}
                        r="8"
                        fill="rgba(198,255,0,0.25)"
                      />
                    </g>
                  )}
                  {/* Geneva Crank Arm */}
                  {activeLayer !== 'FLUX' && (
                    <g>
                      <rect x="450" y="175" width="45" height="26" fill="#181C1A" stroke="#F4F4F0" strokeWidth="1.5" />
                      <line
                        x1="495"
                        y1="188"
                        x2="495"
                        y2={115 + ((paramValue % 100) / 100) * 60}
                        stroke="#C6FF00"
                        strokeWidth="6"
                      />
                      <circle cx="495" cy="188" r="6" fill="#C6FF00" />
                    </g>
                  )}
                </g>
              )}

              {id === 'tfd-019' && (
                <g>
                  {/* 31-Slide Stainless Frame */}
                  <rect x="90" y="65" width="460" height="260" fill="#121513" stroke="#F4F4F0" strokeWidth="2" />
                  <rect x="115" y="95" width="410" height="185" fill="#0A0B0A" stroke="#7A7E7A" strokeWidth="1.5" />
                  {/* 31 Capillary Slides */}
                  {Array.from({ length: 31 }).map((_, idx) => {
                    const dayNum = idx + 1;
                    const sx = 122 + idx * 12.8;
                    const sootH = 25 + 115 * Math.abs(Math.sin(dayNum * 0.45));
                    const isActive = dayNum === paramValue;
                    return (
                      <g key={dayNum}>
                        <rect
                          x={sx}
                          y={275 - sootH}
                          width="8"
                          height={sootH}
                          fill={isActive ? '#C6FF00' : '#585E5A'}
                        />
                        <rect x={sx} y="102" width="8" height="173" fill="none" stroke="#262A27" strokeWidth="0.8" />
                      </g>
                    );
                  })}
                  {/* Movable Electrostatic Corona Carriage */}
                  {activeLayer !== 'FLUX' && (
                    <g>
                      <rect
                        x={118 + (paramValue - 1) * 12.8}
                        y="82"
                        width="16"
                        height="212"
                        fill="none"
                        stroke="#C6FF00"
                        strokeWidth="2.5"
                      />
                      <circle cx={126 + (paramValue - 1) * 12.8} cy="82" r="5" fill="#C6FF00" />
                    </g>
                  )}
                  {/* Intake Airflow Arrows */}
                  {activeLayer !== 'MECHANICAL' && (
                    <g stroke="#C6FF00" strokeWidth="1.5">
                      <line x1="200" y1="360" x2="200" y2="305" />
                      <line x1="320" y1="360" x2="320" y2="305" />
                      <line x1="440" y1="360" x2="440" y2="305" />
                    </g>
                  )}
                </g>
              )}

              {id === 'tfd-023' && (
                <g>
                  {/* Vacuum Containment Cylinder & UHPFRC Rotor */}
                  <rect x="195" y="55" width="250" height="295" fill="#121513" stroke="#F4F4F0" strokeWidth="2" />
                  <line x1="175" y1="220" x2="465" y2="220" stroke="#9DA29D" strokeWidth="3" />
                  {/* Rotating Concrete-Steel Flywheel Mass */}
                  <rect x="220" y="85" width="200" height="125" fill="#1B201E" stroke="#7A7E7A" strokeWidth="1.5" />
                  {/* Dynamic Tachometer Iris Circle */}
                  <circle cx="320" cy="148" r="46" fill="#0A0B0A" stroke="#9DA29D" strokeWidth="2" />
                  <circle
                    cx="320"
                    cy="148"
                    r={Math.max(6, (paramValue / 18500) * 40)}
                    fill="rgba(198,255,0,0.32)"
                    stroke="#C6FF00"
                    strokeWidth="2.5"
                  />
                  {/* Halbach Magnetic Levitation Field Lines */}
                  {activeLayer !== 'MECHANICAL' && (
                    <g stroke="#C6FF00" strokeWidth="1.5" strokeDasharray="4 4" fill="none">
                      <ellipse cx="265" cy="235" rx="34" ry="14" />
                      <ellipse cx="375" cy="235" rx="34" ry="14" />
                    </g>
                  )}
                </g>
              )}

              {id === 'tfd-027' && (
                <g>
                  {/* Precast Geopolymer Concrete Monolith Cross-Section */}
                  <polygon
                    points="140,65 500,65 500,220 430,220 430,335 210,335 210,220 140,220"
                    fill="#161918"
                    stroke="#F4F4F0"
                    strokeWidth="2"
                  />
                  {/* Helmholtz Resonator Cavities */}
                  {Array.from({ length: 8 }).map((_, idx) => {
                    const cx = 175 + idx * 41;
                    return (
                      <g key={idx}>
                        <rect x={cx - 12} y="90" width="24" height="65" fill="#0A0B0A" stroke="#9DA29D" strokeWidth="1.2" />
                        <line x1={cx} y1="155" x2={cx} y2="178" stroke="#C6FF00" strokeWidth="3" />
                      </g>
                    );
                  })}
                  {/* Destructive Interference Wavefront Cones */}
                  {activeLayer !== 'MECHANICAL' && (
                    <g fill="none" stroke="#C6FF00">
                      {[1, 2, 3, 4].map((ring) => (
                        <path
                          key={ring}
                          d={`M ${250 - ring * 18} ${215 + ring * 26} Q 320 ${255 + ring * 32} ${390 + ring * 18} ${215 + ring * 26}`}
                          strokeWidth={2.5 - ring * 0.4}
                          strokeDasharray={paramValue > 400 ? 'none' : '6 4'}
                        />
                      ))}
                    </g>
                  )}
                </g>
              )}

              {id === 'tfd-031' && (
                <g>
                  {/* Rotary Borosilicate Drum & Gantry */}
                  <rect x="115" y="75" width="35" height="260" fill="#181C1A" stroke="#F4F4F0" strokeWidth="2" />
                  <rect x="490" y="75" width="35" height="260" fill="#181C1A" stroke="#F4F4F0" strokeWidth="2" />
                  <rect x="150" y="105" width="340" height="190" fill="#0F1914" stroke="#9DA29D" strokeWidth="2" />
                  {/* Central Titanium Cathode Comb */}
                  <line x1="150" y1="145" x2="490" y2="145" stroke="#C6FF00" strokeWidth="4" />
                  {Array.from({ length: 5 }).map((_, idx) => {
                    const tx = 195 + idx * 62;
                    const dendriteR = 4 + (paramValue / 72) * 16;
                    return (
                      <g key={idx}>
                        <rect x={tx - 14} y="155" width="28" height="115" fill="#14261D" stroke="#7A7E7A" strokeWidth="1.2" />
                        {activeLayer !== 'MECHANICAL' && (
                          <circle
                            cx={tx}
                            cy="195"
                            r={dendriteR}
                            fill="rgba(198,255,0,0.28)"
                            stroke="#C6FF00"
                            strokeWidth="1.8"
                          />
                        )}
                      </g>
                    );
                  })}
                </g>
              )}

              {id === 'tfd-036' && (
                <g>
                  {/* Concrete Plinth & Central Fulcrum */}
                  <rect x="115" y="235" width="410" height="105" fill="#181B1A" stroke="#F4F4F0" strokeWidth="2" />
                  <rect x="295" y="115" width="50" height="120" fill="#121413" stroke="#9DA29D" strokeWidth="2" />
                  {/* Tilted Gunmetal Balance Beam */}
                  <g transform={`translate(320, 130) rotate(${(paramValue - 45) * 0.25})`}>
                    <rect x="-220" y="-14" width="440" height="28" fill="#23201B" stroke="#C6FF00" strokeWidth="2" />
                    <rect x="-210" y="-36" width="44" height="72" fill="#181B1A" stroke="#F4F4F0" strokeWidth="1.5" />
                    <rect x="166" y="-36" width="44" height="72" fill="#181B1A" stroke="#F4F4F0" strokeWidth="1.5" />
                  </g>
                  {/* 12 Brass Pin-Tumbler Sliders */}
                  {Array.from({ length: 12 }).map((_, idx) => {
                    const sx = 142 + idx * 31.5;
                    const isUpstream = idx < 6;
                    const sy = isUpstream
                      ? 215 - (paramValue - 45) * 0.55
                      : 215 + (paramValue - 45) * 0.55;
                    return (
                      <rect
                        key={idx}
                        x={sx}
                        y={sy}
                        width="14"
                        height="48"
                        fill={paramValue <= 50 ? '#C6FF00' : '#9DA29D'}
                        stroke="#0A0B0A"
                        strokeWidth="1"
                      />
                    );
                  })}
                </g>
              )}

              {/* Clickable Callout Nodes on Schematic */}
              {invention.callouts.map((c, index) => {
                const cx = (c.x / 100) * 640;
                const cy = (c.y / 100) * 400;
                const isSelected = selectedNode === index;
                return (
                  <g
                    key={c.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedNode(index)}
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 14 : 10}
                      fill={isSelected ? '#C6FF00' : '#0A0B0A'}
                      stroke="#C6FF00"
                      strokeWidth="2"
                    />
                    <text
                      x={cx}
                      y={cy + 4}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono, monospace"
                      fill={isSelected ? '#0A0B0A' : '#C6FF00'}
                    >
                      {index + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Active Sub-Assembly Callout Bar */}
          <div className="border border-[#262A27] bg-[#141615] p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <Crosshair className="w-3.5 h-3.5 text-[#C6FF00]" aria-hidden="true" />
                <span className="font-mono-tech text-xs font-bold text-[#C6FF00]">
                  NODE 0{selectedNode + 1} // {invention.callouts[selectedNode]?.code} — {invention.callouts[selectedNode]?.name}
                </span>
              </div>
              <span className="font-mono-tech text-[11px] bg-[#0A0B0A] px-2 py-0.5 border border-[#262A27] text-[#9DA29D]">
                SUBSTRATE: {invention.callouts[selectedNode]?.materialRef}
              </span>
            </div>
            <p className="text-xs text-[#DCDCD6] leading-relaxed">
              {invention.callouts[selectedNode]?.detail}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {invention.callouts.map((c, idx) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedNode(idx)}
                  className={`mech-press px-2 py-1 font-mono-tech text-[11px] border ${
                    selectedNode === idx
                      ? 'border-[#C6FF00] bg-[#C6FF00] text-[#0A0B0A] font-bold'
                      : 'border-[#262A27] bg-[#0A0B0A] text-[#9DA29D] hover:text-[#F4F4F0]'
                  }`}
                >
                  0{idx + 1} · {c.code}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Physical Parameter Simulator (5 cols) */}
        <div className="flex flex-col justify-between p-5 sm:p-6 lg:col-span-5 bg-[#0F1110]">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#262A27]">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#C6FF00]" aria-hidden="true" />
                <h3 className="font-mono-tech text-xs font-bold uppercase tracking-wider text-[#F4F4F0]">
                  {simulator.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setParamValue(simulator.defaultValue)}
                className="mech-press inline-flex items-center gap-1 border border-[#262A27] bg-[#141615] px-2 py-1 font-mono-tech text-[11px] text-[#9DA29D] hover:border-[#C6FF00] hover:text-[#F4F4F0]"
                aria-label="Reset simulator parameter to nominal baseline"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                RESET
              </button>
            </div>

            {/* Interactive Range Control */}
            <div className="my-5 border border-[#262A27] bg-[#141615] p-4">
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <label
                  htmlFor={`sim-slider-${invention.id}`}
                  className="font-mono-tech text-xs text-[#9DA29D]"
                >
                  {simulator.parameterLabel}
                </label>
                <span className="font-mono-tech text-xl font-bold text-[#C6FF00] tabular-nums">
                  {paramValue} <span className="text-xs font-normal text-[#F4F4F0]">{simulator.unit}</span>
                </span>
              </div>
              <input
                id={`sim-slider-${invention.id}`}
                type="range"
                min={simulator.min}
                max={simulator.max}
                step={simulator.step}
                value={paramValue}
                onChange={(e) => setParamValue(Number(e.target.value))}
                className="w-full accent-[#C6FF00] cursor-pointer h-2 bg-[#0A0B0A]"
              />
              <div className="mt-1.5 flex justify-between font-mono-tech text-[11px] text-[#9DA29D] tabular-nums">
                <span>MIN: {simulator.min} {simulator.unit}</span>
                <span>NOMINAL: {simulator.defaultValue} {simulator.unit}</span>
                <span>MAX: {simulator.max} {simulator.unit}</span>
              </div>
            </div>

            {/* Computed Telemetry Cells */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {telemetry.map((item) => (
                <div
                  key={item.label}
                  className={`border p-3 ${
                    item.highlight
                      ? 'border-[#C6FF00]/60 bg-[#161D11]'
                      : 'border-[#262A27] bg-[#141615]'
                  }`}
                >
                  <div className="font-mono-tech text-[10px] tracking-wider text-[#9DA29D]">
                    {item.label}
                  </div>
                  <div
                    className={`mt-1 font-mono-tech text-sm font-bold tabular-nums ${
                      item.highlight ? 'text-[#C6FF00]' : 'text-[#F4F4F0]'
                    }`}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Governing Physical Equation Note */}
          <div className="mt-6 border-t border-[#262A27] pt-3">
            <div className="flex items-center gap-1.5 font-mono-tech text-[11px] text-[#C6FF00]">
              <Activity className="w-3.5 h-3.5" aria-hidden="true" />
              <span>PHYSICAL LAW &amp; BOUNDARY MODEL</span>
            </div>
            <p className="mt-1 font-mono-tech text-xs text-[#9DA29D] leading-relaxed">
              {simulator.formulaNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
