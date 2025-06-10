import StoryItem from "@/components/StoryItem";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function StoriesSection() {
  const { colors } = useTheme();

  const stories = [
    { id: 1, username: "Bạn", avatar: "B", hasStory: false, isAdd: true },
    { id: 2, username: "Nguyễn Văn A", avatar: "A", hasStory: true },
    { id: 3, username: "Trần Thị B", avatar: "B", hasStory: true },
    { id: 4, username: "Lê Văn C", avatar: "C", hasStory: true },
    { id: 5, username: "Phạm Thị D", avatar: "D", hasStory: true },
    { id: 6, username: "Hoàng Văn E", avatar: "E", hasStory: true },
  ];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderBottomColor: colors.border },
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {stories.map((story) => (
          <StoryItem key={story.id} story={story} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
});
