import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

import FacebookHeader from "@/components/FacebookHeader";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useLanguage } from "@/contexts/LanguageContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function TabLayout() {
  const { colors } = useTheme();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();

  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingTop: insets.top,
        }}
      >
        <FacebookHeader />
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textSecondary,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: {
                position: "absolute",
                backgroundColor: colors.surface,
                borderTopWidth: 1,
                borderTopColor: colors.border,
              },
              default: {
                backgroundColor: colors.surface,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                paddingTop: 2,
              },
            }),
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: t("home"),
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="watch"
            options={{
              title: t("watch"),
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "play-circle" : "play-circle-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="marketplace"
            options={{
              title: t("marketplace"),
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "storefront" : "storefront-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="groups"
            options={{
              title: t("groups"),
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "people" : "people-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="notifications"
            options={{
              title: t("notifications"),
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "notifications" : "notifications-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="menu"
            options={{
              title: t("menu"),
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "menu" : "menu-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </View>
    </SafeAreaProvider>
  );
}
