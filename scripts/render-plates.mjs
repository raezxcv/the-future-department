import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = path.resolve('public/images');

function buildRendererHTML() {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;background:#0A0B0A;">
<canvas id="c"></canvas>
<script>
function mulberry32(a) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function createNoise(seed) {
  const rand = mulberry32(seed);
  const perm = new Uint8Array(512);
  for (let i = 0; i < 256; i++) perm[i] = Math.floor(rand() * 256);
  for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];
  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(t, a, b) { return a + t * (b - a); }
  return function noise(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const aa = perm[perm[X] + Y] / 255;
    const ab = perm[perm[X] + Y + 1] / 255;
    const ba = perm[perm[X + 1] + Y] / 255;
    const bb = perm[perm[X + 1] + Y + 1] / 255;
    return lerp(v, lerp(u, aa, ba), lerp(u, ab, bb));
  };
}

function applyPhysicalFilmPass(ctx, w, h, seed, options = {}) {
  const rand = mulberry32(seed + 999);
  const noise = createNoise(seed + 555);
  const imgData = ctx.getImageData(0, 0, w, h);
  const d = imgData.data;
  const grainStrength = options.grain ?? 10;
  const vignetteStrength = options.vignette ?? 0.42;
  const cx = w * 0.5, cy = h * 0.5;
  const maxDist = Math.hypot(cx, cy);

  for (let y = 0; y < h; y++) {
    const rowNoise = (noise(0, y * 0.35) - 0.5) * 3.5; // subtle horizontal brushed-anisotropy
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const dx = x - cx, dy = y - cy;
      const dist = Math.hypot(dx, dy) / maxDist;
      const vig = 1 - Math.pow(dist, 2.15) * vignetteStrength;
      const g = (rand() - 0.5) * grainStrength + (noise(x * 0.06, y * 0.06) - 0.5) * 6 + rowNoise;
      d[idx]     = Math.max(0, Math.min(255, d[idx] * vig + g));
      d[idx + 1] = Math.max(0, Math.min(255, d[idx + 1] * vig + g));
      d[idx + 2] = Math.max(0, Math.min(255, d[idx + 2] * vig + g));
    }
  }
  ctx.putImageData(imgData, 0, 0);
}

function drawConcreteBackdrop(ctx, w, h, seed, dark = true) {
  const baseGrad = ctx.createLinearGradient(0, 0, w * 0.85, h);
  if (dark) {
    baseGrad.addColorStop(0, '#1C1E1D');
    baseGrad.addColorStop(0.5, '#111312');
    baseGrad.addColorStop(1, '#070807');
  } else {
    baseGrad.addColorStop(0, '#D7D8D2');
    baseGrad.addColorStop(0.55, '#BABCB5');
    baseGrad.addColorStop(1, '#8E918B');
  }
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.strokeStyle = dark ? 'rgba(255,255,255,0.035)' : 'rgba(20,22,20,0.08)';
  ctx.lineWidth = 1.5;
  for (let y = h * 0.18; y < h; y += h * 0.24) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
  for (let x = w * 0.2; x < w; x += w * 0.3) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    for (let y = h * 0.3; y < h * 0.85; y += h * 0.24) {
      ctx.fillStyle = dark ? 'rgba(0,0,0,0.45)' : 'rgba(40,42,40,0.22)';
      ctx.beginPath(); ctx.arc(x + 40, y - 30, 6, 0, Math.PI * 2); ctx.fill();
    }
  }
  ctx.restore();

  const keyLight = ctx.createRadialGradient(w * 0.32, h * 0.20, 20, w * 0.45, h * 0.45, w * 0.78);
  keyLight.addColorStop(0, dark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.36)');
  keyLight.addColorStop(0.6, 'rgba(255,255,255,0.02)');
  keyLight.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = keyLight;
  ctx.fillRect(0, 0, w, h);
}

function drawStudioPlinth(ctx, w, h, yTop, dark = false) {
  const g = ctx.createLinearGradient(0, yTop, 0, h);
  if (dark) {
    g.addColorStop(0, '#282B29');
    g.addColorStop(0.06, '#1E201F');
    g.addColorStop(1, '#0C0D0C');
  } else {
    g.addColorStop(0, '#C8C9C2');
    g.addColorStop(0.05, '#B2B4AD');
    g.addColorStop(1, '#797B75');
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, yTop, w, h - yTop);
  ctx.fillStyle = dark ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.5)';
  ctx.fillRect(0, yTop, w, 2);
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillRect(0, yTop + 2, w, 3);
}

function drawShadedCylinder(ctx, x, y, w, h, colors, rimAngle = 0.28, radius = 4) {
  const grad = ctx.createLinearGradient(x, y, x + w, y);
  grad.addColorStop(0, colors[0]);
  grad.addColorStop(rimAngle * 0.5, colors[1]);
  grad.addColorStop(rimAngle, colors[2]);
  grad.addColorStop(0.62, colors[1]);
  grad.addColorStop(0.88, colors[0]);
  grad.addColorStop(0.96, colors[3] || colors[1]);
  grad.addColorStop(1, colors[0]);

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  ctx.fill();

  // Top & bottom machined chamfer edge highlights
  ctx.fillStyle = 'rgba(255,255,255,0.16)';
  ctx.fillRect(x + 2, y, w - 4, 1.5);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(x + 2, y + h - 1.5, w - 4, 1.5);
}

function drawHexBolt(ctx, cx, cy, r = 6) {
  ctx.save();
  ctx.fillStyle = '#181A19';
  ctx.strokeStyle = '#68706D';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#090A09';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.48, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawVernierScale(ctx, x, y, length, horizontal = true, color = 'rgba(255,255,255,0.28)') {
  ctx.save();
  ctx.fillStyle = color;
  const step = 10;
  const count = Math.floor(length / step);
  for (let i = 0; i <= count; i++) {
    const isMajor = i % 5 === 0;
    const tickLen = isMajor ? 12 : 6;
    if (horizontal) {
      ctx.fillRect(x + i * step, y, 1.5, tickLen);
    } else {
      ctx.fillRect(x, y + i * step, tickLen, 1.5);
    }
  }
  ctx.restore();
}

function drawContactShadow(ctx, cx, cy, rx, ry, alpha = 0.78) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, ry / rx);
  const g = ctx.createRadialGradient(0, 0, rx * 0.08, 0, 0, rx);
  g.addColorStop(0, \`rgba(0,0,0,\${alpha})\`);
  g.addColorStop(0.5, \`rgba(0,0,0,\${alpha * 0.55})\`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, rx, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawAcidHardware(ctx, x, y, w, h, radius = 3) {
  ctx.save();
  const g = ctx.createLinearGradient(x, y, x + w, y + h);
  g.addColorStop(0, '#E5FF70');
  g.addColorStop(0.35, '#C6FF00');
  g.addColorStop(0.8, '#9ECC00');
  g.addColorStop(1, '#5D7A00');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

window.renderPlate = function(spec) {
  const canvas = document.getElementById('c');
  const w = spec.width || 1600;
  const h = spec.height || 1200;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, w, h);

  const id = spec.id;

  // =========================================================================
  // STUDIO PLATES
  // =========================================================================
  if (id === 'department-foundry-hero') {
    drawConcreteBackdrop(ctx, w, h, 101, true);
    ctx.save();
    const beam = ctx.createLinearGradient(0, 0, w * 0.7, h * 0.85);
    beam.addColorStop(0, 'rgba(215, 225, 220, 0.14)');
    beam.addColorStop(0.5, 'rgba(198, 255, 0, 0.03)');
    beam.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(w * 0.55, 0); ctx.lineTo(w * 0.9, h); ctx.lineTo(w * 0.15, h);
    ctx.fill();
    ctx.restore();

    // Overhead steel gantry I-beam
    drawShadedCylinder(ctx, 0, 64, w, 48, ['#0E100F', '#252927', '#434946', '#181A19'], 0.3, 0);
    for (let gx = 100; gx < w; gx += 120) drawHexBolt(ctx, gx, 88, 6);

    // Gantry hoist trolley & dual steel cables
    drawShadedCylinder(ctx, w * 0.61, 52, 110, 72, ['#181B1A', '#3A403E', '#757E7A', '#222625']);
    ctx.strokeStyle = '#6A706D'; ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w * 0.635, 124); ctx.lineTo(w * 0.635, 370);
    ctx.moveTo(w * 0.655, 124); ctx.lineTo(w * 0.655, 370);
    ctx.stroke();

    // Heavy Concrete & Brushed Steel Prototyping Workbench
    const plinthY = h * 0.65;
    drawStudioPlinth(ctx, w, h, plinthY, true);
    drawShadedCylinder(ctx, w * 0.06, plinthY - 26, w * 0.88, 26, ['#1A1D1C', '#383E3B', '#626966', '#242827'], 0.3, 2);
    drawVernierScale(ctx, w * 0.08, plinthY - 24, w * 0.84, true, 'rgba(198,255,0,0.35)');

    // Prototype 1: Cast-Iron Cylindrical Vault Housing (Grounded on Optical Table)
    drawContactShadow(ctx, w * 0.32, plinthY - 24, 210, 32, 0.85);
    drawShadedCylinder(ctx, w * 0.21, plinthY - 62, 350, 38, ['#0D0E0D', '#252927', '#4E5451', '#181A19']);
    drawShadedCylinder(ctx, w * 0.23, h * 0.26, 310, plinthY - 62 - h * 0.26, ['#101211', '#262A28', '#4A504D', '#1D201F']);
    ctx.fillStyle = '#070807';
    ctx.fillRect(w * 0.265, h * 0.31, 195, h * 0.24);
    for (let py = h * 0.325; py < h * 0.54; py += 18) {
      drawShadedCylinder(ctx, w * 0.275, py, 175, 10, ['#0D0E0D', '#2A302D', '#76827D', '#1B1E1D']);
    }
    drawShadedCylinder(ctx, w * 0.285, h * 0.19, 130, h * 0.07, ['#3D3117', '#8C7338', '#D9BC73', '#594822']);

    // Prototype 2: Borosilicate & Brushed Aluminum Chamber (Grounded on Optical Table)
    drawContactShadow(ctx, w * 0.65, plinthY - 24, 240, 34, 0.82);
    drawShadedCylinder(ctx, w * 0.52, h * 0.35, 370, plinthY - 26 - h * 0.35, ['#282D2B', '#68706D', '#BFC7C3', '#3D4340']);
    const glassG = ctx.createLinearGradient(w * 0.55, h * 0.39, w * 0.72, h * 0.58);
    glassG.addColorStop(0, 'rgba(180, 220, 210, 0.22)');
    glassG.addColorStop(0.35, 'rgba(255, 255, 255, 0.45)');
    glassG.addColorStop(0.7, 'rgba(198, 255, 0, 0.16)');
    glassG.addColorStop(1, 'rgba(15, 28, 22, 0.65)');
    ctx.fillStyle = glassG;
    ctx.fillRect(w * 0.55, h * 0.39, 310, h * 0.19);
    ctx.strokeStyle = '#2B302E'; ctx.lineWidth = 3;
    ctx.strokeRect(w * 0.55, h * 0.39, 310, h * 0.19);

    // Acid-Green (#C6FF00) Anodized Calibration Clamps & Laser Datum
    drawAcidHardware(ctx, w * 0.405, h * 0.44, 96, 36, 4);
    drawHexBolt(ctx, w * 0.42, h * 0.458, 5);
    drawHexBolt(ctx, w * 0.45, h * 0.458, 5);
    drawAcidHardware(ctx, w * 0.625, h * 0.31, 48, 56, 4);

    ctx.save();
    ctx.shadowColor = '#C6FF00';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = '#C6FF00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w * 0.14, h * 0.458);
    ctx.lineTo(w * 0.88, h * 0.458);
    ctx.stroke();
    ctx.restore();

    applyPhysicalFilmPass(ctx, w, h, 101, { grain: 11, vignette: 0.44 });
  }

  else if (id === 'research-materials-lab') {
    drawConcreteBackdrop(ctx, w, h, 202, true);
    const plinthY = h * 0.68;
    drawStudioPlinth(ctx, w, h, plinthY, true);
    for (let gx = 80; gx < w; gx += 75) {
      for (let gy = plinthY + 35; gy < h - 25; gy += 50) {
        ctx.fillStyle = '#070807';
        ctx.beginPath(); ctx.arc(gx, gy, 5, 0, Math.PI * 2); ctx.fill();
      }
    }

    // Hydraulic Twin-Column Compression Rig firmly bolted to optical table
    drawShadedCylinder(ctx, w * 0.25, h * 0.06, 54, plinthY - h * 0.06, ['#1F2321', '#5E6663', '#B8C2BE', '#2F3532']);
    drawShadedCylinder(ctx, w * 0.71, h * 0.06, 54, plinthY - h * 0.06, ['#1F2321', '#5E6663', '#B8C2BE', '#2F3532']);
    drawShadedCylinder(ctx, w * 0.21, h * 0.12, w * 0.58, 96, ['#141615', '#323735', '#67706C', '#1D201F']);
    drawAcidHardware(ctx, w * 0.43, h * 0.215, w * 0.14, 42, 4);
    drawShadedCylinder(ctx, w * 0.39, h * 0.255, w * 0.22, 54, ['#1A1C1B', '#454B48', '#8F9693', '#252927']);

    // Specimen Core under load between upper and lower platens
    drawContactShadow(ctx, w * 0.5, plinthY + 4, 280, 36, 0.88);
    drawShadedCylinder(ctx, w * 0.41, h * 0.305, w * 0.18, h * 0.285, ['#0A0B0A', '#1E2120', '#444A47', '#141615']);
    drawVernierScale(ctx, w * 0.415, h * 0.32, h * 0.25, false, 'rgba(198,255,0,0.45)');

    ctx.save();
    ctx.strokeStyle = '#C6FF00';
    ctx.shadowColor = '#C6FF00';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(w * 0.33, h * 0.44); ctx.lineTo(w * 0.67, h * 0.44);
    ctx.moveTo(w * 0.48, h * 0.33); ctx.lineTo(w * 0.51, h * 0.44); ctx.lineTo(w * 0.47, h * 0.55);
    ctx.stroke();
    ctx.restore();

    drawShadedCylinder(ctx, w * 0.36, h * 0.59, w * 0.28, plinthY - h * 0.59, ['#161817', '#383D3B', '#727A76', '#212423']);
    applyPhysicalFilmPass(ctx, w, h, 202, { grain: 12, vignette: 0.45 });
  }

  // =========================================================================
  // INVENTION 1: TFD-014 — LITHIC MEMORY ARCHIVE
  // =========================================================================
  else if (id === 'tfd-014-hero') {
    drawConcreteBackdrop(ctx, w, h, 1401, true);
    const plinthY = h * 0.74;
    drawStudioPlinth(ctx, w, h, plinthY, false);
    drawContactShadow(ctx, w * 0.5, plinthY + 8, 360, 48, 0.85);

    // Heavy Cast Ductile Iron Base Flange Seated Firmly on Plinth
    drawShadedCylinder(ctx, w * 0.29, plinthY - 76, w * 0.42, 78, ['#0C0D0C', '#222523', '#4A504D', '#171918']);
    for (let bx = w * 0.315; bx <= w * 0.685; bx += w * 0.074) drawHexBolt(ctx, bx, plinthY - 38, 8);

    // Main Cylindrical Cast-Iron Vault Chassis
    drawShadedCylinder(ctx, w * 0.33, h * 0.22, w * 0.34, plinthY - 76 - h * 0.22, ['#0A0B0A', '#1E2120', '#3E4441', '#151716']);
    drawVernierScale(ctx, w * 0.345, h * 0.26, h * 0.38, false, 'rgba(255,255,255,0.22)');

    // Cutaway Optical Viewing Window revealing stacked sintered basalt discs on central brass spindle
    ctx.fillStyle = '#050605';
    ctx.beginPath();
    ctx.roundRect(w * 0.38, h * 0.26, w * 0.24, h * 0.37, 8);
    ctx.fill();
    ctx.strokeStyle = '#363B38'; ctx.lineWidth = 3;
    ctx.stroke();

    // Central continuous brass spindle column
    drawShadedCylinder(ctx, w * 0.47, h * 0.265, w * 0.06, h * 0.36, ['#4A3B1C', '#9E8242', '#E5C878', '#5E4B24']);

    for (let y = h * 0.285; y < h * 0.61; y += 22) {
      drawShadedCylinder(ctx, w * 0.395, y, w * 0.21, 11, ['#080908', '#272E2B', '#7C8A84', '#141716']);
    }
    ctx.fillStyle = '#C6FF00';
    ctx.fillRect(w * 0.395, h * 0.417, w * 0.21, 3);

    // Top Keplerian Brass & Cast-Iron Microscope Ocular Turret
    drawShadedCylinder(ctx, w * 0.38, h * 0.14, w * 0.24, h * 0.08, ['#3D3117', '#8C7338', '#DEC075', '#524220']);
    drawShadedCylinder(ctx, w * 0.435, h * 0.07, w * 0.13, h * 0.07, ['#111312', '#2C302E', '#575E5B', '#1B1D1C']);

    // Side Geneva Gearbox & Acid-Green (#C6FF00) Anodized Hand-Crank Indexing Lever
    drawShadedCylinder(ctx, w * 0.67, h * 0.39, 64, 54, ['#222624', '#5A615E', '#A8B0AC', '#323735']);
    drawAcidHardware(ctx, w * 0.705, h * 0.29, 34, 155, 6);
    drawHexBolt(ctx, w * 0.722, h * 0.415, 7);
    drawShadedCylinder(ctx, w * 0.726, h * 0.295, 72, 28, ['#111312', '#2D312F', '#5C6360', '#181A19']);

    applyPhysicalFilmPass(ctx, w, h, 1401, { grain: 11, vignette: 0.42 });
  }

  else if (id === 'tfd-014-material') {
    ctx.fillStyle = '#070807';
    ctx.fillRect(0, 0, w, h);
    const cx = w * 0.72, cy = h * 0.68;
    const discGrad = ctx.createRadialGradient(cx - 200, cy - 200, 50, cx, cy, 1100);
    discGrad.addColorStop(0, '#323836');
    discGrad.addColorStop(0.45, '#171A19');
    discGrad.addColorStop(0.85, '#0B0C0B');
    discGrad.addColorStop(1, '#040504');
    ctx.fillStyle = discGrad;
    ctx.beginPath(); ctx.arc(cx, cy, 980, 0, Math.PI * 2); ctx.fill();

    for (let r = 180; r < 950; r += 7.5) {
      const isHighlight = (Math.floor(r / 7.5) % 9 === 0);
      ctx.strokeStyle = isHighlight ? 'rgba(198, 255, 0, 0.72)' : 'rgba(160, 185, 175, 0.24)';
      ctx.lineWidth = isHighlight ? 2.2 : 1.1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, Math.PI * 0.85, Math.PI * 1.68);
      ctx.stroke();

      if (r % 15 < 8) {
        ctx.strokeStyle = 'rgba(10, 11, 10, 0.85)';
        ctx.lineWidth = 3;
        for (let a = Math.PI * 0.9; a < Math.PI * 1.6; a += 0.045) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, a, a + 0.012);
          ctx.stroke();
        }
      }
    }

    const hubGrad = ctx.createRadialGradient(cx - 30, cy - 30, 10, cx, cy, 175);
    hubGrad.addColorStop(0, '#F0D58C');
    hubGrad.addColorStop(0.5, '#9E813E');
    hubGrad.addColorStop(1, '#3D3014');
    ctx.fillStyle = hubGrad;
    ctx.beginPath(); ctx.arc(cx, cy, 175, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#C6FF00';
    ctx.lineWidth = 10;
    ctx.beginPath(); ctx.arc(cx, cy, 145, 0, Math.PI * 2); ctx.stroke();
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
      drawHexBolt(ctx, cx + Math.cos(a) * 110, cy + Math.sin(a) * 110, 9);
    }

    applyPhysicalFilmPass(ctx, w, h, 1402, { grain: 13, vignette: 0.48 });
  }

  else if (id === 'tfd-014-context') {
    drawConcreteBackdrop(ctx, w, h, 1403, true);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 2;
    for (let i = 1; i <= 5; i++) {
      const insetX = i * 95, insetY = i * 55;
      ctx.strokeRect(insetX, insetY, w - insetX * 2, h - insetY * 2);
    }
    ctx.save();
    ctx.shadowColor = '#E8F5EE';
    ctx.shadowBlur = 35;
    ctx.fillStyle = '#F0F7F4';
    ctx.fillRect(w * 0.34, 42, w * 0.32, 14);
    ctx.restore();

    const plinthY = h * 0.72;
    drawStudioPlinth(ctx, w, h, plinthY, true);
    drawContactShadow(ctx, w * 0.36, plinthY + 8, 220, 34, 0.85);
    drawShadedCylinder(ctx, w * 0.27, h * 0.50, 280, plinthY - h * 0.50, ['#2E312F', '#4E5350', '#737975', '#3A3E3C']);
    drawShadedCylinder(ctx, w * 0.29, h * 0.22, 236, h * 0.28, ['#0C0E0D', '#232725', '#49504D', '#161918']);
    drawShadedCylinder(ctx, w * 0.33, h * 0.16, 130, h * 0.06, ['#4A3B1C', '#9E8242', '#DFC174', '#594722']);
    drawAcidHardware(ctx, w * 0.44, h * 0.29, 24, 96, 4);

    applyPhysicalFilmPass(ctx, w, h, 1403, { grain: 12, vignette: 0.48 });
  }

  else if (id === 'tfd-014-technical') {
    ctx.fillStyle = '#121413';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    for (let i = 0; i < 3; i++) {
      const cy = 240 + i * 340;
      drawContactShadow(ctx, 310, cy + 12, 145, 145, 0.65);
      ctx.fillStyle = '#181B1A';
      ctx.beginPath(); ctx.arc(300, cy, 135, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(198,255,0,0.45)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(300, cy, 95, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#B89748';
      ctx.beginPath(); ctx.arc(300, cy, 28, 0, Math.PI * 2); ctx.fill();
    }

    drawContactShadow(ctx, 820, 460, 250, 250, 0.75);
    ctx.strokeStyle = '#383E3B'; ctx.lineWidth = 42;
    ctx.beginPath(); ctx.arc(810, 450, 210, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#B89748';
    ctx.beginPath(); ctx.arc(810, 450, 115, 0, Math.PI * 2); ctx.fill();
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
      ctx.fillStyle = '#121413';
      ctx.beginPath();
      ctx.arc(810 + Math.cos(a) * 115, 450 + Math.sin(a) * 115, 36, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < 4; i++) {
      const lx = 630 + i * 120;
      ctx.fillStyle = 'rgba(190, 230, 225, 0.28)';
      ctx.strokeStyle = '#8FA39D'; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(lx, 920, 42 - i * 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }

    drawContactShadow(ctx, 1310, 520, 80, 320, 0.7);
    drawAcidHardware(ctx, 1260, 210, 76, 560, 12);
    drawHexBolt(ctx, 1298, 265, 18);
    drawHexBolt(ctx, 1298, 710, 16);

    applyPhysicalFilmPass(ctx, w, h, 1404, { grain: 11, vignette: 0.38 });
  }

  // =========================================================================
  // INVENTION 2: TFD-019 — ATMOSPHERIC TAXONOMIST
  // =========================================================================
  else if (id === 'tfd-019-hero') {
    drawConcreteBackdrop(ctx, w, h, 1901, false);
    drawContactShadow(ctx, w * 0.51, h * 0.54, 580, 360, 0.55);

    drawShadedCylinder(ctx, w * 0.16, h * 0.19, w * 0.68, h * 0.60, ['#5A5F5D', '#9DA3A0', '#DCE0DD', '#737876']);
    drawHexBolt(ctx, w * 0.185, h * 0.225, 9);
    drawHexBolt(ctx, w * 0.815, h * 0.225, 9);
    drawHexBolt(ctx, w * 0.185, h * 0.755, 9);
    drawHexBolt(ctx, w * 0.815, h * 0.755, 9);

    ctx.fillStyle = '#141615';
    ctx.fillRect(w * 0.20, h * 0.26, w * 0.60, h * 0.39);
    drawVernierScale(ctx, w * 0.215, h * 0.235, w * 0.57, true, 'rgba(10,11,10,0.55)');

    const slideStart = w * 0.215;
    const slideStep = (w * 0.57) / 31;
    const rand = mulberry32(1901);
    for (let i = 0; i < 31; i++) {
      const sx = slideStart + i * slideStep;
      const slideW = slideStep * 0.74;
      ctx.fillStyle = 'rgba(235, 242, 238, 0.88)';
      ctx.fillRect(sx, h * 0.28, slideW, h * 0.35);

      const sootRatio = 0.22 + 0.65 * Math.abs(Math.sin(i * 0.42 + rand() * 0.5));
      const sootH = (h * 0.33) * sootRatio;
      const sootY = h * 0.63 - sootH;
      const sootGrad = ctx.createLinearGradient(0, sootY, 0, h * 0.63);
      sootGrad.addColorStop(0, 'rgba(185, 145, 65, 0.55)');
      sootGrad.addColorStop(0.45, 'rgba(75, 58, 42, 0.85)');
      sootGrad.addColorStop(1, 'rgba(15, 16, 15, 0.98)');
      ctx.fillStyle = sootGrad;
      ctx.fillRect(sx + 1, sootY, slideW - 2, sootH);
    }

    // Horizontal Stainless Lead-Screw Guide Bar across Top & Bottom of Carriage
    drawShadedCylinder(ctx, w * 0.20, h * 0.26, w * 0.60, 14, ['#2C302E', '#78807C', '#D0D6D3', '#454A48']);
    const activeX = slideStart + 22 * slideStep - 8;
    drawAcidHardware(ctx, activeX, h * 0.235, 34, h * 0.445, 3);
    ctx.fillStyle = '#0A0B0A';
    ctx.fillRect(activeX + 11, h * 0.28, 12, h * 0.355);

    drawShadedCylinder(ctx, w * 0.20, h * 0.69, w * 0.60, 52, ['#4E3F1E', '#9C8041', '#DEC077', '#635026']);

    applyPhysicalFilmPass(ctx, w, h, 1901, { grain: 11, vignette: 0.36 });
  }

  else if (id === 'tfd-019-material') {
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#E8ECE9');
    bg.addColorStop(1, '#BAC0BC');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 4; i++) {
      const sx = 140 + i * 345;
      const sw = 285;
      ctx.fillStyle = 'rgba(255,255,255,0.78)';
      ctx.strokeStyle = '#6E7874';
      ctx.lineWidth = 4;
      ctx.fillRect(sx, 70, sw, h - 140);
      ctx.strokeRect(sx, 70, sw, h - 140);
      drawVernierScale(ctx, sx + 16, 110, h - 240, false, 'rgba(20,24,22,0.35)');

      const bands = [
        { y: 240 + i * 35, h: 170, c1: 'rgba(210, 175, 55, 0.55)', c2: 'rgba(165, 115, 40, 0.78)' },
        { y: 410 + i * 25, h: 240, c1: 'rgba(145, 72, 32, 0.82)',  c2: 'rgba(65, 38, 25, 0.92)' },
        { y: 650,          h: 390, c1: 'rgba(42, 44, 42, 0.94)',   c2: 'rgba(10, 11, 10, 0.99)' }
      ];
      for (const b of bands) {
        const g = ctx.createLinearGradient(sx, b.y, sx, b.y + b.h);
        g.addColorStop(0, b.c1);
        g.addColorStop(1, b.c2);
        ctx.fillStyle = g;
        ctx.fillRect(sx + 14, b.y, sw - 28, b.h);
      }

      drawShadedCylinder(ctx, sx + 75, 40, sw - 150, 58, ['#3A3E3C', '#858C89', '#D2D8D5', '#525755']);
      drawAcidHardware(ctx, sx + 10, h - 115, sw - 20, 42, 2);
    }

    applyPhysicalFilmPass(ctx, w, h, 1902, { grain: 13, vignette: 0.34 });
  }

  else if (id === 'tfd-019-context') {
    drawConcreteBackdrop(ctx, w, h, 1903, true);
    ctx.fillStyle = '#181A19';
    ctx.fillRect(0, 0, w, h * 0.24);
    const streakGrad = ctx.createLinearGradient(0, h * 0.55, w, h * 0.55);
    streakGrad.addColorStop(0, 'rgba(255, 70, 20, 0.05)');
    streakGrad.addColorStop(0.5, 'rgba(255, 95, 30, 0.38)');
    streakGrad.addColorStop(1, 'rgba(255, 240, 200, 0.15)');
    ctx.fillStyle = streakGrad;
    ctx.fillRect(0, h * 0.52, w, 95);

    drawShadedCylinder(ctx, w * 0.22, h * 0.12, 540, h * 0.88, ['#383B39', '#626663', '#8A8E8B', '#484C49']);
    drawContactShadow(ctx, w * 0.39, h * 0.55, 220, 140, 0.7);
    drawShadedCylinder(ctx, w * 0.27, h * 0.36, 380, 260, ['#4A4F4D', '#8C9490', '#CFD6D2', '#606663']);
    ctx.fillStyle = '#141615';
    ctx.fillRect(w * 0.29, h * 0.39, 320, 175);
    for (let s = 0; s < 20; s++) {
      ctx.fillStyle = 'rgba(220,230,225,0.75)';
      ctx.fillRect(w * 0.295 + s * 15.5, h * 0.40, 11, 155);
      ctx.fillStyle = '#121312';
      ctx.fillRect(w * 0.295 + s * 15.5, h * 0.46 + (s % 4) * 12, 11, 85);
    }
    drawAcidHardware(ctx, w * 0.39, h * 0.38, 22, 195, 2);

    applyPhysicalFilmPass(ctx, w, h, 1903, { grain: 13, vignette: 0.46 });
  }

  else if (id === 'tfd-019-technical') {
    drawConcreteBackdrop(ctx, w, h, 1904, true);
    drawShadedCylinder(ctx, w * 0.14, h * 0.15, w * 0.72, h * 0.70, ['#181B1A', '#2E3331', '#4A524E', '#222625']);
    for (let i = 0; i < 3; i++) {
      drawShadedCylinder(ctx, w * 0.20 + i * 135, h * 0.25, 98, 220, ['#4A2511', '#9E5428', '#E08A54', '#633217']);
    }
    ctx.strokeStyle = '#C6FF00'; ctx.lineWidth = 2;
    for (let y = h * 0.52; y < h * 0.76; y += 22) {
      ctx.beginPath(); ctx.moveTo(w * 0.20, y); ctx.lineTo(w * 0.58, y); ctx.stroke();
    }
    drawShadedCylinder(ctx, w * 0.64, h * 0.28, 210, 210, ['#4A3B1C', '#9E8242', '#E5C878', '#5E4B24']);
    ctx.strokeStyle = '#C6FF00'; ctx.lineWidth = 18;
    ctx.beginPath(); ctx.roundRect(w * 0.62, h * 0.55, 240, 190, 45); ctx.stroke();

    applyPhysicalFilmPass(ctx, w, h, 1904, { grain: 12, vignette: 0.42 });
  }

  // =========================================================================
  // INVENTION 3: TFD-023 — CIRCADIAN BALLAST
  // =========================================================================
  else if (id === 'tfd-023-hero') {
    drawConcreteBackdrop(ctx, w, h, 2301, true);
    const plinthY = h * 0.76;
    drawStudioPlinth(ctx, w, h, plinthY, true);
    drawContactShadow(ctx, w * 0.5, plinthY + 8, 340, 48, 0.88);

    // Lower Cast Ultra-High-Performance Concrete (UHPFRC) Base Pedestal
    drawShadedCylinder(ctx, w * 0.34, h * 0.51, w * 0.32, plinthY - h * 0.51, ['#5A5C58', '#8F918C', '#C4C6C0', '#6E706B']);
    // Upper Spun Maraging-Steel Vacuum Containment Bell
    drawShadedCylinder(ctx, w * 0.35, h * 0.16, w * 0.30, h * 0.36, ['#0E100F', '#282C2A', '#575E5B', '#1B1E1D']);
    // Bolted Vacuum Flange Ring at Mid-Section with Hex Bolts
    drawShadedCylinder(ctx, w * 0.325, h * 0.495, w * 0.35, 38, ['#1C1F1E', '#454B48', '#838C88', '#2A2E2C']);
    for (let bx = w * 0.345; bx <= w * 0.655; bx += w * 0.05) drawHexBolt(ctx, bx, h * 0.495 + 19, 7);

    // Circular Recessed Borosilicate Viewport with Acid-Green (#C6FF00) Mechanical Tachometer Shutter
    const cx = w * 0.5, cy = h * 0.33;
    ctx.fillStyle = '#070807';
    ctx.beginPath(); ctx.arc(cx, cy, 98, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#68706D'; ctx.lineWidth = 12;
    ctx.beginPath(); ctx.arc(cx, cy, 98, 0, Math.PI * 2); ctx.stroke();

    ctx.fillStyle = '#C6FF00';
    ctx.beginPath();
    ctx.arc(cx, cy, 70, -0.4, Math.PI * 1.15);
    ctx.lineTo(cx, cy);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#121413';
    ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2); ctx.fill();

    // Heavy Braided Steel Governor Conduit on Right Side
    ctx.strokeStyle = '#383E3C'; ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(w * 0.65, h * 0.62);
    ctx.bezierCurveTo(w * 0.75, h * 0.62, w * 0.74, plinthY, w * 0.85, plinthY);
    ctx.stroke();

    applyPhysicalFilmPass(ctx, w, h, 2301, { grain: 11, vignette: 0.44 });
  }

  else if (id === 'tfd-023-material') {
    ctx.fillStyle = '#0D0E0D';
    ctx.fillRect(0, 0, w, h);
    const cx = w * 0.18, cy = h * 0.85;
    ctx.fillStyle = '#92948E';
    ctx.beginPath(); ctx.arc(cx, cy, 680, 0, Math.PI * 2); ctx.fill();
    for (let r = 680; r < 960; r += 8) {
      ctx.strokeStyle = (r % 16 === 0) ? '#252927' : '#68706D';
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    }
    for (let a = -1.25; a < -0.15; a += 0.18) {
      const px = cx + Math.cos(a) * 820;
      const py = cy + Math.sin(a) * 820;
      ctx.fillStyle = '#C6FF00';
      ctx.beginPath(); ctx.arc(px, py, 28, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#0A0B0A';
      ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2); ctx.fill();
    }
    applyPhysicalFilmPass(ctx, w, h, 2302, { grain: 14, vignette: 0.42 });
  }

  else if (id === 'tfd-023-context') {
    drawConcreteBackdrop(ctx, w, h, 2303, false);
    const wood = ctx.createLinearGradient(0, 0, w * 0.28, 0);
    wood.addColorStop(0, '#9E7B56');
    wood.addColorStop(1, '#785B3C');
    ctx.fillStyle = wood;
    ctx.fillRect(0, 0, w * 0.26, h * 0.76);
    const plinthY = h * 0.76;
    drawStudioPlinth(ctx, w, h, plinthY, true);

    drawContactShadow(ctx, w * 0.55, plinthY + 8, 240, 38, 0.78);
    drawShadedCylinder(ctx, w * 0.44, h * 0.52, 340, plinthY - h * 0.52, ['#646661', '#9A9C96', '#CFD1CB', '#7B7D78']);
    drawShadedCylinder(ctx, w * 0.45, h * 0.24, 320, h * 0.29, ['#121413', '#2E3331', '#5D6461', '#1D201F']);
    ctx.fillStyle = '#C6FF00';
    ctx.beginPath(); ctx.arc(w * 0.55, h * 0.38, 44, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#2B2E2D'; ctx.lineWidth = 18;
    ctx.beginPath(); ctx.moveTo(w * 0.65, h * 0.52); ctx.bezierCurveTo(w * 0.78, h * 0.52, w * 0.78, h * 0.35, w * 0.86, h * 0.35); ctx.stroke();

    applyPhysicalFilmPass(ctx, w, h, 2303, { grain: 11, vignette: 0.4 });
  }

  else if (id === 'tfd-023-technical') {
    drawConcreteBackdrop(ctx, w, h, 2304, true);
    // Vertical Guide Alignment Rods connecting the exploded assembly
    ctx.strokeStyle = 'rgba(198,255,0,0.32)'; ctx.lineWidth = 2; ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(w * 0.38, h * 0.15); ctx.lineTo(w * 0.38, h * 0.85);
    ctx.moveTo(w * 0.62, h * 0.15); ctx.lineTo(w * 0.62, h * 0.85);
    ctx.stroke(); ctx.setLineDash([]);

    drawShadedCylinder(ctx, w * 0.34, h * 0.07, w * 0.32, h * 0.24, ['#121413', '#2F3432', '#646C69', '#1D201F']);
    ctx.strokeStyle = '#C6FF00'; ctx.lineWidth = 14;
    ctx.beginPath(); ctx.ellipse(w * 0.5, h * 0.37, w * 0.165, 26, 0, 0, Math.PI * 2); ctx.stroke();
    drawShadedCylinder(ctx, w * 0.36, h * 0.43, w * 0.28, h * 0.21, ['#5C5E5A', '#949690', '#C8CAC4', '#70736E']);
    drawShadedCylinder(ctx, w * 0.33, h * 0.70, w * 0.34, h * 0.20, ['#382214', '#8A5229', '#D6894E', '#4F2E1A']);

    applyPhysicalFilmPass(ctx, w, h, 2304, { grain: 12, vignette: 0.42 });
  }

  // =========================================================================
  // INVENTION 4: TFD-027 — ACOUSTIC TERRITORIALIZER
  // =========================================================================
  else if (id === 'tfd-027-hero') {
    drawConcreteBackdrop(ctx, w, h, 2701, true);
    const plinthY = h * 0.75;
    drawStudioPlinth(ctx, w, h, plinthY, true);
    drawContactShadow(ctx, w * 0.5, plinthY + 8, 560, 56, 0.86);

    drawShadedCylinder(ctx, w * 0.14, h * 0.22, w * 0.72, h * 0.34, ['#4E504C', '#858781', '#B8BAB3', '#686A65']);
    drawShadedCylinder(ctx, w * 0.18, h * 0.56, w * 0.64, h * 0.10, ['#3B3D3A', '#6E706B', '#9E9F9A', '#525450']);
    drawShadedCylinder(ctx, w * 0.22, h * 0.66, 150, plinthY - h * 0.66, ['#2A2C2A', '#4D4F4C', '#6E706B', '#383A37']);
    drawShadedCylinder(ctx, w * 0.68, h * 0.66, 150, plinthY - h * 0.66, ['#2A2C2A', '#4D4F4C', '#6E706B', '#383A37']);

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 12; col++) {
        const cx = w * 0.195 + col * 88;
        const cy = h * 0.285 + row * 82;
        ctx.fillStyle = '#0D0E0D';
        ctx.beginPath(); ctx.arc(cx, cy, 26, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = (row === 1 && col >= 4 && col <= 7) ? '#C6FF00' : '#B59449';
        ctx.lineWidth = 6;
        ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI * 2); ctx.stroke();
      }
    }

    applyPhysicalFilmPass(ctx, w, h, 2701, { grain: 12, vignette: 0.44 });
  }

  else if (id === 'tfd-027-material') {
    drawConcreteBackdrop(ctx, w, h, 2702, false);
    const positions = [
      [w * 0.30, h * 0.30], [w * 0.70, h * 0.30],
      [w * 0.30, h * 0.70], [w * 0.70, h * 0.70]
    ];
    for (const [cx, cy] of positions) {
      const cone = ctx.createRadialGradient(cx - 25, cy - 25, 30, cx, cy, 215);
      cone.addColorStop(0, '#090A09');
      cone.addColorStop(0.55, '#1D201F');
      cone.addColorStop(0.82, '#626560');
      cone.addColorStop(1, '#9E9F99');
      ctx.fillStyle = cone;
      ctx.beginPath(); ctx.arc(cx, cy, 215, 0, Math.PI * 2); ctx.fill();

      ctx.strokeStyle = '#C9A654';
      ctx.lineWidth = 24;
      ctx.beginPath(); ctx.arc(cx, cy, 138, 0, Math.PI * 2); ctx.stroke();

      ctx.fillStyle = '#C6FF00';
      ctx.beginPath(); ctx.arc(cx, cy, 86, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#181A19';
      for (let gx = -65; gx <= 65; gx += 22) {
        for (let gy = -65; gy <= 65; gy += 22) {
          if (gx * gx + gy * gy < 68 * 68) {
            ctx.beginPath(); ctx.arc(cx + gx, cy + gy, 6, 0, Math.PI * 2); ctx.fill();
          }
        }
      }
    }
    applyPhysicalFilmPass(ctx, w, h, 2702, { grain: 14, vignette: 0.38 });
  }

  else if (id === 'tfd-027-context') {
    drawConcreteBackdrop(ctx, w, h, 2703, true);
    const blurG = ctx.createLinearGradient(0, h * 0.35, w, h * 0.35);
    blurG.addColorStop(0, 'rgba(255, 190, 90, 0.25)');
    blurG.addColorStop(0.5, 'rgba(255, 255, 255, 0.32)');
    blurG.addColorStop(1, 'rgba(255, 65, 30, 0.28)');
    ctx.fillStyle = blurG;
    ctx.fillRect(0, h * 0.30, w, 180);

    const plinthY = h * 0.68;
    drawStudioPlinth(ctx, w, h, plinthY, true);
    drawContactShadow(ctx, w * 0.5, plinthY + 8, 460, 42, 0.82);
    drawShadedCylinder(ctx, w * 0.22, h * 0.28, w * 0.56, plinthY - h * 0.28, ['#545753', '#8A8D88', '#BABDB6', '#696C67']);
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 10; c++) {
        ctx.fillStyle = '#111312';
        ctx.beginPath(); ctx.arc(w * 0.26 + c * 78, h * 0.35 + r * 68, 20, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#C6FF00'; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.arc(w * 0.26 + c * 78, h * 0.35 + r * 68, 16, 0, Math.PI * 2); ctx.stroke();
      }
    }
    applyPhysicalFilmPass(ctx, w, h, 2703, { grain: 13, vignette: 0.45 });
  }

  else if (id === 'tfd-027-technical') {
    drawConcreteBackdrop(ctx, w, h, 2704, true);
    ctx.fillStyle = '#7E807A';
    ctx.fillRect(w * 0.18, h * 0.14, w * 0.64, h * 0.72);
    ctx.fillStyle = '#D8D4C5';
    ctx.fillRect(w * 0.24, h * 0.22, w * 0.52, h * 0.24);
    for (let i = 0; i < 4; i++) {
      const cx = w * 0.26 + i * 215;
      ctx.fillStyle = '#141615';
      ctx.fillRect(cx, h * 0.32, 145, 290);
      ctx.fillStyle = '#C4A14E';
      ctx.fillRect(cx + 42, h * 0.62, 60, 140);
      drawAcidHardware(ctx, cx + 20, h * 0.58, 105, 26, 2);
    }
    applyPhysicalFilmPass(ctx, w, h, 2704, { grain: 14, vignette: 0.4 });
  }

  // =========================================================================
  // INVENTION 5: TFD-031 — MYCELIAL SOLDER RECLAIMER
  // =========================================================================
  else if (id === 'tfd-031-hero') {
    drawConcreteBackdrop(ctx, w, h, 3101, true);
    const plinthY = h * 0.74;
    drawStudioPlinth(ctx, w, h, plinthY, true);
    drawContactShadow(ctx, w * 0.5, plinthY + 8, 500, 52, 0.86);

    // Structural Lower & Upper Cross-Gantry Rails connecting the two Side Columns
    drawShadedCylinder(ctx, w * 0.17, plinthY - 42, w * 0.66, 42, ['#141615', '#323735', '#5C6460', '#1E2120']);
    drawShadedCylinder(ctx, w * 0.17, h * 0.21, w * 0.66, 36, ['#141615', '#323735', '#5C6460', '#1E2120']);

    // Matte-Black Anodized Aluminum Gantry End-Frames
    drawShadedCylinder(ctx, w * 0.18, h * 0.19, 98, plinthY - h * 0.19, ['#0B0C0B', '#222625', '#454C49', '#161817']);
    drawShadedCylinder(ctx, w * 0.74, h * 0.19, 98, plinthY - h * 0.19, ['#0B0C0B', '#222625', '#454C49', '#161817']);

    // Horizontal Borosilicate Glass Rotary Bioreactor Drum
    const drumG = ctx.createLinearGradient(0, h * 0.27, 0, h * 0.68);
    drumG.addColorStop(0, 'rgba(210, 235, 225, 0.34)');
    drumG.addColorStop(0.35, 'rgba(198, 255, 0, 0.24)');
    drumG.addColorStop(0.75, 'rgba(35, 78, 52, 0.76)');
    drumG.addColorStop(1, 'rgba(12, 28, 20, 0.94)');
    ctx.fillStyle = drumG;
    ctx.fillRect(w * 0.24, h * 0.27, w * 0.50, h * 0.41);
    ctx.strokeStyle = 'rgba(255,255,255,0.38)'; ctx.lineWidth = 4;
    ctx.strokeRect(w * 0.24, h * 0.27, w * 0.50, h * 0.41);

    // Central Titanium Cathode Spindle Shaft inside Drum
    drawShadedCylinder(ctx, w * 0.24, h * 0.33, w * 0.50, 18, ['#2E3331', '#747D79', '#C8D1CD', '#464C4A']);

    // Submerged PCBs suspended from Titanium Shaft
    for (let i = 0; i < 5; i++) {
      const px = w * 0.29 + i * 135;
      ctx.fillStyle = '#0D2618';
      ctx.fillRect(px, h * 0.35, 86, 220);
      ctx.fillStyle = '#D9823B';
      ctx.fillRect(px + 14, h * 0.40, 58, 18);
      ctx.fillStyle = '#E8DFC5';
      ctx.beginPath(); ctx.arc(px + 42, h * 0.52, 34, 0, Math.PI * 2); ctx.fill();
    }

    // Acid-Green (#C6FF00) Peristaltic Manifold Clamps mounted directly onto Top Gantry Rail with Silicone Feed Tubes
    for (let i = 0; i < 4; i++) {
      const cx = w * 0.31 + i * 155;
      drawAcidHardware(ctx, cx, h * 0.19, 58, 52, 5);
      drawHexBolt(ctx, cx + 29, h * 0.215, 6);
      // Translucent silicone peristaltic tube feeding into bioreactor drum
      ctx.strokeStyle = 'rgba(210, 240, 220, 0.55)'; ctx.lineWidth = 8;
      ctx.beginPath(); ctx.moveTo(cx + 29, h * 0.23); ctx.lineTo(cx + 29, h * 0.27); ctx.stroke();
    }

    applyPhysicalFilmPass(ctx, w, h, 3101, { grain: 11, vignette: 0.43 });
  }

  else if (id === 'tfd-031-material') {
    ctx.fillStyle = '#071C12';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(198, 255, 0, 0.14)';
    ctx.lineWidth = 2;
    for (let x = 0; x < w; x += 48) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    drawShadedCylinder(ctx, 120, 60, w - 240, 110, ['#343837', '#78807D', '#C5CCC9', '#4F5452']);
    for (let tx = 200; tx < w - 200; tx += 160) {
      drawShadedCylinder(ctx, tx, 170, 52, 380, ['#343837', '#78807D', '#C5CCC9', '#4F5452']);
      ctx.fillStyle = '#D97B34';
      ctx.beginPath(); ctx.arc(tx + 26, 510, 68, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#E5E8E6';
      ctx.beginPath(); ctx.arc(tx + 26, 440, 44, 0, Math.PI * 2); ctx.fill();
    }

    ctx.strokeStyle = 'rgba(244, 244, 236, 0.65)';
    ctx.lineWidth = 3;
    const rand = mulberry32(3102);
    for (let i = 0; i < 140; i++) {
      const x1 = rand() * w, y1 = h * 0.45 + rand() * h * 0.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(x1 + (rand() - 0.5) * 260, y1 - rand() * 180, x1 + (rand() - 0.5) * 320, y1 - rand() * 260);
      ctx.stroke();
    }
    drawAcidHardware(ctx, w * 0.78, 120, 140, 68, 6);

    applyPhysicalFilmPass(ctx, w, h, 3102, { grain: 14, vignette: 0.42 });
  }

  else if (id === 'tfd-031-context') {
    drawConcreteBackdrop(ctx, w, h, 3103, true);
    const plinthY = h * 0.68;
    drawStudioPlinth(ctx, w, h, plinthY, false);
    for (let u = 0; u < 2; u++) {
      const ox = w * 0.12 + u * 640;
      drawContactShadow(ctx, ox + 260, plinthY + 6, 260, 36, 0.72);
      drawShadedCylinder(ctx, ox, h * 0.34, 484, 24, ['#141615', '#2F3331', '#545B58', '#1F2221']);
      drawShadedCylinder(ctx, ox, h * 0.34, 64, plinthY - h * 0.34, ['#141615', '#2F3331', '#545B58', '#1F2221']);
      drawShadedCylinder(ctx, ox + 420, h * 0.34, 64, plinthY - h * 0.34, ['#141615', '#2F3331', '#545B58', '#1F2221']);
      ctx.fillStyle = 'rgba(175, 230, 140, 0.38)';
      ctx.fillRect(ox + 64, h * 0.38, 356, h * 0.26);
      drawAcidHardware(ctx, ox + 140, h * 0.325, 44, 38, 4);
      drawAcidHardware(ctx, ox + 280, h * 0.325, 44, 38, 4);
    }
    applyPhysicalFilmPass(ctx, w, h, 3103, { grain: 12, vignette: 0.44 });
  }

  else if (id === 'tfd-031-technical') {
    ctx.fillStyle = '#101211';
    ctx.fillRect(0, 0, w, h);
    drawShadedCylinder(ctx, 180, 220, 740, 120, ['#363B39', '#7C8581', '#C8D1CD', '#4E5452']);
    for (let i = 0; i < 5; i++) {
      const tx = 230 + i * 135;
      drawShadedCylinder(ctx, tx, 340, 56, 460, ['#363B39', '#7C8581', '#C8D1CD', '#4E5452']);
      ctx.fillStyle = '#C96E2B';
      ctx.beginPath(); ctx.roundRect(tx - 12, 580, 80, 210, 18); ctx.fill();
    }
    drawShadedCylinder(ctx, 1080, 280, 340, 340, ['#1C201F', '#383E3C', '#626B68', '#252A28']);
    ctx.strokeStyle = '#C6FF00'; ctx.lineWidth = 22;
    ctx.beginPath(); ctx.arc(1250, 450, 125, 0, Math.PI * 2); ctx.stroke();

    applyPhysicalFilmPass(ctx, w, h, 3104, { grain: 12, vignette: 0.38 });
  }

  // =========================================================================
  // INVENTION 6: TFD-036 — TACTILE TREATY TERMINAL
  // =========================================================================
  else if (id === 'tfd-036-hero') {
    drawConcreteBackdrop(ctx, w, h, 3601, true);
    const plinthY = h * 0.75;
    drawStudioPlinth(ctx, w, h, plinthY, true);
    drawContactShadow(ctx, w * 0.5, plinthY + 8, 560, 54, 0.88);

    // Heavy Cast-Concrete Bilateral Base Plinth Seated on Studio Surface
    drawShadedCylinder(ctx, w * 0.16, h * 0.50, w * 0.68, plinthY - h * 0.50, ['#565854', '#8A8C86', '#BEBDB7', '#6E706B']);
    drawVernierScale(ctx, w * 0.19, h * 0.53, w * 0.62, true, 'rgba(10,11,10,0.45)');

    // Vertical Stainless-Steel Linkage Rods connecting the 12 Brass Pin-Tumblers to the Upper Balance Beam
    ctx.strokeStyle = '#8C9490'; ctx.lineWidth = 6;
    for (let i = 0; i < 12; i++) {
      const px = w * 0.22 + i * 78 + 18;
      ctx.beginPath();
      ctx.moveTo(px, h * 0.28);
      ctx.lineTo(px, h * 0.52);
      ctx.stroke();
    }

    // Central Fulcrum Stanchion
    drawShadedCylinder(ctx, w * 0.45, h * 0.24, w * 0.10, h * 0.28, ['#121413', '#2E3331', '#5C6360', '#1E2120']);

    // Symmetrical Machined Gunmetal Bronze Balance Beam
    ctx.save();
    ctx.translate(w * 0.5, h * 0.28);
    ctx.rotate(-0.042);
    drawShadedCylinder(ctx, -w * 0.36, -32, w * 0.72, 64, ['#2B261F', '#5C5243', '#9E8E74', '#3D362C']);
    drawShadedCylinder(ctx, -w * 0.34, -75, 110, 150, ['#4A3B1C', '#9E8242', '#E5C878', '#5E4B24']);
    drawShadedCylinder(ctx, w * 0.34 - 110, -75, 110, 150, ['#4A3B1C', '#9E8242', '#E5C878', '#5E4B24']);
    ctx.restore();

    // Dual Rows of Interlocking Satin-Brass Pin-Tumbler Sliders Seated in Plinth Slots
    for (let i = 0; i < 12; i++) {
      const px = w * 0.22 + i * 78;
      const offset = Math.sin(i * 0.7) * 24;
      drawShadedCylinder(ctx, px, h * 0.42 + offset, 36, 98, ['#524220', '#A88B46', '#ECD086', '#6B562A']);
    }

    // Central Acid-Green (#C6FF00) Equilibrium Locking Lever & Pivot Bolt
    drawAcidHardware(ctx, w * 0.475, h * 0.19, w * 0.05, 165, 6);
    drawHexBolt(ctx, w * 0.5, h * 0.28, 12);

    applyPhysicalFilmPass(ctx, w, h, 3601, { grain: 11, vignette: 0.44 });
  }

  else if (id === 'tfd-036-material') {
    ctx.fillStyle = '#181A19';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 8; i++) {
      const x = 110 + i * 175;
      const yShift = (i % 2 === 0) ? 90 : 210;
      drawShadedCylinder(ctx, x, yShift, 135, 760, ['#4D3E1D', '#A38643', '#E8CB80', '#695428']);
      ctx.fillStyle = '#181A19';
      for (let ty = yShift + 60; ty < yShift + 700; ty += 36) {
        ctx.fillRect(x + 12, ty, (ty % 72 === 0) ? 55 : 30, 5);
      }
    }
    drawAcidHardware(ctx, 60, h * 0.48, w - 120, 88, 6);

    applyPhysicalFilmPass(ctx, w, h, 3602, { grain: 14, vignette: 0.4 });
  }

  else if (id === 'tfd-036-context') {
    drawConcreteBackdrop(ctx, w, h, 3603, true);
    for (let win = 0; win < 3; win++) {
      const wx = w * 0.14 + win * 410;
      const sky = ctx.createLinearGradient(0, 60, 0, h * 0.56);
      sky.addColorStop(0, '#8DA3AD');
      sky.addColorStop(0.55, '#58707A');
      sky.addColorStop(1, '#2D3E47');
      ctx.fillStyle = sky;
      ctx.fillRect(wx, 60, 340, h * 0.48);
    }
    const plinthY = h * 0.64;
    drawStudioPlinth(ctx, w, h, plinthY, false);
    drawContactShadow(ctx, w * 0.5, plinthY + 6, 440, 42, 0.78);
    drawShadedCylinder(ctx, w * 0.26, h * 0.48, w * 0.48, plinthY - h * 0.48, ['#545652', '#8A8C86', '#BEBDB7', '#6E706B']);
    drawShadedCylinder(ctx, w * 0.24, h * 0.36, w * 0.52, 42, ['#2B261F', '#5C5243', '#9E8E74', '#3D362C']);
    drawAcidHardware(ctx, w * 0.485, h * 0.31, 48, 125, 4);

    applyPhysicalFilmPass(ctx, w, h, 3603, { grain: 12, vignette: 0.43 });
  }

  else if (id === 'tfd-036-technical') {
    drawConcreteBackdrop(ctx, w, h, 3604, true);
    ctx.strokeStyle = '#B8C2BE'; ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(w * 0.15, h * 0.30); ctx.lineTo(w * 0.85, h * 0.70);
    ctx.moveTo(w * 0.15, h * 0.70); ctx.lineTo(w * 0.85, h * 0.30);
    ctx.stroke();

    for (const cx of [w * 0.28, w * 0.72]) {
      ctx.fillStyle = 'rgba(180, 225, 220, 0.28)';
      ctx.strokeStyle = '#8FA8A1'; ctx.lineWidth = 6;
      ctx.fillRect(cx - 85, h * 0.22, 170, h * 0.56);
      ctx.strokeRect(cx - 85, h * 0.22, 170, h * 0.56);
      drawAcidHardware(ctx, cx - 95, h * 0.46, 190, 48, 4);
    }
    ctx.fillStyle = '#C4A14E';
    ctx.beginPath(); ctx.arc(w * 0.5, h * 0.5, 145, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#141615';
    ctx.beginPath(); ctx.arc(w * 0.5, h * 0.5, 48, 0, Math.PI * 2); ctx.fill();

    applyPhysicalFilmPass(ctx, w, h, 3604, { grain: 12, vignette: 0.4 });
  }

  return canvas.toDataURL('image/png');
};
</script>
</body>
</html>`;
}

const PLATES = [
  { id: 'department-foundry-hero', out: 'studio/department-foundry-hero.png', width: 1600, height: 1000 },
  { id: 'research-materials-lab',  out: 'studio/research-materials-lab.png',  width: 1600, height: 1000 },
  { id: 'tfd-014-hero',      out: 'projects/tfd-014-hero.png',      width: 1600, height: 1200 },
  { id: 'tfd-014-material',  out: 'projects/tfd-014-material.png',  width: 1600, height: 1200 },
  { id: 'tfd-014-context',   out: 'projects/tfd-014-context.png',   width: 1600, height: 900 },
  { id: 'tfd-014-technical', out: 'projects/tfd-014-technical.png', width: 1600, height: 1200 },
  { id: 'tfd-019-hero',      out: 'projects/tfd-019-hero.png',      width: 1600, height: 1200 },
  { id: 'tfd-019-material',  out: 'projects/tfd-019-material.png',  width: 1600, height: 1200 },
  { id: 'tfd-019-context',   out: 'projects/tfd-019-context.png',   width: 1600, height: 900 },
  { id: 'tfd-019-technical', out: 'projects/tfd-019-technical.png', width: 1600, height: 1200 },
  { id: 'tfd-023-hero',      out: 'projects/tfd-023-hero.png',      width: 1600, height: 1200 },
  { id: 'tfd-023-material',  out: 'projects/tfd-023-material.png',  width: 1600, height: 1200 },
  { id: 'tfd-023-context',   out: 'projects/tfd-023-context.png',   width: 1600, height: 900 },
  { id: 'tfd-023-technical', out: 'projects/tfd-023-technical.png', width: 1600, height: 1200 },
  { id: 'tfd-027-hero',      out: 'projects/tfd-027-hero.png',      width: 1600, height: 1200 },
  { id: 'tfd-027-material',  out: 'projects/tfd-027-material.png',  width: 1600, height: 1200 },
  { id: 'tfd-027-context',   out: 'projects/tfd-027-context.png',   width: 1600, height: 900 },
  { id: 'tfd-027-technical', out: 'projects/tfd-027-technical.png', width: 1600, height: 1200 },
  { id: 'tfd-031-hero',      out: 'projects/tfd-031-hero.png',      width: 1600, height: 1200 },
  { id: 'tfd-031-material',  out: 'projects/tfd-031-material.png',  width: 1600, height: 1200 },
  { id: 'tfd-031-context',   out: 'projects/tfd-031-context.png',   width: 1600, height: 900 },
  { id: 'tfd-031-technical', out: 'projects/tfd-031-technical.png', width: 1600, height: 1200 },
  { id: 'tfd-036-hero',      out: 'projects/tfd-036-hero.png',      width: 1600, height: 1200 },
  { id: 'tfd-036-material',  out: 'projects/tfd-036-material.png',  width: 1600, height: 1200 },
  { id: 'tfd-036-context',   out: 'projects/tfd-036-context.png',   width: 1600, height: 900 },
  { id: 'tfd-036-technical', out: 'projects/tfd-036-technical.png', width: 1600, height: 1200 }
];

async function main() {
  const html = buildRendererHTML();
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const { port } = server.address();

  const debugPort = 9345;
  const userDataDir = path.resolve('.chrome-plate-profile');
  const proc = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${userDataDir}`,
    `--remote-debugging-port=${debugPort}`,
    `http://127.0.0.1:${port}/`
  ], { stdio: 'ignore' });

  let wsUrl = null;
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${debugPort}/json/list`);
      const list = await res.json();
      const page = list.find(t => t.type === 'page');
      if (page && page.webSocketDebuggerUrl) {
        wsUrl = page.webSocketDebuggerUrl;
        break;
      }
    } catch {}
    await new Promise(r => setTimeout(r, 150));
  }

  if (!wsUrl) {
    proc.kill();
    server.close();
    throw new Error('Could not connect to headless Chrome CDP');
  }

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let msgId = 1;
  function sendCDP(method, params = {}) {
    const id = msgId++;
    return new Promise((resolve, reject) => {
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === id) {
          ws.removeEventListener('message', handler);
          if (data.error) reject(new Error(data.error.message));
          else resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  for (let i = 0; i < 20; i++) {
    const check = await sendCDP('Runtime.evaluate', {
      expression: 'typeof window.renderPlate === "function"',
      returnByValue: true
    });
    if (check?.result?.value === true) break;
    await new Promise(r => setTimeout(r, 100));
  }

  for (const plate of PLATES) {
    const evalRes = await sendCDP('Runtime.evaluate', {
      expression: `window.renderPlate(${JSON.stringify(plate)})`,
      returnByValue: true
    });
    const dataUrl = evalRes.result.value;
    const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
    const fullPath = path.join(OUT_DIR, plate.out);
    await fs.writeFile(fullPath, Buffer.from(base64, 'base64'));
  }

  console.log('All 26 refined plates rendered.');
  ws.close();
  proc.kill();
  server.close();
  await fs.rm(userDataDir, { recursive: true, force: true }).catch(() => {});
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
