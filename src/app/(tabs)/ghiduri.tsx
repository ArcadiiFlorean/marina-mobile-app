// src/app/(tabs)/ghiduri.tsx
// TAB GHIDURI — texte din traduceri.

import { useTranslation } from "react-i18next";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";

export default function Ghiduri() {
  const { t } = useTranslation();

  return (
    <Screen>
      <Header title={t("guides.title")} subtitle={t("guides.subtitle")} />
      <ThemedText variant="body" color="warmGray">
        {t("guides.comingSoon")}
      </ThemedText>
    </Screen>
  );
}