import type { Theme } from "./theme";

export type ValidationMode = "warn" | "error" | "none";

export type EmailClientSupportThreshold = { threshold: number; includePartialSupport: boolean };

export interface Config {
  extended?: {
    theme?: Theme;
  };

  /**
   * Minimum email client support required for a CSS property to be allowed
   * will be taken from @link https://www.caniemail.com/api/data.json
   * @default "{threshold: 50, includePartialSupport: false}"
   */
  supportThreshold?: EmailClientSupportThreshold;

  /**
   * Behavior when encountering invalid / unsupported styles
   * @default "warn"
   */
  validationMode?: ValidationMode;

  /**
   * Whether to only allow tokens for properties that support them.
   * @default false
   */
  strictTokens?: boolean;

  /**
   * Whether to report CSS compatibility issues based on "Can I Email" data.
   * @default true
   */
  reportCompatibilityIssues?: boolean;

  /**
   * Defines the output format of the `css` function.
   * - `raw`: Returns a semicolon-separated CSS string.
   * - `jsx`: Returns a React-compatible style object.
   * @default "jsx"
   */
  cssReturnType?: "raw" | "jsx";
}
