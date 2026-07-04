// src/app/settings.tsx
// -----------------------------------------------------------------------------
// ECRAN SETĂRI — se deschide din roata dințată.
// Conține: schimbarea limbii + (temporar, pentru dezvoltare) reset onboarding.
// Butonul de reset onboarding se scoate înainte de lansare.
// -----------------------------------------------------------------------------

import { View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Check, ChevronLeft, RotateCcw } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { useLanguage } from "@/i18n/useLanguage";
import { useAppStore } from "@/store/appStore";
import { useOnboardingStore } from "@/store/onboardingStore";
import { colors, spacing } from "@/theme";

export default function Settings() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const resetOnboarding = useAppStore((s) => s.resetOnboarding);
  const resetProfile = useOnboardingStore((s) => s.resetProfile);

  const languages: { code: "ro" | "en"; label: string }[] = [
    { code: "ro", label: "Română" },
    { code: "en", label: "English" },
  ];

  // Resetează onboarding + profil, apoi trimite înapoi la onboarding.
  const handleResetOnboarding = () => {
    resetProfile();
    resetOnboarding();
    router.replace("/onboarding");
  };

  return (
    <Screen scroll>
      {/* Buton înapoi + titlu */}
      <View style={styles.topRow}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={8}
        >
          <ChevronLeft size={26} color={colors.ink} />
        </Pressable>
        <ThemedText variant="h1">{t("settings.title")}</ThemedText>
      </View>

      {/* Secțiunea Limbă */}
      <ThemedText variant="label" color="warmGray" style={styles.sectionLabel}>
        {t("settings.language").toUpperCase()}
      </ThemedText>

      <Card>
        {languages.map((lang, index) => (
          <Pressable
            key={lang.code}
            onPress={() => setLanguage(lang.code)}
            style={[
              styles.langRow,
              index < languages.length - 1 && styles.langRowBorder,
            ]}
          >
            <ThemedText variant="body">{lang.label}</ThemedText>
            {language === lang.code ? (
              <Check size={20} color={colors.dustyRose} />
            ) : null}
          </Pressable>
        ))}
      </Card>

      {/* Secțiunea Dezvoltare (temporară — se scoate la lansare) */}
      <ThemedText
        variant="label"
        color="warmGray"
        style={[styles.sectionLabel, styles.devSection]}
      >
        DEZVOLTARE
      </ThemedText>

      <Button
        title="Resetează onboarding"
        variant="secondary"
        icon={<RotateCcw size={18} color={colors.dustyRose} />}
        onPress={handleResetOnboarding}
      />
      <ThemedText variant="caption" color="warmGray" style={styles.devNote}>
        Buton temporar pentru testare. Șterge profilul și afișează onboarding-ul
        de la început.
      </ThemedText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  backButton: {
    marginRight: spacing.sm,
    marginLeft: -spacing.xs,
  },
  sectionLabel: {
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  langRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
  },
  langRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.creamDark,
  },
  devSection: {
    marginTop: spacing.xxl,
  },
  devNote: {
    marginTop: spacing.sm,
    marginLeft: spacing.xs,
  },
});