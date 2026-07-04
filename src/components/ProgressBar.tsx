// src/components/ProgressBar.tsx
// -----------------------------------------------------------------------------
// BARĂ DE PROGRES — arată cât din onboarding a parcurs mama.
// Îi dai pasul curent și totalul: <ProgressBar step={2} total={8} />
// -----------------------------------------------------------------------------

import { colors, radius, spacing } from "@/theme";
import { StyleSheet, View } from "react-native";

interface ProgressBarProps {
  step: number; // pasul curent (1, 2, 3...)
  total: number; // numărul total de pași
}

export function ProgressBar({ step, total }: ProgressBarProps) {
  // Procentul completat (între 0 și 1).
  const progress = Math.min(Math.max(step / total, 0), 1);

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${progress * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    backgroundColor: colors.beige,
    borderRadius: radius.pill,
    overflow: "hidden",
    marginBottom: spacing.xl,
  },
  fill: {
    height: "100%",
    backgroundColor: colors.dustyRose,
    borderRadius: radius.pill,
  },
});
