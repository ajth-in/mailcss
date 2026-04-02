import type { Config } from "../types/config";
import type { SystemProperties } from "../types/style-props";
import { propsToType } from "../can-i-email/__generated_maps__/props-to-type";
import { camelToKebab } from "../utils/camel-to-kebab";
import { reportCompatibilityIssues } from "./report-compatibility-issues";
import { resolveToken } from "./resolve-token";
import SHORTHANDS from "./short-hands";

const typeCategoryMap = propsToType as Record<string, string>;

export const css =
  <T extends Config>(config: T) =>
  (styles: SystemProperties<T>): Record<string, any> => {
    const resolvedStyles: Record<string, any> = {};

    Object.entries(styles).forEach(([_prop, value]) => {
      if (value === undefined || value === null) return;
      reportCompatibilityIssues(config, _prop, value);

      const prop = SHORTHANDS[_prop] || _prop;

      const kebabProp = camelToKebab(prop);
      const category = typeCategoryMap[kebabProp];
      resolvedStyles[prop] = category ? resolveToken(config, category, value) : value;
    });

    return resolvedStyles;
  };
