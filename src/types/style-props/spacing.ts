import type { PropertyValue } from "./types";

export interface SpacingProperties<T = any> {
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
}
