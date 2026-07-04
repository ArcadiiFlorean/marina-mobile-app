// src/app/onboarding/baby-gender.tsx
// -----------------------------------------------------------------------------
// ECRAN GENUL BEBELUȘULUI — 3 opțiuni. Se salvează în store (gender).
// Opțional în esență (poate alege "prefer să nu spun").
// -----------------------------------------------------------------------------

import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Check } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { ProgressBar } from "@/components/ProgressBar";
import { useOnboardingStore, BabyGender } from "@/store/onboardingStore";
import { colors, spacing, radius, shadows } from "@/theme";

// Opțiunile de gen. `key` se salvează; `labelKey` e textul tradus.
const GENDER_OPTIONS: { key: Exclude<BabyGender, null>; labelKey: string }[] = [
  { key: "girl", labelKey: "gender.girl" },
  { key: "boy", labelKey: "gender.boy" },
  { key: "other", labelKey: "gender.other" },
];

export default function BabyGenderScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const savedGender = useOnboardingStore((s) => s.profile.gender);
  const updateProfile = useOnboardingStore((s) => s.updateProfile);

  const [selected, setSelected] = useState<BabyGender>(savedGender);

  const handleContinue = () => {
    updateProfile({ gender: selected });
    router.push("/onboarding/baby-allergies");
  };

  return (
    <Screen scroll>
      {/* Buton înapoi */}
      <Pressable
        onPress={() => router.back()}
        style={styles.backButton}
        hitSlop={8}
      >
        <ChevronLeft size={26} color={colors.ink} />
      </Pressable>

      {/* Progres (pasul 4 din 8) */}
      <ProgressBar step={4} total={8} />

      <ThemedText variant="h1">{t("onboarding.gender.title")}</ThemedText>
      <ThemedText variant="body" color="inkSoft" style={styles.subtitle}>
        {t("onboarding.gender.subtitle")}
      </ThemedText>

      {/* Opțiunile */}
      <View style={styles.options}>
        {GENDER_OPTIONS.map(({ key, labelKey }) => {
          const isSelected = selected === key;
          return (
            <Pressable
              key={key}
              onPress={() => setSelected(key)}
              style={[styles.option, isSelected && styles.optionSelected]}
            >
              <ThemedText
                variant="bodyMedium"
                color={isSelected ? "ink" : "inkSoft"}
              >
                {t(`onboarding.${labelKey}`)}
              </ThemedText>
              {isSelected ? <Check size={20} color={colors.dustyRose} /> : null}
            </Pressable>
          );
        })}
      </View>

      <Button
        title={t("common.continue")}
        variant="primary"
        fullWidth
        disabled={!selected}
        onPress={handleContinue}
        style={styles.continueButton}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginLeft: -spacing.xs,
    marginBottom: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  options: {
    gap: spacing.sm,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.white,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    ...shadows.card,
  },
  optionSelected: {
    borderColor: colors.dustyRose,
    backgroundColor: colors.roseSoft,
  },
  continueButton: {
    marginTop: spacing.xl,
  },
});