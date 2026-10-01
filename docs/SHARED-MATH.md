# Shared math module v1 — first host: Olivia

The shared behavior reference is Mega Man Math v0.5 (169 Grade 3–7 skills). Olivia is the first K–7 host. This repository is the canonical implementation of this first extraction until a separately approved shared repository is established. Other games are unchanged; do not claim synchronized updates or a shared cloud service.

- `src/shared-math/mega-content.js`: original reference generators and response validation, copied exactly except for an ES-module export. The adjacent declaration gives the host typed contracts. No ROM, emulator or Mega Man assets are included.
- `catalog.ts`: K–2 extensions and adapters for retained Olivia outcomes, grades, keypad and catalog. Grade 0 displays as K. Retained visual/choice prompts are adapted to text/constructed responses.
- `engine.ts`: versioned state, validation, eligible pool, shuffle bag, gate snapshot, first attempts, prerequisite return stack, event history, settings and deletion.
- `settings.ts`: shared math setting labels, ordering, grade controls, checkboxes, 24-hour time, help, validation and reports. Host appearance is Olivia's existing theme; math controls and behavior match the reference.
- `main.ts`: host adapter for adult access, settings availability, math encounters and game rewards.
- `math-format.ts`: escaped math text with accessible stacked fractions and superscripts, shared by prompt, preview and history.

## Host contract

Persist `MathState` inside the host's backup. Construct `Practice(state, persistCallback)` whenever the save object changes (including import/reset). `open(context, runId)` resumes the same saved gate or starts a new one with a settings snapshot. Submit only nonempty input. `submit` reports correct/complete; only the host awards energy, resumes play or changes story state. No gameplay penalty is added for a wrong answer. `saveConfig` must never mutate an unfinished gate. `override` closes a gate and logs the adult action; the host handles its corresponding transition.

The host defines trigger locations. Olivia uses launch practice, rainbow/sky doors and refill encounters, with the configured question count for each. This extraction does not add Mega Man stage/death/ROM events to Olivia. Display fitting, damage, drops and other game controls remain host-specific. Olivia retains its own fresh starting skill, as requested; this is an explicit default exception to Mega Man's Grade 3 General Review default.

## Migration

Legacy Olivia settings/evidence remain in the save for recovery. Manual focus maps to a retained skill. Automatic settings map to a K-through-maximum-grade progression pool. New mastery starts empty; old proficiency labels are not equivalent to Mega Man's latest-ten first-attempt rule. A visible note explains the transition. New shared gates persist their exact item, settings, attempts, count and shuffle bag. Old pre-v0.6 unfinished math starts a new gate.

Use stable skill IDs across future hosts. Do not rename imported IDs or infer complete CCSS coverage from textual practice labels. K–2 standards labels intentionally describe text practice, not externally verified standards alignment. Reconcile future upstream Mega Man changes by comparing the original-content hash and actual generators, not by copying its ROM-containing HTML.
