// src/components/Screen.tsx
// -----------------------------------------------------------------------------
// ECRAN-CONTAINER — rama comună a fiecărui ecran din aplicație.
// În loc ca fiecare tab să repete fundalul crem, padding-ul și zona sigură de
// sus, îl împachetezi în <Screen> și primește totul automat.
//
// Rezolvă și "zona sigură" (safe area): pe telefoanele cu breton/status bar,
// conținutul nu mai intră sub ceas/baterie.
//
// Exemple:
//   <Screen>...</Screen>                     // ecran normal, cu padding
//   <Screen scroll>...</Screen>              // ecran care se poate derula
//   <Screen padded={false}>...</Screen>      // fără padding (ex. liste full-width)
// -----------------------------------------------------------------------------

import { colors, spacing } from "@/theme";
import { ReactNode } from "react";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenProps {
  children: ReactNode;
  scroll?: boolean; // dacă true, conținutul se poate derula (ScrollView)
  padded?: boolean; // dacă true (implicit), adaugă padding lateral
  style?: ViewStyle; // stiluri suplimentare, dacă e nevoie
}

export function Screen({
  children,
  scroll = false,
  padded = true,
  style,
}: ScreenProps) {
  // insets = spațiile "sigure" (sus: status bar; jos: bara de gesturi).
  const insets = useSafeAreaInsets();

  // Padding-ul comun tuturor ecranelor.
  const contentStyle: ViewStyle = {
    paddingTop: insets.top + spacing.md, // sub status bar + puțin aer
    paddingHorizontal: padded ? spacing.xl : 0,
    paddingBottom: spacing.xl,
  };

  // Varianta cu derulare (pentru ecrane cu mult conținut).
  if (scroll) {
    return (
      <ScrollView
        style={[styles.screen, style]}
        contentContainerStyle={contentStyle}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  // Varianta fixă (pentru ecrane simple, fără derulare).
  return <View style={[styles.screen, contentStyle, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream, // fundalul crem al Marinei, peste tot
  },
});
