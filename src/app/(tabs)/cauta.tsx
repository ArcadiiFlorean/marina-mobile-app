// src/app/(tabs)/cauta.tsx
// TAB CAUTĂ — căutare globală în conținut (Sprint 3).

import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { colors, spacing } from "@/theme";

export default function Cauta() {
  return (
    <View style={styles.screen}>
      <ThemedText variant="h1">Caută</ThemedText>
      <ThemedText variant="body" color="warmGray">
        Găsește rapid orice din aplicație — în curând.
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