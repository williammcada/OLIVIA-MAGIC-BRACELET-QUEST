# v0.5.0 candidate verification

Date: 20 September 2026. Status: **release candidate; not a verified release**.

## Exact identity

- Canonical baseline: `7b34b5be6e51983dd1e8f2c83bfeab3dcbb42776`.
- GitHub candidate: `02118eda538775dc197859adae02cabf5b002b36`.
- Candidate root tree: `270f72cff28e268b3811e8229481429c7db040c0` — exactly matches the locally tested checkpoint tree.
- Tested local checkpoint: `30a4682e2df29da3619d1988c3d558410b45b252` (local commit identity differs from GitHub-created commit; identical full tree).
- Application source tree: `e5e999a3a70d1de864c44d9683b2dfe5afa5dea0`.
- Tests tree: `a1b1311ddbf5ce8a75dc83c804b56984170b1a3f`.
- Public asset tree: `cc9654c7328d2f6ba8537bfc935b3742811ffe02`, unchanged from preserved v0.4 baseline.
- Later documentation-only commit records this evidence; it does not change tested application bytes.

## Checks actually performed

Environment: Linux, Node v24.19.0, Vitest 3.2.7, happy-dom component simulation. Phaser renderer is mocked for component tests; no claim of real rendered-browser coverage.

| Check | Result | Evidence / limit |
| --- | --- | --- |
| Unit/component suite | Passed | `npm test`: 10 files, 122 tests; rerun on exact local checkpoint |
| Mathematical bank validity | Passed | Exhaustive checks of new bounded banks; 1,500 deterministic generated items/scaffold paths per skill in core tests |
| Regrouping classifications | Passed | Actual propagated trades checked, including zero crossing and corrected S04 example |
| Fraction/comparison keys | Passed | Independent integer cross-product comparisons; no floating-point scoring |
| All 17 expanded skills in UI | Passed | Mock-renderer component test selects each skill, enables counters, completes support path, and checks abstract evidence |
| Stacked fraction markup | Passed | Shared numerator/denominator markup checked in prompts/options, selected fractional response, success screen and parent history; NOT visual screenshot inspection |
| Save migration/export/import | Passed | Existing settings/evidence/progress retained; new skill records added; larger answers and choice metadata roundtrip |
| Fresh defaults | Passed | S01 manual focus; counters false; F01 automatic ceiling |
| Legacy gameplay regression | Passed | Existing level/flight/model/reward tests and simulated practice → gate → rescue → bracelet → parent flow |
| TypeScript and production build | Passed | `npm run build`; PWA precaches 35 entries; version.json 0.5.0 |
| Source preservation | Passed | Local checkpoint before extended testing; GitHub candidate full tree equals tested tree |
| Whitespace check | Passed | `git diff --check` |
| Real-browser end-to-end | Not run (blocked) | `npm run test:e2e` could not start preview: `uv_interface_addresses` system error. Separately, no browser binary installed; Playwright Chromium download timed out and returned 502. No browser tests executed. |
| Physical iPhone/touch/layout | Not run | Must inspect long prompts, four-digit equations and stacked fraction choices on actual intended device |
| All environments to final ending | Not run | Tests cover components and mechanics; no complete real-browser playthrough of every environment |
| Actual hosted site/version/assets | Not run | Host URL/configuration not verified; repository update is not a deployment claim |
| PWA offline/update in browser | Not run | Production generation passes; browser behavior still needs verification |

## Remaining release gate

Run browser E2E; inspect stacked fractions and unclipped controls in phone portrait/landscape; complete the specified gameplay/device checks; verify actual hosting and version. Preserve the exact passing candidate as a verified checkpoint before any verified-release label. If a defect is found, make a new candidate and rerun affected checks.

No tests from a previous version are treated as evidence for this candidate. No new universal handbook rules were written. Packaging or deployment failures must recover this candidate, not rebuild it from chat history.
