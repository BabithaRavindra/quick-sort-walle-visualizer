/**
 * Controls Component
 * Provides:
 * 1. Array Input Controls (Custom Input, Generate, Random, Load Example, Presets)
 * 2. Playback Navigation (Start, Next Step, Prev Step, Play/Pause, Reset)
 * 3. Speed Selection (Slow, Normal, Fast)
 * 4. Step Scrubber & Counters
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
    errorMessage
  } = state;

  return `
    <div class="controls-component">
      <!-- Input Section -->
      <div class="input-panel-card">
        <div class="input-panel-header">
          <div class="input-title">
            <span class="input-icon">⚙️</span>
            <strong>Array Configuration</strong>
            <span class="input-limit-hint">(3 to 15 numbers, comma-separated)</span>
          </div>
          <div class="input-presets-group">
            <span class="preset-label">Quick Presets:</span>
            <button class="btn-preset" data-preset="standard">CIA Example</button>
            <button class="btn-preset" data-preset="reverse">Worst (Reverse)</button>
            <button class="btn-preset" data-preset="sorted">Worst (Sorted)</button>
            <button class="btn-preset" data-preset="duplicates">Duplicates</button>
            <button class="btn-preset" data-preset="single">Single (42)</button>
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
            <span>⚡</span> Generate Array
          </button>
          <button id="btnRandom" class="btn btn-secondary">
            <span>🎲</span> Generate Random Array
          </button>
          <button id="btnExample" class="btn btn-outline">
            <span>📖</span> Load Example
          </button>
        </div>
      </div>

      <!-- Playback & Scrubber Controls -->
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
            <button id="btnReset" class="btn-ctrl btn-ctrl-reset" title="Reset to initial array">
              <span class="ctrl-icon">↺</span> Reset
            </button>
          </div>

          <!-- Speed Controls -->
          <div class="speed-control-group">
            <span class="speed-label">Playback Speed:</span>
            <div class="speed-buttons">
              <button class="btn-speed ${speed === 1600 ? 'active' : ''}" data-speed="1600">Slow (1.6s)</button>
              <button class="btn-speed ${speed === 900 ? 'active' : ''}" data-speed="900">Normal (0.9s)</button>
              <button class="btn-speed ${speed === 350 ? 'active' : ''}" data-speed="350">Fast (0.35s)</button>
            </div>
          </div>
        </div>

        <!-- Scrubber and Counters -->
        <div class="playback-scrubber-row">
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
              <span class="metric-label">Comparisons:</span>
              <span class="metric-num">${comparisons}</span>
            </div>
            <div class="metric-tag" title="Total element swaps performed">
              <span class="metric-label">Swaps:</span>
              <span class="metric-num">${swaps}</span>
            </div>
            <div class="metric-tag" title="Total pivots chosen">
              <span class="metric-label">Pivots Selected:</span>
              <span class="metric-num">${pivotsSelected}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
