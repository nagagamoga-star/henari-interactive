# Henari Interactive pages

This folder is the complete contents of the public GitHub Pages repository. It holds the deployment workflow and the scripts that assemble the site. It does not hold application source, tests, or personal support profiles.

GitHub Actions checks out the two private source repositories with read-only deploy keys, runs their unit tests, builds them, and publishes only the `site/` artifact. The live site is rebuilt on updates to this assembly repository and can also be run manually. The Explore source is rebuilt from the master branch and plant photos are attributed, checked, described and served from Wikimedia Commons on the Garden page. The Explore waterways page includes the merged Townsville fishing guide.

The `guide/` folder is the exception to "no application files": it keeps every released Henari Guide script (`guide.<version>.js`). Squarespace loads one of them with an integrity hash, so a released file must stay online, byte for byte, even after a newer version ships. Each deploy publishes the folder, adds the freshly built version beside it, and refuses to deploy if a build differs from an archived file of the same name, or if the staging snippet's hash does not match. Release steps are in the source repository at `docs/guide/STAGING.md`.

Copy these files to the root of a new public repository named `henari-interactive`. Setup, secrets, and the Squarespace snippets are documented in the private wildlife repository at `docs/GITHUB-PAGES-DEPLOYMENT.md`.

<!-- publish check -->
<!-- Explore follow-along UI -->
<!-- Keep official condition links in flow -->
<!-- Explore homepage release source 2a531a66fd5bf1b8d90dfd8b8e3eb6f92f9683bb -->
