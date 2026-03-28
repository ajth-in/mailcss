import type { AnyString, PropertyValue } from "./types";

export interface BackgroundProperties<T = any> {
  background?: PropertyValue<T, "colors"> | AnyString;

  backgroundColor?: PropertyValue<T, "colors">;

  backgroundPosition?: AnyString;
  backgroundPositionX?: AnyString;
  backgroundPositionY?: AnyString;

  backgroundSize?: AnyString;

  backgroundRepeat?: AnyString;
  backgroundRepeatX?: AnyString;
  backgroundRepeatY?: AnyString;

  backgroundAttachment?: AnyString;

  backgroundClip?: AnyString;
  backgroundOrigin?: AnyString;

  backgroundBlendMode?: AnyString;

  backgroundImage?: PropertyValue<T, "assets"> | AnyString;

  backgroundComposite?: AnyString;
}
