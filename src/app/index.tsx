// src/app/index.tsx
// -----------------------------------------------------------------------------
// ECRAN DE TEST — verificăm fonturile și culorile brandului.
// -----------------------------------------------------------------------------

import { StyleSheet, ScrollView, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { colors, spacing } from "@/theme";

export default function Index() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ThemedText variant="display">Marina Cociug</ThemedText>
      <ThemedText variant="h3" color="dustyRose">
        Consultant în alăptare · IBCLC
      </ThemedText>

      <View style={styles.spacer} />

      <ThemedText variant="h1">Titlu H1 (Playfair)</ThemedText>
      <ThemedText variant="h2">Titlu H2 (Playfair)</ThemedText>
      <ThemedText variant="h3">Titlu H3 (Playfair)</ThemedText>

      <View style={styles.spacer} />

      <ThemedText variant="body">
        Acesta e un paragraf normal, scris cu Nunito. Se citește ușor și cald,
        exact cum trebuie pentru mamele care caută răspunsuri liniștitoare
        despre alăptare, diversificare și înțărcare.
      </ThemedText>

      <View style={styles.spacer} />

      <ThemedText variant="bodyMedium">Text Nunito medium.</ThemedText>
      <ThemedText variant="bodySmall" color="warmGray">
        Text mic, secundar (gri cald).
      </ThemedText>
      <ThemedText variant="caption" color="warmGray">
        CAPTION — cel mai mic text.
      </ThemedText>

      <View style={styles.spacer} />

      <ThemedText variant="button" color="dustyRose">
        TEXT BUTON (Poppins)
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