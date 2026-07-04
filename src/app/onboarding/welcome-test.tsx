// src/app/onboarding/welcome-test.tsx
// ECRAN TEST 2 — verificăm navigarea înainte/înapoi + finalizarea onboarding.
// Butonul "Termină" marchează onboarding ca gata → aplicația te duce în tab-uri.

import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useAppStore } from "@/store/appStore";
import { spacing } from "@/theme";

export default function WelcomeTest() {
  const router = useRouter();
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);

  return (
    <Screen>
      <View style={styles.center}>
        <ThemedText variant="h1">Onboarding — Ecran 2</ThemedText>
        <ThemedText variant="body" color="warmGray" style={styles.text}>
          Navigarea între ecrane merge. Apasă „Termină onboarding" ca să
          marchezi finalizarea — aplicația te va duce automat în tab-uri.
        </ThemedText>

        <Button
          title="Termină onboarding ✓"
          variant="primary"
          fullWidth
          onPress={() => completeOnboarding()}
        />

        <Button
          title="← Înapoi"
          variant="ghost"
          fullWidth
          onPress={() => router.back()}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.md,
  },
  text: {
    marginBottom: spacing.md,
  },
});