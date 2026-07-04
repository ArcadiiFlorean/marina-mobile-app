// src/components/Badge.tsx
// -----------------------------------------------------------------------------
// BADGE — eticheta mică, colorată. Apare pe carduri pentru:
//   • alergeni ("Ou", "Lapte", "Arahide")
//   • "Premium" (conținut cu abonament)
//   • "IBCLC certificat"
//   • categorii ("Alăptare", "Diversificare", "Înțărcare")
//
// Variante de culoare (semantice), toate în paleta Marinei:
//   • neutral  — gri cald (implicit, pt. etichete simple)
//   • rose     — dusty rose (accent, pt. categorii)
//   • premium  — pentru conținutul cu abonament (ambră caldă)
//   • allergen — pentru alergeni (roșu-teracotă, atenționare blândă)
//
// Exemple:
//   <Badge label="Diversificare" variant="rose" />
//   <Badge label="Premium" variant="premium" />
//   <Badge label="Ou" variant="allergen" />
// -----------------------------------------------------------------------------

import { colors, radius, spacing } from "@/theme";
import { StyleSheet, TextStyle, View } from "react-native";
import { ThemedText } from "./ThemedText";

type BadgeVariant = "neutral" | "rose" | "premium" | "allergen";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export function Badge({ label, variant = "neutral" }: BadgeProps) {
  const { bg, fg } = variantColors[variant];

  return (
    <View style={[styles.base, { backgroundColor: bg }]}>
      <ThemedText variant="caption" style={[styles.text, { color: fg }]}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "flex-start", // badge-ul ia doar lățimea textului, nu tot rândul
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill, // complet rotunjit (tip pastilă)
  },
  text: {
    fontFamily: undefined, // păstrează fontul din variant "caption"
  } as TextStyle,
});

// Perechi de culori (fundal + text) pentru fiecare variantă.
const variantColors: Record<BadgeVariant, { bg: string; fg: string }> = {
  neutral: {
    bg: colors.creamDark,
    fg: colors.inkSoft,
  },
  rose: {
    bg: colors.roseSoft,
    fg: colors.roseDark,
  },
  premium: {
    bg: "#F5E6D0", // ambră deschisă
    fg: colors.warning, // ambră închisă (din temă)
  },
  allergen: {
    bg: "#F5DEDC", // roșu-teracotă deschis
    fg: colors.error, // roșu-teracotă închis (din temă)
  },
};
