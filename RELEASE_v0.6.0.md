# v0.6.0-rc.1 — shared K–7 math candidate

Olivia's math controls and progression now follow the latest recovered Mega Man Math v0.5, extending the catalog to K–7. The GitHub Mega Man main source was stale; this build uses the actual v0.5 file, not its old 28-skill bank.

- Retains all 169 Grade 3–7 reference skills, adds 38 K–2 skills, and retains 32 Olivia practice outcomes: 239 selectable skills.
- Same three modes, grade range, targeted checkboxes, 1–10 questions, optional 24-hour time, next-gate save semantics and progression/step-back behavior.
- Dynamic keypad and physical keyboard accept all supported response types, including stacked fraction preview, time, expressions and inequalities.
- No counting beads, hints or worked-example reveals in the shared math path. Reward beads and bracelets remain. Prior scaffold UI and mastery rules are deliberately superseded by the requested reference logic.
- Fresh default stays S01, Grade 2 Targeted Review, five questions. Legacy rewards, focus and archived evidence are retained; new mastery starts from new first attempts.
- Settings are reachable during play and math. Pending gates survive settings, home and reload without silently changing configuration.
- Progress backup/import/reset, math CSV, math evidence deletion and individual bracelet deletion are available. Touch contacts are tracked separately and interrupted input is cleared; physical-device verification is pending.

Implementation and test evidence are in `docs/VERIFICATION-v0.6.0.md`. This is a release candidate, not a verified release or verified live deployment. An alternative Chromium package enabled real browser checks: all seven pass, including landscape fractions, phone/tablet layout, settings/reload, the meadow adventure and offline reload. Physical iPhone/iPad, the remaining adventures and live-host acceptance remain outstanding. The user explicitly approved publication to the public repository on 2026-10-01. No other game was changed.
