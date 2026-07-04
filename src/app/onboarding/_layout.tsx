// src/app/onboarding/_layout.tsx
// -----------------------------------------------------------------------------
// NAVIGAȚIA ONBOARDING — un "stack" separat de ecrane, parcurse în ordine.
// Fără header default; fiecare ecran își gestionează propriul aspect.
// Fără gesturi de swipe-înapoi (ca mama să parcurgă ordonat, cu butoane).
// -----------------------------------------------------------------------------

import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // fără swipe-înapoi în onboarding
        animation: "slide_from_right", // tranziție lină între ecrane
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome-test" />
    </Stack>
  );
}