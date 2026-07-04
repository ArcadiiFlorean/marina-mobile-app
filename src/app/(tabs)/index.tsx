// src/app/(tabs)/index.tsx
// TAB ACASĂ — momentan testăm componenta Button. Devine dashboard în Sprint 3.

import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { colors, spacing } from "@/theme";
import { Calendar } from "lucide-react-native";
import { Alert, StyleSheet, View } from "react-native";

export default function Acasa() {
  return (
    <Screen scroll>
      <ThemedText variant="h1">Butoane</ThemedText>
      <ThemedText variant="body" color="warmGray">
        Test vizual al componentei Button.
      </ThemedText>

      <View style={styles.group}>
        {/* Principal */}
        <Button
          title="Programează consultație"
          variant="primary"
          onPress={() => Alert.alert("Apăsat", "Buton principal")}
        />

        {/* Principal mare, cu iconiță */}
        <Button
          title="Rezervă acum"
          variant="primary"
          size="lg"
          icon={<Calendar size={18} color={colors.white} />}
          onPress={() => Alert.alert("Apăsat", "Buton mare cu iconiță")}
        />

        {/* Secundar */}
        <Button
          title="Vezi detalii"
          variant="secondary"
          onPress={() => Alert.alert("Apăsat", "Buton secundar")}
        />

        {/* Ghost */}
        <Button
          title="Anulează"
          variant="ghost"
          onPress={() => Alert.alert("Apăsat", "Buton ghost")}
        />

        {/* Încărcare */}
        <Button title="Se trimite..." variant="primary" loading />

        {/* Dezactivat */}
        <Button title="Indisponibil" variant="primary" disabled />

        {/* Pe toată lățimea */}
        <Button
          title="Buton pe toată lățimea"
          variant="primary"
          fullWidth
          onPress={() => Alert.alert("Apăsat", "Full width")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  group: {
    marginTop: spacing.xl,
    gap: spacing.md, // spațiu între butoane
  },
});
