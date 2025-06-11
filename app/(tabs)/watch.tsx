import CommentModal from "@/components/CommentModal";
import VideoPlayer from "@/components/VideoPlayer";
import { watchData } from "@/constants/Watch-data";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
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
    <>
      <View style={styles.container}>
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
          maxToRenderPerBatch={3}
          windowSize={5}
          removeClippedSubviews={true}
          style={styles.flatList}
        />
      </View>
      <CommentModal
        visible={showCommentModal}
        onClose={() => setShowCommentModal(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    position: "relative",
  },
  flatList: {
    flex: 1,
  },
  videoContainer: {
    width: screenWidth,
  },
});
