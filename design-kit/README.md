# Clinton Pracher Portfolio Design Kit

This package contains the reusable design layer for the Clinton Pracher portfolio prototype.

## What is included

- `site/assets/css/`: Portfolio, case study, resume, and Imperious design styles
- `site/assets/js/`: Mobile navigation behavior
- `site/assets/`: Profile image and favicon
- `site/_layouts/`: Home, sectioned page, resume, case study, and default page layouts
- `site/_includes/`: Shared navigation, footer, and public architecture view
- `site/_data/site_settings.yml`: Contact details and future diagram settings
- `site/_config.yml`: Jekyll page and layout mapping
- `content/`: Representative Home, About, Work, Skills, and Resume content

## Editing contact information

Update `site/_data/site_settings.yml` or the matching `site/site_settings.yml` file. The current fields control:

- Phone number
- Email address
- LinkedIn profile
- GitHub profile
- Public architecture image and source link

## Replacing the profile image

Replace `site/assets/clint-pracher-profile.jpg` with another JPG using the same filename. The existing About layout will use the replacement automatically.

## Adding a Lucid diagram

Export a public-safe version of the diagram as PNG, JPG, WebP, or SVG. Place it in `assets/diagrams/`, then link from work or skills pages using `/assets/diagrams/{slug}.svg`.

## Notes for another design or development tool

The main visual direction lives in `site/assets/css/portfolio.css`. The shared color, typography, spacing, and motion tokens live under `site/assets/css/imperious/`.

Deck-driven UI (metric tiles, capability cards, resume experience chips) lives in `integration/` and is applied on top of the locked kit via `apply-portfolio-design-kit.sh`.

Internal operating architecture files, repository publishing scripts, generated duplicate files, and private system details are not included.
