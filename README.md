# Olivia's Magic Bracelet Quest

Version 0.5.0 release candidate — a touch-first, single-player primary-math adventure for Olivia.

A WILLIAM MCADA PRODUCT

## Math expansion

17 text-first skills add regrouping through four digits, place value, comparison, missing numbers, word problems, multiplication/division, and simple fractions. Fractions are vertically stacked throughout the interface. New games start at S01 (two-digit subtraction with one regrouping), with manual focus and counting beads off. Existing saved settings remain unchanged; all expanded skills suppress counters regardless of that setting. Collected bracelet beads remain part of the game.

For an existing save: open **Grown-ups**, switch off **Automatic progression**, choose **S01 · Two-digit subtraction with one regrouping** in **Manual / diagnostic skill**, and uncheck **Show bead counters**. Do not reset the game to change these settings.

See [change spec](docs/change-specs/v0.5-MATH-EXPANSION.md), [release-candidate notes](RELEASE_v0.5.0.md), and [verification](docs/VERIFICATION-v0.5.0.md). This is not yet a fully verified device/deployment release.

## Publish with GitHub Pages

Use the existing canonical repository `williammcada/OLIVIA-MAGIC-BRACELET-QUEST`; do not create a duplicate repository. Preserve the configured hosting method. For a Render static site, the build command is `npm ci && npm run build` and the publish directory is `dist`. Confirm the connected branch and auto-deploy setting in Render before assuming a push is live.

For Pages, retain the established deployment route; do not assume a workflow exists solely from older packaging notes. The build uses relative asset paths. Verify the actual hosted version, assets, gameplay, and saved progress after deployment. This update does not change hosting configuration.

## Local development

```bash
npm ci
npm run test
npm run dev
```

Create a production build with `npm run build`. The `dist/` folder is generated; do not commit it.

## Notes

- Game progress stays in the player's browser using local storage; no names or student data are uploaded.
- The game is configured as a PWA. After the first successful load, Safari can add it to the Home Screen.
- The version shown in-game is controlled by `src/version.ts` and must match `package.json`.
