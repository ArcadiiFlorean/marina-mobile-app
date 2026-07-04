// src/app/(tabs)/ghiduri.tsx
// TAB GHIDURI — articole pe cei 3 piloni + first aid (se umple în Sprint 3).

import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { colors, spacing } from "@/theme";

export default function Ghiduri() {
  return (
    <View style={styles.screen}>
      <ThemedText variant="h1">Ghiduri</ThemedText>
      <ThemedText variant="body" color="warmGray">
        Alăptare · Diversificare · Înțărcare — în curând.
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