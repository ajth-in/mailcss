import type { Theme } from "./theme";

export type ValidationMode = "warn" | "error" | "none";

export type EmailClientSupportThreshold = "0" | "50" | "75" | "90" | "100";

export interface Config {
  extended?: {
    theme?: Theme;
  };

  /**
   * Minimum email client support required for a CSS property to be allowed
   * will be taken from @link https://www.caniemail.com/api/data.json
   * @default 75
   */
  supportThreshold?: EmailClientSupportThreshold;

  /**
   * Behavior when encountering invalid / unsupported styles
   * @default "warn"
   */
  validationMode?: ValidationMode;
}
