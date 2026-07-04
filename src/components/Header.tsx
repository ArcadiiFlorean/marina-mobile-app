// src/components/Header.tsx
// -----------------------------------------------------------------------------
// HEADER DE ECRAN — titlul de sus al unei file, în stilul Marinei.
// Poate afișa opțional un buton de acțiune în dreapta (ex. roata dințată de
// setări), cum fac aplicațiile profesionale.
//
// Exemple:
//   <Header title="Ghiduri" />
//   <Header title="Hrănire" subtitle="Alimente și rețete" />
//   <Header title="Acasă" showSettings />   // cu roata dințată sus-dreapta
// -----------------------------------------------------------------------------

import { View, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Settings as SettingsIcon } from "lucide-react-native";
import { ThemedText } from "./ThemedText";
import { colors, spacing } from "@/theme";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showSettings?: boolean; // dacă true, arată roata dințată în dreapta
}

export function Header({ title, subtitle, showSettings = false }: HeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Titlu + subtitlu (în stânga) */}
        <View style={styles.titleWrap}>
          <ThemedText variant="h1">{title}</ThemedText>
          {subtitle ? (
            <ThemedText
              variant="body"
              color="warmGray"
              style={styles.subtitle}
            >
              {subtitle}
            </ThemedText>
          ) : null}
        </View>

        {/* Roata dințată (în dreapta, opțională) */}
        {showSettings ? (
          <Pressable
            onPress={() => router.push("/settings")}
            style={styles.settingsButton}
            hitSlop={8}
          >
            <SettingsIcon size={24} color={colors.inkSoft} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleWrap: {
    flex: 1,
  },
  subtitle: {
    marginTop: spacing.xxs,
  },
  settingsButton: {
    padding: spacing.xs,
    marginTop: spacing.xs,
  },
});