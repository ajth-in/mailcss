import type { ConditionalValue } from "../theme/condition";
import type { AnyString, PropertyValue } from "./types";

export interface EffectProperties<T = any> {
  opacity?: PropertyValue<T, "opacity">;
  boxShadow?: PropertyValue<T, "shadows">;
  visibility?: AnyString;
}
