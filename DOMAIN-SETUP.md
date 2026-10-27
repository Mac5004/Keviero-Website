# Connect keviero.com

First verify that the default GitHub Pages URL works: https://mac5004.github.io/Keviero-Website/ .

1. In GitHub repository Settings > Pages, enter keviero.com under Custom domain and save. Do this before changing DNS.
2. At the domain DNS provider, set four A records for @:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
3. Set CNAME www to mac5004.github.io (no repository path).
4. Preserve all existing MX, SPF, DKIM, DMARC, and other email verification records so support@keviero.com continues working. Replace only conflicting web records for @ or www; do not change nameservers.
5. Wait for GitHub's DNS check and HTTPS certificate to succeed, then enable Enforce HTTPS in Settings > Pages.
6. Verify https://keviero.com and https://www.keviero.com, the logo assets, section links, and support email links.

Optional ownership protection: verify keviero.com under GitHub account Settings > Pages and add the exact TXT record GitHub provides. Do not guess that verification value.

A custom domain has not been enabled in this package, so the default GitHub Pages address can be checked before DNS changes. If publishing from main / (root), saving the custom domain in GitHub creates a CNAME file automatically.

Official instructions: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
