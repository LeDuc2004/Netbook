import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  const notifications = [
    {
      id: 1,
      type: "like",
      message: t("notificationLike"),
      time: "2 " + t("hoursAgo"),
    },
    {
      id: 2,
      type: "comment",
      message: t("notificationComment"),
      time: "5 " + t("hoursAgo"),
    },
    {
      id: 3,
      type: "friend",
      message: t("notificationFriend"),
      time: "1 " + t("dayAgo"),
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t("notifications")}
          </Text>
        </View>

        <View style={styles.content}>
          {notifications.map((notification) => (
            <View
              key={notification.id}
              style={[
                styles.notificationItem,
                { backgroundColor: colors.surface },
              ]}
            >
              <Text style={[styles.notificationText, { color: colors.text }]}>
                {notification.message}
              </Text>
              <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                {notification.time}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
  notificationItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  notificationText: {
    fontSize: 16,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
  },
});
