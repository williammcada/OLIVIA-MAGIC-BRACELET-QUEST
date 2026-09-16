# Olivia's Magic Bracelet Quest

Version 0.4.0 — a touch-first, single-player addition and subtraction adventure for Olivia.

## Publish with GitHub Pages

1. Create a new GitHub repository named `olivias-magic-bracelet-quest`.
2. Upload the contents of this folder to the repository root (not the folder itself).
3. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Push to `main`. The included workflow verifies the project, builds it, and deploys it.
5. After the Actions run succeeds, GitHub displays the live URL under **Settings → Pages**. It will normally be:
   `https://YOUR-GITHUB-USERNAME.github.io/olivias-magic-bracelet-quest/`

Future updates are simple: replace or edit the source, commit, and push to `main`.

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
