import { defineConfig } from "../src/config";

const { css } = defineConfig({
  extended: {
    theme: {
      tokens: {
        colors: {
          black: {
            sa: {
              value: "#00f",
            },
          },
          primary: {
            value: "#f00",
          },
        },
      },
    },
  },
});

export default css;
