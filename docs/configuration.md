# Configuration Reference

MailCSS is highly configurable, allowing you to tailor the CSS compatibility validation and the design system tokens to your project's needs.

## `validationMode`

Defines how MailCSS should report compatibility issues or invalid styles.

- **`"warn"`** (default): Logs issues to the console with color-coded severity but doesn't stop the build.
- **`"error"`**: Throws an error, halting execution if unsupported styles are used.
- **`"none"`**: Disables console reporting entirely.

```typescript
const { css } = defineConfig({
  validationMode: "error",
});
```

---

## `supportThreshold`

Sets the global requirements for CSS feature support based on data from [Can I Email](https://www.caniemail.com/).

- **`threshold`** (number, default: `50`): The minimum percentage of "Full Support" required across all tracked email clients.
- **`includePartialSupport`** (boolean, default: `false`): If true, "Partial Support" percentages are added to the total support score when validating.

```typescript
const { css } = defineConfig({
  supportThreshold: {
    threshold: 90,
    includePartialSupport: true,
  },
});
```

---

## `strictTokens`

Enforces the use of your design system's tokens.

- **`true`**: Any CSS property that has defined tokens will _only_ accept those token names as valid values. Arbitrary strings or colors will trigger validation issues.
- **`false`** (default): Allows both tokens and arbitrary values.

```typescript
const { css } = defineConfig({
  strictTokens: true,
});
```

---

## `reportCompatibilityIssues`

Enables or disables the style compatibility reporting process entirely.

- **`true`** (default): Validates CSS against "Can I Email" data based on `validationMode` and `supportThreshold`.
- **`false`**: Disables all compatibility checks and console reporting.

```typescript
const { css } = defineConfig({
  reportCompatibilityIssues: false,
});
```

---

## `cssReturnType`

Defines the output format of the `css` function.

- **`"jsx"`** (default): Returns a React-compatible style object (e.g., `{ backgroundColor: 'blue', color: 'white' }`).
- **`"raw"`**: Returns a semicolon-separated CSS string (e.g., `"background-color: blue; color: white;"`). Ideal for native HTML `style` attributes.

```typescript
const { css } = defineConfig({
  cssReturnType: "raw",
});
```

---

## `extended`

This is where you define your theme, including tokens and semantic aliases.

### `theme`

The theme object contains two main sections:

1.  **`tokens`**: Base values like colors, spacing, and font sizes.
2.  **`semanticTokens`**: Role-based values that can reference base tokens using the `{path}` syntax.

For a deep dive into the theming system, see the [Theming Guide](theming.md).

```typescript
const { css } = defineConfig({
  extended: {
    theme: {
      tokens: {
        colors: {
          brand: { blue: { value: "#2754C5" } },
        },
      },
      semanticTokens: {
        colors: {
          button: { primary: { value: "{brand.blue}" } },
        },
      },
    },
  },
});
```
