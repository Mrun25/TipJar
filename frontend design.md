---
version: alpha
name: moonmoon.digital
description: A cool, minimal portfolio system with airy spacing, deep indigo text, and soft lavender accents.
colors:
  primary: "#161857"
  secondary: "#C2C5FF"
  tertiary: "#EDEEFF"
  neutral: "#FFFFFF"
  surface: "#F7F7FF"
  on-surface: "#161857"
  error: "#D64545"
  border: "#E5E7EB"
typography:
  headline-display:
    fontFamily: "Inter Variable"
    fontSize: "40px"
    fontWeight: 400
    lineHeight: "42px"
    letterSpacing: "-2px"
  headline-lg:
    fontFamily: "Inter"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: "38px"
    letterSpacing: "0px"
  headline-md:
    fontFamily: "Inter"
    fontSize: "25px"
    fontWeight: 400
    lineHeight: "32px"
    letterSpacing: "-1.6px"
  headline-sm:
    fontFamily: "Inter"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: "32px"
    letterSpacing: "-1.6px"
  body-lg:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "1.6"
    letterSpacing: "0px"
  body-md:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1.6"
    letterSpacing: "0px"
  body-sm:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "1.5"
    letterSpacing: "0px"
  label-lg:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1.2"
    letterSpacing: "0px"
  label-md:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "1.2"
    letterSpacing: "0px"
  label-sm:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "1.2"
    letterSpacing: "0px"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "6px"
  sm: "14px"
  md: "24px"
  lg: "40px"
  xl: "70px"
  gutter: "24px"
  margin: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
    height: "40px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "40px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "16px"
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  chip:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
# moonmoon.digital

## Overview
Moonmoon.digital feels quiet, airy, and premium, with a restrained editorial tone rather than a loud marketing voice. It is clearly aimed at founders, studios, and design-conscious teams that want a polished portfolio or agency presence. The mood is calm and spacious, with a strong sense of contrast between the pale lavender field and the deep indigo text. Visual drama comes from scale and typography instead of decoration.

## Colors
- **Primary (#161857):** A deep indigo used for the main wordmark, body text, navigation, and primary actions. It carries nearly all of the visual weight and establishes the brand’s serious, refined tone.
- **Secondary (#C2C5FF):** A soft lavender accent used for glow, highlights, and the subtle floating orb effect. It adds a dreamy, moonlit quality without overpowering the page.
- **Tertiary (#EDEEFF):** A very light cool tint that can support hover states, gentle panels, or background layering. It helps preserve the washed, atmospheric feel.
- **Neutral (#FFFFFF):** Clean white used for surfaces and button text contrast. It keeps the system bright and minimal.
- **Surface (#F7F7FF):** An off-white icy surface tone for subtle section separation or cards. It should remain barely distinguishable from white.
- **On-surface (#161857):** The default readable text color on light surfaces. This mirrors the primary color to maintain consistency.
- **Border (#E5E7EB):** A quiet divider and card border color when structural separation is needed. It should stay understated.
- **Error (#D64545):** Reserved for validation or destructive states; it is not a dominant brand color in the observed UI.

## Typography
Inter is the core voice of the system, with Inter Variable used for the largest display treatment. Headings are light in weight and rely on tight negative tracking, which gives the oversized hero title its sleek, contemporary feel. Body text is also set in Inter at regular weight, keeping the reading experience clean and understated. Labels and button text remain simple and unembellished; there is no visible uppercase or tracking-heavy UI copy, so the system should avoid shouty navigation styling.

## Layout
The layout is fluid and open, with a very large hero area and content anchored toward the lower portion of the viewport. Horizontal composition feels centered and balanced, but not grid-heavy; the design relies more on generous breathing room than on visible columns. Spacing follows a loose rhythm from 6px and 14px micro-gaps up through 24px, 40px, and 70px for structural separation. Sections and cards should prefer ample padding over tight packing, and containers should feel wide with soft edge margins.

## Elevation & Depth
The interface is intentionally flat in the traditional sense: there are no meaningful shadows, no stacked cards, and little perceived elevation. Depth is created through contrast, color layering, and translucent lavender forms rather than through drop shadow. When separation is needed, use subtle borders and tonal surface shifts instead of heavy surface lifts. The result should remain calm, light, and minimal.

## Shapes
The shape language is soft but disciplined. Most controls use small radii around 4px to 8px, while the pill-shaped primary button and nav chip use full rounding. Cards can be slightly more rounded than controls, but the overall feel should stay clean and modern rather than bubbly. Large graphic elements may be organic and blurred, but interactive UI remains precise.

## Components
Buttons should be simple, rounded, and highly legible. `button-primary` uses the deep indigo fill with white text and a full pill radius; it is the main call to action and should stay around 40px tall with 8px 16px padding. `button-secondary` is an outline style with transparent background, indigo text, and a 1px indigo border for quieter actions. `button-link` is minimal and text-only, used for low-emphasis navigation or footnote actions.

Cards should feel lightly framed rather than elevated. `card` uses a white background, a 1px border in the border token, 16px padding, and an 8px radius. Inputs should follow the same calm language: white fill, indigo text, modest rounding, and comfortable horizontal padding. Chips can reuse the pill treatment from the primary button, but at smaller scale and with the lavender accent for a softer informational feel.

Navigation elements should remain compact and unobtrusive, with clear text and generous hit areas. The top-right CTA and the bottom floating nav pill both illustrate the brand’s preference for rounded capsules with dark fill and light text. If lists or menus are introduced, they should use minimal separators, no heavy shadows, and a strict indigo-on-light contrast ratio. Avoid ornate iconography unless it is extremely subtle.

## Do's and Don'ts
- Do keep the page airy, with large margins and generous negative space.
- Do use deep indigo for the majority of readable text and important actions.
- Do favor light, cool surfaces and subtle tonal layers over dramatic shadows.
- Do keep buttons and pills rounded, especially for primary CTAs and navigation clusters.
- Do use large typography for hero moments, with tight tracking and light weight.
- Don't introduce saturated accent colors that compete with the lavender mood.
- Don't add heavy drop shadows, bevels, or glassmorphism that obscures the flat editorial look.
- Don't make body copy overly bold, tight, or cramped; the system should remain calm and readable.
