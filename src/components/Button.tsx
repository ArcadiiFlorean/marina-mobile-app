// src/components/Button.tsx
// -----------------------------------------------------------------------------
// BUTON — componenta interactivă principală a aplicației.
// Apare peste tot: "Programează consultație", "Continuă", "Intră în comunitate".
//
// Proprietăți:
//   • variant: "primary" | "secondary" | "ghost"  (aspectul)
//   • size:    "md" | "lg"                          (mărimea)
//   • loading: true  → arată un spinner, blochează apăsarea
//   • disabled: true → gri, ne-apăsabil
//   • icon: o iconiță lucide opțională, la stânga textului
//   • onPress: ce se întâmplă la apăsare
//
// Exemple:
//   <Button title="Continuă" onPress={...} />
//   <Button title="Programează" variant="primary" size="lg" onPress={...} />
//   <Button title="Anulează" variant="ghost" onPress={...} />
//   <Button title="Trimite" loading onPress={...} />
// -----------------------------------------------------------------------------

import { ReactNode } from "react";
import {
  Pressable,
  ActivityIndicator,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { colors, radius, spacing, textStyles } from "@/theme";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;        // ex: <Calendar size={18} color="#fff" />
  fullWidth?: boolean;     // dacă true, butonul se întinde pe toată lățimea
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  style,
}: ButtonProps) {
  // Butonul e "inactiv" dacă e dezactivat SAU în curs de încărcare.
  const isInactive = disabled || loading;

  // Culoarea textului/spinnerului depinde de variantă.
  const textColor =
    variant === "primary" ? colors.white : colors.dustyRose;

  return (
    <Pressable
      onPress={onPress}
      disabled={isInactive}
      // `pressed` e true cât timp degetul apasă — îl folosim pt. efectul vizual.
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && styles.fullWidth,
        pressed && !isInactive && pressedStyles[variant], // feedback la apăsare
        isInactive && styles.inactive,                    // aspect dezactivat
        style,
      ]}
    >
      {/* Conținutul: fie spinner (la loading), fie iconiță + text */}
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          {icon ? <View style={styles.icon}>{icon}</View> : null}
          <ThemedText
            variant="button"
            style={[{ color: textColor }, size === "lg" && styles.lgText]}
          >
            {title}
          </ThemedText>
        </View>
      )}
    </Pressable>
  );
}

// --- Stiluri de bază (comune tuturor butoanelor) ---
const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: spacing.sm,
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  inactive: {
    opacity: 0.45, // butonul dezactivat/în încărcare se estompează
  },
  lgText: {
    fontSize: textStyles.button.fontSize + 2, // text puțin mai mare la size "lg"
  },
});

// --- Stiluri pe mărime ---
const sizeStyles: Record<ButtonSize, ViewStyle> = {
  md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    minHeight: 48,
  },
  lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
    minHeight: 56,
  },
};

// --- Stiluri pe variantă (starea normală) ---
const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.dustyRose,
  },
  secondary: {
    backgroundColor: colors.cream,
    borderWidth: 1.5,
    borderColor: colors.dustyRose,
  },
  ghost: {
    backgroundColor: "transparent",
  },
};

// --- Stiluri la apăsare (degetul pe buton) — se întunecă/colorează subtil ---
const pressedStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.roseDark, // rose mai închis
  },
  secondary: {
    backgroundColor: colors.roseSoft, // fundal rose deschis
  },
  ghost: {
    backgroundColor: colors.roseSoft,
  },
};