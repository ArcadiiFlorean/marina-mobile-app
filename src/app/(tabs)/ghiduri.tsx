// src/app/(tabs)/ghiduri.tsx
// TAB GHIDURI — articole pe cei 3 piloni + first aid (Sprint 3).

import { Header } from "@/components/Header";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";

export default function Ghiduri() {
  return (
    <Screen>
      <Header title="Ghiduri" subtitle="Alăptare · Diversificare · Înțărcare" />
      <ThemedText variant="body" color="warmGray">
        Articolele vor apărea aici — în curând.
      </ThemedText>
    </Screen>
  );
}
