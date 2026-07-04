// src/app/(tabs)/cauta.tsx
// TAB CAUTĂ — texte din traduceri.

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { ThemedText } from "@/components/ThemedText";
import { colors } from "@/theme";

export default function Cauta() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  return (
    <Screen scroll>
      <Header title={t("search.title")} subtitle={t("search.subtitle")} />

      <Input
        placeholder={t("search.placeholder")}
        icon={<Search size={20} color={colors.warmGray} />}
        value={query}
        onChangeText={setQuery}
      />

      <ThemedText variant="bodySmall" color="warmGray" style={{ marginTop: 24 }}>
        {t("search.resultsHint")}
      </ThemedText>
    </Screen>
  );
}