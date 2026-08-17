# Megha Upadhyay Portfolio

Creative static portfolio for `meghaupadhyay.com`.

## Files

- `index.html` — website content and SEO metadata
- `styles.css` — creative visual system and responsive design
- `script.js` — scroll reveal, custom cursor, video modal, interactions
- `assets/megha-upadhyay-resume.pdf` — latest resume copied from Downloads
- `assets/megha-upadhyay-portfolio.pdf` — latest portfolio copied from Downloads
- `assets/favicon.svg`, `assets/og-card.svg` — brand/social assets

## Preview locally

```bash
cd ~/megha-portfolio
python3 -m http.server 8080
```

Then open http://localhost:8080

## Deploy options for GoDaddy domain

### If you have GoDaddy hosting/cPanel

Upload the contents of this folder (`index.html`, `styles.css`, `script.js`, `assets/`) into the site root, usually `public_html/`.

### If you want modern static hosting

Use Vercel/Netlify/Cloudflare Pages and point `meghaupadhyay.com` from GoDaddy DNS to that host. For Vercel, typical DNS records are:

- `A` record: `@` → `76.76.21.21`
- `CNAME` record: `www` → `cname.vercel-dns.com`

Always confirm the exact DNS values shown by the hosting provider before changing production DNS.
