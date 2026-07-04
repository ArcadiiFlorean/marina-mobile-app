// src/app/(tabs)/cauta.tsx
// TAB CAUTĂ — căutare globală în conținut (Sprint 3).

import { Header } from "@/components/Header";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";

export default function Cauta() {
  return (
    <Screen>
      <Header title="Caută" subtitle="Găsește rapid orice din aplicație" />
      <ThemedText variant="body" color="warmGray">
        Bara de căutare va apărea aici — în curând.
      </ThemedText>
    </Screen>
  );
}
