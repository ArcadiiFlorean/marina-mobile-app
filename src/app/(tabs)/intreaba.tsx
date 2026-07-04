// src/app/(tabs)/intreaba.tsx
// TAB ÎNTREABĂ MARINA — chat AI + consultații + comunitate (Sprint 5).
// Acesta e diferențiatorul față de Solid Starts.

import { Header } from "@/components/Header";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";

export default function Intreaba() {
  return (
    <Screen>
      <Header
        title="Întreabă Marina"
        subtitle="Chat, consultații și comunitate"
      />
      <ThemedText variant="body" color="warmGray">
        Aici vei putea vorbi cu Marina și programa o consultație — în curând.
      </ThemedText>
    </Screen>
  );
}
