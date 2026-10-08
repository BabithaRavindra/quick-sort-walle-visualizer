/**
 * ArrayVisualizer Component — WALL•E Compactor Bay & EVE Optical Scanner
 * Features:
 * - Animated vector sprites: WALL•E on pointer i, EVE on pointer j, Boot Plant on Pivot/Sorted, Hal on stage
 * - Compacted scrap cube styling with isometric top rim and wire bindings
 * - EVE optical laser scanning animation on active comparison
 * - Compactor hydraulic shift animations
 */

export function renderArrayVisualizer(step, initialArray) {
  if (!step) return '<div class="empty-state">No scrap pile loaded.</div>';

  const walleSvg = (typeof window !== "undefined" && window.WalleTheme) ? window.WalleTheme.WALLE_SPRITE_SVG : "";
  const eveSvg = (typeof window !== "undefined" && window.WalleTheme) ? window.WalleTheme.EVE_SPRITE_SVG : "";
  const bootPlantSvg = (typeof window !== "undefined" && window.WalleTheme) ? window.WalleTheme.BOOT_PLANT_SVG : "🌱";
  const halSvg = (typeof window !== "undefined" && window.WalleTheme) ? window.WalleTheme.HAL_COCKROACH_SVG : "🪳";

  const {
    array,
    low,
    high,
    pivotIndex,
    pivotValue,
    i,
    j,
    activeIndices = [],
    comparingIndices = [],
    swappingIndices = [],
    sortedIndices = [],
    partitionRegions = { smaller: [], greater: [], unprocessed: [], pivot: [] }
  } = step;

  const maxVal = Math.max(...array, 1);
  const minVal = Math.min(...array, 0);
  const valRange = Math.max(maxVal - minVal, 1);

  // Region Chips calculation
  const smallerVals = (partitionRegions.smaller || []).map(idx => array[idx]);
  const greaterVals = (partitionRegions.greater || []).map(idx => array[idx]);
  const unprocessedVals = (partitionRegions.unprocessed || []).map(idx => array[idx]);

  const hasActivePartition = low >= 0 && high >= 0 && low < high;

  // Build Partition Region Bar (Section 9 Requirement)
  let partitionBarHtml = "";
  if (hasActivePartition) {
    partitionBarHtml = `
      <div class="partition-summary-container">
        <div class="partition-section-label">
          <span>⚙️ COMPACTOR SECTOR PARTITIONING (Subarray [${low}..${high}])</span>
        </div>
        <div class="partition-bar-grid">
          <div class="region-box region-smaller">
            <div class="region-title">
              <span class="region-dot dot-smaller"></span> Salvage ≤ Directive (${smallerVals.length})
            </div>
            <div class="region-chips">
              ${smallerVals.length > 0
                ? smallerVals.map(v => `<span class="chip chip-smaller">${v}</span>`).join("")
                : '<span class="chip-empty">None yet</span>'
              }
            </div>
            <div class="region-subtext">WALL•E boundary: low(${low}) to i(${i})</div>
          </div>

          <div class="region-box region-greater">
            <div class="region-title">
              <span class="region-dot dot-greater"></span> Salvage > Directive (${greaterVals.length})
            </div>
            <div class="region-chips">
              ${greaterVals.length > 0
                ? greaterVals.map(v => `<span class="chip chip-greater">${v}</span>`).join("")
                : '<span class="chip-empty">None yet</span>'
              }
            </div>
            <div class="region-subtext">Scanned larger debris</div>
          </div>

          <div class="region-box region-unprocessed">
            <div class="region-title">
              <span class="region-dot dot-unprocessed"></span> Unscanned Waste (${unprocessedVals.length})
            </div>
            <div class="region-chips">
              ${unprocessedVals.length > 0
                ? unprocessedVals.map(v => `<span class="chip chip-unprocessed">${v}</span>`).join("")
                : '<span class="chip-empty">All scanned</span>'
              }
            </div>
            <div class="region-subtext">EVE scanner: j(${j}) to high-1</div>
          </div>

          <div class="region-box region-pivot">
            <div class="region-title">
              <span class="region-dot dot-pivot"></span> Target Directive (Pivot)
            </div>
            <div class="region-chips">
              <span class="chip chip-pivot">★ ${pivotValue !== null ? pivotValue : "None"} (idx ${high})</span>
            </div>
            <div class="region-subtext">Lomuto Rule: Last element</div>
          </div>
        </div>
      </div>
    `;
  }

  // Build Array Element Bars — Compacted Scrap Cubes
  const barsHtml = array.map((val, idx) => {
    const isSorted = sortedIndices.includes(idx);
    const isPivot = idx === pivotIndex;
    const isComparing = comparingIndices.includes(idx);
    const isSwapping = swappingIndices.includes(idx);
    const inActiveSubarray = low >= 0 && high >= 0 && idx >= low && idx <= high;

    let stateClass = "state-normal";
    let stateLabel = "";

    if (isSorted) {
      stateClass = "state-sorted";
      stateLabel = "🌱 SORTED";
    } else if (isSwapping) {
      stateClass = "state-swap";
      stateLabel = "COMPACT ⇄";
    } else if (isComparing) {
      stateClass = "state-compare";
      stateLabel = "EVE SCAN";
    } else if (isPivot) {
      stateClass = "state-pivot";
      stateLabel = "★ DIRECTIVE";
    } else if (inActiveSubarray) {
      stateClass = "state-active-subarray";
    }

    // Height calculation (min 45px, max 195px)
    const normalizedHeight = Math.max(42, Math.min(195, Math.round(((val - minVal) / valRange) * 145 + 45)));

    // Pointer badges for this index
    const isPointerI = idx === i;
    const isPointerJ = idx === j;

    let pointerHtml = "";
    if (isPointerI && isPointerJ) {
      pointerHtml = `
        <div class="pointer-wrapper pointer-double-wrapper">
          <div class="character-pair-row">
            <div class="sprite-anchor walle-anchor">${walleSvg}</div>
            <div class="sprite-anchor eve-anchor">${eveSvg}</div>
          </div>
          <div class="pointer-arrow double">▲</div>
          <div class="pointer-badge badge-both">WALL•E & EVE = ${idx}</div>
        </div>
      `;
    } else if (isPointerI) {
      pointerHtml = `
        <div class="pointer-wrapper">
          <div class="sprite-anchor walle-anchor">${walleSvg}</div>
          <div class="pointer-arrow pointer-arrow-i">▲</div>
          <div class="pointer-badge badge-i">i = ${idx} (WALL•E)</div>
        </div>
      `;
    } else if (isPointerJ) {
      pointerHtml = `
        <div class="pointer-wrapper">
          <div class="sprite-anchor eve-anchor">${eveSvg}</div>
          <div class="pointer-arrow pointer-arrow-j">▲</div>
          <div class="pointer-badge badge-j">j = ${idx} (EVE)</div>
        </div>
      `;
    }

    // Boot Plant badge on Pivot or Sorted element
    const showPlantBadge = isPivot || isSorted;

    return `
      <div class="bar-column ${inActiveSubarray ? 'in-subarray' : 'out-subarray'}" data-index="${idx}">
        <div class="bar-card ${stateClass}">
          ${showPlantBadge ? `<div class="cube-plant-overlay">${bootPlantSvg}</div>` : ''}
          ${isComparing ? '<div class="eve-laser-beam"></div>' : ''}
          ${stateLabel ? `<div class="bar-badge">${stateLabel}</div>` : '<div class="bar-badge badge-placeholder"></div>'}
          <div class="bar-visual" style="height: ${normalizedHeight}px;">
            <div class="cube-wire-band band-top"></div>
            <div class="cube-wire-band band-bottom"></div>
            <span class="bar-value">${val}</span>
          </div>
          <div class="bar-index-tag">
            <span class="index-label">i=${idx}</span>
          </div>
        </div>
        <div class="pointer-slot">
          ${pointerHtml}
        </div>
      </div>
    `;
  }).join("");

  // Subarray range bracket
  let rangeBracketHtml = "";
  if (hasActivePartition) {
    rangeBracketHtml = `
      <div class="range-bracket-info">
        <span class="badge-range-tag">Active Scrap Sector: [Index ${low} → Index ${high}]</span>
        <span class="badge-pointer-info">i = ${i} (WALL•E boundary ≤ Directive) | j = ${j} (EVE scanner) | Directive = ${pivotValue}</span>
      </div>
    `;
  }

  // Pointer indicator when i = low - 1 (outside active range to the left)
  let preArrayPointerHtml = "";
  if (low >= 0 && i === low - 1) {
    preArrayPointerHtml = `
      <div class="pre-array-pointer">
        <div class="pointer-wrapper">
          <div class="sprite-anchor walle-anchor">${walleSvg}</div>
          <div class="pointer-arrow pointer-arrow-i">▲</div>
          <div class="pointer-badge badge-i">i = ${i} (low-1)</div>
          <div class="pointer-desc">WALL•E standing by (0 items ≤ Directive)</div>
        </div>
      </div>
    `;
  }

  return `
    <div class="array-visualizer-component">
      ${partitionBarHtml}
      ${rangeBracketHtml}
      <div class="array-stage-container">
        <!-- Hal the Cockroach Easter Egg Mascot -->
        <div class="hal-stage-mascot" title="Hal the Cockroach — WALL•E's best friend!">${halSvg}</div>
        ${preArrayPointerHtml}
        <div class="array-bars-row">
          ${barsHtml}
        </div>
      </div>
    </div>
  `;
}
