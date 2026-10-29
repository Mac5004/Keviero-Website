# Keviero website

Static company website for Keviero, featuring RemindQ, EZAlbum, CalcStash, and support@keviero.com. Original K symbol and KEVIERO lettering are preserved in the supplied raster assets.

## GitHub Pages
Publish from main, / (root), in Settings > Pages > Deploy from a branch. No build step, dependencies, mobile app build, or secrets are required. .nojekyll keeps the static assets unchanged. Relative asset paths work at both the repository Pages address and a custom domain.

Expected default URL after deployment: https://mac5004.github.io/Keviero-Website/

See DOMAIN-SETUP.md for keviero.com DNS and HTTPS instructions. Do not add a custom domain until the default address is verified.

## Editing and verification
Edit index.html for content and style.css for layout. Google Fonts is optional; the system font fallback works if it is unavailable. All contact buttons use mailto links. No tracking, form backend, accounts, or storage is included. RemindQ features and availability have not been invented.

Run python verify.py to check local links and assets. Website and logo PNG exports are static; SVG/vector precision is not claimed. Mobile applications and Expo/EAS are outside this repository.

## App showcase content

The existing RemindQ showcase and company content are preserved. EZAlbum and CalcStash reuse the same artwork and responsive showcase classes, with an app navigation row. No new app icon assets were available in the inspected source repositories.

EZAlbum uses the supplied description and tagline; its release status is unverified, so the page says availability is to be announced. CalcStash is in development according to Mac5004/CalcStash README.md (checked October 29, 2026). Its tagline comes from Mac5004/calcstash-website. All new actions are support email inquiries; no App Store URLs are assumed.
