import { expect, test, vi, beforeEach } from "vite-plus/test";
import { reportValidity } from "./report-validity";
import { CompatibilityError } from "../exceptions/compatibility-error";

beforeEach(() => {
  vi.restoreAllMocks();
});

test("reportValidity should skip if mode is none", () => {
  const config = { validationMode: "none" as const };
  const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
  reportValidity(config, "accentColor", "red");
  expect(spy).not.toHaveBeenCalled();
});

test("reportValidity should warn if mode is warn and support is below threshold", () => {
  const config = {
    validationMode: "warn" as const,
    supportThreshold: { threshold: 50, includePartialSupport: false },
  };
  const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
  reportValidity(config, "accentColor", "red");
  expect(spy).toHaveBeenCalled();
  const call = spy.mock.calls[0][0] as string;
  expect(call).toContain("accentColor");
  expect(call).toContain("15.2%");
});

test("reportValidity should throw CompatibilityError if mode is error and support is below threshold", () => {
  const config = {
    validationMode: "error" as const,
    supportThreshold: { threshold: 50, includePartialSupport: false },
  };
  expect(() => {
    reportValidity(config, "accentColor", "red");
  }).toThrow(CompatibilityError);
});

test("reportValidity should deduplicate reports using cache", () => {
  const config = {
    validationMode: "warn" as const,
    supportThreshold: { threshold: 50, includePartialSupport: false },
  };
  const spy = vi.spyOn(console, "warn").mockImplementation(() => {});

  reportValidity(config, "accentColor", "red");
  expect(spy).toHaveBeenCalledTimes(1);

  reportValidity(config, "accentColor", "blue");
  expect(spy).toHaveBeenCalledTimes(1);
});

test("reportValidity should validate CSS functions in values", () => {
  const config = {
    validationMode: "warn" as const,
    supportThreshold: { threshold: 50, includePartialSupport: false },
  };
  const spy = vi.spyOn(console, "warn").mockImplementation(() => {});

  reportValidity(config, "backgroundColor", "conic-gradient(red, blue)");

  expect(spy).toHaveBeenCalled();
  const calls = spy.mock.calls.map((c) => c[0] as string);
  expect(calls.some((c) => c.includes("conic-gradient()"))).toBe(true);
});

test("reportValidity should validate multiple functions in one value", () => {
  const config = {
    validationMode: "warn" as const,
    supportThreshold: { threshold: 80, includePartialSupport: false },
  };
  const spy = vi.spyOn(console, "warn").mockImplementation(() => {});

  reportValidity(config, "display", "rgba(0,0,0,0.5) linear-gradient(red, blue)");

  const calls = spy.mock.calls.map((c) => c[0] as string);
  expect(calls.some((c) => c.includes("rgba()"))).toBe(true);
  expect(calls.some((c) => c.includes("linear-gradient()"))).toBe(true);
});

test("reportValidity should validate CSS units in values", () => {
  const config = {
    validationMode: "warn" as const,
    supportThreshold: { threshold: 90, includePartialSupport: false },
  };
  const spy = vi.spyOn(console, "warn").mockImplementation(() => {});

  reportValidity(config, "width", "100vw");

  const calls = spy.mock.calls.map((c) => c[0] as string);
  expect(calls.some((c) => c.includes("vw"))).toBe(true);
});

test("reportValidity should deduplicate units across different props", () => {
  const config = {
    validationMode: "warn" as const,
    supportThreshold: { threshold: 90, includePartialSupport: false },
  };
  const spy = vi.spyOn(console, "warn").mockImplementation(() => {});

  reportValidity(config, "width", "10vw");
  const firstCallCount = spy.mock.calls.length;

  reportValidity(config, "height", "20vw");
  expect(spy.mock.calls.length).toBe(firstCallCount);
});
