import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const profileData = {
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/150?img=1",
    coverPhoto:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    bio: "Lập trình viên React Native | Yêu thích công nghệ và sáng tạo",
    location: "Hà Nội, Việt Nam",
    work: "Công ty ABC",
    education: "Đại học XYZ",
    joinedDate: "Tháng 3 năm 2020",
    friends: 1250,
    photos: 89,
    videos: 12,
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Cover Photo + Avatar */}
        <View style={styles.coverContainer}>
          <Image
            source={{ uri: profileData.coverPhoto }}
            style={styles.coverPhoto}
          />
          <TouchableOpacity style={styles.editCoverButton}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: profileData.avatar }}
              style={styles.avatarImg}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Name, Bio, Location, Edit Button */}
        <View style={styles.infoBlock}>
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
          <TouchableOpacity
            style={[
              styles.editProfileButton,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={styles.editProfileText}>{t("editProfile")}</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View
          style={[styles.statsContainer, { backgroundColor: colors.surface }]}
        >
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {profileData.friends}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>
              {t("friends")}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {profileData.photos}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>
              {t("photos")}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {profileData.videos}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>
              {t("videos")}
            </Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={[styles.infoSection, { backgroundColor: colors.surface }]}>
          <View style={styles.infoItem}>
            <Ionicons
              name="briefcase-outline"
              size={20}
              color={colors.primary}
              style={styles.infoIcon}
            />
            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                {t("work")}
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
              color={colors.primary}
              style={styles.infoIcon}
            />
            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                {t("education")}
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
              color={colors.primary}
              style={styles.infoIcon}
            />
            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                {t("joinedDate")}
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {profileData.joinedDate}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
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
  coverContainer: {
    position: "relative",
    alignItems: "center",
  },
  coverPhoto: {
    width: screenWidth,
    height: 220,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  editCoverButton: {
    position: "absolute",
    right: 18,
    bottom: 18,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 8,
    zIndex: 2,
  },
  avatarWrapper: {
    position: "absolute",
    bottom: -50,
    left: screenWidth / 2 - 60,
    zIndex: 3,
    alignItems: "center",
  },
  avatarImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#e4e6eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#1877f2",
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },
  infoBlock: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bio: {
    fontSize: 16,
    color: "#65676b",
    marginBottom: 8,
    textAlign: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: "#65676b",
    marginLeft: 4,
  },
  editProfileButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  editProfileText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    alignItems: "center",
    paddingVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1877f2",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    color: "#65676b",
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#e4e6eb",
  },
  infoSection: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
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
});

export const options = { title: "Trang cá nhân" };
