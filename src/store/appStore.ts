// src/store/appStore.ts
// -----------------------------------------------------------------------------
// STAREA GLOBALĂ A APLICAȚIEI
// Aici ținem lucruri care privesc aplicația în ansamblu, nu un ecran anume:
//   • hasCompletedOnboarding → a terminat mama onboarding-ul? (decide ce vede)
//   • isHydrated → am terminat de citit datele salvate de pe telefon?
//
// Datele se salvează AUTOMAT pe telefon (persist), deci se păstrează și după
// închiderea aplicației. Data viitoare mama intră direct în aplicație.
// -----------------------------------------------------------------------------

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppState {
  // A terminat onboarding-ul? (fals prima dată, adevărat după finalizare)
  hasCompletedOnboarding: boolean;

  // Marchează onboarding-ul ca terminat (se apelează la finalul lui).
  completeOnboarding: () => void;

  // Resetează onboarding-ul (util pentru testare — să-l vezi din nou).
  resetOnboarding: () => void;

  // Devine true după ce datele salvate au fost citite de pe telefon.
  // Cât e false, nu știm încă starea reală → afișăm un ecran de încărcare.
  isHydrated: boolean;
  setHydrated: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,

      completeOnboarding: () => set({ hasCompletedOnboarding: true }),

      resetOnboarding: () => set({ hasCompletedOnboarding: false }),

      isHydrated: false,
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "marina-app-state", // cheia sub care se salvează pe telefon
      storage: createJSONStorage(() => AsyncStorage),

      // Salvăm DOAR flag-ul de onboarding (nu și isHydrated, care e temporar).
      partialize: (state) => ({
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      }),

      // Când datele s-au încărcat de pe telefon, marcăm isHydrated = true.
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);