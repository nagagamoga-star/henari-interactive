# Henari Interactive pages

This folder is the complete contents of the public GitHub Pages repository. It holds the deployment workflow and the scripts that assemble the site. It does not hold application source, tests, or personal support profiles.

GitHub Actions checks out the two private source repositories with read-only deploy keys, runs their unit tests, builds them, and publishes only the `site/` artifact. The live site is not updated until that artifact passes `verify-site.mjs` and the deploy job runs.

Copy these files to the root of a new public repository named `henari-interactive`. Setup, secrets, and the Squarespace snippets are documented in the private wildlife repository at `docs/GITHUB-PAGES-DEPLOYMENT.md`.
