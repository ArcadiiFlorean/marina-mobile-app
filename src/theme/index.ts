// src/theme/index.ts
// -----------------------------------------------------------------------------
// PUNCTUL UNIC DE IMPORT PENTRU TEMĂ
// import { colors, spacing, textStyles } from "@/theme";
// -----------------------------------------------------------------------------

export { colors } from "./colors";
export type { ColorName } from "./colors";

export { spacing, radius, shadows } from "./spacing";
export type { SpacingKey, RadiusKey } from "./spacing";

export { fonts, fontSize, lineHeight, textStyles } from "./typography";

import { colors } from "./colors";
import { spacing, radius, shadows } from "./spacing";
import { fonts, fontSize, lineHeight, textStyles } from "./typography";

export const theme = {
  colors,
  spacing,
  radius,
  shadows,
  fonts,
  fontSize,
  lineHeight,
  textStyles,
} as const;

export type Theme = typeof theme;