import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Comment {
  id: number;
  username: string;
  content: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onAddComment,
}) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      onAddComment(input.trim());
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {comments.map((item) => (
          <View key={item.id} style={styles.commentItem}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.username.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.commentContent}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.content}>{item.content}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Viết bình luận..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  list: {
    maxHeight: 180,
    marginBottom: 8,
  },
  commentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e4e6eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#65676b",
  },
  commentContent: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
  },
  username: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#1877f2",
    marginBottom: 2,
  },
  content: {
    fontSize: 14,
    color: "#050505",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  sendButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sendText: {
    color: "#1877f2",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default CommentSection;
