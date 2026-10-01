# Shared settings v2 verification — 2026-10-01

Application checkpoints: Olivia local 466aeb6; Mega Man local bbe079f. Later documentation changes do not change runtime source. Both remain release candidates pending physical-device acceptance.

| Check | Result | Evidence |
| --- | --- | --- |
| Automated units/integration | Passed | 143 tests, 13 files. Includes all 240 generator keys, exhaustive quarter-hour start/duration/direction arithmetic, cross-grade search, ten-skill previews, hidden selections, draft retention, no student-state changes, response types, existing game/save/regression tests. |
| Type check and production build | Passed | npm run build; final Olivia asset index-DVjHC2qQ.js. |
| Both actual host applications | Passed | Chromium 153 Linux, actual Olivia production build and actual privately assembled Mega Man v0.6. Ten time skills previewed once each in catalog order; unsaved draft and gate snapshots preserved, keypad checked, save/reopen persistence and adjacent buttons verified. Both use the identical generated shared bundle. |
| Olivia adventure/regression browser checks | Passed | Six tests on 69d4320: complete meadow quest, gate, rescue, bracelet, reload/offline; retry and next-gate settings; 3 viewport sizes; pause/settings/return neutral controls. Only the fraction-preview CSS changed afterward. |
| Final fraction-preview browser check | Passed | Rerun on final 466aeb6; numerator and denominator fit within response preview; prompt and action buttons remain visible at 852×393. |
| Visual inspection | Passed | Phone screenshots of both shared previews; keypad overlap corrected and guarded by bounding-box assertion. Final fraction row corrected and rechecked. |
| Physical iPhone/iPad, full Mega Man campaign, other five Olivia adventures | Not run | Emulated Chromium is not physical iOS or full campaign acceptance. |
| Live hosted v0.7 | Not run at packaging | GitHub Pages workflow and actual served assets must be checked after publication. Mega Man remains private/local, never publicly deployed. |

Final byte identities:
- Olivia JS SHA256 ade684cbe75acef105ab45cf0b0ea36d8d8c7f1b79d21211ded460370448b40a.
- Shared standalone bundle SHA256 ade5306e974fc88eb8f2dac6744b6a2b60a3a3e2d12d1ee7cda538376926c9ad.
- Private Mega Man v0.6 HTML SHA256 d532d9fa6bb09aa62dae95b1bab62b985cb20e2ad7afc4055d48c47e80a61fe7. The assembled file is not committed.

Preserve these artifacts on publication/packaging failure rather than rebuild. Source repositories contain original code only. The legacy Mega Man gate-engine tests also passed (4) but are not evidence for the active integration; the real assembled-browser checks above provide that evidence.

Approved future-game synchronization rule saved to handbook CONDITIONAL-STANDARDS.md S-03-M at commit 4180807c1417baf726844e661c323f4ebefe15f8. Handbook source files actually read: AI-START-HERE 6557a45, UNIVERSAL-RULES 9ec5c8d, CONDITIONAL-STANDARDS dad2d3a, RELEASE-CHECKLIST fbab310.
