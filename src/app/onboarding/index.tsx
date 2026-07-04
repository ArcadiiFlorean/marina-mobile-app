// src/app/onboarding/index.tsx
// ECRAN TEST 1 — verificăm că onboarding-ul se afișează și navigarea merge.
// Îl înlocuim cu ecranul Welcome real la pasul următor.

import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { spacing } from "@/theme";

export default function OnboardingStart() {
  const router = useRouter();

  return (
    <Screen>
      <View style={styles.center}>
        <ThemedText variant="h1">Onboarding — Ecran 1</ThemedText>
        <ThemedText variant="body" color="warmGray" style={styles.text}>
          Dacă vezi acest ecran, rutarea funcționează: aplicația te-a trimis
          automat la onboarding fiindcă nu l-ai terminat încă.
        </ThemedText>

        <Button
          title="Mai departe →"
          variant="primary"
          fullWidth
          onPress={() => router.push("/onboarding/welcome-test")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.lg,
  },
  text: {
    marginBottom: spacing.md,
  },
});