# Megha Upadhyay Portfolio

Creative static portfolio for Megha Upadhyay — Social Media & Brand Manager / Video Content Producer.

- Live Cloudflare Pages URL: https://megha-upadhyay.pages.dev
- GitHub repo: https://github.com/sujnesh/megha-upadhyay-portfolio
- Target domain: `meghaupadhyay.com`

## Files

- `index.html` — website content and SEO metadata
- `styles.css` — creative visual system and responsive design
- `script.js` — scroll reveal, custom cursor, video modal, interactions
- `_headers` — security/cache headers for Cloudflare Pages
- `assets/megha-upadhyay-resume.pdf` — latest 2-page resume copied from Downloads
- `assets/megha-upadhyay-portfolio.pdf` — latest portfolio copied from Downloads
- `assets/favicon.svg`, `assets/og-card.svg` — brand/social assets

## Preview locally

```bash
cd ~/megha-portfolio
python3 -m http.server 8080
```

Then open http://localhost:8080

## Update and deploy

Save changes to GitHub, then deploy to Cloudflare Pages:

```bash
cd ~/megha-portfolio
git add .
git commit -m "Update portfolio"
git push
npm run deploy
```

The Cloudflare Pages project is connected to the GitHub repo. If the Cloudflare GitHub app is granted access to this repo in the dashboard, pushes to `main` can also deploy automatically.

## Custom domain

The site is already live on Cloudflare Pages. The Cloudflare zone has been added and DNS records are prepared. In GoDaddy, change the domain nameservers to:

- `barbara.ns.cloudflare.com`
- `nick.ns.cloudflare.com`

After propagation, `meghaupadhyay.com` and `www.meghaupadhyay.com` will validate against the Pages project.
