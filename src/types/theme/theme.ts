import type { Tokens, SemanticTokens } from "./data";
import type { TextStyles } from "./text";

export interface Theme {
  /**
   * The design tokens for your project.
   */
  tokens?: Tokens;
  /**
   * The semantic design tokens for your project.
   */
  semanticTokens?: SemanticTokens;
  /**
   * The typography styles for your project.
   */
  textStyles?: TextStyles;
}
