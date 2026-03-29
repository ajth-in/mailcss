import type { Config } from "../types/config";
import { canIEmailCSSProperties } from "../can-i-email/maps/properties";
import { canIEmailCSSFunctions } from "../can-i-email/maps/functions";
import { CompatibilityError } from "../exceptions/compatibility-error";
import type { ProcessedItem } from "../can-i-email";
import * as c from "../utils/console-colors";
import { camelToKebab } from "../utils/camel-to-kebab";

const propertiesMap = canIEmailCSSProperties as Record<string, ProcessedItem>;
const functionsMap = canIEmailCSSFunctions as Record<string, ProcessedItem>;

type ValidationCache = {
  reportedProps: Set<string>;
};

export const reportValidity = <T extends Config>(
  config: T & { __cache?: ValidationCache },
  prop: string,
  value: string,
) => {
  const mode = config.validationMode || "warn";
  if (mode === "none") return;

  config.__cache ??= { reportedProps: new Set() };

  const thresholdConfig = config.supportThreshold || {
    threshold: 50,
    includePartialSupport: false,
  };

  if (!config.__cache.reportedProps.has(prop)) {
    const kebabProp = camelToKebab(prop);
    const data = propertiesMap[kebabProp];

    if (data) {
      const score =
        data.coverage.support + (thresholdConfig.includePartialSupport ? data.coverage.partial : 0);
      if (score < thresholdConfig.threshold) {
        reportItem(mode, prop, score, thresholdConfig.threshold, data, c.blue);
        config.__cache.reportedProps.add(prop);
      }
    }
  }

  const functionMatches = value.matchAll(/([a-z-]+)\(/g);
  for (const match of functionMatches) {
    const funcName = match[1].replace("(", "").replace(")", "");
    const funcKey = `${funcName}()`;
    const cacheKey = `func:${funcKey}`;

    if (config.__cache.reportedProps.has(cacheKey)) continue;

    const data = functionsMap[funcKey];

    if (data) {
      const score =
        data.coverage.support + (thresholdConfig.includePartialSupport ? data.coverage.partial : 0);
      if (score < thresholdConfig.threshold) {
        reportItem(mode, funcKey, score, thresholdConfig.threshold, data, c.magenta);
        config.__cache.reportedProps.add(cacheKey);
      }
    }
  }
};

function reportItem(
  mode: string,
  name: string,
  score: number,
  threshold: number,
  data: ProcessedItem,
  nameColor: (str: string | number) => string,
) {
  const formattedName = nameColor(c.bold(name));
  const scoreColor = score < threshold / 2 ? c.red : c.yellow;
  const formattedScore = scoreColor(`${score.toFixed(1)}%`);
  const formattedThreshold = c.bold(`${threshold}%`);
  const formattedUrl = c.cyan(data.url);

  const message = `${formattedName}: ${formattedScore} (${formattedThreshold}) ${formattedUrl}`;

  if (mode === "error") {
    throw new CompatibilityError(message);
  } else if (mode === "warn") {
    console.warn(`✸ ${message}`);
  }
}
