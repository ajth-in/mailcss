# MailCSS

![NPM Version](https://img.shields.io/npm/v/mailcss) ![NPM License](https://img.shields.io/npm/l/mailcss)

MailCSS is a type-safe, compatibility-aware CSS-in-JS library designed specifically for inline styles in emails. it integrates real-time data from "Can I Email" to provide immediate feedback on CSS support across various email clients, ensuring your designs remain consistent and accessible.

## Features

- **Type-Safe Styles**: Fully typed CSS properties that resolve to your design system's tokens.
- **Compatibility Validation**: Real-time identification of CSS properties, values, functions, and units with poor email client support.
- **Automated Metadata**: JSDoc documentation for CSS properties includes live support statistics and direct links to documentation.
- **Shorthand Utilities**: Built-in support for directional shorthands like `marginX`, `paddingY`, and `borderTopRadius`.
- **Customizable Thresholds**: Define your own support requirements for warnings and errors.

## Installation

```bash
npm install mailcss

# or
pnpm add mailcss
```

## Configuration

Initialize your design system and validation settings using `defineConfig`. This function returns a configured `css` function for use in your components.

```typescript
import { defineConfig } from "mailcss";

export const { css } = defineConfig({
  // Behavior when encountering compatibility issues
  validationMode: "warn", // Options: 'warn', 'error', 'none'

  // Global support requirements
  supportThreshold: {
    threshold: 90,
    includePartialSupport: false,
  },

  // Enforce token-only values for supported properties
  strictTokens: false,

  // Extend the default theme with your design system
  extended: {
    theme: {
      tokens: {
        colors: {
          brand: {
            blue: { value: "#2754C5" },
            navy: { value: "#252F3D" },
          },
        },
        spacing: {
          container: { value: "20px" },
        },
      },
    },
  },
});
```

### Config Properties

| Property           | Type      | Description                                                                                                                                |
| :----------------- | :-------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `validationMode`   | `string`  | Defines the reporting behavior (`warn`, `error`, or `none`) when a CSS feature falls below the threshold.                                  |
| `supportThreshold` | `object`  | Specifies the minimum percentage of support required. `includePartialSupport` determines if partial support scores are added to the total. |
| `strictTokens`     | `boolean` | If true, style properties will only accept values defined in your theme tokens, disabling arbitrary string values.                         |
| `extended`         | `object`  | Allows extending or overriding the default theme system with custom tokens and semantic tokens.                                            |

## Usage

Use the generated `css` function within your React Email components.

```tsx
import { css } from "./css";

export default function WelcomeEmail() {
  return (
    <div
      style={css({
        backgroundColor: "brand.navy",
        paddingX: "container",
        color: "#ffffff",
        // This will trigger a warning if 'accentColor' support is below your threshold
        accentColor: "brand.blue",
      })}
    >
      <h1>Welcome</h1>
    </div>
  );
}
```

## Maintenance

To keep your library synchronized with the latest email client compatibility data, use the following maintenance commands:

- `gen-property-map`: Synchronizes local compatibility maps with the latest Can I Email API data.
- `gen-types`: Regenerates the TypeScript style interfaces based on the current maps and theme configuration.
- `prebuild`: Executes both of the above commands sequentially.

```bash
pnpm run prebuild
```
