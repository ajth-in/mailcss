import type { Config } from "../types/config";
import type { SystemProperties } from "../types/style-props";
import { propsToType } from "../can-i-email/maps/props-to-type";
import { camelToKebab } from "../utils/camel-to-kebab";
import { reportCompatibilityIssues } from "./report-compatibility-issues";
import { resolveToken } from "./resolve-token";

const typeCategoryMap = propsToType as Record<string, string>;

const SHORTHANDS: Record<string, { expansion: string[]; category: string }> = {
  marginX: { expansion: ["marginLeft", "marginRight"], category: "spacing" },
  marginY: { expansion: ["marginTop", "marginBottom"], category: "spacing" },
  paddingX: { expansion: ["paddingLeft", "paddingRight"], category: "spacing" },
  paddingY: { expansion: ["paddingTop", "paddingBottom"], category: "spacing" },
  borderTopRadius: {
    expansion: ["borderTopLeftRadius", "borderTopRightRadius"],
    category: "radii",
  },
  borderRightRadius: {
    expansion: ["borderTopRightRadius", "borderBottomRightRadius"],
    category: "radii",
  },
  borderBottomRadius: {
    expansion: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    category: "radii",
  },
  borderLeftRadius: {
    expansion: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    category: "radii",
  },
};

export const css =
  <T extends Config>(config: T) =>
  (styles: SystemProperties<T>): Record<string, any> | string => {
    const resolvedStyles: Record<string, any> = {};

    Object.entries(styles).forEach(([prop, value]) => {
      reportCompatibilityIssues(config, prop, value);
      if (value === undefined || value === null) return;

      const shorthand = SHORTHANDS[prop];
      if (shorthand) {
        shorthand.expansion.forEach((targetProp) => {
          resolvedStyles[targetProp] = resolveToken(config, shorthand.category, value as string);
        });
        return;
      }

      const kebabProp = camelToKebab(prop);
      const category = typeCategoryMap[kebabProp];
      resolvedStyles[prop] = category ? resolveToken(config, category, value as string) : value;
    });

    if (config.cssReturnType === "raw") {
      return Object.entries(resolvedStyles)
        .map(([prop, value]) => `${camelToKebab(prop)}: ${value};`)
        .join(" ");
    }

    return resolvedStyles;
  };
