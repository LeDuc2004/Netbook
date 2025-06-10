import FacebookHeader from "@/components/FacebookHeader";
import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const [videos, setVideos] = useState<VideoItem[]>([
    {
      id: 1,
      username: "Nguyễn Văn A",
      avatar: "A",
      description:
        "Cuộc sống hàng ngày của một lập trình viên 😊 #coding #life",
      likes: 1250,
      comments: 89,
      shares: 45,
      isLiked: false,
      isFollowing: false,
      videoUrl: "https://go.screenpal.com/watch/cT166nnXX3G",
      thumbnail: "🎬",
    },
    {
      id: 2,
      username: "Trần Thị B",
      avatar: "B",
      description:
        "Hướng dẫn nấu món ăn Việt Nam truyền thống 🍜 #cooking #vietnam",
      likes: 2340,
      comments: 156,
      shares: 78,
      isLiked: true,
      isFollowing: true,
      videoUrl: "https://go.screenpal.com/watch/cT166nnXX3G",
      thumbnail: "🍳",
    },
    {
      id: 3,
      username: "Lê Văn C",
      avatar: "C",
      description:
        "Du lịch Đà Nẵng - Những địa điểm không thể bỏ qua ✈️ #travel #danang",
      likes: 890,
      comments: 67,
      shares: 34,
      isLiked: false,
      isFollowing: false,
      videoUrl: "https://go.screenpal.com/watch/cT166nnXX3G",
      thumbnail: "🏖️",
    },
    {
      id: 4,
      username: "Phạm Thị D",
      avatar: "D",
      description:
        "Âm nhạc mới nhất - Cover bài hát yêu thích 🎵 #music #cover",
      likes: 3456,
      comments: 234,
      shares: 123,
      isLiked: false,
      isFollowing: true,
      videoUrl: "https://go.screenpal.com/watch/cT166nnXX3G",
      thumbnail: "🎤",
    },
  ]);

  const translateY = useRef(new Animated.Value(0)).current;
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<Video>(null);

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const handleGestureStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationY } = event.nativeEvent;

      if (translationY < -50 && currentVideoIndex < videos.length - 1) {
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
      } else if (translationY > 50 && currentVideoIndex > 0) {
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

  const togglePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const currentVideo = videos[currentVideoIndex];

  return (
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
          {/* Video Player */}
          <View style={styles.videoBackground}>
            <Video
              ref={videoRef}
              source={{ uri: currentVideo.videoUrl }}
              style={styles.video}
              resizeMode={ResizeMode.COVER}
              shouldPlay={isPlaying}
              isLooping={true}
              isMuted={false}
              onError={(error) => console.log("Video error:", error)}
            />

            {/* Play/Pause Overlay */}
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={togglePlayPause}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={40}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {/* Video Info Overlay */}
          <View style={styles.videoInfo}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{currentVideo.avatar}</Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.username}>@{currentVideo.username}</Text>
                <TouchableOpacity
                  style={[
                    styles.followButton,
                    currentVideo.isFollowing && styles.followingButton,
                  ]}
                  onPress={() => toggleFollow(currentVideo.id)}
                >
                  <Text
                    style={[
                      styles.followText,
                      currentVideo.isFollowing && styles.followingText,
                    ]}
                  >
                    {currentVideo.isFollowing ? "Đang theo dõi" : "Theo dõi"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.description}>{currentVideo.description}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => toggleLike(currentVideo.id)}
            >
              <View style={styles.actionIconContainer}>
                <Ionicons
                  name={currentVideo.isLiked ? "heart" : "heart-outline"}
                  size={28}
                  color={currentVideo.isLiked ? "#ff3b30" : "#fff"}
                />
              </View>
              <Text style={styles.actionText}>{currentVideo.likes}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIconContainer}>
                <Ionicons name="chatbubble-outline" size={28} color="#fff" />
              </View>
              <Text style={styles.actionText}>{currentVideo.comments}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIconContainer}>
                <Ionicons name="share-outline" size={28} color="#fff" />
              </View>
              <Text style={styles.actionText}>{currentVideo.shares}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIconContainer}>
                <Ionicons name="ellipsis-vertical" size={28} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "45%" }]} />
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
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
  videoBackground: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },
  videoPlaceholder: {
    fontSize: 120,
    opacity: 0.3,
  },
  playPauseButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -20,
    marginLeft: -20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 40,
    padding: 10,
  },
  videoInfo: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 80,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
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
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  followButton: {
    backgroundColor: "#1877f2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  followingButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  followText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  followingText: {
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#fff",
    lineHeight: 18,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  actionButtons: {
    position: "absolute",
    right: 16,
    bottom: 20,
    alignItems: "center",
  },
  actionButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  actionText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  progressContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 10,
  },
  progressBar: {
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 1,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#1877f2",
    borderRadius: 1,
  },
  video: {
    width: screenWidth,
    height: screenHeight,
  },
});
