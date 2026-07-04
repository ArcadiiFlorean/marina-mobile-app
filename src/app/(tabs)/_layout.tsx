// src/app/(tabs)/_layout.tsx
// -----------------------------------------------------------------------------
// BARA DE NAVIGAȚIE DE JOS — 5 tab-uri, în brandul Marinei.
// Titlurile vin acum din traduceri (t("tabs...")), deci se schimbă cu limba.
// -----------------------------------------------------------------------------

import { colors, fonts } from "@/theme";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  House,
  MessageCircleHeart,
  Search,
  Utensils,
} from "lucide-react-native";

export default function TabsLayout() {
  // t = funcția de traducere; caută textul în limba activă.
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.dustyRose,
        tabBarInactiveTintColor: colors.warmGray,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.beige,
          borderTopWidth: 1,
          height: 88,
          paddingTop: 8,
          paddingBottom: 28,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.label,
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.home"),
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="hranire"
        options={{
          title: t("tabs.feeding"),
          tabBarIcon: ({ color, size }) => (
            <Utensils color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ghiduri"
        options={{
          title: t("tabs.guides"),
          tabBarIcon: ({ color, size }) => (
            <BookOpen color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="intreaba"
        options={{
          title: t("tabs.ask"),
          tabBarIcon: ({ color, size }) => (
            <MessageCircleHeart color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="cauta"
        options={{
          title: t("tabs.search"),
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}