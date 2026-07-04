// src/app/settings.tsx
// -----------------------------------------------------------------------------
// ECRAN SETĂRI — se deschide din roata dințată (sus-dreapta pe ecrane).
// Momentan conține doar schimbarea limbii. Adăugăm mai târziu: profil,
// notificări, despre aplicație, deconectare (Sprint 2+).
// -----------------------------------------------------------------------------

import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Check, ChevronLeft } from "lucide-react-native";
import { Pressable } from "react-native";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useLanguage } from "@/i18n/useLanguage";
import { colors, spacing } from "@/theme";

export default function Settings() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  // Limbile disponibile, cu numele lor afișat.
  const languages: { code: "ro" | "en"; label: string }[] = [
    { code: "ro", label: "Română" },
    { code: "en", label: "English" },
  ];

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
            {/* Bifă lângă limba activă */}
            {language === lang.code ? (
              <Check size={20} color={colors.dustyRose} />
            ) : null}
          </Pressable>
        ))}
      </Card>
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
});