# ☸️ SUDARSANA CHAKRA COMMAND CENTER
### PS 26249: Air Power – Predictive Maintenance & Fleet Availability
**"Predict Early. Fly Safely."**

---

## ⚡ Quick Start (< 3 commands)
```bash
# 1. Start the zero-dependency Node server (serves REST API & Web App)
node server.js

# 2. Open in your browser:
# http://localhost:3000
```
*Note: You can also double-click `index.html` to run the frontend client directly without any build step!*

---

## 🧭 Application Route Map
| Route | Screen / Subsystem | Purpose & Key Features |
| :--- | :--- | :--- |
| `/` | **Cinematic Welcome Page** | Unmodified 10s video animation with tricolor ribbon, fighter jet HUD convergence, and Indian flag-themed "Tap to Start" button. |
| `#/role-select` | **Role Selection & RBAC** | Mock login storing active credential (Command/Admin, Maintenance Engineer, Technician, Inventory Officer, Auditor). |
| `#/app/fleet` | **Fleet Command Dashboard** | **Default Landing Page**. 6 KPIs, fleet availability gauge, **Radial Chakra Radar Canvas** (24 aircraft plotted on 3 concentric risk rings with rotating sweep), fleet matrix, and 4-tier alert feed. |
| `#/app/aircraft/:id` | **Aircraft Digital Twin & Health** | Subsystem health matrix, predicted failures, RUL with confidence intervals, squadron baseline wear comparison, and maintenance history. |
| `#/app/component/:id`| **Component Detail & XAI** | Weak-signal telemetry charts (trend & persistence based), degradation velocity (-1.4%/day), multi-horizon failure risk (7/14/30d), and **Explainable AI (XAI)** waterfall attribution. |
| `#/app/fault-graph/:id`| **Fault Dependency Graph** | Interactive causal graph: Symptom &rarr; Possible Cause &rarr; Component &rarr; Failure Mode &rarr; Maintenance &rarr; Spare with path illumination. |
| `#/app/twin/:id` | **Digital Health Twin** | Analytical twin identity, operating stressors (monsoon humidity, high-G cycles), and interactive vector aircraft schematic with component heatmaps. |
| `#/app/simulator` | **What-If Strategy Simulator** | Evaluates 3 courses of action side-by-side: Replace Now vs Replace at Day 5 (Recommended) vs Run to Failure, including counterfactual trade-off analysis. |
| `#/app/planning` | **Multi-Constraint Planning** | Priority engine: `Priority = Risk (40%) × Urgency (35%) × Constraints (25%)`. Depot Bay allocations, Gantt windows, and rationale for Day 5 schedule. |
| `#/app/spares` | **Spares & Inventory Radar** | LRU buffer stocks, HAL/DRDO lead times, and early shortage warnings for `HP-3B-MK2` and `AL31-TB-774`. |
| `#/app/learning` | **Continuous Prediction & Learning**| Closed-loop verification: pre vs post repair recovery %, prediction vs reality scatter, model drift tracking, and live model retraining (`POST /api/learning`). |
| `#/app/assistant` | **Knowledge Assistant Q&A** | Natural language diagnostic chat answering operational questions and citing real record IDs (e.g. `[REC-2026-HYD-041]`, `[P.O. #HAL-2026-992]`). |
| `#/app/audit` | **Audit Trail & Data Quality** | Tamper-proof historical decision logs and telemetry quality audit (completeness, timestamp jitter correction, edge synchronization). |

---

## 🎨 Design System Tokens
Extracted from the cinematic welcome page into functional dark mode tokens:

- **Brand Primary**: Cyan (`#00e5ff`) &bull; *Used strictly for focus points (active navigation, key metrics, primary buttons).*
- **Brand National Accents**: Saffron (`#ff9933`), White (`#ffffff`), Green (`#138808`).
- **Dark Neutral Layers**:
  - Void: `#03070d`
  - Base: `#07101d`
  - Surface: `#0a1526`
  - Card: `#0d1b30`
  - Card Hover: `#12243d`
- **4 Distinct Alert Tiers (Never confused with brand decoration)**:
  - ℹ️ **INFORMATION**: Cool Sky Blue (`#38bdf8`)
  - ⚠️ **WARNING**: Amber (`#f59e0b`)
  - 🚨 **HIGH RISK**: Orange-Red (`#f97316`)
  - 💥 **CRITICAL**: Crimson Red (`#ef4444`, animated subtle pulse)
- **Typography**:
  - Headings & Interface: System Sans (`Segoe UI`, `-apple-system`, `Roboto`, `sans-serif`)
  - Telemetry, IDs & Numbers: Monospace (`Consolas`, `JetBrains Mono`, `Courier New`)

---

## 🌟 Guided Demo Walkthrough (AC-107 Story)
Click **"✨ Guided Demo (AC-107)"** on the top bar to run an interactive 10-step spotlight tour:
1. **Fleet Overview**: Spotlights AC-107 in the middle warning ring on the Radial Chakra View.
2. **Aircraft Dashboard**: Inspects AC-107 subsystem health (Hydraulic pump degraded to 68%).
3. **Component Detail**: Identifies weak-signal 4.2 kHz acoustic ripple with 9.8-day RUL cliff.
4. **Explainable AI**: Plain-English waterfall (+42% pressure ripple, +28% case drain temp).
5. **Fault Graph**: Traces full root cause path to maintenance work order and HAL spare part.
6. **What-If Simulator**: Compares Options; Day 5 recommended to avoid flight cancellations.
7. **Maintenance Planning**: Bay 3 schedule at AFS Thanjavur synchronized with flight sorties.
8. **Spares Warning**: Pre-allocates incoming HAL Nashik batch arriving Day 4.
9. **Mark Maintenance Done**: Calculates post-repair recovery (+34.6% boost to 98.6% health).
10. **Retrain Model**: Updates PINN model weights in closed-loop fashion (Accuracy jumps to 99.1%).

---

## ⚠️ Limitations & Disclaimers
1. **Synthetic Demo Data**: All telemetry, tail numbers, and component wear curves are synthetically simulated for demonstration purposes and do not represent classified operational military data.
2. **Decision Support Only**: Final maintenance decision rests with authorized defence personnel.
