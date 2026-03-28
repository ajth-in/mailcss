import type { LayoutProperties } from "./layout";
import type { FlexboxProperties } from "./flexbox";
import type { SizingProperties } from "./sizing";
import type { SpacingProperties } from "./spacing";
import type { TypographyProperties } from "./typography";
import type { BackgroundProperties } from "./background";
import type { BorderProperties } from "./border";
import type { EffectProperties } from "./effect";
import type { OtherProperties } from "./other";

export * from "./types";
export * from "./layout";
export * from "./flexbox";
export * from "./sizing";
export * from "./spacing";
export * from "./typography";
export * from "./background";
export * from "./border";
export * from "./effect";
export * from "./other";

export interface SystemProperties<T = any>
  extends LayoutProperties<T>,
    FlexboxProperties<T>,
    SizingProperties<T>,
    SpacingProperties<T>,
    TypographyProperties<T>,
    BackgroundProperties<T>,
    BorderProperties<T>,
    EffectProperties<T>,
    OtherProperties<T> {}
