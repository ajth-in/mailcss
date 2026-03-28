import type { ConditionalValue } from "../theme/condition";
import type { AnyString, PropertyValue } from "./types";

export interface FlexboxProperties<T = any> {
  flex?: AnyString;
  flexDirection?: AnyString;
  alignItems?: AnyString;
  justifyContent?: AnyString;
  gap?: PropertyValue<T, "spacing">;
  columnGap?: PropertyValue<T, "spacing">;
  rowGap?: PropertyValue<T, "spacing">;
}
