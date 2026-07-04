// src/app/(tabs)/_layout.tsx
// -----------------------------------------------------------------------------
// BARA DE NAVIGAȚIE DE JOS — 5 tab-uri, în brandul Marinei.
// Fiecare tab are: un titlu (RO) și o iconiță vectorială (lucide, nu emoji).
// Culorile active/inactive vin din tema Marinei.
// -----------------------------------------------------------------------------

import { colors, fonts } from "@/theme";
import { Tabs } from "expo-router";
import {
  BookOpen,
  House,
  MessageCircleHeart,
  Search,
  Utensils,
} from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // fără header default; ne facem propriul header mai târziu
        tabBarActiveTintColor: colors.dustyRose, // tab-ul selectat — accentul Marinei
        tabBarInactiveTintColor: colors.warmGray, // tab-urile neselectate — gri cald
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.beige,
          borderTopWidth: 1,
          height: 88, // înălțime confortabilă (include zona de jos a telefonului)
          paddingTop: 8,
          paddingBottom: 28, // spațiu pt. bara de gesturi de jos
        },
        tabBarLabelStyle: {
          fontFamily: fonts.label, // Poppins Medium
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Acasă",
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="hranire"
        options={{
          title: "Hrănire",
          tabBarIcon: ({ color, size }) => (
            <Utensils color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ghiduri"
        options={{
          title: "Ghiduri",
          tabBarIcon: ({ color, size }) => (
            <BookOpen color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="intreaba"
        options={{
          title: "Întreabă Marina",
          tabBarIcon: ({ color, size }) => (
            <MessageCircleHeart color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="cauta"
        options={{
          title: "Caută",
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
