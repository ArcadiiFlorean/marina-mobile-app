// src/app/(tabs)/hranire.tsx
// TAB HRĂNIRE — alimente + rețete (Sprint 3).

import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";

export default function Hranire() {
  return (
    <Screen>
      <Header title="Hrănire" subtitle="Alimente și rețete" />
      <ThemedText variant="body" color="warmGray">
        Conținutul filei Hrănire va apărea aici — în curând.
      </ThemedText>
    </Screen>
  );
}