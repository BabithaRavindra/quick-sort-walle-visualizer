/**
 * Main React Application Component for Quick Sort Visualizer — WALL•E Edition
 * Built with React 18 component primitives and hooks:
 * - useState
 * - useEffect
 * - useRef
 * Clean unidirectional data flow and modular structure.
 */

(function (global) {
  const { createElement: h, useState, useEffect, useRef } = global.React || {};

  function App() {
    const defaultArray = [38, 12, 27, 43, 9, 31, 18];

    const [initialArray, setInitialArray] = useState(defaultArray);
    const [steps, setSteps] = useState(() => {
      const gen = new global.QuickSortEventGenerator(defaultArray);
      return gen.generate();
    });
    const [currentStepIndex, setCurrentStepIndex] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(900);
    const [inputValue, setInputValue] = useState(defaultArray.join(", "));
    const [errorMessage, setErrorMessage] = useState("");
    const [isLearningModalOpen, setIsLearningModalOpen] = useState(false);

    // Playback loop effect
    useEffect(() => {
      if (!isPlaying) return;

      const timer = setTimeout(() => {
        if (currentStepIndex < steps.length) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, speed);

      return () => clearTimeout(timer);
    }, [isPlaying, currentStepIndex, steps.length, speed]);

    // Keyboard shortcuts effect
    useEffect(() => {
      function handleKeyDown(e) {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

        if (e.key === "ArrowRight" || e.key === "l" || e.key === "L") {
          e.preventDefault();
          setIsPlaying(false);
          setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length));
        } else if (e.key === "ArrowLeft" || e.key === "h" || e.key === "H") {
          e.preventDefault();
          setIsPlaying(false);
          setCurrentStepIndex((prev) => Math.max(prev - 1, 1));
        } else if (e.key === " ") {
          e.preventDefault();
          setIsPlaying((prev) => !prev);
        } else if (e.key === "r" || e.key === "R") {
          e.preventDefault();
          setIsPlaying(false);
          setCurrentStepIndex(1);
        }
      }

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [steps.length]);

    // Action handlers
    function handleGenerateArray(text) {
      setIsPlaying(false);
      const cleaned = (text || "").trim();
      if (!cleaned) {
        setErrorMessage("Please enter comma-separated numbers (e.g. 38, 12, 27, 43, 9, 31, 18).");
        return;
      }

      const parts = cleaned.split(/[\s,]+/).filter(Boolean);
      const parsed = [];
      for (const p of parts) {
        const num = Number(p);
        if (isNaN(num) || !Number.isInteger(num)) {
          setErrorMessage(`Invalid scrap item "${p}". Please enter valid integers.`);
          return;
        }
        parsed.push(num);
      }

      if (parsed.length > 15) {
        setErrorMessage(`Too many elements (${parsed.length}). Maximum limit is 15 elements for clear visualization.`);
        return;
      }

      setErrorMessage("");
      setInitialArray(parsed);
      setInputValue(parsed.join(", "));
      const gen = new global.QuickSortEventGenerator(parsed);
      const newSteps = gen.generate();
      setSteps(newSteps);
      setCurrentStepIndex(1);
    }

    function handleLoadPreset(presetId) {
      setIsPlaying(false);
      const example = (global.EXAMPLES || []).find((e) => e.id === presetId);
      if (example) {
        setErrorMessage("");
        setInitialArray([...example.array]);
        setInputValue(example.array.join(", "));
        const gen = new global.QuickSortEventGenerator(example.array);
        setSteps(gen.generate());
        setCurrentStepIndex(1);
      }
    }

    function handleRandomArray() {
      setIsPlaying(false);
      const count = Math.floor(Math.random() * 4) + 6; // 6 to 9
      const arr = [];
      for (let k = 0; k < count; k++) {
        arr.push(Math.floor(Math.random() * 95) + 5);
      }
      setErrorMessage("");
      setInitialArray(arr);
      setInputValue(arr.join(", "));
      const gen = new global.QuickSortEventGenerator(arr);
      setSteps(gen.generate());
      setCurrentStepIndex(1);
    }

    const currentStep = steps[currentStepIndex - 1] || steps[0];
    const isComplete = currentStep && currentStep.type === "SORT_COMPLETE" && currentStepIndex === steps.length;

    return h(
      "div",
      { className: "app-container" },

      // 1. Header Component (WALL-E Themed)
      h(Header, { onOpenLearning: () => setIsLearningModalOpen(true) }),

      // 2. Controls Component
      h(Controls, {
        currentStepIndex,
        totalSteps: steps.length,
        isPlaying,
        speed,
        comparisons: currentStep ? currentStep.comparisons : 0,
        swaps: currentStep ? currentStep.swaps : 0,
        pivotsSelected: currentStep ? currentStep.pivotsSelected : 0,
        inputValue,
        errorMessage,
        onInputChange: (val) => setInputValue(val),
        onGenerate: () => handleGenerateArray(inputValue),
        onRandom: handleRandomArray,
        onLoadPreset: handleLoadPreset,
        onPlayPause: () => setIsPlaying((p) => !p),
        onNext: () => {
          setIsPlaying(false);
          setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length));
        },
        onPrev: () => {
          setIsPlaying(false);
          setCurrentStepIndex((prev) => Math.max(prev - 1, 1));
        },
        onStart: () => {
          setIsPlaying(false);
          setCurrentStepIndex(1);
        },
        onReset: () => {
          setIsPlaying(false);
          setCurrentStepIndex(1);
        },
        onSpeedChange: (newSpeed) => setSpeed(newSpeed),
        onScrub: (newIdx) => {
          setIsPlaying(false);
          setCurrentStepIndex(newIdx);
        },
      }),

      // 3. Completion Banner (Section 14 — Directive Accomplished 🌱)
      isComplete ? h(CompletionBanner, { step: currentStep, totalSteps: steps.length }) : null,

      // 4. Array Visualizer Card (Sections 5, 6, 9, 10 — Compactor Bay)
      h(
        "div",
        { className: "array-visualizer-card" },
        h(ArrayVisualizer, { step: currentStep, initialArray })
      ),

      // 5. Explanation Panel (Section 8 — Diagnostic Telemetry)
      h(ExplanationPanel, { step: currentStep }),

      // 6. Two-Column Grid: Recursive Tree & Pseudocode (Sections 11, 12, 16)
      h(
        "div",
        { className: "two-col-grid" },
        h(RecursiveTree, { step: currentStep, allSteps: steps, currentStepIndex }),
        h(AlgorithmPanel, { activeLine: currentStep ? currentStep.codeLine : 1 })
      ),

      // 7. Complexity Analysis (Section 15 — Axiom Diagnostics)
      h(ComplexityPanel),

      // 8. Viva Preparation Questions (Section 24 — Axiom Central Archives)
      h(VivaSection),

      // 9. Learning Mode Modal (Section 17 — 4-Stage Directive Protocol)
      isLearningModalOpen ? h(LearningModal, { onClose: () => setIsLearningModalOpen(false) }) : null
    );
  }

  // --- Subcomponents ---

  function Header({ onOpenLearning }) {
    return h(
      "header",
      { className: "app-header" },
      h(
        "div",
        { className: "header-top-row" },
        h(
          "div",
          null,
          h(
            "h1",
            { className: "header-main-title" },
            h("span", { className: "walle-eyes-badge" }, "👁️👁️ WALL•E"),
            "QUICK SORT VISUALIZER",
            h("span", { className: "bnl-corp-badge" }, "BnL"),
            h("span", { className: "header-badge-daa" }, "DAA CIA 3(B)")
          ),
          h(
            "h2",
            { className: "header-subtitle" },
            "Waste Allocation Load Lifter • Earth-Class — Interactive Lomuto Partition Simulator"
          ),
          h(
            "p",
            { className: "header-desc" },
            "Explore how Quick Sort partitions scrap elements around a pivot directive, comparing with EVE's optical scanner, and compacting into clean sorted cubes via recursive divide-and-conquer."
          )
        ),
        h(
          "div",
          { className: "header-actions" },
          h(
            "button",
            {
              className: "btn-header-action",
              onClick: onOpenLearning,
            },
            h("span", null, "🌱"),
            " Directive: Plant (How It Works)"
          ),
          h(
            "a",
            {
              href: "#vivaSection",
              className: "btn-header-action",
              style: { textDecoration: "none" },
            },
            h("span", null, "📜"),
            " Axiom Archives (Viva)"
          )
        )
      )
    );
  }

  function Controls(props) {
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
      onInputChange,
      onGenerate,
      onRandom,
      onLoadPreset,
      onPlayPause,
      onNext,
      onPrev,
      onStart,
      onReset,
      onSpeedChange,
      onScrub,
    } = props;

    return h(
      "div",
      { className: "controls-component" },

      // Scrap Pile Configuration
      h(
        "div",
        { className: "input-panel-card" },
        h(
          "div",
          { className: "input-panel-header" },
          h(
            "div",
            { className: "input-title" },
            h("span", { className: "input-icon" }, "📦"),
            h("strong", null, "Scrap Pile Configuration"),
            h("span", { className: "input-limit-hint" }, "(3 to 15 scrap values, comma-separated)")
          ),
          h(
            "div",
            { className: "input-presets-group" },
            h("span", { className: "preset-label" }, "Presets:"),
            h(
              "button",
              { className: "btn-preset", onClick: () => onLoadPreset("standard") },
              "Standard Pile (CIA)"
            ),
            h(
              "button",
              { className: "btn-preset", onClick: () => onLoadPreset("reverse") },
              "Reverse Debris"
            ),
            h(
              "button",
              { className: "btn-preset", onClick: () => onLoadPreset("sorted") },
              "Sorted Tower"
            ),
            h(
              "button",
              { className: "btn-preset", onClick: () => onLoadPreset("duplicates") },
              "Duplicate Scrap"
            ),
            h(
              "button",
              { className: "btn-preset", onClick: () => onLoadPreset("single") },
              "Single Plant (42)"
            )
          )
        ),
        h(
          "div",
          { className: "input-row" },
          h(
            "div",
            { className: "input-field-wrapper" },
            h("input", {
              type: "text",
              className: `text-input ${errorMessage ? "has-error" : ""}`,
              placeholder: "e.g. 38, 12, 27, 43, 9, 31, 18",
              value: inputValue,
              onInput: (e) => onInputChange(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") onGenerate();
              },
            }),
            errorMessage ? h("div", { className: "input-error-msg" }, `⚠️ ${errorMessage}`) : null
          ),
          h(
            "button",
            { className: "btn btn-primary", onClick: onGenerate },
            h("span", null, "⚡"),
            " Compact Scrap (Generate)"
          ),
          h(
            "button",
            { className: "btn btn-secondary", onClick: onRandom },
            h("span", null, "🎲"),
            " Random Debris"
          ),
          h(
            "button",
            { className: "btn btn-outline", onClick: () => onLoadPreset("standard") },
            h("span", null, "📖"),
            " Load CIA Example"
          )
        )
      ),

      // Playback Panel & Solar Battery Scrubber
      h(
        "div",
        { className: "playback-panel-card" },
        h(
          "div",
          { className: "playback-top-row" },
          h(
            "div",
            { className: "playback-buttons-group" },
            h(
              "button",
              { className: "btn-ctrl btn-ctrl-start", onClick: onStart, title: "Go to beginning" },
              h("span", { className: "ctrl-icon" }, "⏮"),
              " Start"
            ),
            h(
              "button",
              {
                className: "btn-ctrl",
                onClick: onPrev,
                disabled: currentStepIndex <= 1,
                title: "Previous algorithm step",
              },
              h("span", { className: "ctrl-icon" }, "◀"),
              " Prev Step"
            ),
            h(
              "button",
              {
                className: `btn-ctrl ${isPlaying ? "btn-ctrl-pause" : "btn-ctrl-play"}`,
                onClick: onPlayPause,
              },
              h("span", { className: "ctrl-icon" }, isPlaying ? "⏸" : "▶"),
              h("span", { className: "ctrl-text" }, isPlaying ? "Pause" : "Play")
            ),
            h(
              "button",
              {
                className: "btn-ctrl btn-ctrl-primary",
                onClick: onNext,
                disabled: currentStepIndex >= totalSteps,
                title: "Execute next algorithm step",
              },
              h("span", { className: "ctrl-text" }, "Next Step"),
              " ",
              h("span", { className: "ctrl-icon" }, "▶")
            ),
            h(
              "button",
              {
                className: "btn-ctrl btn-ctrl-reset",
                onClick: onReset,
                title: "Reset to initial scrap pile",
              },
              h("span", { className: "ctrl-icon" }, "↺"),
              " Reset"
            )
          ),
          h(
            "div",
            { className: "speed-control-group" },
            h("span", { className: "speed-label" }, "Compactor Speed:"),
            h(
              "div",
              { className: "speed-buttons" },
              h(
                "button",
                {
                  className: `btn-speed ${speed === 1600 ? "active" : ""}`,
                  onClick: () => onSpeedChange(1600),
                },
                "Slow (1.6s)"
              ),
              h(
                "button",
                {
                  className: `btn-speed ${speed === 900 ? "active" : ""}`,
                  onClick: () => onSpeedChange(900),
                },
                "Normal (0.9s)"
              ),
              h(
                "button",
                {
                  className: `btn-speed ${speed === 350 ? "active" : ""}`,
                  onClick: () => onSpeedChange(350),
                },
                "Fast (0.35s)"
              )
            )
          )
        ),
        h(
          "div",
          { className: "playback-scrubber-row" },
          h(
            "div",
            { className: "step-counter-badge" },
            h("span", { className: "solar-icon" }, "☀️"),
            " Solar Step: ",
            h("strong", null, currentStepIndex),
            " / ",
            h("strong", null, totalSteps)
          ),
          h(
            "div",
            { className: "slider-wrapper" },
            h("input", {
              type: "range",
              className: "step-slider",
              min: 1,
              max: Math.max(totalSteps, 1),
              value: currentStepIndex,
              onInput: (e) => onScrub(Number(e.target.value)),
            })
          ),
          h(
            "div",
            { className: "metrics-tags-row" },
            h(
              "div",
              { className: "metric-tag", title: "Total element comparisons with pivot" },
              h("span", { className: "metric-label" }, "EVE Scans:"),
              h("span", { className: "metric-num" }, comparisons)
            ),
            h(
              "div",
              { className: "metric-tag", title: "Total element swaps performed" },
              h("span", { className: "metric-label" }, "Swaps:"),
              h("span", { className: "metric-num" }, swaps)
            ),
            h(
              "div",
              { className: "metric-tag", title: "Total pivots chosen" },
              h("span", { className: "metric-label" }, "Directives (Pivots):"),
              h("span", { className: "metric-num" }, pivotsSelected)
            )
          )
        )
      )
    );
  }

  function CompletionBanner({ step, totalSteps }) {
    if (!step) return null;
    return h(
      "div",
      { className: "completion-banner" },
      h("div", { className: "completion-icon" }, "🌱"),
      h("h2", { className: "completion-title" }, "DIRECTIVE ACCOMPLISHED! ALL CUBES SORTED!"),
      h(
        "div",
        { className: "completion-array-display" },
        step.array.map((v, i) => h("div", { key: i, className: "completion-box" }, `🌱 ${v}`))
      ),
      h(
        "div",
        { className: "completion-stats" },
        h(
          "span",
          { className: "comp-stat-badge" },
          "Total EVE Scans (Comparisons): ",
          h("strong", null, step.comparisons)
        ),
        h(
          "span",
          { className: "comp-stat-badge" },
          "Total Compactor Swaps: ",
          h("strong", null, step.swaps)
        ),
        h(
          "span",
          { className: "comp-stat-badge" },
          "Total Directive Pivots: ",
          h("strong", null, step.pivotsSelected)
        ),
        h(
          "span",
          { className: "comp-stat-badge" },
          "Total Algorithm Steps: ",
          h("strong", null, totalSteps)
        )
      ),
      h(
        "p",
        { className: "completion-text" },
        "WALL•E has completed the Lomuto Quick Sort sequence! Every pivot directive has reached its exact sorted position, and all recursive sectors have been cleanly compacted."
      )
    );
  }

  function ArrayVisualizer({ step, initialArray }) {
    if (!step) return h("div", { className: "empty-state" }, "No scrap pile loaded.");

    const rawHtml = global.renderArrayVisualizer
      ? global.renderArrayVisualizer(step, initialArray)
      : "";

    return h("div", {
      dangerouslySetInnerHTML: { __html: rawHtml },
    });
  }

  function ExplanationPanel({ step }) {
    const rawHtml = global.renderExplanationPanel
      ? global.renderExplanationPanel(step)
      : "";

    return h("div", {
      dangerouslySetInnerHTML: { __html: rawHtml },
    });
  }

  function RecursiveTree({ step, allSteps, currentStepIndex }) {
    const rawHtml = global.renderRecursiveTree
      ? global.renderRecursiveTree(step, allSteps, currentStepIndex)
      : "";

    return h("div", {
      dangerouslySetInnerHTML: { __html: rawHtml },
    });
  }

  function AlgorithmPanel({ activeLine }) {
    const rawHtml = global.renderAlgorithmPanel
      ? global.renderAlgorithmPanel(activeLine)
      : "";

    return h("div", {
      dangerouslySetInnerHTML: { __html: rawHtml },
    });
  }

  function ComplexityPanel() {
    const rawHtml = global.renderComplexityPanel
      ? global.renderComplexityPanel()
      : "";

    return h("div", {
      dangerouslySetInnerHTML: { __html: rawHtml },
    });
  }

  function VivaSection() {
    const rawHtml = global.renderVivaSection
      ? global.renderVivaSection()
      : "";

    return h("div", {
      id: "vivaSection",
      dangerouslySetInnerHTML: { __html: rawHtml },
    });
  }

  function LearningModal({ onClose }) {
    return h(
      "div",
      { className: "modal-overlay" },
      h(
        "div",
        { className: "modal-dialog" },
        h(
          "div",
          { className: "modal-header" },
          h(
            "div",
            { className: "modal-title-row" },
            h("span", { className: "modal-icon" }, "🌱"),
            h("h3", null, "WALL•E 4-Stage Operational Sorting Directive")
          ),
          h("button", { className: "btn-close-modal", onClick: onClose }, "✕")
        ),
        h(
          "div",
          { className: "modal-body" },
          h(
            "div",
            { className: "stages-flow-grid" },
            h(
              "div",
              { className: "stage-card" },
              h("div", { className: "stage-num-badge" }, "01"),
              h("h4", null, "Choose Pivot Directive"),
              h(
                "div",
                { className: "stage-visual" },
                h("span", { className: "vis-box" }, "38"),
                h("span", { className: "vis-box" }, "12"),
                h("span", { className: "vis-box" }, "27"),
                h("span", { className: "vis-box vis-pivot-highlight" }, "18 ★")
              ),
              h(
                "p",
                null,
                "Under the Lomuto partitioning scheme, select the ",
                h("strong", null, "last element"),
                " of the current scrap subarray as the primary pivot directive."
              )
            ),
            h(
              "div",
              { className: "stage-card" },
              h("div", { className: "stage-num-badge" }, "02"),
              h("h4", null, "Partition & Scan"),
              h(
                "div",
                { className: "stage-visual" },
                h("span", { className: "vis-box vis-smaller" }, "12"),
                h("span", { className: "vis-box vis-smaller" }, "9"),
                h("span", { className: "vis-sep" }, "|"),
                h("span", { className: "vis-box vis-greater" }, "38"),
                h("span", { className: "vis-box vis-greater" }, "43")
              ),
              h(
                "p",
                null,
                "EVE's optical scanner pointer ",
                h("code", null, "j"),
                " scans each scrap block. If ",
                h("code", null, "arr[j] <= pivot"),
                ", WALL•E advances compactor pointer ",
                h("code", null, "i"),
                " and swaps ",
                h("code", null, "arr[i]"),
                " with ",
                h("code", null, "arr[j]"),
                "."
              )
            ),
            h(
              "div",
              { className: "stage-card" },
              h("div", { className: "stage-num-badge" }, "03"),
              h("h4", null, "Fix Directive Position"),
              h(
                "div",
                { className: "stage-visual" },
                h("span", { className: "vis-box vis-smaller" }, "≤ Directive"),
                h("span", { className: "vis-box vis-placed" }, "18 🌱"),
                h("span", { className: "vis-box vis-greater" }, "> Directive")
              ),
              h(
                "p",
                null,
                "Swap ",
                h("code", null, "arr[i + 1]"),
                " with ",
                h("code", null, "arr[high]"),
                ". The pivot directive is now ",
                h("strong", null, "permanently placed in its final sorted position"),
                "."
              )
            ),
            h(
              "div",
              { className: "stage-card" },
              h("div", { className: "stage-num-badge" }, "04"),
              h("h4", null, "Recursive Compaction"),
              h(
                "div",
                { className: "stage-visual" },
                h("span", { className: "vis-box vis-recurse" }, "Left Sector"),
                h("span", { className: "vis-arrow" }, "↶ ↷"),
                h("span", { className: "vis-box vis-recurse" }, "Right Sector")
              ),
              h(
                "p",
                null,
                "Recursively repeat the sorting protocol on left and right scrap sectors until all base cases are sorted."
              )
            )
          )
        ),
        h(
          "div",
          { className: "modal-footer" },
          h("button", { className: "btn btn-primary", onClick: onClose }, "Directive Understood, Let's Sort!")
        )
      )
    );
  }

  global.App = App;

  // Mount React Root on page load
  document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.getElementById("root");
    if (rootElement && global.ReactDOM) {
      const root = global.ReactDOM.createRoot(rootElement);
      root.render(h(App));
    }
  });

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { App };
  }
})(typeof window !== "undefined" ? window : globalThis);
