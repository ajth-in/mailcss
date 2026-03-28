import type { ConditionalValue } from "../theme/condition";
import type { AnyString, PropertyValue } from "./types";

export interface BorderProperties<T = any> {
  border?: PropertyValue<T, "borders">;
  borderWidth?: PropertyValue<T, "borderWidths">;
  borderStyle?: AnyString;
  borderColor?: PropertyValue<T, "colors">;
  borderRadius?: PropertyValue<T, "radii">;
  borderTopRadius?: PropertyValue<T, "radii">;
  borderRightRadius?: PropertyValue<T, "radii">;
  borderBottomRadius?: PropertyValue<T, "radii">;
  borderLeftRadius?: PropertyValue<T, "radii">;
}
