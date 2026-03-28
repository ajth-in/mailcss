import type { ConditionalValue } from "../theme/condition";
import type { AnyString, PropertyValue } from "./types";

export interface OtherProperties<T = any> {
  cursor?: PropertyValue<T, "cursor">;
  pointerEvents?: AnyString;
  userSelect?: AnyString;
}
