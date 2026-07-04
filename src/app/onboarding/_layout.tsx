// src/app/onboarding/_layout.tsx
// -----------------------------------------------------------------------------
// NAVIGAȚIA ONBOARDING — stack de ecrane parcurse în ordine.
// -----------------------------------------------------------------------------

import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="focus" />
      <Stack.Screen name="baby-name" />
      <Stack.Screen name="baby-birthdate" />
      <Stack.Screen name="baby-gender" />
      <Stack.Screen name="baby-allergies" />
      <Stack.Screen name="solids-method" />
      <Stack.Screen name="confirm" />
      <Stack.Screen name="personalizing" />
    </Stack>
  );
}