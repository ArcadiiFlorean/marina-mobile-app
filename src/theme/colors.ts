// src/theme/colors.ts
// -----------------------------------------------------------------------------
// CULORILE BRANDULUI MARINA
// Paleta oficială din brief. NU se scriu culori direct în ecrane —
// se importă mereu de aici. Așa, dacă Marina vrea altă nuanță,
// o schimbi într-un singur loc și se propagă în toată aplicația.
// -----------------------------------------------------------------------------

export const colors = {
  // --- Culori de brand (din brief) ---
  ink: "#222222", // text principal / negru cald
  cream: "#F6F1EB", // fundal principal (crem)
  beige: "#E7D7CD", // fundal secundar / carduri
  warmGray: "#B9B0AA", // gri cald / text secundar, borduri
  dustyRose: "#C98787", // accent (butoane, linkuri, evidențieri)

  // --- Derivate utile (variații ale paletei de mai sus) ---
  inkSoft: "#4A4A4A", // text puțin mai deschis (subtitluri)
  roseSoft: "#E0B3B3", // dusty rose deschis (fundaluri fine de accent)
  roseDark: "#B06B6B", // dusty rose închis (apăsare buton, hover)
  creamDark: "#EFE7DD", // crem ușor mai închis (separatoare subtile)

  // --- Neutre funcționale ---
  white: "#FFFFFF",
  black: "#000000",

  // --- Stări (semantic) ---
  success: "#7BA05B", // verde salvie (confirmări) — se armonizează cu paleta
  error: "#C25B54", // roșu-teracotă (erori) — cald, nu strident
  warning: "#D99A5B", // ambră (atenționări)

  // --- Transparente (pentru umbre, overlay-uri) ---
  overlay: "rgba(34, 34, 34, 0.5)", // fundal întunecat pt. modale
  shadow: "rgba(34, 34, 34, 0.12)", // umbre subtile pe carduri
} as const;

// Tipul TypeScript — îți dă autocomplete și prinde greșeli de scriere.
export type ColorName = keyof typeof colors;
