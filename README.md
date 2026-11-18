# Valued Bytes Technologies website

Company website for **Valued Bytes Technologies, Chiniot, Pakistan**.

## Architecture

A lightweight static website with semantic HTML, CSS and vanilla JavaScript. No backend, build process, tracking scripts or JavaScript framework is required for the company homepage.

- `index.html`: primary website, services, industries, education products, FAQs and enquiry composer.
- `studio/site.css`, `studio/site.js`: responsive design and accessible interactions.
- `smartcampus/`: concept page for the **in-development** Smart Campus SaaS.
- `CNAME`: custom domain configured for GitHub Pages.

## Product status

- **VBT Smart School** — Windows offline school management application (ready).
- **VBT Smart Campus** — in development.
- **VBT Paper Generator** — in development.
- **VBT Quiz Maker** — in development.

Do not remove readiness labels or present illustrative images and sample metrics as deployed customer installations.

## Enquiry flow

The quote builder composes a message in the visitor's browser and opens WhatsApp with the details; it does not submit the form to a site backend. A copy-to-clipboard alternative is available. WhatsApp and email are external services.

## Release quality checklist

- Validate JavaScript: `node --check studio/site.js` and `node --check smartcampus/script.js`.
- Inspect pages at 320, 375, 768, 1024 and 1440 CSS pixels.
- Check navigation, service/product dialogs, keyboard focus, Escape handling, industry controls, forms, WhatsApp links, copy functionality and FAQs.
- Check `prefers-reduced-motion`, text contrast and touch target spacing.
- Verify product-download assets and external links before publishing.
- Confirm domain/DNS, HTTPS and production cache refresh after merging to `main`.

No credentials should be committed to this static repository.
