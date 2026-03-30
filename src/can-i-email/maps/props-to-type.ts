import type { TokenDataTypes } from "../../types/theme";

export const propsToType: Record<string, keyof TokenDataTypes | "string"> = {
  // Background
  background: "colors",
  "background-color": "colors",
  "background-position": "string",
  "background-position-x": "string",
  "background-position-y": "string",
  "background-size": "string",
  "background-repeat": "string",
  "background-repeat-x": "string",
  "background-repeat-y": "string",
  "background-attachment": "string",
  "background-clip": "string",
  "background-origin": "string",
  "background-blend-mode": "string",
  "background-composite": "string",

  // Border
  border: "borders",
  "border-width": "borderWidths",
  "border-style": "string",
  "border-color": "colors",
  "border-radius": "radii",
  "border-top-radius": "radii",
  "border-right-radius": "radii",
  "border-bottom-radius": "radii",
  "border-left-radius": "radii",

  // Effect
  opacity: "opacity",
  "box-shadow": "shadows",

  // Layout
  visibility: "string",
  display: "string",
  position: "string",
  top: "spacing",
  bottom: "spacing",
  left: "spacing",
  right: "spacing",
  "z-index": "zIndex",

  // Flexbox
  flex: "string",
  "flex-direction": "string",
  "align-items": "string",
  "justify-content": "string",
  gap: "spacing",
  "column-gap": "spacing",
  "row-gap": "spacing",

  // Other
  cursor: "cursor",
  "pointer-events": "string",
  "user-select": "string",

  // Sizing
  width: "sizes",
  height: "sizes",
  "min-width": "sizes",
  "max-width": "sizes",
  "min-height": "sizes",
  "max-height": "sizes",

  // Spacing
  margin: "spacing",
  "margin-top": "spacing",
  "margin-right": "spacing",
  "margin-bottom": "spacing",
  "margin-left": "spacing",
  "margin-x": "spacing",
  "margin-y": "spacing",
  padding: "spacing",
  "padding-top": "spacing",
  "padding-right": "spacing",
  "padding-bottom": "spacing",
  "padding-left": "spacing",
  "padding-x": "spacing",
  "padding-y": "spacing",
  "accent-color": "colors",
  // Typography
  color: "colors",
  "font-size": "fontSizes",
  "font-weight": "fontWeights",
  "line-height": "lineHeights",
  "letter-spacing": "letterSpacings",
  "text-align": "string",
  "text-decoration": "string",
  "text-transform": "string",
} as const;

export type PropertyKebabMap = typeof propsToType;
export type KebabStyleProperty = keyof PropertyKebabMap;
