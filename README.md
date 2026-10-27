# Keviero website

Static company website for Keviero, featuring RemindQ and support@keviero.com. Original K symbol and KEVIERO lettering are preserved in the supplied raster assets.

## GitHub Pages
Publish from main, / (root), in Settings > Pages > Deploy from a branch. No build step, dependencies, mobile app build, or secrets are required. .nojekyll keeps the static assets unchanged. Relative asset paths work at both the repository Pages address and a custom domain.

Expected default URL after deployment: https://mac5004.github.io/keviero-website/

See DOMAIN-SETUP.md for keviero.com DNS and HTTPS instructions. Do not add a custom domain until the default address is verified.

## Editing and verification
Edit index.html for content and style.css for layout. Google Fonts is optional; the system font fallback works if it is unavailable. All contact buttons use mailto links. No tracking, form backend, accounts, or storage is included. RemindQ features and availability have not been invented.

Run python tools/verify.py to check local links and assets. Website and logo PNG exports are static; SVG/vector precision is not claimed. Mobile applications and Expo/EAS are outside this repository.
