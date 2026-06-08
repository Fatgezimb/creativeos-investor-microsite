# Creative OS Investor Microsite

Static GitHub Pages site that turns the Creative OS investor deck into an interactive, slideshow-style investor microsite under the Create 13 Group brand.

## Files

- `docs/index.html` - page structure, investor copy, editable placeholders
- `docs/styles.css` - visual system, responsive layout, print rules
- `docs/script.js` - slide index, progress, keyboard navigation
- `docs/assets/` - generated concept reference and selected product/deck screenshots
- `docs/dashboard-data-contract.md` - illustrative KPI/chart contract for the hero dashboard
- `remotion/creative-os-dashboard/` - optional Remotion composition for rendering the animated dashboard as video

## Run locally

From the repository root:

```bash
python3 -m http.server 4173 --directory docs
```

Open:

```text
http://localhost:4173
```

## GitHub Pages deployment

1. Commit the repository.
2. Push to GitHub.
3. In GitHub, open `Settings -> Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select the branch you want to publish.
6. Set the folder to `/docs`.
7. Save.

## Edit before investor sharing

Search `docs/index.html` for these placeholders:

- `Founder Name`
- `Raising: $___`
- `Runway: ___ months`
- `Create13group@gmail.com`
- Financial assumptions in the `Financial Model` section

## Navigation

- Mouse or trackpad scroll moves through the slides.
- Left slide index jumps to a section on desktop.
- Bottom controls move previous/next.
- Keyboard shortcuts: arrow keys, Page Up, Page Down, Home, End.

## Optional Remotion render

The website uses browser-native animation for GitHub Pages. A matching Remotion composition is included for video export:

```bash
cd remotion/creative-os-dashboard
npm install
npm run still
npm run render
```

## Source note

The site uses selected exported pages from the current Creative OS presentation PDF, but the investor story, section order, comparison table, GTM, ask, and validation framing have been rewritten for a stronger investor narrative.
