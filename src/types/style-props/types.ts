import type { TokenDataTypes } from "../theme/data";
import { defaultTheme } from "../theme/default";

type DefaultTokens = typeof defaultTheme.tokens;

export type AnyString = string & {};

export type TokenKey<T, K extends keyof TokenDataTypes> =
  | (T extends { extended?: { theme?: { tokens?: { [P in K]?: infer V } } } }
      ? RecursiveKeyOf<V>
      : never)
  | (DefaultTokens extends { [P in K]?: infer DV } ? RecursiveKeyOf<DV> : never);

export type SemanticTokenKey<T, K extends keyof TokenDataTypes> = T extends {
  extended?: { theme?: { semanticTokens?: { [P in K]?: infer V } } };
}
  ? RecursiveKeyOf<V>
  : never;

export type RecursiveKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends { value: any }
          ? K
          : K | `${K}.${RecursiveKeyOf<T[K]>}`
        : never;
    }[keyof T]
  : never;

export type PropertyValue<T, K extends keyof TokenDataTypes> =
  | TokenKey<T, K>
  | SemanticTokenKey<T, K>
  | AnyString;
