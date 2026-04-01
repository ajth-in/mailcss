import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { propsToType } from "./maps/props-to-type";
import { computeSupportCoverage } from "./compute-support-coverage";
import SHORTHANDS from "../css/short-hands";
import { camelToKebab } from "../utils/camel-to-kebab";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MAPS_DIR = path.resolve(__dirname, "./maps");

export interface CanIEmailItem {
  slug: string;
  category: string;
  title: string;
  description: string;
  url: string;
  last_test_date: string;
  stats: Record<string, Record<string, Record<string, string>>>;
  notes_by_num: Record<string, string> | null;
  notes: string | null;
}

interface Coverage {
  support: number;
  partial: number;
  notSupported: number;
}

export interface ProcessedItem {
  slug: string;
  description: string | null;
  url: string;
  last_test_date: string;
  coverage: Coverage;
  notes: string | null;
  type: string;
}

function extractNeededFields(item: CanIEmailItem, propName: string): ProcessedItem {
  const type = (propsToType as any)[propName] || "string";
  return {
    slug: item.slug,
    description: item.description,
    url: item.url,
    last_test_date: item.last_test_date,
    coverage: computeSupportCoverage(item.stats),
    notes: item.notes,
    type,
  };
}

async function run() {
  console.log("Fetching data from caniemail.com...");
  const response = await fetch("https://www.caniemail.com/api/data.json");
  const json = (await response.json()) as { data: CanIEmailItem[] };

  const cssItems = json.data.filter((item) => item.category === "css");

  const cssUnits: Record<string, ProcessedItem> = {};
  const cssFunctions: Record<string, ProcessedItem> = {};
  const cssAtRules: Record<string, ProcessedItem> = {};
  const cssValues: Record<string, ProcessedItem> = {};
  const cssProps: Record<string, ProcessedItem> = {};

  for (const item of cssItems) {
    const title = item.title.trim();
    const slug = item.slug;

    const isUnit = slug.startsWith("css-unit-") && slug !== "css-unit-calc";
    const isFunction =
      slug.startsWith("css-function-") ||
      slug === "css-unit-calc" ||
      slug === "css-linear-gradient" ||
      title.endsWith("()");
    const isPseudo = slug.includes("-pseudo-");
    const isAtRule = title.startsWith("@");
    const isValue = title.includes(":") && !isPseudo;

    let cleanTitle = title;
    if (isUnit) {
      cleanTitle = title.replace(/\sunit$/i, "").trim();
    }
    if (isFunction) {
      const match = title.match(/([a-z-]+)\(\)/i);
      if (match) {
        cleanTitle = `${match[1]}()`;
      }
    }
    if (isValue) {
      // "display: flex" -> "display:flex" (no space)
      cleanTitle = title.replace(/\s*:\s*/, ":").trim();
    }

    // Still skip items with spaces if they are not specifically handled
    if (
      !isUnit &&
      !isFunction &&
      !isAtRule &&
      !isPseudo &&
      !isValue &&
      cleanTitle.includes(" ") &&
      !cleanTitle.includes("&")
    ) {
      continue;
    }

    if (isUnit) {
      cssUnits[cleanTitle] = extractNeededFields(item, cleanTitle);
    } else if (isFunction) {
      cssFunctions[cleanTitle] = extractNeededFields(item, cleanTitle);
    } else if (isAtRule) {
      cssAtRules[cleanTitle] = extractNeededFields(item, cleanTitle);
    } else if (isValue) {
      cssValues[cleanTitle] = extractNeededFields(item, cleanTitle);
    } else if (cleanTitle.includes("&")) {
      const parts = cleanTitle.split("&").map((s) => s.trim());
      for (const part of parts) {
        if (!part.includes(" ")) {
          cssProps[part] = extractNeededFields(item, part);
        }
      }
    } else if (!isPseudo) {
      cssProps[cleanTitle] = extractNeededFields(item, cleanTitle);
    }
  }

  // Supplement missing properties
  for (const prop in propsToType) {
    if (!cssProps[prop]) {
      const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      const longhandCamel = SHORTHANDS[camelProp];

      let baseData = undefined;
      if (longhandCamel) {
        const longhandKebab = camelToKebab(longhandCamel);
        baseData = cssProps[longhandKebab];
      }

      if (baseData) {
        cssProps[prop] = {
          ...baseData,
          type: propsToType[prop],
        };
      } else {
        cssProps[prop] = {
          slug: "",
          description: null,
          url: "",
          last_test_date: "",
          coverage: {
            support: 100,
            partial: 0,
            notSupported: 0,
          },
          notes: null,
          type: (propsToType as any)[prop],
        };
      }
    }
  }

  await fs.mkdir(MAPS_DIR, { recursive: true });

  const files = {
    "properties.ts": { name: "canIEmailCSSProperties", data: cssProps },
    "units.ts": { name: "canIEmailCSSUnits", data: cssUnits },
    "functions.ts": { name: "canIEmailCSSFunctions", data: cssFunctions },
    "at-rules.ts": { name: "canIEmailCSSAtRules", data: cssAtRules },
    "values.ts": { name: "canIEmailCSSValues", data: cssValues },
  };

  for (const [filename, { name, data }] of Object.entries(files)) {
    const filePath = path.join(MAPS_DIR, filename);
    const content = `// This file is auto-generated by src/can-i-email/index.ts
// Do not edit this file manually.

export const ${name} = ${JSON.stringify(data, null, 2)} as const;
`;
    await fs.writeFile(filePath, content, "utf8");
    console.log(`Saved ${filename} to ${MAPS_DIR}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
