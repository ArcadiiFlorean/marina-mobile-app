// src/app/onboarding/focus.tsx
// -----------------------------------------------------------------------------
// ECRAN "UNDE AI NEVOIE DE AJUTOR?" — mama alege zona principală de interes.
// PRIMUL ecran care COLECTEAZĂ date: salvează alegerea în store (mainFocus).
// -----------------------------------------------------------------------------

import { Button } from "@/components/Button";
import { ProgressBar } from "@/components/ProgressBar";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { useOnboardingStore } from "@/store/onboardingStore";
import { colors, radius, shadows, spacing } from "@/theme";
import { useRouter } from "expo-router";
import {
  Baby,
  Check,
  ChevronLeft,
  Eye,
  Heart,
  Moon,
  ShieldAlert,
  Utensils,
} from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

// Opțiunile de interes. `key` se salvează în store; `labelKey` e textul tradus.
const FOCUS_OPTIONS = [
  { key: "breastfeeding", labelKey: "focus.breastfeeding", Icon: Baby },
  { key: "solids", labelKey: "focus.solids", Icon: Utensils },
  { key: "weaning", labelKey: "focus.weaning", Icon: Moon },
  { key: "allergens", labelKey: "focus.allergens", Icon: ShieldAlert },
  { key: "firstAid", labelKey: "focus.firstAid", Icon: Heart },
  { key: "browsing", labelKey: "focus.browsing", Icon: Eye },
] as const;

export default function Focus() {
  const router = useRouter();
  const { t } = useTranslation();
  const updateProfile = useOnboardingStore((s) => s.updateProfile);

  // Reținem local ce a bifat mama (înainte de a apăsa "Continuă").
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    // Salvăm alegerea în profilul din store.
    updateProfile({ mainFocus: selected });
    router.push("/onboarding/baby-name");
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

      {/* Progres (pasul 1 din 8) */}
      <ProgressBar step={1} total={8} />

      <ThemedText variant="h1">{t("onboarding.focus.title")}</ThemedText>
      <ThemedText variant="body" color="inkSoft" style={styles.subtitle}>
        {t("onboarding.focus.subtitle")}
      </ThemedText>

      {/* Lista de opțiuni */}
      <View style={styles.options}>
        {FOCUS_OPTIONS.map(({ key, labelKey, Icon }) => {
          const isSelected = selected === key;
          return (
            <Pressable
              key={key}
              onPress={() => setSelected(key)}
              style={[styles.option, isSelected && styles.optionSelected]}
            >
              <View style={styles.optionLeft}>
                <Icon
                  size={22}
                  color={isSelected ? colors.dustyRose : colors.warmGray}
                />
                <ThemedText
                  variant="bodyMedium"
                  style={styles.optionLabel}
                  color={isSelected ? "ink" : "inkSoft"}
                >
                  {t(`onboarding.${labelKey}`)}
                </ThemedText>
              </View>
              {isSelected ? <Check size={20} color={colors.dustyRose} /> : null}
            </Pressable>
          );
        })}
      </View>

      {/* Buton continuă — dezactivat până alege ceva */}
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
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1,
  },
  optionLabel: {
    flex: 1,
  },
  continueButton: {
    marginTop: spacing.xl,
  },
});
