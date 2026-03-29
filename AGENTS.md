# MailCSS Agent Guide

This project is `mailcss`, a type-safe, compatibility-aware CSS-in-JS library specifically designed for React Email. It automates the ingestion of [Can I Email](https://www.caniemail.com/) data to provide real-time feedback on CSS support across various email clients.

## Core Architecture

### 1. Data Pipeline (`src/can-i-email/`)

- **`index.ts`**: Fetches raw data from the Can I Email API.
- **Categorization**: Sorts items into Properties, Units, Functions, At-Rules, and Values (Property:Value pairs).
- **Cleansing**: Normalizes identifiers (e.g., stripping " unit" from units, ensuring no spaces in property-value combinations).
- **Maps**: Generates modular TypeScript maps in `src/can-i-email/maps/` reflecting the latest compatibility data.

### 2. Type System (`src/types/style-props/`)

- **`generate-types.ts`**: A script that reads the generated maps and creates `SystemProperties` in `index.ts`.
- **JSDoc Enrichment**: Every CSS property in the interface includes:
  - Description and "Can I Email" URL.
  - Live support statistics (% supported, % partial, % not supported).
  - `@deprecated` tag if support is below a configurable threshold (default 40%).
- **Token Awareness**: Types are generics (`SystemProperties<T>`) that resolve to your theme's custom tokens.

### 3. Runtime Validator (`src/css/report-validity.ts`)

- **Multi-Tier Validation**: When styles are processed, it checks:
  1. **Property Compatibility** (e.g., is `accent-color` supported?).
  2. **Value Combinations** (e.g., is `display:grid` supported?).
  3. **CSS Functions** (e.g., are `calc()`, `min()`, `clamp()` supported?).
  4. **CSS Units** (e.g., are `vw`, `rem`, `ch` supported?).
- **Feedback**: Reports issues to the console with color-coded severity (Blue for props, Yellow for values, Magenta for functions, Green for units).
- **Deduplication**: Uses a lazy-initialized cache on the config object to ensure each warning is only logged once per generation.

### 4. Style Engine (`src/css/`)

- **Token Resolution**: Recursively resolves values against the theme defined in `defineConfig`.
- **Shorthand Expansion**: Declaratively expands logic for directional utilities like `marginX`, `paddingY`, and `borderTopRadius`.

## Developer Workflow

### Maintenance Commands

- `pnpm run gen-property-map`: Sync local maps with the latest Can I Email API data.
- `pnpm run gen-types`: Regenerate the `SystemProperties` interface based on current maps.
- `pnpm run prebuild`: Runs both of the above. Always run this after modifying `src/can-i-email/maps/props-to-type.ts`.

### Configuration

Use `defineConfig` to set up your email design system:

```typescript
const { css } = defineConfig({
  validationMode: "warn", // "warn" | "error" | "none"
  supportThreshold: { threshold: 90, includePartialSupport: false },
  strictTokens: false,
  extended: {
    theme: {
      tokens: {
        colors: { brand: { blue: { value: "#2754C5" } } },
        // ... other tokens
      },
    },
  },
});
```

## Guiding Principles for Agents

1. **Don't ignore the warnings**: They represent real-world email client support issues.
2. **Consult the URLs**: Every warning includes a link to the Can I Email feature page for detailed client-specific notes.
3. **Prefer Tokens**: Use the theme system instead of hardcoded hex colors or pixel values to maintain type safety and consistency.
4. **Update Metadata if needed**: If a new CSS property isn't being caught or has wrong types, update `src/can-i-email/maps/props-to-type.ts` and run `pnpm run prebuild`.
