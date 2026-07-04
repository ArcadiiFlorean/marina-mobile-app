// src/app/onboarding/personalizing.tsx
// -----------------------------------------------------------------------------
// ECRAN PERSONALIZARE (finalul onboarding-ului).
// Arată un progres animat cu mesaje ("Pregătim experiența pentru Alexandra...").
// La 100%, marchează onboarding-ul ca TERMINAT → rutarea din _layout duce
// automat în aplicația principală (tab-uri).
// -----------------------------------------------------------------------------

import { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { ProgressBar } from "@/components/ProgressBar";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useAppStore } from "@/store/appStore";
import { colors, spacing } from "@/theme";

// Etapele afișate, cu procentul lor.
const STEPS = [
  { percent: 26, msgKey: "onboarding.personalizing.step1" },
  { percent: 72, msgKey: "onboarding.personalizing.step2" },
  { percent: 100, msgKey: "onboarding.personalizing.step3" },
];

export default function Personalizing() {
  const { t } = useTranslation();
  const babyName = useOnboardingStore((s) => s.profile.name);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);

  // Ce etapă afișăm acum (0, 1, 2).
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Avansăm prin etape la fiecare ~900ms.
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setStepIndex(1), 900));
    timers.push(setTimeout(() => setStepIndex(2), 1800));

    // La final (după ce ajunge la 100%), marcăm onboarding ca terminat.
    // Rutarea din _layout.tsx ne va duce automat în tab-uri.
    timers.push(
      setTimeout(() => {
        completeOnboarding();
      }, 2900),
    );

    return () => timers.forEach(clearTimeout);
  }, [completeOnboarding]);

  const current = STEPS[stepIndex];

  // Mesajul, cu numele bebelușului inserat.
  const message = t(current.msgKey, { name: babyName || t("onboarding.personalizing.baby") });

  return (
    <Screen>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.dustyRose} />

        <ThemedText variant="h2" style={styles.percent}>
          {current.percent}%
        </ThemedText>

        <ThemedText variant="body" color="inkSoft" style={styles.message}>
          {message}
        </ThemedText>

        <View style={styles.progressWrap}>
          <ProgressBar step={current.percent} total={100} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  percent: {
    marginTop: spacing.xl,
  },
  message: {
    textAlign: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
    minHeight: 48,
  },
  progressWrap: {
    width: "100%",
  },
});