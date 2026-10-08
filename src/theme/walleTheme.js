/**
 * WALL•E Thematic Assets, Vector Sprites & Audio Synthesizer
 * 100% Offline, Zero External Asset Dependencies
 *
 * Includes:
 * 1. High-fidelity Vector SVG Sprites:
 *    - WALL•E Compactor Bot (with binocular cameras, treads, solar meter)
 *    - EVE Probe Bot (with glowing cyan visor and hover aura)
 *    - The Boot Plant (Directive: Life 🌱)
 *    - Hal the Cockroach (WALL•E's faithful companion)
 * 2. Custom Data-URI Cursors:
 *    - WALL•E Mechanical Claw Cursor
 *    - EVE Plasma Cyan Pointer Cursor
 * 3. Web Audio API Procedural Synthesizer:
 *    - Scanner Laser Chime
 *    - Compactor Hydraulic Clank
 *    - Servo Whir
 *    - Triumphant Solar Chime
 */

// --- 1. Vector SVG Sprites ---

export const WALLE_SPRITE_SVG = `
<svg class="sprite-walle" viewBox="0 0 100 110" width="46" height="52" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Tread Tracks -->
  <rect x="12" y="74" width="22" height="32" rx="6" fill="#2E241B" stroke="#4E3E2F" stroke-width="2"/>
  <rect x="66" y="74" width="22" height="32" rx="6" fill="#2E241B" stroke="#4E3E2F" stroke-width="2"/>
  <circle cx="23" cy="82" r="4" fill="#695642"/>
  <circle cx="23" cy="98" r="4" fill="#695642"/>
  <circle cx="77" cy="82" r="4" fill="#695642"/>
  <circle cx="77" cy="98" r="4" fill="#695642"/>
  <line x1="12" y1="90" x2="34" y2="90" stroke="#1F1812" stroke-width="2"/>
  <line x1="66" y1="90" x2="88" y2="90" stroke="#1F1812" stroke-width="2"/>

  <!-- Main Compactor Body (Cube Chassis) -->
  <rect x="24" y="44" width="52" height="42" rx="4" fill="#E5A93C" stroke="#B47214" stroke-width="3"/>
  <!-- Weathering / Grime Plates -->
  <rect x="28" y="48" width="44" height="14" fill="#C68925" opacity="0.6"/>
  <!-- Front Door Compactor Hatch Line -->
  <line x1="50" y1="46" x2="50" y2="84" stroke="#8C570E" stroke-width="2"/>
  <line x1="26" y1="64" x2="74" y2="64" stroke="#8C570E" stroke-width="1.5"/>

  <!-- BnL Nameplate & Solar Battery Gauge on Chest -->
  <rect x="32" y="50" width="36" height="9" rx="2" fill="#1C1814" stroke="#5C4830" stroke-width="1"/>
  <rect x="34" y="52" width="6" height="5" fill="#EF4444" rx="1"/>
  <rect x="42" y="52" width="6" height="5" fill="#F59E0B" rx="1"/>
  <rect x="50" y="52" width="6" height="5" fill="#10B981" rx="1"/>
  <rect x="58" y="52" width="6" height="5" fill="#10B981" rx="1"/>

  <!-- Mechanical Arms -->
  <path d="M24 54 L10 60 L14 72" stroke="#66533E" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M76 54 L90 60 L86 72" stroke="#66533E" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Hands / Claws -->
  <path d="M11 72 L7 76 M15 72 L19 76" stroke="#997C5C" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M85 72 L81 76 M89 72 L93 76" stroke="#997C5C" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Neck Assembly -->
  <rect x="46" y="28" width="8" height="18" fill="#4B3D2F" stroke="#2B2117" stroke-width="1.5"/>
  <line x1="46" y1="34" x2="54" y2="34" stroke="#7A6550" stroke-width="1.5"/>
  <line x1="46" y1="40" x2="54" y2="40" stroke="#7A6550" stroke-width="1.5"/>

  <!-- Binocular Eyes Head -->
  <!-- Left Eye Assembly -->
  <path d="M26 18 Q24 6 36 6 Q48 6 46 20 Q44 26 34 26 Q26 26 26 18 Z" fill="#D6962A" stroke="#875107" stroke-width="2"/>
  <circle cx="36" cy="16" r="7" fill="#1E1914" stroke="#75624E" stroke-width="1.5"/>
  <circle cx="36" cy="16" r="4.5" fill="#0284C7"/>
  <circle cx="37.5" cy="14.5" r="2" fill="#E0F2FE"/>

  <!-- Right Eye Assembly -->
  <path d="M54 20 Q52 6 64 6 Q76 6 74 18 Q74 26 66 26 Q56 26 54 20 Z" fill="#D6962A" stroke="#875107" stroke-width="2"/>
  <circle cx="64" cy="16" r="7" fill="#1E1914" stroke="#75624E" stroke-width="1.5"/>
  <circle cx="64" cy="16" r="4.5" fill="#0284C7"/>
  <circle cx="65.5" cy="14.5" r="2" fill="#E0F2FE"/>

  <!-- Brow Joint -->
  <line x1="38" y1="6" x2="62" y2="6" stroke="#523B22" stroke-width="2.5" stroke-linecap="round"/>
</svg>
`;

export const EVE_SPRITE_SVG = `
<svg class="sprite-eve" viewBox="0 0 80 100" width="40" height="50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <filter id="eveGlow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#00E5FF" flood-opacity="0.6"/>
  </filter>

  <!-- Floating Body Shell -->
  <path d="M40 38 Q58 38 56 68 Q54 94 40 96 Q26 94 24 68 Q22 38 40 38 Z" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
  <ellipse cx="40" cy="74" rx="8" ry="14" fill="#E2E8F0" opacity="0.3"/>

  <!-- Floating Arms -->
  <path d="M20 46 Q14 60 18 72 Q20 62 23 50 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2"/>
  <path d="M60 46 Q66 60 62 72 Q60 62 57 50 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2"/>

  <!-- Smooth Oval Head -->
  <ellipse cx="40" cy="22" rx="18" ry="16" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>

  <!-- Black Visor Screen -->
  <ellipse cx="40" cy="22" rx="13" ry="10" fill="#0B132B"/>

  <!-- Glowing Cyan Eyes (Happy Arch) -->
  <path d="M31 22 Q34 18 37 22" stroke="#00E5FF" stroke-width="2.5" stroke-linecap="round" filter="url(#eveGlow)"/>
  <path d="M43 22 Q46 18 49 22" stroke="#00E5FF" stroke-width="2.5" stroke-linecap="round" filter="url(#eveGlow)"/>

  <!-- Plant Directive Symbol on Chest -->
  <circle cx="40" cy="52" r="3.5" fill="#22C55E" opacity="0.8"/>
  <path d="M40 54 Q41 50 43 50 M40 54 Q39 51 38 51" stroke="#22C55E" stroke-width="1" stroke-linecap="round"/>
</svg>
`;

export const BOOT_PLANT_SVG = `
<svg class="sprite-boot-plant" viewBox="0 0 60 60" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <filter id="plantGlow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#22C55E" flood-opacity="0.8"/>
  </filter>
  <!-- Worn Leather Boot -->
  <path d="M16 28 L24 28 L26 44 L38 44 Q46 44 46 48 L46 54 L12 54 L14 36 Z" fill="#543825" stroke="#2E1C0F" stroke-width="2"/>
  <path d="M12 51 L46 51 L46 55 L12 55 Z" fill="#1E140C"/>
  <circle cx="20" cy="34" r="1.5" fill="#2E1C0F"/>
  <circle cx="21" cy="39" r="1.5" fill="#2E1C0F"/>

  <!-- Sprouting Seedling Leaves -->
  <path d="M21 28 Q22 16 24 10" stroke="#15803D" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Leaf 1 -->
  <path d="M24 12 Q28 6 34 10 Q32 16 24 14 Z" fill="#4ADE80" stroke="#16A34A" stroke-width="1.2" filter="url(#plantGlow)"/>
  <!-- Leaf 2 -->
  <path d="M23 15 Q17 10 12 14 Q15 20 22 18 Z" fill="#22C55E" stroke="#15803D" stroke-width="1.2" filter="url(#plantGlow)"/>
</svg>
`;

export const HAL_COCKROACH_SVG = `
<svg class="sprite-hal" viewBox="0 0 50 40" width="32" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Legs -->
  <path d="M16 20 L8 14 M18 22 L10 24 M20 24 L14 32" stroke="#663A12" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M30 20 L38 14 M28 22 L36 24 M26 24 L32 32" stroke="#663A12" stroke-width="1.8" stroke-linecap="round"/>
  <!-- Antennae -->
  <path d="M20 10 Q14 2 8 4" stroke="#99581F" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M26 10 Q32 2 38 4" stroke="#99581F" stroke-width="1.2" stroke-linecap="round"/>
  <!-- Shell Body -->
  <ellipse cx="23" cy="20" rx="8" ry="12" fill="#874714" stroke="#4F2606" stroke-width="1.5"/>
  <line x1="23" y1="10" x2="23" y2="30" stroke="#5E310C" stroke-width="1.2"/>
  <circle cx="21" cy="11" r="1.5" fill="#1C0E04"/>
  <circle cx="25" cy="11" r="1.5" fill="#1C0E04"/>
</svg>
`;

// --- 2. Custom Data URI Cursors ---

// WALL-E Claw Cursor (Normal Pointer)
export const WALLE_CLAW_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28' fill='none'%3E%3Cpath d='M4 4 L14 14 L11 17 L2 8 Z' fill='%23F59E0B' stroke='%2378350F' stroke-width='1.5'/%3E%3Cpath d='M14 14 L18 10 L22 14 L18 18 Z' fill='%23B45309' stroke='%23451A03' stroke-width='1.5'/%3E%3Ccircle cx='4' cy='4' r='2' fill='%23EF4444'/%3E%3C/svg%3E") 4 4, auto`;

// EVE Cyan Pointer Cursor (Hover Pointer)
export const EVE_POINTER_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28' fill='none'%3E%3Cpolygon points='2,2 10,22 14,14 22,10' fill='%2300E5FF' stroke='%230284C7' stroke-width='1.5'/%3E%3Ccircle cx='14' cy='14' r='3' fill='%23FFFFFF'/%3E%3C/svg%3E") 2 2, pointer`;


// --- 3. Web Audio API Procedural Synthesizer ---

class WalleAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = false; // Opt-in or user-toggled
  }

  _initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this._initContext();
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playScannerPing();
    }
    return this.enabled;
  }

  // EVE Optical Scan Chime (High Crystal Ping)
  playScannerPing() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.12); // A6

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {
      // Audio not supported
    }
  }

  // WALL-E Compactor Hydraulic Clank (Mechanical Clunk)
  playCompactorClank() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {
      // Audio not supported
    }
  }

  // Servo Click (Step Click)
  playServoClick() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(660, now + 0.04);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      // Audio not supported
    }
  }

  // Triumphant Directive Completion (Plant Chime)
  playCompletionChime() {
    if (!this.enabled || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const now = this.ctx.currentTime + (idx * 0.12);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
      });
    } catch (e) {
      // Audio not supported
    }
  }
}

export const soundManager = new WalleAudioSynthesizer();

if (typeof window !== "undefined") {
  window.WalleTheme = {
    WALLE_SPRITE_SVG,
    EVE_SPRITE_SVG,
    BOOT_PLANT_SVG,
    HAL_COCKROACH_SVG,
    WALLE_CLAW_CURSOR,
    EVE_POINTER_CURSOR,
    soundManager
  };
}
