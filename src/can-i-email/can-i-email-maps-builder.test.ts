import { expect, test, describe, vi } from "vite-plus/test";
import { CanIEmailMapsBuilder } from "./can-i-email-maps-builder";
import type { CanIEmailItem } from "./types";
import fs from "node:fs/promises";

vi.mock("node:fs/promises");

const makeItem = (slug: string, title: string, category = "css"): CanIEmailItem => ({
  slug,
  title,
  category,
  description: "mock",
  url: "mock",
  last_test_date: "2024-01-01",
  stats: {},
  notes_by_num: null,
  notes: null,
});

describe("CanIEmailMapsBuilder", () => {
  test("skips items that are not in the 'css' category", () => {
    const builder = new CanIEmailMapsBuilder();
    builder.processItems([makeItem("html-div", "div", "html")]);

    expect(Object.keys((builder as any).cssProps).length).toBe(0);
  });

  test("processes css units correctly", () => {
    const builder = new CanIEmailMapsBuilder();
    builder.processItems([makeItem("css-unit-px", "px unit"), makeItem("css-unit-em", "em")]);

    const units = (builder as any).cssUnits;
    expect(units).toHaveProperty("px");
    expect(units).toHaveProperty("em");
    expect(units["px"].slug).toBe("css-unit-px");
  });

  test("processes css functions correctly", () => {
    const builder = new CanIEmailMapsBuilder();
    builder.processItems([
      makeItem("css-function-calc", "calc()"),
      makeItem("css-linear-gradient", "linear-gradient()"),
      makeItem("css-function-rgba", "rgba()"),
    ]);

    const functions = (builder as any).cssFunctions;
    expect(functions).toHaveProperty("calc()");
    expect(functions).toHaveProperty("linear-gradient()");
    expect(functions).toHaveProperty("rgba()");
  });

  test("processes css at-rules correctly", () => {
    const builder = new CanIEmailMapsBuilder();
    builder.processItems([makeItem("css-at-rules-media", "@media")]);

    const atRules = (builder as any).cssAtRules;
    expect(atRules).toHaveProperty("@media");
  });

  test("processes css values and properties correctly", () => {
    const builder = new CanIEmailMapsBuilder();
    builder.processItems([
      makeItem("css-property-display", "display"),
      makeItem("css-value-display-flex", "display: flex"),
    ]);

    const props = (builder as any).cssProps;
    const values = (builder as any).cssValues;

    expect(props).toHaveProperty("display");
    expect(values).toHaveProperty("display:flex");
  });

  test("splits titles with multiple properties delimited by ampersand", () => {
    const builder = new CanIEmailMapsBuilder();
    builder.processItems([makeItem("css-flex-properties", "align-items & align-self")]);

    const props = (builder as any).cssProps;
    expect(props).toHaveProperty("align-items");
    expect(props).toHaveProperty("align-self");
  });

  test("ignores invalid spaced items", () => {
    const builder = new CanIEmailMapsBuilder();
    builder.processItems([makeItem("something-spaced", "something with spaces")]);

    const props = (builder as any).cssProps;
    expect(props).not.toHaveProperty("something with spaces");
  });

  test("supplementMissingProperties supplements missing map keys", () => {
    const builder = new CanIEmailMapsBuilder();
    builder.supplementMissingProperties();

    const props = (builder as any).cssProps;
    expect(Object.keys(props).length).toBeGreaterThan(0);
    // e.g. color property must exist
    expect(props["color"]).toBeDefined();
    expect(props["color"].slug).toBe("<could-not-find-can-i-email-entry>");
  });

  test("saveTo creates directory and writes files", async () => {
    const builder = new CanIEmailMapsBuilder();
    const mapsDir = "/tmp/fake-maps";
    await builder.saveTo(mapsDir);

    expect(fs.mkdir).toHaveBeenCalledWith(mapsDir, { recursive: true });
    expect(fs.writeFile).toHaveBeenCalledTimes(5);
  });
});
