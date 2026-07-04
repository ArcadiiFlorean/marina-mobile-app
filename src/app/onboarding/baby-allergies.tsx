// src/app/onboarding/baby-allergies.tsx
// -----------------------------------------------------------------------------
// ECRAN ALERGII / ECZEMĂ — mama bifează alergenii cunoscuți (dacă există) și
// dacă bebelușul are eczemă. Totul e OPȚIONAL (poate merge mai departe fără).
// Se salvează în store (allergies[], hasEczema).
//
// Din concept: alergeni + eczemă contează pentru recomandările de diversificare.
// -----------------------------------------------------------------------------

import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Check } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import { useOnboardingStore } from "@/store/onboardingStore";
import { colors, spacing, radius } from "@/theme";

// Alergenii comuni la bebeluși. `key` se salvează; `labelKey` e textul tradus.
const COMMON_ALLERGENS = [
  { key: "milk", labelKey: "allergies.milk" },
  { key: "egg", labelKey: "allergies.egg" },
  { key: "peanut", labelKey: "allergies.peanut" },
  { key: "treenut", labelKey: "allergies.treenut" },
  { key: "gluten", labelKey: "allergies.gluten" },
  { key: "soy", labelKey: "allergies.soy" },
  { key: "fish", labelKey: "allergies.fish" },
  { key: "sesame", labelKey: "allergies.sesame" },
];

export default function BabyAllergies() {
  const router = useRouter();
  const { t } = useTranslation();

  const savedAllergies = useOnboardingStore((s) => s.profile.allergies);
  const savedEczema = useOnboardingStore((s) => s.profile.hasEczema);
  const updateProfile = useOnboardingStore((s) => s.updateProfile);

  // Lista de alergeni bifați (pornim de la ce e salvat).
  const [selected, setSelected] = useState<string[]>(savedAllergies);
  const [hasEczema, setHasEczema] = useState(savedEczema);

  // Adaugă/scoate un alergen din listă.
  const toggleAllergen = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((a) => a !== key) : [...prev, key],
    );
  };

  const handleContinue = () => {
    updateProfile({ allergies: selected, hasEczema });
    router.push("/onboarding/solids-method");
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

      {/* Progres (pasul 5 din 8) */}
      <ProgressBar step={5} total={8} />

      <ThemedText variant="h1">{t("onboarding.allergies.title")}</ThemedText>
      <ThemedText variant="body" color="inkSoft" style={styles.subtitle}>
        {t("onboarding.allergies.subtitle")}
      </ThemedText>

      {/* Grila de alergeni (chips bifabile) */}
      <View style={styles.chips}>
        {COMMON_ALLERGENS.map(({ key, labelKey }) => {
          const isSelected = selected.includes(key);
          return (
            <Pressable
              key={key}
              onPress={() => toggleAllergen(key)}
              style={[styles.chip, isSelected && styles.chipSelected]}
            >
              <ThemedText
                variant="bodyMedium"
                color={isSelected ? "white" : "inkSoft"}
              >
                {t(`onboarding.${labelKey}`)}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      {/* Toggle eczemă */}
      <Pressable onPress={() => setHasEczema(!hasEczema)} style={styles.eczemaWrap}>
        <Card variant={hasEczema ? "rose" : "white"}>
          <View style={styles.eczemaRow}>
            <View style={styles.eczemaText}>
              <ThemedText variant="bodyMedium">
                {t("onboarding.allergies.eczema")}
              </ThemedText>
              <ThemedText variant="caption" color="warmGray">
                {t("onboarding.allergies.eczemaHint")}
              </ThemedText>
            </View>
            <View
              style={[styles.checkbox, hasEczema && styles.checkboxChecked]}
            >
              {hasEczema ? <Check size={16} color={colors.white} /> : null}
            </View>
          </View>
        </Card>
      </Pressable>

      {/* Buton — mereu activ (totul e opțional) */}
      <Button
        title={t("common.continue")}
        variant="primary"
        fullWidth
        onPress={handleContinue}
        style={styles.continueButton}
      />

      {/* Notă că se poate sări */}
      <ThemedText variant="caption" color="warmGray" style={styles.skipNote}>
        {t("onboarding.allergies.optional")}
      </ThemedText>
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
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.beige,
    backgroundColor: colors.white,
  },
  chipSelected: {
    backgroundColor: colors.dustyRose,
    borderColor: colors.dustyRose,
  },
  eczemaWrap: {
    marginTop: spacing.xl,
  },
  eczemaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  eczemaText: {
    flex: 1,
    gap: spacing.xxs,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.warmGray,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.dustyRose,
    borderColor: colors.dustyRose,
  },
  continueButton: {
    marginTop: spacing.xxl,
  },
  skipNote: {
    textAlign: "center",
    marginTop: spacing.md,
  },
});