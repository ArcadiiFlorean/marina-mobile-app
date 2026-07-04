// src/app/(tabs)/index.tsx
// -----------------------------------------------------------------------------
// TAB ACASĂ — momentan afișează testul de fonturi/culori.
// Îl transformăm în dashboard-ul real (obiectiv curent, quiz etc.) în Sprint 3.
// -----------------------------------------------------------------------------

import { ThemedText } from "@/components/ThemedText";
import { colors, spacing } from "@/theme";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Acasa() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ThemedText variant="display">Marina Cociug</ThemedText>
      <ThemedText variant="h3" color="dustyRose">
        Consultant în alăptare · IBCLC
      </ThemedText>

      <View style={styles.spacer} />

      <ThemedText variant="body">
        Bine ai venit! Aceasta e fila Acasă. Navighează între cele cinci file de
        jos ca să vezi structura aplicației.
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    padding: spacing.xl,
    paddingTop: spacing.huge,
    gap: spacing.xs,
  },
  spacer: {
    height: spacing.lg,
  },
});
