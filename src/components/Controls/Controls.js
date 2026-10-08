/**
 * Controls Component — WALL•E Compactor Console & Solar Charge Gauge
 * Provides:
 * 1. Scrap Pile Input Controls & Story-Themed Presets
 * 2. Compactor Navigation (Start, Next Step, Prev Step, Play/Pause, Reset)
 * 3. Solar Charging Meter with 10 Segmented LED Battery Cells
 * 4. Sound & CRT Scanlines HUD Toggles
 */

export function renderControls(state) {
  const {
    currentStepIndex,
    totalSteps,
    isPlaying,
    speed,
    comparisons,
    swaps,
    pivotsSelected,
    inputValue,
    errorMessage,
    soundEnabled = false,
    crtEnabled = false
  } = state;

  const chargePercent = Math.round((currentStepIndex / Math.max(totalSteps, 1)) * 100);
  const totalCells = 10;
  const activeCells = Math.round((chargePercent / 100) * totalCells);
  let batteryCellsHtml = "";
  for (let c = 1; c <= totalCells; c++) {
    const isLit = c <= activeCells;
    const isHigh = c > 7;
    batteryCellsHtml += `<span class="battery-cell ${isLit ? (isHigh ? 'cell-green' : 'cell-yellow') : 'cell-dim'}"></span>`;
  }

  return `
    <div class="controls-component">
      <!-- Scrap Pile Input Panel -->
      <div class="input-panel-card">
        <div class="input-panel-header">
          <div class="input-title">
            <span class="input-icon">📦</span>
            <strong>Scrap Pile Configuration</strong>
            <span class="input-limit-hint">(3 to 15 numbers, comma-separated)</span>
          </div>
          <div class="input-presets-group">
            <span class="preset-label">Presets:</span>
            <button class="btn-preset" data-preset="standard">Standard Pile</button>
            <button class="btn-preset" data-preset="reverse">Reverse Scrap</button>
            <button class="btn-preset" data-preset="sorted">Sorted Tower</button>
            <button class="btn-preset" data-preset="duplicates">Duplicate Scrap</button>
            <button class="btn-preset" data-preset="single">Single Plant (42)</button>
          </div>
        </div>

        <div class="input-row">
          <div class="input-field-wrapper">
            <input 
              type="text" 
              id="arrayInput" 
              class="text-input ${errorMessage ? 'has-error' : ''}" 
              placeholder="e.g. 38, 12, 27, 43, 9, 31, 18"
              value="${inputValue || ''}"
            />
            ${errorMessage ? `<div class="input-error-msg">⚠️ ${errorMessage}</div>` : ''}
          </div>
          <button id="btnGenerate" class="btn btn-primary">
            <span>⚡</span> Compact Scrap (Generate)
          </button>
          <button id="btnRandom" class="btn btn-secondary">
            <span>🎲</span> Random Debris
          </button>
          <button id="btnExample" class="btn btn-outline">
            <span>📖</span> Load CIA Example
          </button>
        </div>
      </div>

      <!-- Playback Console & Solar Charging Gauge -->
      <div class="playback-panel-card">
        <div class="playback-top-row">
          <!-- Step Actions -->
          <div class="playback-buttons-group">
            <button id="btnStart" class="btn-ctrl btn-ctrl-start" title="Go to beginning">
              <span class="ctrl-icon">⏮</span> Start
            </button>
            <button id="btnPrev" class="btn-ctrl" ${currentStepIndex <= 1 ? 'disabled' : ''} title="Previous algorithm step">
              <span class="ctrl-icon">◀</span> Prev Step
            </button>
            <button id="btnPlayPause" class="btn-ctrl ${isPlaying ? 'btn-ctrl-pause' : 'btn-ctrl-play'}">
              <span class="ctrl-icon">${isPlaying ? '⏸' : '▶'}</span>
              <span class="ctrl-text">${isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button id="btnNext" class="btn-ctrl btn-ctrl-primary" ${currentStepIndex >= totalSteps ? 'disabled' : ''} title="Execute next algorithm step">
              <span class="ctrl-text">Next Step</span> <span class="ctrl-icon">▶</span>
            </button>
            <button id="btnReset" class="btn-ctrl btn-ctrl-reset" title="Reset to initial scrap pile">
              <span class="ctrl-icon">↺</span> Reset
            </button>
          </div>

          <!-- Speed & Sensory Toggles -->
          <div class="speed-control-group">
            <button id="btnSoundToggle" class="btn-feature-toggle ${soundEnabled ? 'active' : ''}" title="Toggle procedural sound effects">
              <span>${soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF'}</span>
            </button>
            <button id="btnCrtToggle" class="btn-feature-toggle ${crtEnabled ? 'active' : ''}" title="Toggle Axiom CRT HUD scanlines">
              <span>${crtEnabled ? '📺 CRT: ON' : '📺 CRT: OFF'}</span>
            </button>
            <div class="speed-buttons">
              <button class="btn-speed ${speed === 1600 ? 'active' : ''}" data-speed="1600">Slow (1.6s)</button>
              <button class="btn-speed ${speed === 900 ? 'active' : ''}" data-speed="900">Normal (0.9s)</button>
              <button class="btn-speed ${speed === 350 ? 'active' : ''}" data-speed="350">Fast (0.35s)</button>
            </div>
          </div>
        </div>

        <!-- Solar Battery Gauge Scrubber and Telemetry Counters -->
        <div class="playback-scrubber-row">
          <div class="solar-gauge-container">
            <div class="solar-gauge-header">
              <span class="solar-icon">☀️</span>
              <span class="solar-title">SOLAR CHARGE:</span>
              <span class="solar-pct">${chargePercent}%</span>
            </div>
            <div class="solar-led-bar">
              ${batteryCellsHtml}
            </div>
          </div>

          <div class="step-counter-badge">
            Step <strong>${currentStepIndex}</strong> of <strong>${totalSteps}</strong>
          </div>

          <div class="slider-wrapper">
            <input 
              type="range" 
              id="stepScrubber" 
              class="step-slider" 
              min="1" 
              max="${Math.max(totalSteps, 1)}" 
              value="${currentStepIndex}"
            />
          </div>

          <div class="metrics-tags-row">
            <div class="metric-tag" title="Total element comparisons with pivot">
              <span class="metric-label">EVE Scans:</span>
              <span class="metric-num">${comparisons}</span>
            </div>
            <div class="metric-tag" title="Total element swaps performed">
              <span class="metric-label">Swaps:</span>
              <span class="metric-num">${swaps}</span>
            </div>
            <div class="metric-tag" title="Total pivots chosen">
              <span class="metric-label">Directives:</span>
              <span class="metric-num">${pivotsSelected}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
