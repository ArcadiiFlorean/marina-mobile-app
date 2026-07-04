// src/app/onboarding/baby-birthdate.tsx
// -----------------------------------------------------------------------------
// ECRAN DATA NAȘTERII — mama alege data; calculăm automat vârsta bebelușului.
// Include bifa "născut prematur". Se salvează în store (birthDate, isPremature).
// -----------------------------------------------------------------------------

import { useState } from "react";
import { View, StyleSheet, Pressable, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ChevronLeft, Calendar, Check } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import { useOnboardingStore } from "@/store/onboardingStore";
import { calculateAge, formatAge } from "@/utils/age";
import { colors, spacing, radius } from "@/theme";

export default function BabyBirthdate() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const savedDate = useOnboardingStore((s) => s.profile.birthDate);
  const savedPremature = useOnboardingStore((s) => s.profile.isPremature);
  const updateProfile = useOnboardingStore((s) => s.updateProfile);

  // Data selectată (pornim de la cea salvată sau de la azi).
  const [date, setDate] = useState<Date>(
    savedDate ? new Date(savedDate) : new Date(),
  );
  const [isPremature, setIsPremature] = useState(savedPremature);

  // Pe Android, selectorul apare la cerere; pe iOS e mereu vizibil.
  const [showPicker, setShowPicker] = useState(Platform.OS === "ios");

  // A ales mama o dată? (dacă savedDate există sau a atins selectorul)
  const [hasPicked, setHasPicked] = useState(!!savedDate);

  // Vârsta calculată din data aleasă.
  const age = calculateAge(date.toISOString());
  const ageText = formatAge(age, i18n.language);

  const onChangeDate = (_event: unknown, selectedDate?: Date) => {
    // Pe Android, selectorul se închide singur după alegere.
    if (Platform.OS === "android") setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setHasPicked(true);
    }
  };

  const handleContinue = () => {
    updateProfile({
      birthDate: date.toISOString(),
      isPremature,
    });
    router.push("/onboarding/baby-gender");
  };

  // Formatare dată pentru afișare (ex. "15 martie 2025").
  const dateLabel = date.toLocaleDateString(
    i18n.language === "ro" ? "ro-RO" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

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

      {/* Progres (pasul 3 din 8) */}
      <ProgressBar step={3} total={8} />

      <ThemedText variant="h1">{t("onboarding.birthdate.title")}</ThemedText>
      <ThemedText variant="body" color="inkSoft" style={styles.subtitle}>
        {t("onboarding.birthdate.subtitle")}
      </ThemedText>

      {/* Pe Android: buton care deschide selectorul. Pe iOS: selector inline. */}
      {Platform.OS === "android" && (
        <Pressable onPress={() => setShowPicker(true)}>
          <Card>
            <View style={styles.dateRow}>
              <Calendar size={22} color={colors.dustyRose} />
              <ThemedText variant="bodyMedium" style={styles.dateText}>
                {hasPicked ? dateLabel : t("onboarding.birthdate.pickDate")}
              </ThemedText>
            </View>
          </Card>
        </Pressable>
      )}

      {showPicker && (
        <View style={styles.pickerWrap}>
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            maximumDate={new Date()} // nu poate fi în viitor
            onChange={onChangeDate}
          />
        </View>
      )}

      {/* Afișarea vârstei calculate (doar după ce a ales o dată) */}
      {hasPicked && (
        <Card variant="rose" style={styles.ageCard}>
          <ThemedText variant="caption" color="inkSoft">
            {t("onboarding.birthdate.ageLabel")}
          </ThemedText>
          <ThemedText variant="h3" color="roseDark">
            {ageText}
          </ThemedText>
        </Card>
      )}

      {/* Bifa "născut prematur" */}
      <Pressable
        onPress={() => setIsPremature(!isPremature)}
        style={styles.prematureRow}
      >
        <View style={[styles.checkbox, isPremature && styles.checkboxChecked]}>
          {isPremature ? <Check size={16} color={colors.white} /> : null}
        </View>
        <ThemedText variant="body" style={styles.prematureLabel}>
          {t("onboarding.birthdate.premature")}
        </ThemedText>
      </Pressable>

      <Button
        title={t("common.continue")}
        variant="primary"
        fullWidth
        disabled={!hasPicked}
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
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  dateText: {
    flex: 1,
  },
  pickerWrap: {
    marginVertical: spacing.sm,
  },
  ageCard: {
    marginTop: spacing.lg,
    gap: spacing.xxs,
  },
  prematureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.xl,
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
  prematureLabel: {
    flex: 1,
  },
  continueButton: {
    marginTop: spacing.xxl,
  },
});