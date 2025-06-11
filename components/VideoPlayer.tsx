import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useEvent, useEventListener } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface VideoPlayerProps {
  videoUrl: string;
  avatar: string;
  username: string;
  description: string;
  isFollowing: boolean;
  isLiked: boolean;
  likes: number;
  comments: number;
  shares: number;
  onToggleFollow: (id: number) => void;
  onToggleLike: (id: number) => void;
  onShowComments: () => void;
  id: number;
  isVisible?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  avatar,
  username,
  description,
  isFollowing,
  isLiked,
  likes,
  comments,
  shares,
  onToggleFollow,
  onToggleLike,
  onShowComments,
  id,
  isVisible = true,
}) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [seekTime, setSeekTime] = useState(0);
  const [loading, setLoading] = useState(false);

  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.play();
    player.timeUpdateEventInterval = 1;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  useEffect(() => {
    if (player) {
      if (isVisible) {
        console.log("play");
        player.play();
      } else {
        console.log("pause");
        player.pause();
      }
    }
  }, [isVisible, player]);

  useEventListener(player, "timeUpdate", (payload) => {
    if (!isDragging) {
      setCurrentTime(payload.currentTime);
    }
  });

  useEventListener(player, "sourceLoad", (payload) => {
    setDuration(payload.duration);
  });

  useEventListener(player, "sourceLoad", () => setLoading(false));
  useEventListener(player, "statusChange", ({ status }) => {
    if (status === "loading") setLoading(true);
    if (status === "readyToPlay")
      setTimeout(() => {
        setLoading(false);
      }, 0);
  });

  const handleSlidingStart = () => {
    setIsDragging(true);
  };

  const handleSlidingChange = (value: number) => {
    setSeekTime(value);
  };

  const handleSlidingComplete = (value: number) => {
    setIsDragging(false);
    if (player) {
      player.currentTime = value;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <View style={styles.videoBackground}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        contentFit="contain"
        nativeControls={false}
      />

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={duration}
          value={isDragging ? seekTime : currentTime}
          onSlidingStart={handleSlidingStart}
          onValueChange={handleSlidingChange}
          onSlidingComplete={handleSlidingComplete}
          minimumTrackTintColor="#1877f2"
          maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
          thumbTintColor="#1877f2"
          enabled={true}
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {formatTime(isDragging ? seekTime : currentTime)}
          </Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      {/* Play/Pause Overlay */}
      <TouchableOpacity
        style={styles.playPauseButton}
        onPress={togglePlayPause}
      >
        {!isPlaying && !loading && (
          <Ionicons
            style={styles.playPauseIcon}
            name="play"
            size={40}
            color="#fff"
          />
        )}
        {loading && (
          <ActivityIndicator
            style={styles.loadingIcon}
            size="large"
            color="#fff"
          />
        )}
      </TouchableOpacity>

      {/* Video Info Overlay */}
      <View style={styles.videoInfo}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatar}</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.username}>@{username}</Text>
            <TouchableOpacity
              style={[
                styles.followButton,
                isFollowing && styles.followingButton,
              ]}
              onPress={() => onToggleFollow(parseInt(username))}
            >
              <Text
                style={[styles.followText, isFollowing && styles.followingText]}
              >
                {isFollowing ? "Đang theo dõi" : "Theo dõi"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableWithoutFeedback
          style={styles.actionButton}
          onPress={() => onToggleLike(id)}
        >
          <View style={styles.actionIconContainer}>
            <Ionicons
              name={"heart"}
              size={28}
              color={isLiked ? "#ff3b30" : "#fff"}
            />
            <Text style={styles.actionText}>{likes}</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={styles.actionButton}
          onPress={onShowComments}
        >
          <View style={styles.actionIconContainer}>
            <Ionicons name="chatbubble" size={28} color="#fff" />
            <Text style={styles.actionText}>{comments}</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <Ionicons name="share" size={28} color="#fff" />
            <Text style={styles.actionText}>{shares}</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <Ionicons name="ellipsis-vertical" size={28} color="#fff" />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

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
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  videoPlaceholder: {
    fontSize: 120,
    opacity: 0.3,
  },
  playPauseButton: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "transparent",
    padding: 10,
  },
  playPauseIcon: {
    top: "50%",
    left: "50%",
    marginTop: -20,
    marginLeft: -20,
  },
  loadingIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -10,
  },
  videoInfo: {
    position: "absolute",
    bottom: 40,
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
    right: 0,
    bottom: 20,
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: "center",
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  progressContainer: {
    position: "absolute",
    bottom: 5,
    width: "100%",
    zIndex: 1000,
  },
  progressBar: {
    width: "100%",
    height: 4,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    width: "100%",
    paddingHorizontal: 16,
  },
  timeText: {
    color: "#fff",
    fontSize: 12,
  },
});

export default VideoPlayer;
