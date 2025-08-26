import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type IconName = keyof typeof Ionicons.glyphMap;

export default function MenuScreen() {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const { t } = useLanguage();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const handleLogout = () => {
    // Xử lý logout, ví dụ chuyển về màn hình đăng nhập
    router.replace("/auth/register");
  };

  const menuItems: {
    id: number;
    icon: IconName;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
  }[] = [
    {
      id: 1,
      icon: "person-outline",
      title: t("profile"),
      onPress: () => {},
    },
    {
      id: 2,
      icon: "bookmark-outline",
      title: t("saved"),
      onPress: () => {},
    },
    {
      id: 3,
      icon: "settings-outline",
      title: t("settings"),
      onPress: () => {},
    },
    {
      id: 4,
      icon: "language",
      title: t("language"),
      subtitle: t("languageDesc"),
      onPress: () => setShowLanguageSelector(true),
    },
    {
      id: 5,
      icon: !isDarkMode ? "sunny-outline" : "moon-outline",
      title: isDarkMode ? t("lightMode") : t("darkMode"),
      subtitle: isDarkMode ? t("lightModeDesc") : t("darkModeDesc"),
      showSwitch: true,
      switchValue: isDarkMode,
      onSwitchChange: toggleDarkMode,
    },
    {
      id: 6,
      icon: "help-circle-outline",
      title: t("help"),
      subtitle: t("helpDesc"),
      onPress: () => {},
    },
    {
      id: 7,
      icon: "information-circle-outline",
      title: t("about"),
      subtitle: t("aboutDesc"),
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t("menu")}
          </Text>
        </View>

        <View style={styles.content}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, { backgroundColor: colors.surface }]}
              onPress={item.onPress}
              disabled={item.showSwitch}
            >
              <Ionicons name={item.icon} size={24} color={colors.text} />
              <View style={styles.menuTextContainer}>
                <Text style={[styles.menuText, { color: colors.text }]}>
                  {item.title}
                </Text>
                {item.subtitle && (
                  <Text
                    style={[
                      styles.menuSubtext,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {item.subtitle}
                  </Text>
                )}
              </View>
              {item.showSwitch ? (
                <Switch
                  value={item.switchValue}
                  onValueChange={item.onSwitchChange}
                  trackColor={{ false: "#767577", true: colors.primary }}
                  thumbColor={colors.surface}
                />
              ) : (
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={colors.textSecondary}
                />
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: colors.error }]}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>{t("logout")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  menuText: {
    fontSize: 16,
  },
  menuSubtext: {
    fontSize: 12,
    marginTop: 2,
  },
  logoutButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
