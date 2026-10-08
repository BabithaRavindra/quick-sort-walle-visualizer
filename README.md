# DAA CIA 3(B) — Quick Sort Visualizer (WALL•E Edition)
### Topic: Quick Sort using Pivot Selection and Partitioning (Lomuto Partition Scheme)

---

## 🤖 WALL•E Thematic Overview

This project is an **interactive educational web simulator** developed for the **Design and Analysis of Algorithms (DAA) CIA 3(B)** assignment, themed around the beloved Pixar movie **WALL•E** and **EVE**.

The algorithm metaphors bring the Lomuto partitioning scheme to life:
* 📦 **Scrap Elements:** The array elements are compacted waste blocks collected by WALL•E.
* ★ **Primary Directive (Pivot):** The pivot element (`arr[high]`) acts as the target directive beacon.
* 🤖 **WALL•E Compactor Arm (Pointer `i`):** Marks the boundary of scrap blocks that are $\le \text{Directive}$ (starts at $low - 1$).
* 👁️ **EVE Optical Sensor (Pointer `j`):** Scans the scrap pile looking for elements matching the directive.
* ⚙️ **Compactor Shift (Swap):** When $arr[j] \le \text{Directive}$, WALL•E shifts $arr[i]$ and $arr[j]$ to group smaller scrap to the left.
* 🌱 **Directive Accomplished (Sorted Pivot):** The pivot is permanently placed into its sorted position, crowned with the iconic seedling boot plant 🌱!
* ☀️ **Solar Battery Gauge:** The step scrubber functions like WALL•E's chest solar charging meter, tracking step progress.

---

## 🎨 Visual Design & Color Palette

* **`#F59E0B` / `#FBBF24` (Solar Ochre / Chassis Yellow):** Primary WALL•E chassis color, active directives, and boundary pointers.
* **`#00E5FF` (EVE Plasma Cyan):** EVE's optical scanning beam indicator and comparison highlights.
* **`#22C55E` / `#4ADE80` (The Boot Plant Green 🌱):** Placed and sorted elements signaling "Directive Accomplished".
* **`#14110E` / `#221C16` (Compactor Weathered Steel):** High-contrast industrial chassis dark background.
* **`#EF4444` (Hydraulic Alert Red):** Active compactor swapping indicator.

---

## 🌐 Deploy to Vercel

The project is pre-configured with `vercel.json` and `package.json` for **zero-configuration instant deployment to Vercel**.

### Method 1: Deploy via GitHub (Recommended)
1. Create a new repository on your GitHub account (e.g., `quick-sort-simulator-walle`).
2. Push this local repository to GitHub:
   ```bash
   cd "C:\Users\Babitha Ravindra\.gemini\antigravity\scratch\quick-sort-simulator"
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/quick-sort-simulator-walle.git
   git branch -M main
   git push -u origin main
   ```
3. Visit [vercel.com](https://vercel.com) and log in.
4. Click **"Add New..."** $\to$ **"Project"**.
5. Select `quick-sort-simulator-walle` and click **"Deploy"**.
6. Within 10 seconds, Vercel gives you a live global HTTPS URL (e.g. `https://quick-sort-simulator-walle.vercel.app`)!

### Method 2: Deploy via Vercel CLI
If you have Node.js / npm installed:
```bash
cd "C:\Users\Babitha Ravindra\.gemini\antigravity\scratch\quick-sort-simulator"
npx vercel
```
Follow the interactive prompts:
* Set up and deploy? **Yes**
* Scope? *(select your Vercel account)*
* Link to existing project? **No**
* Project name: `quick-sort-simulator-walle`
* Directory: `./`
* Modify settings? **No**

To deploy directly to production:
```bash
npx vercel --prod
```

---

## 💻 Local Execution Modes

### Mode 1: Standalone Web Server Mode (Recommended)
```bash
cd "C:\Users\Babitha Ravindra\.gemini\antigravity\scratch\quick-sort-simulator"
python app.py
```
*Starts Python's built-in HTTP server and automatically opens `http://localhost:8000/index.html`.*

### Mode 2: Streamlit Mode (Zero Streamlit Chrome)
```bash
streamlit run app.py
```
*Launches Streamlit, rendering the full-viewport borderless React UI.*

### Mode 3: Direct Offline Double-Click
Directly open `index.html` in Chrome, Edge, or Firefox—no terminal or server required!

---

## 🧪 Verification & Test Cases

Run the automated test suite anytime:
```bash
python tests/test_quick_sort.py
```

All 5 required test cases pass with 100% accuracy:
1. `[38, 12, 27, 43, 9, 31, 18]` (Standard Scrap Pile)
2. `[5, 4, 3, 2, 1]` (Reverse Debris — Worst Case)
3. `[1, 2, 3, 4, 5]` (Sorted Tower — Worst Case)
4. `[5, 5, 3, 8, 5, 2]` (Duplicate Scrap)
5. `[42]` (Single Element Base Case)

---

## 📁 Repository Structure

```text
quick-sort-simulator/
├── vercel.json                # Vercel deployment configuration
├── package.json               # Project metadata & Vercel project configuration
├── index.html                 # Standalone React single-page application
├── app.py                     # Dual-mode server runner (Local & Streamlit)
├── requirements.txt           # Python dependencies
├── Dockerfile                 # Container specification
├── cloudbuild.yaml            # Cloud Build configuration
├── README.md                  # Documentation & Vercel deployment guide
├── tests/
│   └── test_quick_sort.py     # Automated test suite
└── src/
    ├── App.css                # WALL•E & EVE themed styling
    ├── App.js                 # React 18 component hierarchy
    ├── App.py                 # Streamlit UI & asset bundler
    ├── react/
    │   └── react.js           # Micro React 18 engine (100% offline)
    ├── algorithms/
    │   ├── quickSort.js       # Lomuto partition event generator (JS)
    │   └── quick_sort.py      # Lomuto partition event generator (Python)
    ├── data/
    │   └── examples.js        # Scrap pile presets
    └── components/
        ├── ArrayVisualizer/   # Scrap cubes, pointers i & j, compactor sectors
        ├── Controls/          # Inputs, playback, solar charging scrubber
        ├── ExplanationPanel/  # WALL•E operational telemetry
        ├── RecursiveTree/     # Axiom call stack & divide-and-conquer sectors
        ├── AlgorithmPanel/    # Pseudocode with synchronized line highlighting
        ├── ComplexityPanel/   # Axiom time & auxiliary space diagnostics
        └── ConceptsPanel/     # 4-stage directive guide & 8 viva Q&A items
```
