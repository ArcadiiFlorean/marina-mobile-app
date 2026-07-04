// src/app/_layout.tsx
// -----------------------------------------------------------------------------
// LAYOUT RĂDĂCINĂ — poarta prin care trece toată aplicația.
// Aici facem două lucruri esențiale la pornire:
//   1. Încărcăm fonturile brandului (Playfair Display, Nunito, Poppins).
//   2. Ținem splash screen-ul (ecranul de pornire) până fonturile sunt gata,
//      ca textul să NU apară întâi cu fontul de sistem și apoi să "sară".
// -----------------------------------------------------------------------------

import "@/i18n"; // pornește motorul de traduceri (i18n) la lansarea aplicației
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
// --- Fonturile brandului (exact cheile folosite în src/theme/typography.ts) ---
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import {
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

// Ținem splash screen-ul vizibil manual, până suntem gata să-l ascundem noi.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // useFonts încarcă fonturile. `fontsLoaded` devine true când sunt gata;
  // `fontError` prinde o eventuală eroare de încărcare.
  const [fontsLoaded, fontError] = useFonts({
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  // Când fonturile sunt încărcate (sau dă eroare), ascundem splash screen-ul.
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Cât timp fonturile nu sunt gata, nu afișăm nimic (rămâne splash-ul).
  // Așa evităm "flash-ul" de font de sistem.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Odată fonturile gata, afișăm navigația aplicației.
  return <Stack screenOptions={{ headerShown: false }} />;
}
