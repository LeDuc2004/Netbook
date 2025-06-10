import CreatePost from "@/components/CreatePost";
import FacebookHeader from "@/components/FacebookHeader";
import PostItem from "@/components/PostItem";
import StoriesSection from "@/components/StoriesSection";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const { colors } = useTheme();

  const posts = [
    {
      id: 1,
      username: "Nguyễn Văn A",
      avatar: "A",
      timeAgo: "2 giờ trước",
      content:
        "Hôm nay là một ngày tuyệt vời! Vừa hoàn thành xong dự án React Native mới. Cảm thấy thật sự hài lòng với kết quả. 🎉 #coding #reactnative #success",
      likes: 125,
      comments: 23,
      shares: 5,
      isLiked: false,
    },
    {
      id: 2,
      username: "Trần Thị B",
      avatar: "B",
      timeAgo: "5 giờ trước",
      content:
        "Chia sẻ công thức nấu món phở bò truyền thống của gia đình. Món ăn này đã được truyền từ đời này sang đời khác. Hy vọng mọi người sẽ thích! 🍜 #pho #vietnamese #cooking",
      likes: 89,
      comments: 15,
      shares: 12,
      isLiked: true,
    },
    {
      id: 3,
      username: "Lê Văn C",
      avatar: "C",
      timeAgo: "1 ngày trước",
      content:
        "Du lịch Đà Nẵng - Những địa điểm không thể bỏ qua! Bãi biển Mỹ Khê, Bán đảo Sơn Trà, và đặc biệt là cầu Rồng về đêm. Thật sự là một trải nghiệm tuyệt vời! ✈️ #danang #travel #vietnam",
      likes: 234,
      comments: 45,
      shares: 18,
      isLiked: false,
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <FacebookHeader />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <CreatePost />
        <StoriesSection />
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  scrollView: {
    flex: 1,
  },
});
