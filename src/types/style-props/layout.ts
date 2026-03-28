import type { ConditionalValue } from "../theme/condition";
import type { AnyString, PropertyValue } from "./types";

export interface LayoutProperties<T = any> {
  display?: AnyString;
  position?: AnyString;
  top?: PropertyValue<T, "spacing">;
  bottom?: PropertyValue<T, "spacing">;
  left?: PropertyValue<T, "spacing">;
  right?: PropertyValue<T, "spacing">;
  zIndex?: PropertyValue<T, "zIndex">;
}
