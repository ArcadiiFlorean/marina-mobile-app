// src/theme/typography.ts
// -----------------------------------------------------------------------------
// TIPOGRAFIE — fonturile și mărimile brandului Marina
// Fonturile din brief:
//   • Playfair Display → titluri (elegant, editorial)
//   • Nunito / Outfit  → text de citit (cald, lizibil)
//   • Poppins          → butoane (curat, modern)
//
// NOTĂ: numele de mai jos ("PlayfairDisplay_700Bold" etc.) sunt exact cheile
// pe care le încărcăm în Sprint 1, pasul cu fonturile. Deocamdată doar le
// DEFINIM aici; încărcarea efectivă vine în pasul următor. Până atunci,
// aplicația folosește fontul de sistem — e normal.
// -----------------------------------------------------------------------------

// Numele familiilor de fonturi (așa cum le va cunoaște aplicația după încărcare).
export const fonts = {
  // Playfair Display — titluri
  heading: "PlayfairDisplay_600SemiBold",
  headingBold: "PlayfairDisplay_700Bold",

  // Nunito — text principal
  body: "Nunito_400Regular",
  bodyMedium: "Nunito_600SemiBold",
  bodyBold: "Nunito_700Bold",

  // Poppins — butoane și etichete
  button: "Poppins_600SemiBold",
  label: "Poppins_500Medium",
} as const;

// Scara de mărimi de text (în puncte).
export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16, // mărimea "implicită" pentru textul de citit
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 34,
  display: 42, // titluri mari, hero
} as const;

// Înălțimea rândului (line-height) — cât spațiu vertical ocupă un rând.
// Valori relative la mărimea textului, pentru lizibilitate.
export const lineHeight = {
  tight: 1.2, // titluri
  normal: 1.4, // implicit
  relaxed: 1.6, // paragrafe lungi (articole)
} as const;

// Stiluri de text gata făcute — le folosești direct: textStyles.h1, textStyles.body etc.
// Fiecare combină font + mărime + line-height corect.
export const textStyles = {
  // Titluri (Playfair Display)
  display: {
    fontFamily: fonts.headingBold,
    fontSize: fontSize.display,
    lineHeight: fontSize.display * lineHeight.tight,
  },
  h1: {
    fontFamily: fonts.headingBold,
    fontSize: fontSize.xxxl,
    lineHeight: fontSize.xxxl * lineHeight.tight,
  },
  h2: {
    fontFamily: fonts.heading,
    fontSize: fontSize.xxl,
    lineHeight: fontSize.xxl * lineHeight.tight,
  },
  h3: {
    fontFamily: fonts.heading,
    fontSize: fontSize.xl,
    lineHeight: fontSize.xl * lineHeight.normal,
  },

  // Text de citit (Nunito)
  body: {
    fontFamily: fonts.body,
    fontSize: fontSize.md,
    lineHeight: fontSize.md * lineHeight.relaxed,
  },
  bodyMedium: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.md,
    lineHeight: fontSize.md * lineHeight.normal,
  },
  bodySmall: {
    fontFamily: fonts.body,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * lineHeight.normal,
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: fontSize.xs,
    lineHeight: fontSize.xs * lineHeight.normal,
  },

  // Butoane și etichete (Poppins)
  button: {
    fontFamily: fonts.button,
    fontSize: fontSize.md,
    lineHeight: fontSize.md * lineHeight.tight,
  },
  label: {
    fontFamily: fonts.label,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * lineHeight.normal,
  },
} as const;
