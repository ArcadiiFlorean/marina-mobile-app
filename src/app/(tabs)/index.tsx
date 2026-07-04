// src/app/(tabs)/index.tsx
// TAB ACASĂ — momentan minimal (salut + roata dințată). Devine dashboard-ul
// real în Sprint 3 (obiectiv curent, quiz "E gata bebe?", card "Pentru tine").

import { useTranslation } from "react-i18next";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";

export default function Acasa() {
  const { t } = useTranslation();

  return (
    <Screen scroll>
      {/* Header cu roata dințată sus-dreapta (duce la Setări) */}
      <Header title="Marina Cociug" subtitle={t("home.subtitle")} showSettings />

      <ThemedText variant="body">{t("home.greeting")}</ThemedText>
    </Screen>
  );
}