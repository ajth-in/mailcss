# Theming with MailCSS

MailCSS provides a powerful, type-safe theming system that translates your design tokens into email-safe inline styles. This system supports base tokens, semantic references, and cross-token dependencies.

## Core Concepts

The themes are defined using the `defineConfig` function, typically in a dedicated configuration file (e.g., `emails/css.ts`).

### Tokens vs. Semantic Tokens

MailCSS distinguishes between two types of tokens within `extended.theme`:

1.  **Tokens (`tokens`)**: Define your base design values (e.g., specific hex colors, spacing units, font sizes).
2.  **Semantic Tokens (`semanticTokens`)**: Define values by their _role_ in the UI (e.g., `button.primary` instead of `brand.navy`). They often point to base tokens.

### Token References

You can use the `{path.to.token}` syntax to reference other tokens within your configuration. This allows you to build a cohesive design system where changing a base token propagates to all connected semantic roles.

```typescript
// emails/css.ts
import { defineConfig } from "mailcss";

export const { css } = defineConfig({
  extended: {
    theme: {
      tokens: {
        colors: {
          brand: {
            navy: { value: "#252f3d" },
            blue: { value: "#2754C5" },
          },
        },
      },
      semanticTokens: {
        colors: {
          button: {
            primary: { value: "{button.secondary}" }, // Points to another semantic token
            secondary: { value: "{brand.navy}" }, // Points to a base token
          },
        },
      },
    },
  },
});
```

### Safety Features

- **Circular Reference Detection**: MailCSS automatically detects and prevents circular token dependencies (e.g., Token A -> Token B -> Token A), throwing an error if one is found.
- **Recursive Resolution**: Tokens are resolved recursively until a literal value is found.

## How to use in your React Email components

Once configured, the `css` function will automatically resolve these tokens to their final values at runtime:

```tsx
import { css } from "./css";

export default function MyEmail() {
  return (
    <Section style={css({ backgroundColor: "button.primary" })}>
      {/* Resolves to: { backgroundColor: "#252f3d" } */}
      <Text style={css({ color: "brand.blue" })}>Hello World</Text>
    </Section>
  );
}
```

## Supported Token Categories

The following categories are available in the `tokens` and `semanticTokens` objects (as defined in `src/types/theme/data.ts`):

- `colors`
- `spacing`
- `fontSizes`
- `fontWeights`
- `lineHeights`
- `letterSpacings`
- `radii`
- `shadows`
- `borders`
- `borderWidths`
- `aspectRatios`
- `blurs`
- `sizes`
- `easings`
- `durations`
- `opacity`
- `zIndex`
- `cursor`
