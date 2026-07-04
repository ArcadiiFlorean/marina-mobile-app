// src/app/onboarding/login.tsx
// -----------------------------------------------------------------------------
// ECRAN LOGIN — autentificare cu Google / Apple / Email.
// ACUM: butoanele + un "login simulat" (avansăm fără backend).
// Autentificarea REALĂ prin Supabase se leagă în Sprint 4.
//
// Din brief: badge "IBCLC certificat" pentru încredere (social proof).
// -----------------------------------------------------------------------------

import { View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Mail, ShieldCheck } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { colors, spacing, radius } from "@/theme";

export default function Login() {
  const router = useRouter();
  const { t } = useTranslation();

  // "Login simulat" — deocamdată doar trece la pasul următor.
  // În Sprint 4 aici va fi autentificarea reală (Supabase).
  const handleLogin = (method: "google" | "apple" | "email") => {
    // TODO Sprint 4: autentificare reală prin Supabase pentru fiecare metodă.
    console.log("Login simulat cu:", method);
    router.push("/onboarding/focus"); // următorul ecran: caruselul de interese
  };

  return (
    <Screen scroll>
      {/* Buton înapoi */}
      <Pressable
        onPress={() => router.back()}
        style={styles.backButton}
        hitSlop={8}
      >
        <ChevronLeft size={26} color={colors.ink} />
      </Pressable>

      <View style={styles.container}>
        {/* Titlu + badge de încredere */}
        <View style={styles.header}>
          <ThemedText variant="h1">{t("onboarding.login.title")}</ThemedText>
          <ThemedText variant="body" color="inkSoft" style={styles.subtitle}>
            {t("onboarding.login.subtitle")}
          </ThemedText>

          <View style={styles.badgeRow}>
            <Badge label={t("onboarding.login.certified")} variant="rose" />
          </View>
        </View>

        {/* Butoanele de autentificare */}
        <View style={styles.buttons}>
          {/* Google */}
          <Button
            title={t("onboarding.login.google")}
            variant="secondary"
            fullWidth
            onPress={() => handleLogin("google")}
          />

          {/* Apple */}
          <Button
            title={t("onboarding.login.apple")}
            variant="secondary"
            fullWidth
            onPress={() => handleLogin("apple")}
          />

          {/* Email */}
          <Button
            title={t("onboarding.login.email")}
            variant="primary"
            icon={<Mail size={18} color={colors.white} />}
            fullWidth
            onPress={() => handleLogin("email")}
          />
        </View>

        {/* Notă de confidențialitate */}
        <View style={styles.footer}>
          <ShieldCheck size={16} color={colors.warmGray} />
          <ThemedText variant="caption" color="warmGray" style={styles.footerText}>
            {t("onboarding.login.privacy")}
          </ThemedText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginLeft: -spacing.xs,
    marginBottom: spacing.lg,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    marginBottom: spacing.xxl,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  badgeRow: {
    flexDirection: "row",
    marginTop: spacing.lg,
  },
  buttons: {
    gap: spacing.md,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  footerText: {
    flex: 1,
    textAlign: "center",
  },
});