import type { PropertyValue } from "./types";

export interface SizingProperties<T = any> {
  width?: PropertyValue<T, "sizes">;
  height?: PropertyValue<T, "sizes">;
  minWidth?: PropertyValue<T, "sizes">;
  maxWidth?: PropertyValue<T, "sizes">;
  minHeight?: PropertyValue<T, "sizes">;
  maxHeight?: PropertyValue<T, "sizes">;
}
