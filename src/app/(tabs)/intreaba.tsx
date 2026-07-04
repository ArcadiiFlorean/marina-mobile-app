// src/app/(tabs)/intreaba.tsx
// TAB ÎNTREABĂ MARINA — texte din traduceri.

import { useTranslation } from "react-i18next";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";

export default function Intreaba() {
  const { t } = useTranslation();

  return (
    <Screen>
      <Header title={t("ask.title")} subtitle={t("ask.subtitle")} />
      <ThemedText variant="body" color="warmGray">
        {t("ask.comingSoon")}
      </ThemedText>
    </Screen>
  );
}