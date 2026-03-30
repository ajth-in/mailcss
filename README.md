# MailCSS

![NPM Version](https://img.shields.io/npm/v/mailcss) ![NPM License](https://img.shields.io/npm/l/mailcss)

MailCSS is a type-safe, compatibility-aware CSS-in-JS library designed specifically for inline styles in emails. It integrates real-time data from [Can I Email](https://www.caniemail.com/) to provide immediate feedback on CSS support across various email clients.

## Installation

```bash
npm install mailcss
# or
pnpm add mailcss
```

## Getting Started

1. **Configure your Design System**: Create a configuration file (e.g., `emails/css.ts`) to define your theme and validation settings.

```typescript
// emails/css.ts
import { defineConfig } from "mailcss";

export const { css } = defineConfig({
  validationMode: "warn",
  extended: {
    theme: {
      tokens: {
        colors: {
          brand: { blue: { value: "#2754C5" } },
        },
      },
    },
  },
});
```

2. **Use it in your components**: Import the generated `css` function to style your React Email components.

```tsx
import { css } from "./css";

export default function MyEmail() {
  return (
    <div style={css({ backgroundColor: "brand.blue", padding: "20px" })}>
      <h1 style={css({ color: "#ffffff", fontSize: "24px" })}>Welcome!</h1>
    </div>
  );
}
```

## Documentation

- [**Configuration Reference**](docs/configuration.md): Detailed information on all configuration options.
- [**Theming Guide**](docs/theming.md): Learn how to build a sophisticated design system with tokens and semantic aliases.
