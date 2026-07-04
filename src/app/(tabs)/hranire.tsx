// src/app/(tabs)/hranire.tsx
// TAB HRĂNIRE — bază de alimente + rețete (se umple în Sprint 3).

import { ThemedText } from "@/components/ThemedText";
import { colors, spacing } from "@/theme";
import { StyleSheet, View } from "react-native";

export default function Hranire() {
  return (
    <View style={styles.screen}>
      <ThemedText variant="h1">Hrănire</ThemedText>
      <ThemedText variant="body" color="warmGray">
        Alimente și rețete — în curând.
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
