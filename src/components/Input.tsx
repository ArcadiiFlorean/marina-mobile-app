// src/components/Input.tsx
// -----------------------------------------------------------------------------
// INPUT — câmpul de text al aplicației.
// Folosit la: bara de căutare, numele bebelușului, email/parolă la login.
//
// Proprietăți utile:
//   • label: etichetă deasupra câmpului (ex. "Numele bebelușului")
//   • placeholder: textul gri din câmp când e gol
//   • error: mesaj de eroare (ex. "Email invalid") → chenar roșu + text roșu
//   • icon: iconiță la stânga (ex. lupă pt. căutare)
//   • secureTextEntry: ascunde textul (pentru parole)
//
// Exemple:
//   <Input label="Numele bebelușului" value={x} onChangeText={setX} />
//   <Input placeholder="Caută..." icon={<Search .../>} value={q} onChangeText={setQ} />
//   <Input label="Email" error="Email invalid" ... />
// -----------------------------------------------------------------------------

import { ReactNode, useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { colors, radius, spacing, fonts, fontSize } from "@/theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: ReactNode;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  icon,
  containerStyle,
  ...rest // toate proprietățile standard TextInput: value, onChangeText, etc.
}: InputProps) {
  // `focused` = true cât timp cursorul e în câmp → colorăm chenarul cu accent.
  const [focused, setFocused] = useState(false);

  // Culoarea chenarului: roșu dacă e eroare, rose dacă e focus, beige altfel.
  const borderColor = error
    ? colors.error
    : focused
      ? colors.dustyRose
      : colors.beige;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Eticheta de deasupra (opțională) */}
      {label ? (
        <ThemedText variant="label" color="inkSoft" style={styles.label}>
          {label}
        </ThemedText>
      ) : null}

      {/* Chenarul cu iconița (opțională) + câmpul de text */}
      <View style={[styles.field, { borderColor }]}>
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.warmGray}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
      </View>

      {/* Mesajul de eroare (opțional) */}
      {error ? (
        <ThemedText variant="caption" style={styles.error}>
          {error}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginBottom: spacing.xs,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    minHeight: 50,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontFamily: fonts.body,     // Nunito
    fontSize: fontSize.md,
    color: colors.ink,
    paddingVertical: spacing.md,
  },
  error: {
    color: colors.error,
    marginTop: spacing.xxs,
  },
});