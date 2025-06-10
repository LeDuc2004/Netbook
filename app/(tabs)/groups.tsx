import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function GroupsScreen() {
  const { colors } = useTheme();

  const myGroups = [
    {
      id: 1,
      name: "React Native Developers Vietnam",
      members: 1250,
      image: "💻",
      isPrivate: false,
      lastActivity: "2 giờ trước",
    },
    {
      id: 2,
      name: "Nấu ăn Việt Nam",
      members: 890,
      image: "🍜",
      isPrivate: true,
      lastActivity: "1 ngày trước",
    },
    {
      id: 3,
      name: "Du lịch Đông Nam Á",
      members: 2340,
      image: "✈️",
      isPrivate: false,
      lastActivity: "3 giờ trước",
    },
  ];

  const suggestedGroups = [
    {
      id: 4,
      name: "Startup Vietnam",
      members: 567,
      image: "🚀",
      isPrivate: false,
      category: "Kinh doanh",
    },
    {
      id: 5,
      name: "Photography Enthusiasts",
      members: 1234,
      image: "📷",
      isPrivate: false,
      category: "Nghệ thuật",
    },
    {
      id: 6,
      name: "Fitness & Health",
      members: 890,
      image: "💪",
      isPrivate: false,
      category: "Sức khỏe",
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View
          style={[styles.searchContainer, { backgroundColor: colors.surface }]}
        >
          <TouchableOpacity
            style={[styles.searchBar, { backgroundColor: colors.background }]}
          >
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <Text
              style={[
                styles.searchPlaceholder,
                { color: colors.textSecondary },
              ]}
            >
              Tìm kiếm nhóm
            </Text>
          </TouchableOpacity>
        </View>

        {/* My Groups */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Nhóm của tôi
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
          {myGroups.map((group) => (
            <TouchableOpacity key={group.id} style={styles.groupItem}>
              <View
                style={[
                  styles.groupImage,
                  { backgroundColor: colors.background },
                ]}
              >
                <Text style={styles.groupImageText}>{group.image}</Text>
              </View>
              <View style={styles.groupInfo}>
                <View style={styles.groupHeader}>
                  <Text style={[styles.groupName, { color: colors.text }]}>
                    {group.name}
                  </Text>
                  {group.isPrivate && (
                    <Ionicons
                      name="lock-closed"
                      size={16}
                      color={colors.textSecondary}
                    />
                  )}
                </View>
                <Text
                  style={[styles.groupMembers, { color: colors.textSecondary }]}
                >
                  {group.members.toLocaleString()} thành viên
                </Text>
                <Text
                  style={[
                    styles.groupActivity,
                    { color: colors.textSecondary },
                  ]}
                >
                  Hoạt động {group.lastActivity}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Suggested Groups */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Nhóm gợi ý
          </Text>
          {suggestedGroups.map((group) => (
            <TouchableOpacity key={group.id} style={styles.groupItem}>
              <View
                style={[
                  styles.groupImage,
                  { backgroundColor: colors.background },
                ]}
              >
                <Text style={styles.groupImageText}>{group.image}</Text>
              </View>
              <View style={styles.groupInfo}>
                <View style={styles.groupHeader}>
                  <Text style={[styles.groupName, { color: colors.text }]}>
                    {group.name}
                  </Text>
                  {group.isPrivate && (
                    <Ionicons
                      name="lock-closed"
                      size={16}
                      color={colors.textSecondary}
                    />
                  )}
                </View>
                <Text
                  style={[styles.groupMembers, { color: colors.textSecondary }]}
                >
                  {group.members.toLocaleString()} thành viên
                </Text>
                <Text style={[styles.groupActivity, { color: colors.primary }]}>
                  {group.category}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.joinButton, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.joinButtonText}>Tham gia</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Thao tác nhanh
          </Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[
                styles.actionCard,
                { backgroundColor: colors.background },
              ]}
            >
              <Ionicons name="add-circle" size={32} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                Tạo nhóm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionCard,
                { backgroundColor: colors.background },
              ]}
            >
              <Ionicons name="people" size={32} color={colors.success} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                Tìm nhóm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionCard,
                { backgroundColor: colors.background },
              ]}
            >
              <Ionicons name="notifications" size={32} color={colors.warning} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                Thông báo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  searchPlaceholder: {
    marginLeft: 8,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1877f2",
  },
  groupItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  groupImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e4e6eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  groupImageText: {
    fontSize: 24,
  },
  groupInfo: {
    flex: 1,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "600",
  },
  groupMembers: {
    fontSize: 14,
    color: "#65676b",
  },
  groupActivity: {
    fontSize: 14,
    color: "#65676b",
  },
  groupCategory: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  joinButton: {
    backgroundColor: "#1877f2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  actionText: {
    marginLeft: 12,
  },
});
