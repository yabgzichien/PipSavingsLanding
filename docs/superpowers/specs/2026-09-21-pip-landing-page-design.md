# Pip Landing Page Design Specification

**Date:** 2026-09-21  
**Status:** Approved in conversation; awaiting written-spec review

## Purpose

Create a polished public landing page for Pip, the personal-finance app in `/home/yang/Project/PipFinance`. The page should explain the product clearly, showcase authentic app interfaces, and establish trust. Its primary job is product education rather than immediate conversion.

The site will address a global audience. It will lead with Pip as an AI-powered finance companion while carefully avoiding any claim that Pip provides financial advice. The tone will be calm, intelligent, and reassuring, with small moments of personality later in the page.

## Success criteria

- Visitors understand what Pip does and how Ask Pip differs from a generic chatbot.
- The requested feature set is demonstrated with legible, authentic app screenshots.
- The experience feels minimal, modern, professional, and recognizably fintech without looking like a generic banking template.
- Motion improves product comprehension and respects reduced-motion preferences.
- Visitors can reach a real FAQ route and Pip's Instagram profile.
- The page works well from small mobile screens through wide desktop displays.

## Scope

The first release contains two routes:

- `/`: the complete product landing page.
- `/faq`: a designed placeholder page stating that frequently asked questions are coming soon, with a clear path back to the landing page.

The page will not contain pricing, email capture, a waitlist, fabricated testimonials, download counts, or unsupported privacy and security claims. The Google Play badge will communicate availability but will not link anywhere until a store URL is provided.

## Audience and positioning

The page is for a global audience seeking a simpler, more intelligent way to understand everyday finances. Region-specific interfaces may appear in screenshots, but the core copy will not assume a Malaysian-only audience.

Primary positioning:

> Pip is an AI-powered finance companion that helps people capture, understand, and organize their money.

Supporting differentiation:

- Ask Pip translates natural-language requests into real app views and confirmation-first workflows.
- Receipts, e-wallet screenshots, and transaction histories can be captured without extensive manual entry.
- Budgeting, bill splitting, net worth, monthly reflection, and habit building live in one coherent product.
- The financial ledger is local-first, with explicit explanations of the limited cases where optional AI processing sends selected content to a provider.

## Information architecture

### Navigation

The header contains the Pip identity, anchored links to key homepage sections, a FAQ route link, and a compact Instagram or Connect link. On narrow screens it collapses into an accessible menu. The header remains visually light and does not compete with the hero.

### Homepage sequence

1. **Hero**
   - Introduces Pip as an AI-powered finance companion.
   - Uses one primary action, “Explore what Pip can do,” which smooth-scrolls to the feature narrative.
   - Displays a non-interactive “Available on Google Play” badge.
   - Shows an authentic Ask Pip phone interface with a short command-to-result animation.

2. **Ask Pip**
   - Explains chat as a command center rather than a financial-advice bot.
   - Shows that natural-language requests open real Pip screens and prepare confirmation-first workflows.

3. **Capture without typing**
   - Demonstrates receipt scanning, e-wallet or banking screenshots, and transaction-history extraction.
   - Uses authentic Pip capture interfaces and concise benefit-led copy.

4. **Share the bill, not the headache**
   - Demonstrates itemized bill splitting and the owed/receivable view.
   - Explains that Pip keeps track of who owes whom after a split.

5. **See the whole picture**
   - Connects transaction history and the net-worth overview.
   - Demonstrates assets, liabilities, and financial history without implying investment advice.

6. **Your month, reflected back**
   - Introduces the monthly recap as a concise reflection on recorded activity.
   - Avoids judgmental language and unsupported claims.

7. **Build the habit your way**
   - Introduces logging streaks and mascot customization.
   - This is the first section where the mascot becomes visually prominent.

8. **Privacy and trust**
   - Uses a concise “Your ledger stays yours” message.
   - States that the ledger is local-first and that no account is required.
   - Explains optional AI processing accurately and avoids absolute “nothing ever leaves your device” language.

9. **Closing section**
   - Repeats the Google Play availability badge.
   - Provides a real button to `/faq`.
   - Provides a “Connect with us” button linking to `https://www.instagram.com/pipsavings/`.

10. **Footer**
    - Contains compact navigation, FAQ, and Instagram links.

## Visual direction

The selected direction is **calm editorial fintech**.

- Warm ivory replaces stark white as the main canvas.
- Deep forest green anchors navigation, buttons, headings, and phone-frame details.
- Soft sage surfaces separate chapters.
- Muted blue and coral accents may be drawn from authentic app screenshots.
- Space Grotesk is used for expressive headlines and financial figures.
- Hanken Grotesk is used for body copy and interface labels.
- Layouts use large type, generous whitespace, restrained rounded geometry, and strong alignment.
- Authentic screenshots appear in dimensional but understated phone frames.
- The mascot does not appear in the hero. It is introduced in the streak and customization chapter.

The design must avoid neon fintech gradients, excessive glassmorphism, floating currency or crypto motifs, generic Bento grids, and constant decorative motion.

## Screenshot strategy

Screenshots will be sourced from `/home/yang/Project/PipFinance`. Existing screenshot directories and current app surfaces will be reviewed to select the clearest representation of each feature.

The final images must show authentic Pip interfaces with curated fictional data. They must not expose real names, accounts, API keys, or financial records. Any required recapture or light preparation must preserve the real interface rather than replacing it with a stylized approximation.

Likely source areas include:

- `docs/screenshots` for Home, Ask Pip, capture, breakdown, net worth, and owed screens.
- `promo-video/assets/screenshots` and `promo-video/assets/real_ui` for bill splitting, receipt capture, net worth, and other polished product views.
- Current app screens when an existing asset does not accurately represent the requested feature.

Images below the fold will be optimized and lazy-loaded. Alternative text will describe the product function shown rather than repeating surrounding marketing copy.

## Hero interaction

The hero phone demonstrates a complete Ask Pip command-to-result flow.

1. The input types: “Show me transactions from the last 10 days”.
2. The command is sent.
3. Pip responds briefly: “Here are your last 10 days.”
4. The phone transitions to the authentic transaction-history screen with the corresponding date filter applied.
5. The sequence ends on the filtered history screen, pauses comfortably, and resets only while the hero is visible.

The animation should suggest deliberate typing rather than mechanically revealing every character at a constant speed. It must not trap focus, intercept scrolling, or replay rapidly.

With reduced motion enabled, the hero shows a static completed prompt and filtered-history composition. With JavaScript unavailable or still loading, the fallback remains a complete and understandable product image.

## Motion system

Motion supports comprehension and hierarchy:

- The hero phone enters with a controlled fade and short positional transition.
- The Ask Pip demonstration uses a staged typing, response, and screen transition.
- Feature chapters reveal through short fades and small slides as they enter the viewport.
- Phone frames may use minimal depth shifts, but no large or continuous parallax.
- The habit section may animate a streak count and show one short mascot customization sequence.
- Buttons use subtle hover, press, and focus feedback.
- Anchor navigation scrolls smoothly unless reduced motion is requested.

All essential content remains visible without animation. Reduced-motion mode removes transform-based entrances, typing playback, autoplay, and depth effects.

## Responsive behavior

- Desktop uses alternating two-column chapters with copy and a large phone or screenshot composition.
- Tablet retains two columns where content remains legible and stacks denser chapters when necessary.
- Mobile uses a single-column narrative with copy preceding the related screenshot.
- Phone frames never cause horizontal scrolling and remain large enough for important UI text to be recognizable.
- Navigation, buttons, and menu controls meet accessible target sizes.
- The closing actions stack cleanly on narrow screens.

## Technical architecture

The project will use React, Vite, and TypeScript.

The implementation will favor focused components with stable inputs:

- App shell and route configuration.
- Header and mobile navigation.
- Hero with an isolated, deterministic demo sequence.
- Reusable feature-chapter layout supporting left/right media placement.
- Reusable phone-frame and screenshot components.
- Trust section, closing call-to-action section, and footer.
- FAQ placeholder route.

Animation state remains local to the component that owns it. The hero sequence will pause when not visible and will not expose global timers. Screenshot metadata will be modeled as structured data so the selected asset, alternative text, alignment, and visual treatment remain easy to audit.

Styling will use a compact token system for colors, typography, spacing, radii, shadows, and motion timing. Dependencies will remain minimal; a motion library will be added only when it materially simplifies accessible sequencing compared with CSS and browser APIs.

## External links and actions

- “Explore what Pip can do” scrolls to the beginning of the feature narrative.
- “FAQ” and the closing FAQ button navigate to `/faq`.
- “Connect with us” opens `https://www.instagram.com/pipsavings/` using safe external-link behavior.
- The Google Play badge is visually present but non-interactive until a store URL exists.

No control may look clickable while silently doing nothing. The non-interactive Google Play badge must be styled and labeled as an availability mark rather than a button.

## Error and fallback behavior

- Missing screenshots degrade to intentional neutral placeholders during development and must be treated as build-blocking before delivery.
- Animation failures leave the final static state visible.
- The FAQ route works on direct load in the configured deployment environment.
- External-link behavior uses standard browser navigation and does not require the Instagram app.
- Content remains readable when custom fonts are delayed or unavailable.

## Accessibility

- Semantic landmarks and a logical heading hierarchy.
- Keyboard-accessible navigation and mobile menu.
- Clearly visible focus states.
- Sufficient text and control contrast against ivory, sage, and forest surfaces.
- Descriptive screenshot alternative text.
- Decorative frames and motion layers hidden from assistive technology.
- Reduced-motion support for both CSS and scripted effects.
- No critical information conveyed by color or animation alone.

## Verification

Before completion, verify:

- TypeScript and production builds pass.
- Both `/` and `/faq` render on direct navigation.
- Header anchors, FAQ links, Instagram links, and the hero scroll action work.
- The hero types the agreed prompt, shows the response, and ends on filtered transaction history.
- The hero pauses offscreen and has a complete reduced-motion state.
- Screenshot assets load, are privacy-safe, and remain legible at representative breakpoints.
- Layouts have no unintended horizontal overflow at mobile, tablet, laptop, and wide-desktop sizes.
- Keyboard navigation, focus visibility, heading structure, and image alternative text are sound.
- The site remains understandable when animations are disabled.

## Deferred work

- Adding a live Google Play destination.
- Populating the FAQ with real questions and answers.
- Adding newsletter, waitlist, analytics, pricing, testimonials, or additional social networks.
- Localization beyond the initial English experience.
