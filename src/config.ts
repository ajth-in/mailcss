import type { Config } from "./types/config";
import type { SystemProperties } from "./types/theme/style-props";
import { defaultTheme } from "./types/theme/default";



function deepMerge(target: any, source: any): any {
  if (
    typeof target !== "object" ||
    target === null ||
    typeof source !== "object" ||
    source === null
  ) {
    return source;
  }

  const result = { ...target };

  Object.keys(source).forEach((key) => {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (result[key] && typeof result[key] === "object") {
        result[key] = deepMerge(result[key], source[key]);
      } else {
        result[key] = source[key];
      }
    } else {
      result[key] = source[key];
    }
  });

  return result;
}

const propertyCategoryMap: Record<string, string> = {
  // Spacing
  margin: "spacing",
  marginTop: "spacing",
  marginRight: "spacing",
  marginBottom: "spacing",
  marginLeft: "spacing",
  marginX: "spacing",
  marginY: "spacing",
  padding: "spacing",
  paddingTop: "spacing",
  paddingRight: "spacing",
  paddingBottom: "spacing",
  paddingLeft: "spacing",
  paddingX: "spacing",
  paddingY: "spacing",
  gap: "spacing",
  rowGap: "spacing",
  columnGap: "spacing",
  top: "spacing",
  right: "spacing",
  bottom: "spacing",
  left: "spacing",

  // Sizing
  width: "sizes",
  height: "sizes",
  minWidth: "sizes",
  maxWidth: "sizes",
  minHeight: "sizes",
  maxHeight: "sizes",
  flexBasis: "sizes",

  // Typography
  color: "colors",
  backgroundColor: "colors",
  borderColor: "colors",
  borderTopColor: "colors",
  borderRightColor: "colors",
  borderBottomColor: "colors",
  borderLeftColor: "colors",
  caretColor: "colors",
  columnRuleColor: "colors",
  outlineColor: "colors",
  textDecorationColor: "colors",
  fill: "colors",
  stroke: "colors",

  fontSize: "fontSizes",
  fontWeight: "fontWeights",
  fontFamily: "fonts",
  lineHeight: "lineHeights",
  letterSpacing: "letterSpacings",

  // Borders
  borderRadius: "radii",
  borderTopLeftRadius: "radii",
  borderTopRightRadius: "radii",
  borderBottomLeftRadius: "radii",
  borderBottomRightRadius: "radii",
  borderTopRadius: "radii",
  borderRightRadius: "radii",
  borderBottomRadius: "radii",
  borderLeftRadius: "radii",

  borderWidth: "borderWidths",
  borderTopWidth: "borderWidths",
  borderRightWidth: "borderWidths",
  borderBottomWidth: "borderWidths",
  borderLeftWidth: "borderWidths",

  border: "borders",
  borderTop: "borders",
  borderRight: "borders",
  borderBottom: "borders",
  borderLeft: "borders",

  // Effects
  boxShadow: "shadows",
  opacity: "opacity",
  zIndex: "zIndex",
  cursor: "cursor",

  // Animations
  animation: "animations",
  animationDuration: "durations",
  animationTimingFunction: "easings",
};

export function defineConfig<T extends Config>(config: T) {
  const { extended, ...rest } = config;

  const mergedConfig: Config = {
    supportThreshold: "75",
    validationMode: "warn",
    ...rest,
    extended: {
      ...extended,
      theme: extended?.theme ? deepMerge(defaultTheme, extended.theme) : defaultTheme,
    },
  };

  const resolveToken = (category: string, tokenPath: string) => {
    const tokens = (mergedConfig.extended?.theme?.tokens as any)?.[category] || {};
    const semanticTokens = (mergedConfig.extended?.theme?.semanticTokens as any)?.[category] || {};

    const getVal = (obj: any, path: string): any => {
      const keys = path.split(".");
      let val = obj;
      for (const key of keys) {
        val = val?.[key];
      }
      return val?.value;
    };

    return getVal(tokens, tokenPath) || getVal(semanticTokens, tokenPath) || tokenPath;
  };

  const css = (styles: SystemProperties<T>) => {
    const resolvedStyles: Record<string, any> = {};

    Object.entries(styles).forEach(([prop, value]) => {
      if (value === undefined || value === null) return;

      // Handle custom shorthands
      if (prop === "marginX") {
        resolvedStyles.marginLeft = resolveToken("spacing", value as string);
        resolvedStyles.marginRight = resolveToken("spacing", value as string);
      } else if (prop === "marginY") {
        resolvedStyles.marginTop = resolveToken("spacing", value as string);
        resolvedStyles.marginBottom = resolveToken("spacing", value as string);
      } else if (prop === "paddingX") {
        resolvedStyles.paddingLeft = resolveToken("spacing", value as string);
        resolvedStyles.paddingRight = resolveToken("spacing", value as string);
      } else if (prop === "paddingY") {
        resolvedStyles.paddingTop = resolveToken("spacing", value as string);
        resolvedStyles.paddingBottom = resolveToken("spacing", value as string);
      } else if (prop === "borderTopRadius") {
        resolvedStyles.borderTopLeftRadius = resolveToken("radii", value as string);
        resolvedStyles.borderTopRightRadius = resolveToken("radii", value as string);
      } else if (prop === "borderRightRadius") {
        resolvedStyles.borderTopRightRadius = resolveToken("radii", value as string);
        resolvedStyles.borderBottomRightRadius = resolveToken("radii", value as string);
      } else if (prop === "borderBottomRadius") {
        resolvedStyles.borderBottomLeftRadius = resolveToken("radii", value as string);
        resolvedStyles.borderBottomRightRadius = resolveToken("radii", value as string);
      } else if (prop === "borderLeftRadius") {
        resolvedStyles.borderTopLeftRadius = resolveToken("radii", value as string);
        resolvedStyles.borderBottomLeftRadius = resolveToken("radii", value as string);
      } else {
        const category = propertyCategoryMap[prop];
        resolvedStyles[prop] = category ? resolveToken(category, value as string) : value;
      }
    });

    return resolvedStyles;
  };

  return { config: mergedConfig, css };
}
