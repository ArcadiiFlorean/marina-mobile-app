// src/app/(tabs)/index.tsx
// TAB ACASĂ — devine dashboard-ul real (obiectiv curent, quiz) în Sprint 3.

import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { spacing } from "@/theme";
import { StyleSheet, View } from "react-native";

export default function Acasa() {
  return (
    <Screen scroll>
      <ThemedText variant="display">Marina Cociug</ThemedText>
      <ThemedText variant="h3" color="dustyRose">
        Consultant în alăptare · IBCLC
      </ThemedText>

      <View style={styles.spacer} />

      <ThemedText variant="body">
        Bine ai venit! Aceasta e fila Acasă. Navighează între cele cinci file de
        jos ca să vezi structura aplicației.
      </ThemedText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  spacer: {
    height: spacing.lg,
  },
});
