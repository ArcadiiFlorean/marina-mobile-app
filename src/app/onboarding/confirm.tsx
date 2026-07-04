// src/app/onboarding/confirm.tsx
// -----------------------------------------------------------------------------
// ECRAN CONFIRMARE ("E corect?") — recapitulează tot profilul introdus.
// Mama verifică; poate merge înapoi să corecteze. La "Confirmă" → ecranul de
// personalizare (care finalizează onboarding-ul).
// -----------------------------------------------------------------------------

import { View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ChevronLeft, User, Cake, Heart, Utensils } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { ProgressBar } from "@/components/ProgressBar";
import { useOnboardingStore } from "@/store/onboardingStore";
import { calculateAge, formatAge } from "@/utils/age";
import { colors, spacing } from "@/theme";

export default function Confirm() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const profile = useOnboardingStore((s) => s.profile);

  // Vârsta calculată (dacă avem data nașterii).
  const ageText = profile.birthDate
    ? formatAge(calculateAge(profile.birthDate), i18n.language)
    : "—";

  // Traducerea genului.
  const genderText = profile.gender
    ? t(`onboarding.gender.${profile.gender}`)
    : "—";

  // Traducerea metodei (dacă a început solidele).
  const methodText =
    profile.startedSolids && profile.feedingMethod
      ? t(`onboarding.solids.${profile.feedingMethod}`)
      : t("onboarding.confirm.notStarted");

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

      {/* Progres (pasul 7 din 8) */}
      <ProgressBar step={7} total={8} />

      <ThemedText variant="h1">{t("onboarding.confirm.title")}</ThemedText>
      <ThemedText variant="body" color="inkSoft" style={styles.subtitle}>
        {t("onboarding.confirm.subtitle")}
      </ThemedText>

      {/* Cardul-recapitulare */}
      <Card style={styles.summary}>
        {/* Nume */}
        <View style={styles.row}>
          <User size={20} color={colors.dustyRose} />
          <View style={styles.rowText}>
            <ThemedText variant="caption" color="warmGray">
              {t("onboarding.confirm.name")}
            </ThemedText>
            <ThemedText variant="bodyMedium">
              {profile.name || "—"}
            </ThemedText>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Vârstă */}
        <View style={styles.row}>
          <Cake size={20} color={colors.dustyRose} />
          <View style={styles.rowText}>
            <ThemedText variant="caption" color="warmGray">
              {t("onboarding.confirm.age")}
            </ThemedText>
            <ThemedText variant="bodyMedium">
              {ageText}
              {profile.isPremature
                ? ` · ${t("onboarding.confirm.premature")}`
                : ""}
            </ThemedText>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Gen */}
        <View style={styles.row}>
          <Heart size={20} color={colors.dustyRose} />
          <View style={styles.rowText}>
            <ThemedText variant="caption" color="warmGray">
              {t("onboarding.confirm.gender")}
            </ThemedText>
            <ThemedText variant="bodyMedium">{genderText}</ThemedText>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Diversificare / metodă */}
        <View style={styles.row}>
          <Utensils size={20} color={colors.dustyRose} />
          <View style={styles.rowText}>
            <ThemedText variant="caption" color="warmGray">
              {t("onboarding.confirm.feeding")}
            </ThemedText>
            <ThemedText variant="bodyMedium">{methodText}</ThemedText>
          </View>
        </View>
      </Card>

      {/* Alergii (dacă există) */}
      {profile.allergies.length > 0 && (
        <View style={styles.allergiesSection}>
          <ThemedText variant="label" color="warmGray" style={styles.allergiesLabel}>
            {t("onboarding.confirm.allergies").toUpperCase()}
          </ThemedText>
          <View style={styles.badgeRow}>
            {profile.allergies.map((a) => (
              <Badge
                key={a}
                label={t(`onboarding.allergies.${a}`)}
                variant="allergen"
              />
            ))}
            {profile.hasEczema && (
              <Badge label={t("onboarding.allergies.eczema")} variant="premium" />
            )}
          </View>
        </View>
      )}

      <Button
        title={t("onboarding.confirm.confirm")}
        variant="primary"
        size="lg"
        fullWidth
        onPress={() => router.push("/onboarding/personalizing")}
        style={styles.confirmButton}
      />

      <Button
        title={t("onboarding.confirm.edit")}
        variant="ghost"
        fullWidth
        onPress={() => router.back()}
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
  summary: {
    gap: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  rowText: {
    flex: 1,
    gap: spacing.xxs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.creamDark,
  },
  allergiesSection: {
    marginTop: spacing.xl,
  },
  allergiesLabel: {
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  confirmButton: {
    marginTop: spacing.xxl,
    marginBottom: spacing.sm,
  },
});