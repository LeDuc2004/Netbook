import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FacebookHeader() {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: colors.surface, borderBottomColor: colors.border },
      ]}
    >
      <View style={styles.leftSection}>
        <Text style={[styles.logo, { color: colors.primary }]}>facebook</Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: colors.border }]}
        >
          <Ionicons name="search" size={20} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: colors.border }]}
        >
          <Ionicons name="chatbubble-outline" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: 25,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  leftSection: {
    flex: 1,
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1877f2",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
    padding: 8,
  },
});
