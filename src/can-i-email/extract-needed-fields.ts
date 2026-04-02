import { propsToType } from "./__generated_maps__/props-to-type";
import { computeSupportCoverage } from "./compute-support-coverage";
import type { CanIEmailItem, ProcessedItem } from "./types";

export function extractNeededFields(item: CanIEmailItem, propName: string): ProcessedItem {
  const type = propsToType[propName] || "string";
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
