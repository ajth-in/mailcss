import type { ConditionalValue } from "./condition";
import type { TokenDataTypes } from "./data";
import { defaultTheme } from "./default";

type DefaultTokens = typeof defaultTheme.tokens;

export type AnyString = string & {};

type TokenKey<T, K extends keyof TokenDataTypes> =
  | (T extends { extended?: { theme?: { tokens?: { [P in K]?: infer V } } } }
      ? RecursiveKeyOf<V>
      : never)
  | (DefaultTokens extends { [P in K]?: infer DV } ? RecursiveKeyOf<DV> : never);

type SemanticTokenKey<T, K extends keyof TokenDataTypes> = T extends {
  extended?: { theme?: { semanticTokens?: { [P in K]?: infer V } } };
}
  ? RecursiveKeyOf<V>
  : never;

type RecursiveKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends { value: any }
          ? K
          : K | `${K}.${RecursiveKeyOf<T[K]>}`
        : never;
    }[keyof T]
  : never;

type PropertyValue<T, K extends keyof TokenDataTypes> = ConditionalValue<
  TokenKey<T, K> | SemanticTokenKey<T, K> | AnyString
>;

export interface SystemProperties<T = any> {
  // Layout
  display?: ConditionalValue<AnyString>;
  position?: ConditionalValue<AnyString>;
  top?: PropertyValue<T, "spacing">;
  bottom?: PropertyValue<T, "spacing">;
  left?: PropertyValue<T, "spacing">;
  right?: PropertyValue<T, "spacing">;
  zIndex?: PropertyValue<T, "zIndex">;

  // Flexbox & Grid
  flex?: ConditionalValue<AnyString>;
  flexDirection?: ConditionalValue<AnyString>;
  alignItems?: ConditionalValue<AnyString>;
  justifyContent?: ConditionalValue<AnyString>;
  gap?: PropertyValue<T, "spacing">;
  columnGap?: PropertyValue<T, "spacing">;
  rowGap?: PropertyValue<T, "spacing">;

  // Sizing
  width?: PropertyValue<T, "sizes">;
  height?: PropertyValue<T, "sizes">;
  minWidth?: PropertyValue<T, "sizes">;
  maxWidth?: PropertyValue<T, "sizes">;
  minHeight?: PropertyValue<T, "sizes">;
  maxHeight?: PropertyValue<T, "sizes">;

  // Spacing
  margin?: PropertyValue<T, "spacing">;
  marginTop?: PropertyValue<T, "spacing">;
  marginRight?: PropertyValue<T, "spacing">;
  marginBottom?: PropertyValue<T, "spacing">;
  marginLeft?: PropertyValue<T, "spacing">;
  marginX?: PropertyValue<T, "spacing">;
  marginY?: PropertyValue<T, "spacing">;
  padding?: PropertyValue<T, "spacing">;
  paddingTop?: PropertyValue<T, "spacing">;
  paddingRight?: PropertyValue<T, "spacing">;
  paddingBottom?: PropertyValue<T, "spacing">;
  paddingLeft?: PropertyValue<T, "spacing">;
  paddingX?: PropertyValue<T, "spacing">;
  paddingY?: PropertyValue<T, "spacing">;

  // Typography
  color?: PropertyValue<T, "colors">;
  fontFamily?: PropertyValue<T, "fonts">;
  fontSize?: PropertyValue<T, "fontSizes">;
  fontWeight?: PropertyValue<T, "fontWeights">;
  lineHeight?: PropertyValue<T, "lineHeights">;
  letterSpacing?: PropertyValue<T, "letterSpacings">;
  textAlign?: ConditionalValue<AnyString>;
  textDecoration?: ConditionalValue<AnyString>;
  textTransform?: ConditionalValue<AnyString>;

  // Background
  background?: PropertyValue<T, "colors">;
  backgroundColor?: PropertyValue<T, "colors">;
  backgroundImage?: PropertyValue<T, "assets">;
  backgroundSize?: ConditionalValue<AnyString>;
  backgroundPosition?: ConditionalValue<AnyString>;
  backgroundRepeat?: ConditionalValue<AnyString>;

  // Borders
  border?: PropertyValue<T, "borders">;
  borderWidth?: PropertyValue<T, "borderWidths">;
  borderStyle?: ConditionalValue<AnyString>;
  borderColor?: PropertyValue<T, "colors">;
  borderRadius?: PropertyValue<T, "radii">;
  borderTopRadius?: PropertyValue<T, "radii">;
  borderRightRadius?: PropertyValue<T, "radii">;
  borderBottomRadius?: PropertyValue<T, "radii">;
  borderLeftRadius?: PropertyValue<T, "radii">;

  // Effects
  opacity?: PropertyValue<T, "opacity">;
  boxShadow?: PropertyValue<T, "shadows">;
  visibility?: ConditionalValue<AnyString>;

  // Others
  cursor?: PropertyValue<T, "cursor">;
  pointerEvents?: ConditionalValue<AnyString>;
  userSelect?: ConditionalValue<AnyString>;
}
