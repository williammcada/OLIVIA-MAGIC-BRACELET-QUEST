# Olivia's Magic Bracelet Quest

**v0.6.0-rc.1 — shared K–7 math release candidate.** A WILLIAM MCADA PRODUCT.

Olivia now uses Mega Man Math v0.5's math selection controls, response keypad and progression rules, extended to kindergarten, Grade 1 and Grade 2. All 169 Grade 3–7 reference skills are retained, alongside 38 new K–2 skills and 32 retained Olivia practice skills (239 total). The adventures, rescues, cloud flight, saved bracelets and reward beads remain.

## Choose math

Open **Grown-ups** (or **Settings** during a math gate / from Pause). Password: `admin123` — a family-use deterrent, not secure authentication.

1. Choose **Mixed Review — General**, **Mixed Review — Targeted**, or **Fixed Progression**.
2. Set **Questions per gate** (1–10), **First grade** and **Last grade** (K–7).
3. For Targeted Review, check the skills to practice. The optional 24-hour time checkbox affects General Review and Fixed Progression; Targeted Review selects that skill explicitly.
4. Choose **Save settings**. Changes start at the next gate; an unfinished gate retains its settings even after reload.

The fresh default remains **Grade 2 Targeted Review → S01 two-digit subtraction with one regrouping**, five questions. Existing manual focus is mapped into the new selector. Existing automatic mode maps to Fixed Progression through the prior maximum's grade. Earlier evidence is preserved as an archive, without inventing new mastery.

Progression advances at 80% first-attempt accuracy over ten questions; below 50% reviews a linked prerequisite and returns after mastery. Earlier-grade prerequisites can appear. Wrong answers retry without hints or answer reveals; a correct retry counts toward completing the gate. This replaces Olivia's former scaffolding and mastery logic. Math is text/symbol based without counting beads. Fractions stack vertically; negatives remain outside fractions and powers use superscripts. A response-dependent keypad supports fractions, comparisons, AM/PM time, expressions and inequalities.

## Save and reset

**Export progress** includes game progress, archived evidence, math settings/history and an unfinished gate. **Export CSV** exports recent shared-math events. Import validates before replacing data and keeps a local backup. Skill evidence can be deleted individually; **Clear math practice** clears the new math engine's evidence and pending gate while preserving settings, archived evidence and game rewards. **New Game** restarts the current adventure; **Reset All Data** clears all game/math state and preserves one local recovery backup. The bracelet gallery supports individual deletion. Confirmations explain scope. **Restore local backup** exchanges the current save with the backup.

## Development and verification

```bash
npm ci
npm test
npm run build
npm run dev
```

See the [v0.6 change specification](docs/change-specs/v0.6-SHARED-MATH.md), [release-candidate notes](RELEASE_v0.6.0.md), [verification record](docs/VERIFICATION-v0.6.0.md), and [shared module contract](docs/SHARED-MATH.md). All 138 automated tests, production build and seven Chromium browser tests pass. Physical-device and live deployment checks remain pending. The user explicitly approved publication of the original math code into the public Olivia repository on 2026-10-01. The module is prepared for later migration into other games; those games have not been updated.

## Hosting

Preserve the established hosting route and canonical repository `williammcada/OLIVIA-MAGIC-BRACELET-QUEST`. For the reported Render static site, use `npm ci && npm run build`, publish directory `dist`. A repository push is not proof that the running site updated. Verify its visible version and assets. GitHub Pages configuration and relative asset paths are retained. No hosting configuration was changed. `dist/` is generated, not committed.

Progress remains local to the browser. PWA/offline support is retained but needs fresh end-to-end browser verification for this candidate. The in-game version comes from `src/version.ts` and must match `package.json`.
