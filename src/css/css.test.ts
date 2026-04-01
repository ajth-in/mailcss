import { expect, test, describe } from "vite-plus/test";
import { defineConfig } from "../config";

describe("css function", () => {
  test("should resolve theme tokens in jsx mode (default)", () => {
    const { css } = defineConfig({
      extended: {
        theme: {
          tokens: {
            colors: {
              customBrand: { value: "#2754C5" },
            },
            spacing: {
              customContainer: { value: "20px" },
            },
          },
        },
      },
      cssReturnType: "jsx",
    });

    const styles = css({
      backgroundColor: "customBrand",
      padding: "customContainer",
      fontSize: "16px",
    }) as any;

    expect(styles).toEqual({
      backgroundColor: "#2754C5",
      padding: "20px",
      fontSize: "16px",
    });
  });

  test("should resolve theme tokens in raw mode", () => {
    const { css } = defineConfig({
      extended: {
        theme: {
          tokens: {
            colors: {
              customBrand: { value: "#2754C5" },
            },
          },
        },
      },
      cssReturnType: "raw",
    });

    const styles = css({
      backgroundColor: "customBrand",
      color: "blue.500",
    }) as string;

    expect(styles).toContain("background-color: #2754C5;");
    // blue.500 in default theme is #2BDAE0
    expect(styles).toContain("color: #2BDAE0;");
  });

  test("should handle missing tokens by returning the literal value", () => {
    const { css } = defineConfig({
      cssReturnType: "jsx",
    });

    const styles = css({
      backgroundColor: "non-existent",
    }) as any;

    expect(styles.backgroundColor).toBe("non-existent");
  });

  test("should return kebab-case keys in raw mode", () => {
    const { css } = defineConfig({
      cssReturnType: "raw",
    });

    const styles = css({
      backgroundColor: "red.500",
      fontSize: "12px",
    }) as string;

    expect(styles).toBe("background-color: #FA0054; font-size: 12px;");
  });

  test("should handle null or undefined values by omitting them", () => {
    const { css } = defineConfig({
      cssReturnType: "jsx",
    });

    const styles = css({
      backgroundColor: "red.500",
      color: undefined,
      margin: null as any,
    }) as any;

    expect(styles).toEqual({
      backgroundColor: "#FA0054",
    });
  });
});
