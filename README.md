# Wife Favors — Simple GitHub Pages app

This is a tiny HTML/CSS/JS app that lists small favors (cards) you can do for your partner. It stores items in localStorage and is ready to be hosted on GitHub Pages.

Files added:

- `index.html` — main page
- `styles.css` — simple responsive styles
- `script.js` — vanilla JS app logic (render, add, toggle, delete, random pick)

How to test locally (PowerShell):

```powershell
# from repository root
# Start a basic static server (Python must be installed)
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

How to host on GitHub Pages (manual):

1. Commit and push these files to your repo (usually the `main` branch).
2. On GitHub, open your repository → Settings → Pages.
3. Under "Build and deployment" choose "Deploy from a branch" and select Branch: `main`, Folder: `/ (root)` (or use a `gh-pages` branch if you prefer).
4. Save — GitHub will give you a URL where the site is published (it may take a minute to appear).

Automatic deploy with GitHub Actions (added):

This repository includes a workflow that automatically deploys the site to GitHub Pages whenever you push to `main`.

- Workflow: `.github/workflows/deploy.yml` — uploads the repository root as the Pages artifact and triggers a Pages deployment via the official GitHub Actions `deploy-pages` action.
- Permissions: the workflow uses the built-in `GITHUB_TOKEN`, so no extra secrets are required.

Notes and troubleshooting:

- First push: after the first successful workflow run you can view the site at the Pages URL shown in your repository Settings → Pages (or in the Actions run summary).
- If the Pages URL is not visible, ensure Pages is enabled in Settings and that the workflow run completed successfully (check Actions tab).
- To preview locally, from the repository root you can run a quick static server (PowerShell):

```powershell
# from repository root
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

If you want me to also add a small CI status badge to the README or customize the workflow (e.g., deploy only from a `release/*` tag), tell me how you'd like it to behave.

Notes / next steps:

- You can easily add more metadata (images, categories) to each card.
- Want a prettier UI? Consider adding an icon set or tiny animations.
