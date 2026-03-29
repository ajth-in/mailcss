import type { Config } from "../types/config";
import type { SystemProperties } from "../types/style-props";
import { propertyCategoryMap } from "./property-cat-map";
import { resolveToken } from "./resolve-token";

export const css =
  <T extends Config>(config: T) =>
  (styles: SystemProperties<T>) => {
    const resolvedStyles: Record<string, any> = {};

    Object.entries(styles).forEach(([prop, value]) => {
      console.log(prop, value);
      if (value === undefined || value === null) return;

      if (prop === "marginX") {
        resolvedStyles.marginLeft = resolveToken(config, "spacing", value as string);
        resolvedStyles.marginRight = resolveToken(config, "spacing", value as string);
      } else if (prop === "marginY") {
        resolvedStyles.marginTop = resolveToken(config, "spacing", value as string);
        resolvedStyles.marginBottom = resolveToken(config, "spacing", value as string);
      } else if (prop === "paddingX") {
        resolvedStyles.paddingLeft = resolveToken(config, "spacing", value as string);
        resolvedStyles.paddingRight = resolveToken(config, "spacing", value as string);
      } else if (prop === "paddingY") {
        resolvedStyles.paddingTop = resolveToken(config, "spacing", value as string);
        resolvedStyles.paddingBottom = resolveToken(config, "spacing", value as string);
      } else if (prop === "borderTopRadius") {
        resolvedStyles.borderTopLeftRadius = resolveToken(config, "radii", value as string);
        resolvedStyles.borderTopRightRadius = resolveToken(config, "radii", value as string);
      } else if (prop === "borderRightRadius") {
        resolvedStyles.borderTopRightRadius = resolveToken(config, "radii", value as string);
        resolvedStyles.borderBottomRightRadius = resolveToken(config, "radii", value as string);
      } else if (prop === "borderBottomRadius") {
        resolvedStyles.borderBottomLeftRadius = resolveToken(config, "radii", value as string);
        resolvedStyles.borderBottomRightRadius = resolveToken(config, "radii", value as string);
      } else if (prop === "borderLeftRadius") {
        resolvedStyles.borderTopLeftRadius = resolveToken(config, "radii", value as string);
        resolvedStyles.borderBottomLeftRadius = resolveToken(config, "radii", value as string);
      } else {
        const category = propertyCategoryMap[prop];
        resolvedStyles[prop] = category ? resolveToken(config, category, value as string) : value;
      }
    });

    return resolvedStyles;
  };
