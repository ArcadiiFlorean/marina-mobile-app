// src/app/(tabs)/intreaba.tsx
// TAB ÎNTREABĂ MARINA — chat AI + consultații + comunitate (Sprint 5).
// Acesta e diferențiatorul față de Solid Starts.

import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { colors, spacing } from "@/theme";

export default function Intreaba() {
  return (
    <View style={styles.screen}>
      <ThemedText variant="h1">Întreabă Marina</ThemedText>
      <ThemedText variant="body" color="warmGray">
        Chat AI, consultații și comunitate — în curând.
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
    padding: spacing.xl,
    paddingTop: spacing.huge,
    gap: spacing.sm,
  },
});