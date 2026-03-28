import { defineConfig } from "./config";

const { css } = defineConfig({
  extended: {
    theme: {
      tokens: {
        colors: {
          black: {
            value: "10px",
          },
          primary: {
            value: "#000",
          },
        },
      },
    },
  },
});

css({ backgroundColor: "primary" });
