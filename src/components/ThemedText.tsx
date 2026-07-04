// src/components/ThemedText.tsx
// -----------------------------------------------------------------------------
// TEXT CU BRANDUL MARINA
// În loc de <Text> gol (font de sistem), folosim <ThemedText>. Îi spui ce
// variantă vrei (h1, body, button...) și aplică automat fontul, mărimea și
// culoarea din temă.
//
// Exemple:
//   <ThemedText variant="h1">Titlu</ThemedText>
//   <ThemedText variant="body" color="dustyRose">Text colorat</ThemedText>
// -----------------------------------------------------------------------------

import { ColorName, colors, textStyles } from "@/theme";
import { Text, TextProps } from "react-native";

// Variantele disponibile — corespund cheilor din textStyles (typography.ts).
type TextVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "bodyMedium"
  | "bodySmall"
  | "caption"
  | "button"
  | "label";

interface ThemedTextProps extends TextProps {
  variant?: TextVariant;
  color?: ColorName;
}

export function ThemedText({
  variant = "body", // implicit: text normal
  color = "ink", // implicit: negrul cald
  style,
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[textStyles[variant], { color: colors[color] }, style]}
      {...rest}
    />
  );
}
