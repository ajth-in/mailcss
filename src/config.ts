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

  const css = (styles: SystemProperties<T>) => styles;
  return { config: mergedConfig, css };
}
