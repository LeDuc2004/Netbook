import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CreatePost() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => router.push("/user_profile/1")}
        >
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=1" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.inputContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Text style={[styles.inputText, { color: colors.textSecondary }]}>
            {t("whatOnMind")}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="videocam" size={24} color="#f02849" />
          <Text style={[styles.actionText, { color: colors.text }]}>
            {t("liveVideo")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="images" size={24} color="#45bd62" />
          <Text style={[styles.actionText, { color: colors.text }]}>
            {t("photo")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="happy" size={24} color="#f7b928" />
          <Text style={[styles.actionText, { color: colors.text }]}>
            {t("feeling")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  inputContainer: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#e4e6eb",
    paddingTop: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
});
