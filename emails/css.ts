import { defineConfig } from "../src/config";

export const { css } = defineConfig({
  validationMode: "warn",
  supportThreshold: { threshold: 90, includePartialSupport: false },
  strictTokens: false,
  extended: {
    theme: {
      tokens: {
        zIndex: {
          popover: { value: "10000" },
        },
        colors: {
          brand: {
            navy: { value: "#252f3d" },
            blue: { value: "#2754C5" },
          },
          gray: {
            "50": { value: "#ffffff" },
            "100": { value: "#eeeeee" },
            "800": { value: "#333333" },
            "900": { value: "#212121" },
          },
        },
        spacing: {
          container: { value: "20px" },
          contentY: { value: "25px" },
          contentX: { value: "35px" },
          section: { value: "20px" },
          heading: { value: "15px" },
          text: { value: "14px" },
        },
        fontSizes: {
          title: { value: "20px" },
          body: { value: "14px" },
          footer: { value: "12px" },
          code: { value: "36px" },
        },
      },
    },
  },
});
