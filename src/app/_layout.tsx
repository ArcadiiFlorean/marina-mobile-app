// src/app/_layout.tsx
// -----------------------------------------------------------------------------
// LAYOUT RĂDĂCINĂ — poarta prin care trece toată aplicația.
// Face trei lucruri la pornire:
//   1. Încarcă fonturile brandului + pornește i18n.
//   2. Așteaptă ca starea salvată (onboarding terminat?) să fie citită.
//   3. Rutează: onboarding NEterminat → onboarding; terminat → tab-uri.
// -----------------------------------------------------------------------------

import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import "@/i18n"; // pornește motorul de traduceri (i18n)

// --- Fonturile brandului ---
import {
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

import { useAppStore } from "@/store/appStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  // Starea de onboarding + dacă datele salvate au fost citite.
  const hasCompletedOnboarding = useAppStore((s) => s.hasCompletedOnboarding);
  const isHydrated = useAppStore((s) => s.isHydrated);

  const router = useRouter();
  const segments = useSegments();

  // Ascundem splash-ul când fonturile ȘI datele salvate sunt gata.
  useEffect(() => {
    if ((fontsLoaded || fontError) && isHydrated) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, isHydrated]);

  // Logica de rutare: decidem unde trimitem mama.
  useEffect(() => {
    // Așteptăm ca totul să fie gata înainte de a ruta.
    if (!isHydrated || (!fontsLoaded && !fontError)) return;

    // Suntem în zona de onboarding acum?
    const inOnboarding = segments[0] === "onboarding";

    if (!hasCompletedOnboarding && !inOnboarding) {
      // N-a terminat onboarding și nu e în el → îl trimitem la onboarding.
      router.replace("/onboarding");
    } else if (hasCompletedOnboarding && inOnboarding) {
      // A terminat onboarding dar e încă în el → îl ducem în aplicație.
      router.replace("/(tabs)");
    }
  }, [hasCompletedOnboarding, isHydrated, fontsLoaded, fontError, segments, router]);

  // Cât timp fonturile sau datele nu sunt gata, nu afișăm nimic (rămâne splash).
  if ((!fontsLoaded && !fontError) || !isHydrated) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="settings" options={{ presentation: "modal" }} />
    </Stack>
  );
}