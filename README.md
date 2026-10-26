# Henari Interactive pages

This folder is the complete contents of the public GitHub Pages repository. It holds the deployment workflow and the scripts that assemble the site. It does not hold application source, tests, or personal support profiles.

GitHub Actions checks out the two private source repositories with read-only deploy keys, runs their unit tests, builds them, and publishes only the `site/` artifact. The live site is rebuilt on updates to this assembly repository and can also be run manually. The Explore source is rebuilt from the master branch and plant photos are attributed, checked, described and served from Wikimedia Commons on the Garden page. The Explore waterways page includes the merged Townsville fishing guide.

The `guide/` folder is the exception to "no application files": it keeps every released Henari Guide script (`guide.<version>.js`). Squarespace loads one of them with an integrity hash, so a released file must stay online, byte for byte, even after a newer version ships. Each deploy publishes the folder, adds the freshly built version beside it, and refuses to deploy if a build differs from an archived file of the same name, or if the staging snippet's hash does not match. Release steps are in the source repository at `docs/guide/STAGING.md`.

Copy these files to the root of a new public repository named `henari-interactive`. Setup, secrets, and the Squarespace snippets are documented in the private wildlife repository at `docs/GITHUB-PAGES-DEPLOYMENT.md`.

<!-- publish check -->
<!-- Explore follow-along UI -->
<!-- Keep official condition links in flow -->
<!-- Explore homepage release source 2a531a66fd5bf1b8d90dfd8b8e3eb6f92f9683bb -->
<!-- Garden mockup release source 4b068457edb73d913ef98f995fb73bcc7b0b3120 -->
<!-- Garden permaculture planner release source f947cbb74d3e9374d050aabff3583abeba26758c -->

<!-- Garden permaculture photo release source 4601b7e7421f0f3b03ecfa50100d40a7f3a30f61 -->
<!-- Garden layout planner clarity release source b76f83bfa54476da094aa5e47042302c1b2b5235 -->
<!-- Garden layout accessibility wording release source 26bb2ddbc51fb0a10449fdf4f13d3fc580f3958d -->
<!-- Discover Your Community release source 80faf3d95c8ae07238153c68a6c08ccbc0237f27 -->

<!-- Community guide cohesion release source a91deff15f84275d2f4dfe19df77cf46cc99f316 -->

<!-- Free Places de-duplication release source 7e811f2153dc4abb2ccd1b19bd03692c933bbae9 -->

<!-- Gardening companion release source 3237423c82a6600958924546e1714fe6bb872684 (PR #46) -->

<!-- SEO deployment refresh 2026-10-26 -->

<!-- SEO deployment refresh 2026-10-26b -->

<!-- imagery refresh 2026-10-26 -->


<!-- Holy Trinity church imagery refresh 2026-10-26 -->

<!-- Allow Commons church image in Explore test suite 2026-10-26 -->

<!-- Correct Commons image URL test patterns 2026-10-26 -->

<!-- Add Townsville museums arts street art and Town Common cards 2026-10-26 -->

<!-- Add Townsville museums arts street art and Town Common additions 2026-10-26 -->

<!-- Move Centacare NQ to Groups and Social Activities 2026-10-26 -->

<!-- Add swipeable image rails across Explore pages 2026-10-26 -->

<!-- Repair Birds and Explore image card rails 2026-10-26 -->


<!-- Expand Explore Today parks activities and community groups 2026-10-27 -->


<!-- Retry Explore Today build after source validation fixes 2026-10-27 -->


<!-- Final Explore Today validation run 2026-10-27 -->


<!-- Source register cleanup validation 2026-10-27 -->
