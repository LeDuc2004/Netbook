import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CreatePost = () => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderBottomColor: colors.border },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.border }]}>
          <Text style={[styles.avatarText, { color: colors.textSecondary }]}>
            B
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.inputContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Text
            style={[styles.placeholderText, { color: colors.textSecondary }]}
          >
            Bạn đang nghĩ gì?
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <View style={[styles.actions, { borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="videocam" size={20} color={colors.error} />
          <Text style={[styles.actionText, { color: colors.text }]}>
            Video trực tiếp
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="images" size={20} color={colors.success} />
          <Text style={[styles.actionText, { color: colors.text }]}>Ảnh</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="happy" size={20} color={colors.warning} />
          <Text style={[styles.actionText, { color: colors.text }]}>
            Cảm xúc
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e4e6eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#65676b",
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  placeholderText: {
    fontSize: 16,
    color: "#65676b",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    color: "#65676b",
    marginLeft: 6,
    fontWeight: "500",
  },
});

export default CreatePost;
