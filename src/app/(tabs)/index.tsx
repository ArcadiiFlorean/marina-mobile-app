// src/app/(tabs)/index.tsx
// TAB ACASĂ — test i18n: butonul comută RO ↔ EN și textele se schimbă instant.

import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { useLanguage } from "@/i18n/useLanguage";
import { colors, spacing } from "@/theme";
import { Languages } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

export default function Acasa() {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();

  return (
    <Screen scroll>
      <ThemedText variant="display">Marina Cociug</ThemedText>
      <ThemedText variant="h3" color="dustyRose">
        {t("home.subtitle")}
      </ThemedText>

      <View style={styles.spacer} />

      <ThemedText variant="body">{t("home.greeting")}</ThemedText>

      <View style={styles.spacer} />

      {/* Butonul de limbă — apasă și toate textele + tab-urile se schimbă */}
      <Button
        title={language === "ro" ? "Schimbă în English" : "Switch to Română"}
        variant="secondary"
        icon={<Languages size={18} color={colors.dustyRose} />}
        onPress={toggleLanguage}
      />

      <View style={styles.spacer} />

      <ThemedText variant="caption" color="warmGray">
        Limbă activă: {language.toUpperCase()}
      </ThemedText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  spacer: {
    height: spacing.lg,
  },
});
