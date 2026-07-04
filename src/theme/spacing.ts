// src/theme/spacing.ts
// -----------------------------------------------------------------------------
// SPAȚIERE, COLȚURI, UMBRE
// O scară consistentă de spații. În loc să scrii "16" sau "20" aleatoriu prin
// ecrane, folosești spacing.md, spacing.lg etc. Așa tot layout-ul respiră la fel
// și arată ordonat, profesional — nu improvizat.
// -----------------------------------------------------------------------------

// Scara de spațiere — bazată pe multipli de 4 (standard în design mobil).
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16, // spațiul "implicit" cel mai folosit (padding ecran, între carduri)
  xl: 24,
  xxl: 32,
  xxxl: 48,
  huge: 64,
} as const;

// Rotunjimea colțurilor — pentru butoane, carduri, input-uri.
export const radius = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14, // colțul "implicit" pentru carduri și butoane
  xl: 20,
  pill: 999, // complet rotund (butoane tip "pastilă", badge-uri)
} as const;

// Umbre predefinite — senzație premium, subtilă (nu umbre grele de Android vechi).
// Pe iOS folosesc shadow*, pe Android folosesc elevation. Le punem pe amândouă.
export const shadows = {
  none: {
    shadowColor: "transparent",
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  // Umbră fină — pentru carduri de conținut.
  card: {
    shadowColor: "#222222",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  // Umbră mai pronunțată — pentru elemente ridicate (modale, butoane flotante).
  raised: {
    shadowColor: "#222222",
    shadowOpacity: 0.14,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
} as const;

export type SpacingKey = keyof typeof spacing;
export type RadiusKey = keyof typeof radius;
