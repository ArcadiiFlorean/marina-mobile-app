// src/store/onboardingStore.ts
// -----------------------------------------------------------------------------
// DEPOZITUL PROFILULUI BEBELUȘULUI (colectat în timpul onboarding-ului)
// Fiecare ecran de onboarding scrie aici datele mamei: numele bebelușului,
// data nașterii, gen, alergii, metoda de hrănire etc.
//
// La finalul onboarding-ului, tot acest profil se salvează (mai târziu și în
// backend, Sprint 4). Acum se păstrează pe telefon.
// -----------------------------------------------------------------------------

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Metoda de hrănire preferată (din concept: BLW / linguriță / ambele).
export type FeedingMethod = "blw" | "spoon" | "both" | null;

// Genul bebelușului.
export type BabyGender = "girl" | "boy" | "other" | null;

// Profilul complet al bebelușului.
interface BabyProfile {
  name: string;
  birthDate: string | null;   // format ISO (ex. "2025-03-15")
  isPremature: boolean;
  gender: BabyGender;
  allergies: string[];        // lista de alergeni cunoscuți
  restrictions: string[];     // restricții alimentare
  hasEczema: boolean;
  startedSolids: boolean | null;
  feedingMethod: FeedingMethod;

  // Zona principală de interes aleasă la început (din carusel).
  mainFocus: string | null;   // ex. "breastfeeding", "solids", "weaning"
}

interface OnboardingState {
  profile: BabyProfile;

  // Actualizează una sau mai multe câmpuri din profil deodată.
  updateProfile: (data: Partial<BabyProfile>) => void;

  // Resetează profilul (util la testare sau dacă mama reîncepe).
  resetProfile: () => void;
}

// Profilul gol de pornire.
const emptyProfile: BabyProfile = {
  name: "",
  birthDate: null,
  isPremature: false,
  gender: null,
  allergies: [],
  restrictions: [],
  hasEczema: false,
  startedSolids: null,
  feedingMethod: null,
  mainFocus: null,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      profile: emptyProfile,

      updateProfile: (data) =>
        set((state) => ({ profile: { ...state.profile, ...data } })),

      resetProfile: () => set({ profile: emptyProfile }),
    }),
    {
      name: "marina-baby-profile", // cheia de salvare pe telefon
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);