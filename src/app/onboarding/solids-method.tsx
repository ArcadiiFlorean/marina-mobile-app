// src/app/onboarding/solids-method.tsx
// -----------------------------------------------------------------------------
// ECRAN "A ÎNCEPUT SOLIDELE?" + "CE METODĂ?"
// Logică: întrebăm întâi dacă a început diversificarea. Dacă DA, apare și
// alegerea metodei (BLW / linguriță / ambele). Dacă NU, mergem direct mai
// departe. Se salvează în store (startedSolids, feedingMethod).
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
import { useOnboardingStore, FeedingMethod } from "@/store/onboardingStore";
import { colors, spacing, radius, shadows } from "@/theme";

// Opțiunile de metodă.
const METHOD_OPTIONS: { key: Exclude<FeedingMethod, null>; labelKey: string; descKey: string }[] = [
  { key: "blw", labelKey: "solids.blw", descKey: "solids.blwDesc" },
  { key: "spoon", labelKey: "solids.spoon", descKey: "solids.spoonDesc" },
  { key: "both", labelKey: "solids.both", descKey: "solids.bothDesc" },
];

export default function SolidsMethod() {
  const router = useRouter();
  const { t } = useTranslation();

  const savedStarted = useOnboardingStore((s) => s.profile.startedSolids);
  const savedMethod = useOnboardingStore((s) => s.profile.feedingMethod);
  const updateProfile = useOnboardingStore((s) => s.updateProfile);

  const [started, setStarted] = useState<boolean | null>(savedStarted);
  const [method, setMethod] = useState<FeedingMethod>(savedMethod);

  // Butonul e activ dacă: a răspuns "nu", SAU a răspuns "da" ȘI a ales o metodă.
  const canContinue =
    started === false || (started === true && method !== null);

  const handleContinue = () => {
    updateProfile({
      startedSolids: started,
      // Dacă n-a început solidele, metoda rămâne null.
      feedingMethod: started ? method : null,
    });
    router.push("/onboarding/confirm");
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

      {/* Progres (pasul 6 din 8) */}
      <ProgressBar step={6} total={8} />

      <ThemedText variant="h1">{t("onboarding.solids.title")}</ThemedText>
      <ThemedText variant="body" color="inkSoft" style={styles.subtitle}>
        {t("onboarding.solids.subtitle")}
      </ThemedText>

      {/* Da / Nu */}
      <View style={styles.yesNo}>
        <Pressable
          onPress={() => setStarted(true)}
          style={[styles.yesNoBtn, started === true && styles.yesNoSelected]}
        >
          <ThemedText
            variant="bodyMedium"
            color={started === true ? "white" : "inkSoft"}
          >
            {t("onboarding.solids.yes")}
          </ThemedText>
        </Pressable>
        <Pressable
          onPress={() => {
            setStarted(false);
            setMethod(null); // dacă alege "nu", resetăm metoda
          }}
          style={[styles.yesNoBtn, started === false && styles.yesNoSelected]}
        >
          <ThemedText
            variant="bodyMedium"
            color={started === false ? "white" : "inkSoft"}
          >
            {t("onboarding.solids.no")}
          </ThemedText>
        </Pressable>
      </View>

      {/* Metoda — apare DOAR dacă a răspuns "da" */}
      {started === true && (
        <View style={styles.methodSection}>
          <ThemedText variant="label" color="warmGray" style={styles.methodLabel}>
            {t("onboarding.solids.methodTitle").toUpperCase()}
          </ThemedText>

          {METHOD_OPTIONS.map(({ key, labelKey, descKey }) => {
            const isSelected = method === key;
            return (
              <Pressable
                key={key}
                onPress={() => setMethod(key)}
                style={[styles.method, isSelected && styles.methodSelected]}
              >
                <View style={styles.methodText}>
                  <ThemedText
                    variant="bodyMedium"
                    color={isSelected ? "ink" : "inkSoft"}
                  >
                    {t(`onboarding.${labelKey}`)}
                  </ThemedText>
                  <ThemedText variant="caption" color="warmGray">
                    {t(`onboarding.${descKey}`)}
                  </ThemedText>
                </View>
                {isSelected ? (
                  <Check size={20} color={colors.dustyRose} />
                ) : null}
              </Pressable>
            );
          })}
        </View>
      )}

      <Button
        title={t("common.continue")}
        variant="primary"
        fullWidth
        disabled={!canContinue}
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
  yesNo: {
    flexDirection: "row",
    gap: spacing.md,
  },
  yesNoBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.beige,
    backgroundColor: colors.white,
  },
  yesNoSelected: {
    backgroundColor: colors.dustyRose,
    borderColor: colors.dustyRose,
  },
  methodSection: {
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  methodLabel: {
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },
  method: {
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
  methodSelected: {
    borderColor: colors.dustyRose,
    backgroundColor: colors.roseSoft,
  },
  methodText: {
    flex: 1,
    gap: spacing.xxs,
  },
  continueButton: {
    marginTop: spacing.xxl,
  },
});