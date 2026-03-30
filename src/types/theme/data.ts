import type { Recursive } from "../utils";
import type { Token, SemanticToken } from "./token";

export interface TokenDataTypes {
  cursor: string;
  zIndex: string | number;
  opacity: string | number;
  colors: string;
  fontSizes: string;
  fontWeights: string | number;
  lineHeights: string | number;
  letterSpacings: string;
  sizes: string;
  shadows: string;
  spacing: string | number;
  radii: string;
  borders: string;
  durations: string;
  easings: string | number[];
  blurs: string;
  borderWidths: string;
  aspectRatios: string;
}

export type Tokens = {
  [key in keyof TokenDataTypes]?: Recursive<Token<TokenDataTypes[key]>>;
};

export type SemanticTokens<ConditionKey extends string = string> = {
  [key in keyof TokenDataTypes]?: Recursive<SemanticToken<TokenDataTypes[key], ConditionKey>>;
};
