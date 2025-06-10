import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface StoryItemProps {
  story: {
    id: number;
    username: string;
    avatar: string;
    hasStory: boolean;
    isAdd?: boolean;
  };
}

const StoryItem: React.FC<StoryItemProps> = ({ story }) => {
  const { colors } = useTheme();
  const { username, avatar, hasStory, isAdd = false } = story;

  return (
    <TouchableOpacity style={styles.container}>
      <View
        style={[
          styles.avatarContainer, 
          isAdd && [styles.addStoryContainer, { backgroundColor: colors.background }]
        ]}
      >
        {isAdd ? (
          <View style={styles.addStoryContent}>
            <View style={[styles.addIcon, { backgroundColor: colors.primary }]}>
              <Text style={styles.addIconText}>+</Text>
            </View>
          </View>
        ) : (
          <View style={[styles.avatarBorder, { borderColor: hasStory ? colors.primary : colors.border }]}>
            <View style={[styles.avatar, { backgroundColor: colors.border }]}>
              <Text style={[styles.avatarText, { color: colors.textSecondary }]}>
                {username.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
        )}
      </View>
      <Text style={[styles.username, { color: colors.text }]} numberOfLines={1}>
        {isAdd ? "Tạo tin" : username}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 8,
    width: 70,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 4,
  },
  addStoryContainer: {
    backgroundColor: "#f0f2f5",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarBorder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#1877f2",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e4e6eb",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#65676b",
  },
  addStoryContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#1877f2",
    justifyContent: "center",
    alignItems: "center",
  },
  addIconText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  username: {
    fontSize: 12,
    color: "#050505",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default StoryItem;
