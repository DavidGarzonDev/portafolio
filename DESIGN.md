---
name: Portafolio David Garzón
description: A reverse-printed Cali woodtype show bill, paper-white ink on black stock.
colors:
  stock: "#0b0b0a"
  ink: "#efece4"
  ink-dim: "#8c8a84"
typography:
  display:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "fitted to measure, capped at 17vh"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "0.005em, opened up to 0.16em when the height cap stops the line short"
  headline-headliner:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(2.25rem, min(10.5vh, 14vw), 7.25rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "0.005em"
  headline-second:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(1.75rem, min(7vh, 10vw), 4.5rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "0.005em"
  headline-support:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(1.5rem, min(5.2vh, 8.5vw), 3.4rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "0.005em"
  band:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "fitted to measure, capped at 5vh"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "0.08em"
  heading:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontWeight: 800
    letterSpacing: "0.01em"
  billing:
    fontFamily: "Ultra, Georgia, serif"
    fontSize: "clamp(1.25rem, 3vh, 2.1rem)"
    fontWeight: 400
    lineHeight: 1
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "10px (11px from 640px)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.2em"
  label-link:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.16em"
rounded:
  none: "0px"
spacing:
  bill-x: "16px"
  bill-x-wide: "32px"
  bill-y: "20px"
  bill-y-wide: "24px"
  band-y: "6px"
  band-x: "12px"
  closing-band: "12px"
  closing-band-wide: "16px"
components:
  bill:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px 16px"
  bill-wide:
    padding: "24px 32px"
  band-inverted:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  bill-line:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    typography: "{typography.headline-headliner}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  bill-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
  closing-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    rounded: "{rounded.none}"
    padding: "12px"
  small-print:
    textColor: "{colors.ink-dim}"
    typography: "{typography.label}"
---

# Design System: Portafolio David Garzón

## Overview

**Creative North Star: "The Reverse-Printed Show Bill"**

The site is a Cali letterpress show bill printed in reverse: paper-coloured ink on black stock. David's name is set in wood type across the full measure, his role sits in an inverted band, a fat slab word announces the run, the projects are billed in descending size like a lineup, and the closing band tells the visitor the one thing to do. Everything is flat, ruled and printed; nothing floats, glows or sits in a card.

Density is poster density: few words, set as large as the measure allows, separated by thin rules and diamond ornaments. Type carries a worn-ink texture (displaced edges and small voids where the ink did not load), so the black-and-white palette reads as printed matter rather than as a dark UI theme. Motion is the press itself: each line stamps in and settles, and hovering a line inks it in reverse with a roller wipe.

The world is applied to the home hero only. The site header, the tech-stack carousel, the footer and the About and Projects pages are incumbent chrome (Inter, zinc greys, rounded glass panels, particles) that has not been migrated; they are not part of this system and new work should not copy them. A few global rules from this world already reach that chrome: headings (h1-h3) set in wood type, the ink focus ring, the ink selection colour and the stock scrollbar.

**Key Characteristics:**
- Two inks only: paper-white on near-black, with one grey for small print and rules.
- Condensed heavy wood type fitted to the full measure; size steps down with billing rank.
- Fat slab (Ultra) reserved for billing words.
- Emphasis by inversion (ink band, stock type), never by adding a colour.
- Worn-ink texture on display type; square corners everywhere; no shadows.
- Press-stroke motion: short stamp in, roller wipe on hover, all removed under reduced motion.
- Bilingual by construction: every printed line is an ES/EN string.

## Colors

A two-ink letterpress palette: one warm near-black stock, one warm paper-white ink, one grey for the fine print.

### Neutral
- **Black Stock** (#0b0b0a): the cardboard the bill is printed on. Background of the bill, and the type colour inside inverted bands. Also the scrollbar track and the outline colour on links that sit on an ink band.
- **Paper Ink** (#efece4): all display type, the bill's 2px ruled border, the diamond ornaments, inverted band fills, the hover wipe, the global focus ring and the text selection fill. It is warm, not pure white.
- **Faded Ink** (#8c8a84): small print only (tagline, imprint), the hairline rules between lineup tiers and inside ornaments, and the scrollbar thumb. Never used for display type.

### Named Rules
**The Two Inks Rule.** The system has no hue. Stock and ink do all the work; faded ink is for small print and hairlines only. Colour enters the site only through content that owns it: project screenshots, company logos and the profile photo keep their original colours and are never desaturated or tinted.

**The Reverse-Print Rule.** Emphasis is made by inverting, not by adding: the role band, the closing band and a hovered lineup line flip to ink ground with stock type.

## Typography

**Display Font:** Big Shoulders Display, weights 800 and 900 (with Arial Narrow)
**Billing Font:** Ultra 400 (with Georgia)
**Small-print Font:** Inter 400 / 500 / 700 (with system-ui)

**Character:** A condensed gothic wood type stacked full-width, punctuated by one fat slab announcement word, with a plain sans set tiny and widely tracked for the conditions and fine print, the way a real bill sets its small type.

### Hierarchy
- **Display** (900, fitted to the measure with a 17vh height cap, line-height 0.86): the name. Set on one line across the full width of the bill; when the height cap stops it short of the measure, letter-spacing opens (to at most 0.16em) so the line still fills.
- **Headliner** (900, clamp(2.25rem, min(10.5vh, 14vw), 7.25rem), 0.88): the top-billed project.
- **Second bill** (900, clamp(1.75rem, min(7vh, 10vw), 4.5rem), 0.88): the second project.
- **Support bill** (900, clamp(1.5rem, min(5.2vh, 8.5vw), 3.4rem), 0.88): the remaining projects, side by side from 640px with a diamond between them.
- **Band** (900, fitted with a 5vh cap, tracking 0.08em): the role, set in stock on an ink band.
- **Billing** (Ultra 400, clamp(1.25rem, 3vh, 2.1rem), line-height 1, uppercase): "PRESENTA / PRESENTS", flanked by ornament rules.
- **Heading** (800, tracking 0.01em; h1 and h2 uppercase): global default for h1-h3 across the site.
- **Label** (Inter, 10px rising to 11px from 640px, uppercase, tracking 0.2em to 0.24em): project conditions under each line, the tagline, the printer's imprint.
- **Link label** (Inter, 12px, uppercase, tracking 0.16em): LinkedIn, email and CV links in the closing band.

### Named Rules
**The Full Measure Rule.** Display and band lines are composed to the width of the bill, the way wood type is locked up: measure the text, scale it to fill, cap it by viewport height, and open the tracking before leaving the line short. A lineup line that does not fit breaks onto two lines (balanced) rather than shrinking.

**The Billing Rank Rule.** Size states importance. Each step down the lineup is a smaller clamp; projects are never set at equal size.

**The Small Print Rule.** Inter appears only as small print: 10-12px, uppercase, tracked 0.16em or wider. It never sets a headline.

**The Worn Ink Rule.** Wood type and slab lines carry the worn-ink filter (displaced edges, scattered voids). Small print stays clean, so it remains legible at 10px.

## Layout

One bill fills the first viewport: a single bordered block, centred, with a maximum width of 72rem (1152px) and a 16px page gutter (24px from 640px). Inside, padding is 20px by 16px, widening to 24px by 32px from 640px. Content is a single centred column stacked in bands: name, role band with tagline, billing word between ornament rules, lineup, closing band. Lineup tiers are separated by a faded-ink hairline with 8px above the next tier. The closing band stacks the call to action over the links on phones and puts them side by side from 640px (links right-aligned in a column). The printer's imprint sits under the bill, centred on phones and right-aligned from 640px.

Vertical sizes are tied to viewport height (vh caps on every display line) so the whole bill fits the first screen on both phone and desktop; widths are tied to the bill's measure.

The pixel mascot walks the bill's top edge, overlapping the border by 2px; centred on phones, inset 24px from the left from 768px.

## Elevation & Depth

The bill is flat. There are no shadows, no glass and no lifted surfaces. Depth comes from two things: inversion (ink bands read as the nearest layer) and a site-wide atmosphere layer fixed behind all content.

The atmosphere layer is shipped site-wide and sits behind every page: a radial vignette that sinks the edges toward black (transparent to 45%, rgba(0,0,0,0.55) at 80%, rgba(0,0,0,0.85) at the edge) and a generated grain tile at 7% opacity, blended with screen, that jitters in six steps every 0.9s. It never touches text or images. It carries over from the earlier noir experiment; the grain reads as stock texture and fits the bill. A projector flicker (black overlay pulsing to 10% opacity on a 7s cycle) is also still mounted from that experiment; it is a film device, not a printing one, and is not a rule for new surfaces.

### Named Rules
**The Flat Stock Rule.** Nothing on the bill casts a shadow or blurs what is behind it. If an element needs to come forward, invert it.

**The Atmosphere Stays Behind Rule.** Grain and vignette live in one fixed layer behind the content; they are never applied to type, panels or images.

## Shapes

Square and ruled. Every corner is 0px. The bill has a 2px paper-ink border; tiers inside it are divided by 1px faded-ink hairlines. Printer's ornaments are the only other geometry: a 6px ink square rotated 45 degrees centred on a 1px faded rule (flanking the billing word), and an 8px ink diamond between side-by-side support lines. The arrow is a square-capped stroke (2.6 width) drawn inline, scaled to the type it follows.

## Components

### Bill
The printed sheet. Black stock fill, 2px paper-ink border, square corners, padding per Layout. Its children stamp in one after another on load (see Motion under Bill line).

### Inverted band
The role line and the closing band. Paper-ink fill, stock type, square, no border. The role band holds one fitted wood-type line; the closing band holds the call to action and the small links.

### Bill line (lineup link)
A project title in wood type with its condition (badge) in small print underneath, centred, the whole block one link to the project.
- **Rest:** ink type on stock, 2px by 8px padding.
- **Hover / Focus:** a paper-ink roller wipe scales in from the left edge (0.38s, cubic-bezier(0.16, 1, 0.3, 1)), overhanging the line by 2px vertically and 6px horizontally; the type uses a difference blend so it prints in stock over the wipe. Keyboard focus triggers the same wipe in place of an outline. The headliner carries an arrow that nudges 4px right on hover.
- **Motion (stamp):** each band enters like a press stroke: from 1.04 scale, 3px blur and zero opacity to rest in 0.42s on cubic-bezier(0.16, 1, 0.3, 1), staggered 0.08s after a 0.1s delay.
- **Reduced motion:** no stamp (lines render in place), no wipe transition, grain and flicker stopped.

### Closing call to action
"ESCRÍBEME / WRITE TO ME" set in fitted wood type (8vh cap, tracking up to 0.06em) in stock on the ink band, with an arrow that nudges 8px right on hover. It is a mailto link. Focus shows a 2px stock outline offset 3px.

### Small-print links
LinkedIn, email and CV in the closing band: Inter link label, stock colour, 1px underline offset 4px that thickens to 2px on hover; 2px stock focus outline offset 3px.

### Billing word with ornament rules
The slab announcement ("PRESENTA / PRESENTS") centred between two ornament rules that run to the bill's edges.

### Pixel mascot
The white pixel-art mascot is a brand asset, not a styled component: it walks the bill's top edge in the hero and follows its own stepped pixel animation. It stays.

## Do's and Don'ts

### Do:
- **Do** use only Black Stock (#0b0b0a), Paper Ink (#efece4) and Faded Ink (#8c8a84) for anything the system draws.
- **Do** let project screenshots, company logos and the profile photo keep their original colours.
- **Do** fit display lines to the measure with a viewport-height cap, and open tracking before leaving a line short.
- **Do** step type size down with billing rank.
- **Do** make emphasis by inverting to an ink band with stock type.
- **Do** separate bands with 1px faded-ink rules and diamond ornaments.
- **Do** keep every corner square (0px) and the bill border at 2px ink.
- **Do** enter with a short press stamp and respond to hover with the roller wipe; remove both under prefers-reduced-motion.
- **Do** ship every printed line as an ES/EN pair.

### Don't:
- **Don't** add a hue, an accent colour or a coloured state to the system.
- **Don't** put content in cards, glass panels or rounded containers on the bill.
- **Don't** use shadows, glows or backdrop blur; the only gradient is the atmosphere vignette behind the content.
- **Don't** set headlines in Inter, or small print in wood type.
- **Don't** apply the worn-ink filter to small print or body text.
- **Don't** set projects at equal size in a row; the lineup is ranked.
- **Don't** use floating, bobbing or looping motion on the bill; motion is a press stroke that settles.
- **Don't** desaturate or tint project images and logos to match the palette.
