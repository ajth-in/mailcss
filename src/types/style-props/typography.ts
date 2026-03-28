import type { AnyString, PropertyValue } from "./types";

export interface TypographyProperties<T = any> {
  color?: PropertyValue<T, "colors">;
  fontFamily?: PropertyValue<T, "fonts">;
  fontSize?: PropertyValue<T, "fontSizes">;
  fontWeight?: PropertyValue<T, "fontWeights">;
  lineHeight?: PropertyValue<T, "lineHeights">;
  letterSpacing?: PropertyValue<T, "letterSpacings">;
  textAlign?: AnyString;
  textDecoration?: AnyString;
  textTransform?: AnyString;
}
