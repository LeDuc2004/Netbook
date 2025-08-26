import CommentModal from "@/components/CommentModal";
import VideoPlayer from "@/components/VideoPlayer";
import { watchData } from "@/constants/Watch-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const HEADER_HEIGHT = 60;

interface VideoItem {
  id: number;
  username: string;
  avatar: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isFollowing: boolean;
  videoUrl: string;
  thumbnail: string;
}

export default function WatchScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState<VideoItem[]>(watchData);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const availableHeight =
    screenHeight - insets.top - HEADER_HEIGHT - tabBarHeight;

  const toggleLike = (videoId: number) => {
    setVideos(
      videos.map((video) =>
        video.id === videoId
          ? {
              ...video,
              isLiked: !video.isLiked,
              likes: video.isLiked ? video.likes - 1 : video.likes + 1,
            }
          : video
      )
    );
  };

  const toggleFollow = (videoId: number) => {
    setVideos(
      videos.map((video) =>
        video.id === videoId
          ? { ...video, isFollowing: !video.isFollowing }
          : video
      )
    );
  };

  const renderVideoItem = ({
    item,
    index,
  }: {
    item: VideoItem;
    index: number;
  }) => {
    // Chỉ video hiện tại mới được đánh dấu là visible
    const isVideoVisible = index === currentVideoIndex;
    return (
      <View style={[styles.videoContainer, { height: availableHeight }]}>
        <VideoPlayer
          videoUrl={item.videoUrl}
          avatar={item.avatar}
          username={item.username}
          description={item.description}
          isFollowing={item.isFollowing}
          isLiked={item.isLiked}
          likes={item.likes}
          comments={item.comments}
          shares={item.shares}
          onToggleFollow={toggleFollow}
          onToggleLike={toggleLike}
          onShowComments={() => setShowCommentModal(true)}
          id={item.id}
          isVisible={isVideoVisible}
        />
      </View>
    );
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const visibleIndex = viewableItems[0].index;
        if (visibleIndex !== null && visibleIndex !== currentVideoIndex) {
          setCurrentVideoIndex(visibleIndex);
        }
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const getItemLayout = (data: any, index: number) => ({
    length: availableHeight,
    offset: availableHeight * index,
    index,
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <FlatList
        ref={flatListRef}
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={availableHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout}
        initialScrollIndex={currentVideoIndex}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews={true}
        style={styles.flatList}
      />
      <CommentModal
        visible={showCommentModal}
        onClose={() => setShowCommentModal(false)}
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
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  placeholderText: {
    fontSize: 16,
    textAlign: "center",
  },
  flatList: {
    flex: 1,
  },
  videoContainer: {
    width: screenWidth,
  },
});
