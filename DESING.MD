# Design System: Editorial Intelligence

## 1. Overview & Creative North Star

### Creative North Star: "The Digital Curator"
This design system moves away from the utility-only "SaaS dashboard" aesthetic and toward a high-end editorial experience. It is designed to feel like a bespoke digital dossier—authoritative, sophisticated, and impeccably organized. We achieve this by rejecting the "boxed-in" layout of traditional platforms in favor of **Layered Depth** and **Asymmetric Balance**.

The system prioritizes breathing room and tonal hierarchy over rigid lines. It treats a user's CV data not as rows in a database, but as a curated story. We utilize intentional white space (negative space) and high-contrast typography to guide the eye through complex evaluations with the ease of reading a premium magazine.

---

## 2. Colors

The color palette is rooted in professional trust but elevated through Material-inspired tonal ranges that allow for sophisticated nesting.

### Core Palette
- **Primary (`#0059bb`)**: Our "Action Blue." Used for high-intent CTAs and active states.
- **Secondary (`#515f74`)**: A muted slate used for supporting information and secondary actions.
- **Tertiary (`#006947`)**: The "High Match" indicator, symbolizing growth and success.
- **Surface (`#f7f9fb`)**: The canvas. A cool, crisp off-white that prevents eye fatigue.

### The "No-Line" Rule
**Traditional 1px solid borders are strictly prohibited for sectioning.** To define boundaries, designers must use background color shifts or tonal transitions.
* *Example:* A `surface-container-low` section (for a sidebar) sitting directly on a `surface` background. The change in hex code is the divider.

### Surface Hierarchy & Nesting
Treat the UI as physical layers. Use the following hierarchy to "lift" content:
1. **Background (`#f7f9fb`)**: The base layer.
2. **Surface Container Low (`#f2f4f6`)**: Secondary groupings (e.g., list backgrounds).
3. **Surface Container Lowest (`#ffffff`)**: The "Paper" layer. Use this for the most important cards to make them pop against the base.

### The "Glass & Gradient" Rule
To add soul to the "Efficient" requirement, use subtle linear gradients for primary buttons (transitioning from `primary` to `primary_container`). For floating modals or navigation overlays, apply **Glassmorphism**: use `surface` at 80% opacity with a `16px` backdrop-blur to maintain context of the layer beneath.

---

## 3. Typography

We utilize **Inter** across all scales, relying on weight and dramatic size shifts rather than different typefaces to establish authority.

* **Display (Display-lg/md/sm)**: Used for Match Scores and Hero headlines. These are large and authoritative, set to Bold weight with slightly tightened letter-spacing (-2%).
* **Headline (Headline-lg/md/sm)**: Used for section titles. These represent the "Editorial" voice—clear, confident, and surrounded by ample padding (`spacing-12` or `16`).
* **Title (Title-lg/md/sm)**: Used for card titles and sub-headers.
* **Body (Body-lg/md)**: Optimized for legibility. Ensure line-height is set to 1.5x for readability in long-form CV feedback.
* **Label (Label-md/sm)**: All-caps or bolded small text for metadata (e.g., "MATCH STATUS").

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through "Tonal Stacking."
* **Level 0**: Base `surface`.
* **Level 1**: `surface-container-low` (for sunken areas like search bars).
* **Level 2**: `surface-container-lowest` (pure white) for cards to create a "raised" effect without a shadow.

### Ambient Shadows
When a floating effect is required (e.g., a dropdown or a primary action card), use **Ambient Shadows**:
* **Blur**: 24px to 48px.
* **Opacity**: 4% - 6%.
* **Color**: Use a tinted shadow (`on-surface` with a hint of `primary`) rather than pure black to keep the UI feeling "airy."

### The "Ghost Border" Fallback
If a container requires a border for accessibility (e.g., an input field), use the **Ghost Border**:
* Token: `outline-variant` (`#c1c6d7`).
* Opacity: 20%.
* Result: A boundary that is felt, not seen.

---

## 5. Components

### Buttons
* **Primary**: Rectangular with `DEFAULT` (0.5rem) roundedness. Uses a subtle gradient. Text is `on-primary`.
* **Secondary**: `surface-container-high` background with `on-surface-variant` text. No border.
* **Tertiary**: Ghost style—text only (`primary` color), becoming `surface-container-low` on hover.

### Cards (The "Editorial Card")
* **Rules**: No borders. No harsh shadows.
* **Styling**: Use `surface-container-lowest` (#ffffff) on top of the `surface` (#f7f9fb) background. Use `spacing-8` internal padding to give content room to breathe.

### Match Score Visualization
Instead of simple bars, use high-contrast circular "Donut" charts or thick, rounded-cap progress indicators.
* **High Match**: `tertiary` (#006947)
* **Medium Match**: `on-secondary-container` (#57657a)
* **Low Match**: `error` (#ba1a1a)

### Input Fields
* Minimalist style. Background is `surface-container-low`. On focus, the background shifts to `surface-container-lowest` with a 1px `primary` Ghost Border.

---

## 6. Do's and Don'ts

### Do
* **DO** use asymmetric layouts. If a list of strengths is on the left, let the right side have more open white space.
* **DO** use `spacing-16` (4rem) between major editorial sections to emphasize the transition of topics.
* **DO** use "Primary Fixed Dim" for hover states on primary actions to create a sophisticated glow.

### Don't
* **DON'T** use 1px solid `#CCCCCC` or `#000000` borders. It breaks the "Digital Curator" aesthetic.
* **DON'T** use standard "Drop Shadows" (high opacity, low blur). They make the UI look dated and "heavy."
* **DON'T** use more than three levels of nesting. If you need more, use a modal (the "Glass" layer) to reset the hierarchy.
* **DON'T** crowd the Match Score. It is the hero of the page; give it at least `spacing-10` of clear space on all sides.