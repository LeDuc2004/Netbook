import { sampleComments } from "@/constants/Comment-data";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  modalHeight?: number | `${number}%`;
}

const { height: screenHeight } = Dimensions.get("window");
const CommentModal: React.FC<CommentModalProps> = ({
  visible,
  onClose,
  modalHeight = "100%",
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState("");
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      // Hiển thị modal với animation slide up
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Auto focus input after animation
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      });
    } else {
      // Ẩn modal với animation slide down
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleSend = () => {
    if (input.trim() !== "") {
      // Logic to send comment
      setInput("");
    }
  };

  const handleClose = () => {
    setInput("");
    onClose();
  };

  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={() => onClose()}
      swipeDirection="down"
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <TouchableOpacity style={styles.backdrop} onPress={handleClose} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <Animated.View
            style={[
              styles.modalContainer,
              {
                backgroundColor: colors.surface,
                transform: [{ translateY: slideAnim }],
                height: modalHeight,
              },
            ]}
          >
            {/* Swipe indicator */}
            <View style={styles.swipeIndicator}>
              <View
                style={[styles.swipeBar, { backgroundColor: colors.border }]}
              />
            </View>

            {/* Header */}
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
              <Text style={[styles.headerTitle, { color: colors.text }]}>
                Bình luận
              </Text>
              <TouchableOpacity onPress={handleClose}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Comments List */}
            <ScrollView
              style={styles.commentsList}
              contentContainerStyle={styles.commentsContent}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              scrollEventThrottle={16}
            >
              {sampleComments.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text
                    style={[styles.emptyText, { color: colors.textSecondary }]}
                  >
                    Chưa có bình luận nào
                  </Text>
                  <Text
                    style={[
                      styles.emptySubtext,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Hãy là người đầu tiên bình luận!
                  </Text>
                </View>
              ) : (
                sampleComments.map((comment) => (
                  <View key={comment.id} style={styles.commentItem}>
                    <View
                      style={[
                        styles.commentAvatar,
                        { backgroundColor: colors.border },
                      ]}
                    >
                      <Text
                        style={[
                          styles.commentAvatarText,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {comment.username.charAt(0)}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.commentContent,
                        { backgroundColor: colors.background },
                      ]}
                    >
                      <View style={styles.commentHeader}>
                        <Text
                          style={[
                            styles.commentUsername,
                            { color: colors.primary },
                          ]}
                        >
                          {comment.username}
                        </Text>
                        <Text
                          style={[
                            styles.commentTime,
                            { color: colors.textSecondary },
                          ]}
                        >
                          {comment.timeAgo}
                        </Text>
                      </View>
                      <Text
                        style={[styles.commentText, { color: colors.text }]}
                      >
                        {comment.content}
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>

            {/* Input Section */}
            <View
              style={[
                styles.inputContainer,
                {
                  borderTopColor: colors.border,
                  paddingBottom: insets.bottom > 0 ? insets.bottom : 16,
                },
              ]}
            >
              <View
                style={[
                  styles.inputWrapper,
                  { backgroundColor: colors.background },
                ]}
              >
                <TextInput
                  ref={inputRef}
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Viết bình luận..."
                  placeholderTextColor={colors.textSecondary}
                  value={input}
                  onChangeText={setInput}
                  multiline
                  maxLength={500}
                />
                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    {
                      backgroundColor: input.trim()
                        ? colors.primary
                        : colors.border,
                    },
                  ]}
                  onPress={handleSend}
                  disabled={!input.trim()}
                >
                  <Ionicons
                    name="send"
                    size={20}
                    color={input.trim() ? "#fff" : colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    position: "relative",
    backgroundColor: "#fff",
    paddingTop: 16,
  },
  swipeIndicator: {
    alignItems: "center",
  },
  swipeBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#e0e0e0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 0,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  commentsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  commentsContent: {
    paddingBottom: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
  },
  commentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 8,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  commentAvatarText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  commentContent: {
    flex: 1,
    borderRadius: 12,
    padding: 8,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  commentUsername: {
    fontSize: 13,
    fontWeight: "600",
  },
  commentTime: {
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 4,
    paddingHorizontal: 8,
    paddingBottom: 6,
  },
  sendButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 16,
  },
});

export default CommentModal;
