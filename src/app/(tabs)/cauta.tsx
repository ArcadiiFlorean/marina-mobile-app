// src/app/(tabs)/cauta.tsx
// TAB CAUTĂ — doar bara de căutare. Logica reală de căutare vine în Sprint 3.

import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { colors } from "@/theme";
import { Search } from "lucide-react-native";
import { useState } from "react";

export default function Cauta() {
  const [query, setQuery] = useState("");

  return (
    <Screen scroll>
      <Header title="Caută" subtitle="Găsește rapid orice din aplicație" />

      <Input
        placeholder="Caută articole, rețete, alimente..."
        icon={<Search size={20} color={colors.warmGray} />}
        value={query}
        onChangeText={setQuery}
      />

      <ThemedText
        variant="bodySmall"
        color="warmGray"
        style={{ marginTop: 24 }}
      >
        Rezultatele vor apărea aici pe măsură ce cauți — în curând.
      </ThemedText>
    </Screen>
  );
}
