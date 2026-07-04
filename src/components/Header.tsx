// src/components/Header.tsx
// -----------------------------------------------------------------------------
// HEADER DE ECRAN — titlul de sus al unei file, în stilul Marinei.
// Simplu deocamdată (titlu + subtitlu opțional). Îl îmbogățim mai târziu cu
// poza bebelușului, vârsta și iconița de calendar (conform conceptului).
//
// Exemple:
//   <Header title="Ghiduri" />
//   <Header title="Hrănire" subtitle="Alimente și rețete" />
// -----------------------------------------------------------------------------

import { spacing } from "@/theme";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <View style={styles.container}>
      <ThemedText variant="h1">{title}</ThemedText>
      {subtitle ? (
        <ThemedText variant="body" color="warmGray" style={styles.subtitle}>
          {subtitle}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.xxs,
  },
});
