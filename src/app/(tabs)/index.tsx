// src/app/(tabs)/index.tsx
// TAB ACASĂ — test vizual Card + Badge. Devine dashboard în Sprint 3.

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { colors, spacing } from "@/theme";
import { Calendar } from "lucide-react-native";
import { Alert, StyleSheet, View } from "react-native";

export default function Acasa() {
  return (
    <Screen scroll>
      <ThemedText variant="h1">Carduri & etichete</ThemedText>
      <ThemedText variant="body" color="warmGray">
        Cum vor arăta articolele și cardurile din aplicație.
      </ThemedText>

      <View style={styles.group}>
        {/* Card de articol apăsabil (ca în Ghiduri) */}
        <Card onPress={() => Alert.alert("Articol", "S-ar deschide articolul")}>
          <View style={styles.badgeRow}>
            <Badge label="Diversificare" variant="rose" />
            <Badge label="Premium" variant="premium" />
          </View>
          <ThemedText variant="h3" style={styles.cardTitle}>
            Primele alimente solide: de unde începi
          </ThemedText>
          <ThemedText variant="bodySmall" color="warmGray">
            Ghid pas cu pas · 5 min de citit
          </ThemedText>
        </Card>

        {/* Card de rețetă cu alergeni (ca în Hrănire) */}
        <Card onPress={() => Alert.alert("Rețetă", "S-ar deschide rețeta")}>
          <ThemedText variant="h3" style={styles.cardTitle}>
            Piure de dovleac cu linte
          </ThemedText>
          <ThemedText variant="bodySmall" color="warmGray" style={styles.mb}>
            Bogat în fier · de la 6 luni
          </ThemedText>
          <View style={styles.badgeRow}>
            <Badge label="Fără alergeni" variant="neutral" />
          </View>
        </Card>

        {/* Card de rețetă cu alergen */}
        <Card variant="beige">
          <ThemedText variant="h3" style={styles.cardTitle}>
            Clătite cu ou și banană
          </ThemedText>
          <ThemedText variant="bodySmall" color="warmGray" style={styles.mb}>
            Mic dejun · de la 9 luni
          </ThemedText>
          <View style={styles.badgeRow}>
            <Badge label="Ou" variant="allergen" />
            <Badge label="Gluten" variant="allergen" />
          </View>
        </Card>

        {/* Card de consultație (accent rose) — injectat contextual */}
        <Card variant="rose">
          <ThemedText variant="h3" style={styles.cardTitle}>
            Ai nevoie de ajutor personalizat?
          </ThemedText>
          <ThemedText variant="bodySmall" color="inkSoft" style={styles.mb}>
            Programează o consultație cu Marina.
          </ThemedText>
          <Button
            title="Programează consultație"
            variant="primary"
            icon={<Calendar size={18} color={colors.white} />}
            onPress={() => Alert.alert("Consultație", "S-ar deschide plata")}
          />
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  group: {
    marginTop: spacing.xl,
    gap: spacing.md, // spațiu între carduri
  },
  badgeRow: {
    flexDirection: "row",
    gap: spacing.xs, // spațiu între badge-uri
  },
  cardTitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xxs,
  },
  mb: {
    marginBottom: spacing.sm,
  },
});
