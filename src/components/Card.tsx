// src/components/Card.tsx
// -----------------------------------------------------------------------------
// CARD — containerul cu colțuri rotunjite și umbră subtilă.
// Îl folosim peste tot: articole (Ghiduri), rețete (Hrănire), cardul de
// consultație, cardul de comunitate.
//
// Dacă îi dai `onPress`, devine apăsabil (cu feedback tactil) — util pt.
// carduri de articol pe care apeși ca să le deschizi. Fără `onPress`, e un
// container static.
//
// Exemple:
//   <Card><ThemedText>...</ThemedText></Card>
//   <Card onPress={() => router.push("/articol/1")}>...</Card>
//   <Card variant="beige">...</Card>   // fundal beige în loc de alb
// -----------------------------------------------------------------------------

import { ReactNode } from "react";
import { Pressable, View, StyleSheet, ViewStyle } from "react-native";
import { colors, radius, spacing, shadows } from "@/theme";

type CardVariant = "white" | "beige" | "rose";

interface CardProps {
  children: ReactNode;
  onPress?: () => void;      // dacă e dat, cardul devine apăsabil
  variant?: CardVariant;     // culoarea de fundal
  style?: ViewStyle;
}

export function Card({
  children,
  onPress,
  variant = "white",
  style,
}: CardProps) {
  const cardStyle = [styles.base, variantStyles[variant], style];

  // Card apăsabil (are onPress) → Pressable cu feedback la apăsare.
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          ...cardStyle,
          pressed && styles.pressed, // se estompează ușor la apăsare
        ]}
      >
        {children}
      </Pressable>
    );
  }

  // Card static (fără onPress) → View simplu.
  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadows.card, // umbra subtilă premium
  },
  pressed: {
    opacity: 0.85,
  },
});

const variantStyles: Record<CardVariant, ViewStyle> = {
  white: {
    backgroundColor: colors.white,
  },
  beige: {
    backgroundColor: colors.beige,
  },
  rose: {
    backgroundColor: colors.roseSoft, // fundal rose deschis — pt. carduri de accent
  },
};