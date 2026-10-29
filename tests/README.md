# Composer regression checks

These four browser checks cover local draft persistence with cloud helpers loaded or unavailable, reviewed file downloads, schema/content preservation, media and category connections, export freshness after edits, and exclusion of draft/planned entries from public feeds. They start an ephemeral loopback server and intercept external requests; no account writes or real publishing occur. Synthetic exports stay in the browser's temporary download directory.

Install test tools outside the static-site checkout, then run from the repository root:

```sh
npm install --prefix ../map-test-tools --save-exact playwright@1.56.1 leaflet@1.9.4
NODE_PATH="$(cd ../map-test-tools/node_modules && pwd)" node --test tests/composer.test.cjs
```

Chromium defaults to `/usr/bin/chromium`. Set `CHROMIUM_PATH` to an existing Chromium executable on other machines. In the prepared cloud environment:

```sh
NODE_PATH=/workspace/.onboarding/browser/node_modules node --test tests/composer.test.cjs
```

Use an execution context permitted to open local sockets and launch Chromium. The site itself still requires no dependency installation or build.
