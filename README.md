# GreenHanoi website

Static multi-page website for `greenhanoi.io.vn`, built with plain HTML, CSS, and JavaScript.

## Pages

- `index.html` — home
- `about.html` — story, values, and Hanoi context
- `projects.html` — initiative and project formats
- `guide.html` — editorial green-living guide
- `events.html` — events and volunteer formats
- `contact.html` — contact and join form with `mailto:` fallback

## Shared assets

- `assets/css/site.css` — full design system and responsive layout
- `assets/js/site.js` — language toggle, mobile nav, reveal animation, active nav, and contact form validation
- `assets/logo/greenhanoi-logo.svg`
- `assets/icons/*.svg`
- `assets/patterns/leaf-pattern.svg`
- `assets/images/hero-greenhanoi-gradient.png`
- `assets/images/soft-green-texture.png`
- `assets/images/stock/*` — downloaded local photo assets for the site

## Language model

- Default language: Vietnamese
- Secondary language: English
- Toggle persistence key: `greenhanoi-lang`

## Stock image notes

Downloaded external photos are stored locally to avoid runtime hotlinking.

- Source list and attribution: `source-links/stock-attribution.md`
- Unsplash license: https://unsplash.com/license
- Pexels license: https://www.pexels.com/license/

## Local preview

Open `index.html` directly in a browser for a quick preview, or serve the folder with any static file server.

## Deployment note

As checked on 2026-05-07, `https://greenhanoi.io.vn/` returned an SSL hostname mismatch. Frontend files are ready, but certificate/domain validation still needs to be fixed before public deployment.
