import type { Theme } from "./theme";

export const defaultTheme: Theme = {
  tokens: {
    colors: {
      black: { value: "#000000" },
      white: { value: "#ffffff" },
    },
    spacing: {
      "0": { value: "0px" },
      "1": { value: "4px" },
      "2": { value: "8px" },
      "3": { value: "12px" },
      "4": { value: "16px" },
      "5": { value: "20px" },
      "6": { value: "24px" },
      "8": { value: "32px" },
      "10": { value: "40px" },
      "12": { value: "48px" },
      "16": { value: "64px" },
      "20": { value: "80px" },
      "24": { value: "96px" },
    },
    fontSizes: {
      xs: { value: "12px" },
      sm: { value: "14px" },
      md: { value: "16px" },
      lg: { value: "18px" },
      xl: { value: "20px" },
      "2xl": { value: "24px" },
      "3xl": { value: "30px" },
      "4xl": { value: "36px" },
    },
    fontWeights: {
      normal: { value: 400 },
      medium: { value: 500 },
      semibold: { value: 600 },
      bold: { value: 700 },
    },
    lineHeights: {
      none: { value: 1 },
      tight: { value: 1.25 },
      normal: { value: 1.5 },
      relaxed: { value: 1.625 },
      loose: { value: 2 },
    },
  },
};
