import type { Config } from "./types/config";
import { defaultTheme } from "./css/default-theme";
import { css } from "./css";
import { deepMerge } from "./utils/deep-merge";

export function defineConfig<T extends Config>(config: T) {
  const mergedConfig = {
    ...config,
    reportCompatibilityIssues: config.reportCompatibilityIssues ?? true,
    supportThreshold: config.supportThreshold ?? { threshold: 50, includePartialSupport: false },
    validationMode: config.validationMode ?? "warn",
    cssReturnType: config.cssReturnType ?? "jsx",
    extended: {
      ...config.extended,
      theme: config.extended?.theme ? deepMerge(defaultTheme, config.extended.theme) : defaultTheme,
    },
  } as T;

  return { config: mergedConfig, css: css(mergedConfig) };
}
