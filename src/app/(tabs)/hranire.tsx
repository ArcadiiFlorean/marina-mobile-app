// src/app/(tabs)/hranire.tsx
// TAB HRĂNIRE — texte din traduceri (se schimbă cu limba).

import { useTranslation } from "react-i18next";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";

export default function Hranire() {
  const { t } = useTranslation();

  return (
    <Screen>
      <Header title={t("feeding.title")} subtitle={t("feeding.subtitle")} />
      <ThemedText variant="body" color="warmGray">
        {t("feeding.comingSoon")}
      </ThemedText>
    </Screen>
  );
}