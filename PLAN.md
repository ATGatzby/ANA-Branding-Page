# Personal Branding Page — Heart & Diabetes Researcher

## Context

Personal branding/portfolio page for a scientific researcher focused on Heart and Diabetes research, modeled loosely on academic lab pages like the [Natarajan Lab site](https://sites.google.com/view/niranjana-natarajan-lab-pitt/) (clean, hierarchical, image-driven, minimal palette). Two goals: (1) establish the researcher as a credible, modern professional presence, and (2) drive traffic and donations to a GoFundMe campaign via a high-visibility, contrasting donate CTA.

Decisions locked in:
- **Stack**: plain HTML/CSS/JS — no build tooling, no dependencies, deployable anywhere.
- **Content**: all placeholder (realistic placeholder name/bio/campaign link) — swap in real content later.
- **Palette**: "Clinical Trust" — navy/white base, minimal accent, one warm contrasting color reserved for the Donate CTA.
- **Sections**: Hero, Impact/Stats, About, Research Focus, Publications & News, Media & Press, Team/Collaborators, Donate, Contact.
- **Modularity**: every section is a self-contained, reorderable block — no styling depends on sibling order.

## File Structure

```
/index.html
/css/styles.css
/js/main.js
/images/headshot.svg
/images/research-heart.svg
/images/research-diabetes.svg
/images/team-1.svg
/images/team-2.svg
/images/team-3.svg
/images/team-4.svg
/images/press-logo-1.svg
/images/press-logo-2.svg
/images/press-logo-3.svg
```

## HARD CONTRACT — all files must match this exactly (do not deviate, do not invent new names)

This contract exists so index.html, styles.css, main.js, and the images can be built in parallel without conflicts. Follow it literally.

### DOM skeleton (index.html)

```html
<body>
  <header class="site-header">
    <div class="container nav">
      <a href="#hero" class="nav__brand">[Researcher Name]</a>
      <button class="nav__toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
      <ul class="nav__list">
        <li><a class="nav__link" href="#about">About</a></li>
        <li><a class="nav__link" href="#research">Research</a></li>
        <li><a class="nav__link" href="#publications">Publications</a></li>
        <li><a class="nav__link" href="#media">Media</a></li>
        <li><a class="nav__link" href="#team">Team</a></li>
        <li><a class="nav__link" href="#contact">Contact</a></li>
        <li><a class="nav__link btn btn--donate btn--sm" href="#donate">Donate</a></li>
      </ul>
    </div>
  </header>

  <main>
    <section id="hero" class="section hero">...</section>
    <section id="impact" class="section stats">...</section>
    <section id="about" class="section about">...</section>
    <section id="research" class="section research section--alt">...</section>
    <section id="publications" class="section publications">...</section>
    <section id="media" class="section media section--alt">...</section>
    <section id="team" class="section team">...</section>
    <section id="donate" class="section donate section--cta">...</section>
    <section id="contact" class="section contact section--alt">...</section>
  </main>

  <footer class="site-footer">...</footer>
  <script src="js/main.js"></script>
</body>
```

### Required class names (styles.css must style exactly these; index.html must use exactly these)

- Layout: `.container`, `.section`, `.section--alt` (tinted bg), `.section--cta` (donate section, uses `--color-donate` background)
- Grid: `.grid`, `.grid--2`, `.grid--3`, `.grid--4` (responsive column counts, collapse to 1 column under 768px)
- Buttons: `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--donate`, `.btn--sm`
- Cards: `.card`
- Nav: `.site-header`, `.nav`, `.nav__brand`, `.nav__toggle`, `.nav__list`, `.nav__list--open` (mobile open state), `.nav__link`, `.nav__link--active` (current-section highlight)
- Hero: `.hero`, `.hero__content`, `.hero__image`, `.hero__eyebrow`, `.hero__title`, `.hero__subtitle`, `.hero__actions`
- Stats: `.stats__grid`, `.stat`, `.stat__number`, `.stat__label`
- About: `.about__grid`, `.about__image`, `.about__body`, `.timeline`, `.timeline__item`
- Research: `.research-card`, `.research-card__image`, `.research-card__title`, `.research-card__body`
- Publications: `.pub-list`, `.pub-item`, `.pub-item__title`, `.pub-item__meta`
- Media: `.press-grid`, `.press-logo`
- Team: `.team-card`, `.team-card__photo`, `.team-card__name`, `.team-card__role`
- Donate: `.donate__panel`, `.donate__blurb`, `.donate__progress`, `.donate__progress-bar` (visual placeholder progress fill)
- Contact: `.contact__grid`, `.contact__links`
- Footer: `.site-footer`, `.site-footer__links`

### Design tokens (styles.css `:root` — use these exact values)

```css
--color-navy: #0B2A4A;
--color-navy-light: #14406B;
--color-bg: #F7F9FB;
--color-surface: #FFFFFF;
--color-text: #16232E;
--color-muted: #5B6B7A;
--color-accent: #2E86AB;
--color-donate: #E5533C;
--color-donate-dark: #C43F2B;
--color-border: #E1E7EC;
--radius: 12px;
--space-1: 0.5rem;
--space-2: 1rem;
--space-3: 1.5rem;
--space-4: 2rem;
--space-5: 3rem;
--space-6: 5rem;
font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```

Mobile-first; `.nav__list` collapses behind `.nav__toggle` under 768px (hidden unless `.nav__list--open`); `.grid--2/3/4` collapse to 1 column under 768px.

### Images (all placeholder SVGs, self-contained, no external requests)

| File | Used in | Suggested content |
|---|---|---|
| `images/headshot.svg` | hero, about | Navy circle/rounded-rect silhouette + "Photo" label, ~480x480 |
| `images/research-heart.svg` | research card 1 | Simple line-art heart/EKG motif, ~600x400, navy+accent |
| `images/research-diabetes.svg` | research card 2 | Simple line-art glucose/molecule motif, ~600x400, navy+accent |
| `images/team-1.svg`…`team-4.svg` | team cards | Neutral avatar silhouettes, ~300x300, varied muted tones |
| `images/press-logo-1.svg`…`press-logo-3.svg` | media section | Simple wordmark-style placeholder logos, ~200x60, grayscale |

### GoFundMe donate link

Use placeholder URL `https://www.gofundme.com/f/example-heart-diabetes-research` on the primary donate buttons (nav + donate section), `target="_blank" rel="noopener"`. Add an HTML comment near the donate section noting: swap this href for the real campaign URL, or replace the button with GoFundMe's official embeddable widget script later.

### Placeholder copy voice

Researcher: "Dr. Jane Doe, Ph.D." — Cardiometabolic Researcher, [Placeholder University] School of Medicine. Tone: credible, warm, mission-driven. Mark all placeholder facts clearly enough that a human swaps them out later (e.g. realistic but obviously generic institution/journal names).

## Verification

- Open `index.html` directly in a browser and confirm all sections render, placeholder SVGs load, anchor nav scrolls smoothly.
- Serve via `python3 -m http.server` and resize viewport to confirm mobile nav toggle + responsive grids at 375px / 768px / 1200px.
- Confirm donate buttons (nav + donate section) open the placeholder GoFundMe URL in a new tab.
- No console errors in devtools.
