// src/app/onboarding/index.tsx
// -----------------------------------------------------------------------------
// ECRAN WELCOME — primul contact al mamei cu aplicația.
// Identitate (Marina), mesaj cald, buton "Începe", slogan discret jos.
// -----------------------------------------------------------------------------

import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { colors, spacing, radius } from "@/theme";

export default function Welcome() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Screen>
      <View style={styles.container}>
        {/* Zona de sus — identitatea Marinei */}
        <View style={styles.top}>
          {/* Monogram temporar "MC" (se înlocuiește cu logo real) */}
          <View style={styles.monogram}>
            <ThemedText variant="display" style={styles.monogramText}>
              MC
            </ThemedText>
          </View>

          <ThemedText variant="h1" style={styles.title}>
            {t("onboarding.welcome.title")}
          </ThemedText>
          <ThemedText variant="h3" color="dustyRose" style={styles.role}>
            {t("onboarding.welcome.role")}
          </ThemedText>
          <ThemedText variant="body" color="inkSoft" style={styles.message}>
            {t("onboarding.welcome.message")}
          </ThemedText>
        </View>

        {/* Zona de jos — buton + slogan */}
        <View style={styles.bottom}>
          <Button
            title={t("onboarding.welcome.start")}
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => router.push("/onboarding/login")}
          />
          <ThemedText variant="caption" color="warmGray" style={styles.slogan}>
            {t("onboarding.welcome.slogan")}
          </ThemedText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // identitate sus, buton jos
    paddingVertical: spacing.xl,
  },
  top: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  monogram: {
    width: 96,
    height: 96,
    borderRadius: radius.pill,
    backgroundColor: colors.dustyRose,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  monogramText: {
    color: colors.cream,
    fontSize: 40,
  },
  title: {
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  role: {
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  message: {
    textAlign: "center",
    paddingHorizontal: spacing.md,
  },
  bottom: {
    gap: spacing.lg,
    alignItems: "center",
  },
  slogan: {
    textAlign: "center",
  },
});