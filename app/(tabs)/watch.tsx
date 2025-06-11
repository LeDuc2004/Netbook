import CommentModal from "@/components/CommentModal";
import VideoPlayer from "@/components/VideoPlayer";
import { watchData } from "@/constants/Watch-data";
import React, { useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

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
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState<VideoItem[]>(watchData);

  const translateY = useRef(new Animated.Value(0)).current;
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const handleGestureStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationY } = event.nativeEvent;

      if (
        translationY < -screenHeight / 3 &&
        currentVideoIndex < videos.length - 1
      ) {
        // Swipe up - Next video
        Animated.timing(translateY, {
          toValue: -screenHeight,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setCurrentVideoIndex(currentVideoIndex + 1);
          setIsPlaying(true); // Auto play next video
          translateY.setValue(0);
        });
      } else if (translationY > screenHeight / 3 && currentVideoIndex > 0) {
        // Swipe down - Previous video
        Animated.timing(translateY, {
          toValue: screenHeight,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setCurrentVideoIndex(currentVideoIndex - 1);
          setIsPlaying(true); // Auto play previous video
          translateY.setValue(0);
        });
      } else {
        // Return to original position
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

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

  const currentVideo = videos[currentVideoIndex];

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <PanGestureHandler
          onGestureEvent={handleGestureEvent}
          onHandlerStateChange={handleGestureStateChange}
        >
          <Animated.View
            style={[
              styles.videoContainer,
              {
                transform: [{ translateY }],
              },
            ]}
          >
            <VideoPlayer
              videoUrl={currentVideo.videoUrl}
              avatar={currentVideo.avatar}
              username={currentVideo.username}
              description={currentVideo.description}
              isFollowing={currentVideo.isFollowing}
              isLiked={currentVideo.isLiked}
              likes={currentVideo.likes}
              comments={currentVideo.comments}
              shares={currentVideo.shares}
              onToggleFollow={toggleFollow}
              onToggleLike={toggleLike}
              onShowComments={() => setShowCommentModal(true)}
              id={currentVideo.id}
            />
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
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
    backgroundColor: "#000",
  },
  videoContainer: {
    flex: 1,
    position: "relative",
  },
});
