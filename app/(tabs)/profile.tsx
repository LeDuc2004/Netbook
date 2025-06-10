import FacebookHeader from "@/components/FacebookHeader";
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

export default function ProfileScreen() {
  const { isDarkMode, toggleDarkMode, colors } = useTheme();

  const profileData = {
    name: "Nguyễn Văn A",
    avatar: "A",
    coverPhoto: "🏔️",
    bio: "Lập trình viên React Native | Yêu thích công nghệ và sáng tạo",
    location: "Hà Nội, Việt Nam",
    work: "Công ty ABC",
    education: "Đại học XYZ",
    joinedDate: "Tháng 3 năm 2020",
    friends: 1250,
    photos: 89,
    videos: 12,
  };

  const menuItems = [
    {
      id: 1,
      icon: "person-outline",
      title: "Chỉnh sửa thông tin cá nhân",
      subtitle: "Cập nhật thông tin của bạn",
    },
    {
      id: 2,
      icon: "settings-outline",
      title: "Cài đặt",
      subtitle: "Quyền riêng tư và bảo mật",
    },
    {
      id: 3,
      icon: "shield-outline",
      title: "Quyền riêng tư",
      subtitle: "Kiểm soát ai có thể xem thông tin của bạn",
    },
    {
      id: 4,
      icon: "notifications-outline",
      title: "Thông báo",
      subtitle: "Quản lý thông báo và âm thanh",
    },
    {
      id: 5,
      icon: "help-circle-outline",
      title: "Trợ giúp & Hỗ trợ",
      subtitle: "Tìm hiểu thêm về Facebook",
    },
    {
      id: 6,
      icon: "information-circle-outline",
      title: "Giới thiệu",
      subtitle: "Phiên bản 1.0.0",
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
        {/* Cover Photo */}
        <View style={[styles.coverPhoto, { backgroundColor: colors.surface }]}>
          <Text style={styles.coverPhotoText}>{profileData.coverPhoto}</Text>
          <TouchableOpacity style={styles.editCoverButton}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View
          style={[
            styles.profileInfo,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: colors.border }]}>
              <Text
                style={[styles.avatarText, { color: colors.textSecondary }]}
              >
                {profileData.avatar}
              </Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.basicInfo}>
            <Text style={[styles.name, { color: colors.text }]}>
              {profileData.name}
            </Text>
            <Text style={[styles.bio, { color: colors.textSecondary }]}>
              {profileData.bio}
            </Text>
            <View style={styles.locationContainer}>
              <Ionicons
                name="location-outline"
                size={16}
                color={colors.textSecondary}
              />
              <Text style={[styles.location, { color: colors.textSecondary }]}>
                {profileData.location}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.editProfileButton,
              { backgroundColor: colors.border },
            ]}
          >
            <Text style={[styles.editProfileText, { color: colors.text }]}>
              Chỉnh sửa trang cá nhân
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View
          style={[
            styles.statsContainer,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {profileData.friends}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Bạn bè
            </Text>
          </View>
          <View
            style={[styles.statDivider, { backgroundColor: colors.border }]}
          />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {profileData.photos}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Ảnh
            </Text>
          </View>
          <View
            style={[styles.statDivider, { backgroundColor: colors.border }]}
          />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {profileData.videos}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Video
            </Text>
          </View>
        </View>

        {/* Additional Info */}
        <View
          style={[
            styles.infoSection,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <View style={styles.infoItem}>
            <Ionicons
              name="briefcase-outline"
              size={20}
              color={colors.textSecondary}
            />
            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.textSecondary }]}>
                Công việc
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {profileData.work}
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons
              name="school-outline"
              size={20}
              color={colors.textSecondary}
            />
            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.textSecondary }]}>
                Học vấn
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {profileData.education}
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={colors.textSecondary}
            />
            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.textSecondary }]}>
                Tham gia Facebook
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {profileData.joinedDate}
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={[styles.menuSection, { backgroundColor: colors.surface }]}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
            >
              <View style={styles.menuIcon}>
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={colors.primary}
                />
              </View>
              <View style={styles.menuContent}>
                <Text style={[styles.menuTitle, { color: colors.text }]}>
                  {item.title}
                </Text>
                <Text
                  style={[styles.menuSubtitle, { color: colors.textSecondary }]}
                >
                  {item.subtitle}
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

        {/* Dark Mode Toggle */}
        <View
          style={[styles.darkModeSection, { backgroundColor: colors.surface }]}
        >
          <TouchableOpacity
            style={[styles.darkModeItem, { borderBottomColor: colors.border }]}
            onPress={toggleDarkMode}
          >
            <View style={styles.darkModeIcon}>
              <Ionicons
                name={isDarkMode ? "moon" : "sunny"}
                size={24}
                color={isDarkMode ? colors.primary : colors.warning}
              />
            </View>
            <View style={styles.darkModeContent}>
              <Text style={[styles.darkModeTitle, { color: colors.text }]}>
                {isDarkMode ? "Chế độ tối" : "Chế độ sáng"}
              </Text>
              <Text
                style={[
                  styles.darkModeSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                {isDarkMode ? "Đang bật chế độ tối" : "Đang bật chế độ sáng"}
              </Text>
            </View>
            <View
              style={[
                styles.toggleSwitch,
                {
                  backgroundColor: isDarkMode ? colors.primary : colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.toggleKnob,
                  {
                    backgroundColor: colors.surface,
                    transform: [{ translateX: isDarkMode ? 20 : 0 }],
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.surface }]}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
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
  coverPhoto: {
    height: 200,
    backgroundColor: "#e4e6eb",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  coverPhotoText: {
    fontSize: 80,
  },
  editCoverButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    padding: 8,
  },
  profileInfo: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "flex-start",
    marginTop: -50,
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e4e6eb",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#65676b",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1877f2",
    borderRadius: 16,
    padding: 6,
  },
  basicInfo: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#050505",
    marginBottom: 4,
  },
  bio: {
    fontSize: 16,
    color: "#65676b",
    marginBottom: 8,
    lineHeight: 20,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 14,
    color: "#65676b",
    marginLeft: 4,
  },
  editProfileButton: {
    backgroundColor: "#f0f2f5",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#050505",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 16,
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#050505",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#65676b",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
  },
  infoSection: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    color: "#65676b",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: "#050505",
  },
  menuSection: {
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f2f5",
  },
  menuIcon: {
    width: 40,
    alignItems: "center",
  },
  menuContent: {
    flex: 1,
    marginLeft: 12,
  },
  menuTitle: {
    fontSize: 16,
    color: "#050505",
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#65676b",
  },
  darkModeSection: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    marginBottom: 8,
  },
  darkModeItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  darkModeIcon: {
    width: 40,
    alignItems: "center",
  },
  darkModeContent: {
    flex: 1,
    marginLeft: 12,
  },
  darkModeTitle: {
    fontSize: 16,
    color: "#050505",
    marginBottom: 2,
  },
  darkModeSubtitle: {
    fontSize: 14,
    color: "#65676b",
  },
  toggleSwitch: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    position: "absolute",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    color: "#ff3b30",
    fontWeight: "600",
    marginLeft: 8,
  },
});
