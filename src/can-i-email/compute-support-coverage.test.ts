import { expect, test } from "vite-plus/test";
import { computeSupportCoverage } from "./compute-support-coverage";

test("computeSupportCoverage should calculate percentages correctly", () => {
  const stats = {
    "apple-mail": {
      macos: { "12.2": "y" },
      ios: { "10.3": "y", "12.3.1": "y" },
    },
    gmail: {
      "desktop-webmail": { "2019-07": "n #6" },
      ios: { "2019-07": "n" },
      android: { "2019-07": "n" },
      "mobile-webmail": { "2020-02": "n" },
    },
    orange: {
      "desktop-webmail": { "2019-05": "a #2", "2021-03": "n #7", "2024-03": "n" },
      ios: { "2019-07": "y", "2024-03": "n" },
      android: { "2019-07": "a #1", "2024-04": "n" },
    },
  };

  const result = computeSupportCoverage(stats);

  expect(result.support).toBeCloseTo(28.57, 1);
  expect(result.partial).toBeCloseTo(14.28, 1);
  expect(result.notSupported).toBeCloseTo(57.14, 1);
});

test("computeSupportCoverage should return 0s for empty stats", () => {
  const result = computeSupportCoverage({});
  expect(result).toEqual({
    support: 0,
    partial: 0,
    notSupported: 0,
  });
});

test("computeSupportCoverage should handle status symbols with qualifiers", () => {
  const stats = {
    test: {
      platform: {
        "1.0": "y #1",
        "2.0": "a #2",
        "3.0": "n #3",
      },
    },
  };
  const result = computeSupportCoverage(stats);
  expect(result.support).toBeCloseTo(33.33, 1);
  expect(result.partial).toBeCloseTo(33.33, 1);
  expect(result.notSupported).toBeCloseTo(33.33, 1);
});
