// src/app/onboarding/baby-name.tsx
// -----------------------------------------------------------------------------
// ECRAN NUMELE BEBELUȘULUI — mama introduce numele.
// Se salvează în store (profile.name). Folosim componenta Input.
//
// Detaliu UX: câmpul preia valoarea deja salvată (dacă mama se întoarce),
// și butonul Continuă e activ doar dacă a scris ceva.
// -----------------------------------------------------------------------------

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ProgressBar } from "@/components/ProgressBar";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { useOnboardingStore } from "@/store/onboardingStore";
import { colors, spacing } from "@/theme";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export default function BabyName() {
  const router = useRouter();
  const { t } = useTranslation();

  // Citim numele deja salvat (dacă mama se întoarce la acest ecran).
  const savedName = useOnboardingStore((s) => s.profile.name);
  const updateProfile = useOnboardingStore((s) => s.updateProfile);

  // Ținem local ce scrie, pornind de la valoarea salvată.
  const [name, setName] = useState(savedName);

  const handleContinue = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    updateProfile({ name: trimmed });
    router.push("/onboarding/baby-birthdate");
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Screen scroll>
        {/* Buton înapoi */}
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={8}
        >
          <ChevronLeft size={26} color={colors.ink} />
        </Pressable>

        {/* Progres (pasul 2 din 8) */}
        <ProgressBar step={2} total={8} />

        <ThemedText variant="h1">{t("onboarding.babyName.title")}</ThemedText>
        <ThemedText variant="body" color="inkSoft" style={styles.subtitle}>
          {t("onboarding.babyName.subtitle")}
        </ThemedText>

        {/* Câmpul pentru nume */}
        <View style={styles.inputWrap}>
          <Input
            label={t("onboarding.babyName.label")}
            placeholder={t("onboarding.babyName.placeholder")}
            value={name}
            onChangeText={setName}
            autoFocus
            autoCapitalize="words"
            returnKeyType="done"
            onSubmitEditing={handleContinue}
          />
        </View>

        {/* Buton continuă — activ doar dacă a scris ceva */}
        <Button
          title={t("common.continue")}
          variant="primary"
          fullWidth
          disabled={!name.trim()}
          onPress={handleContinue}
          style={styles.continueButton}
        />
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  backButton: {
    marginLeft: -spacing.xs,
    marginBottom: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.xxl,
  },
  inputWrap: {
    marginBottom: spacing.md,
  },
  continueButton: {
    marginTop: spacing.xl,
  },
});
