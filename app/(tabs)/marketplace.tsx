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

export default function MarketplaceScreen() {
  const { colors } = useTheme();

  const categories = [
    { id: 1, name: "Xe cộ", icon: "car", color: "#1877f2" },
    { id: 2, name: "Bất động sản", icon: "home", color: "#45bd62" },
    { id: 3, name: "Điện thoại", icon: "phone-portrait", color: "#f7b928" },
    { id: 4, name: "Máy tính", icon: "laptop", color: "#ff6b6b" },
    { id: 5, name: "Thời trang", icon: "shirt", color: "#a855f7" },
    { id: 6, name: "Đồ gia dụng", icon: "bed", color: "#10b981" },
    { id: 7, name: "Sách", icon: "book", color: "#f59e0b" },
    { id: 8, name: "Thể thao", icon: "football", color: "#ef4444" },
  ];

  const featuredItems = [
    {
      id: 1,
      title: "iPhone 14 Pro Max",
      price: "25.000.000đ",
      location: "Hà Nội",
      image: "📱",
      isNew: true,
    },
    {
      id: 2,
      title: "Honda Wave Alpha",
      price: "15.000.000đ",
      location: "TP.HCM",
      image: "🏍️",
      isNew: false,
    },
    {
      id: 3,
      title: "MacBook Air M2",
      price: "35.000.000đ",
      location: "Đà Nẵng",
      image: "💻",
      isNew: true,
    },
    {
      id: 4,
      title: "Căn hộ 2 phòng ngủ",
      price: "2.500.000.000đ",
      location: "Hà Nội",
      image: "🏢",
      isNew: false,
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
              Tìm kiếm trên Marketplace
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Danh mục
          </Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: category.color + "20" },
                  ]}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={24}
                    color={category.color}
                  />
                </View>
                <Text style={[styles.categoryName, { color: colors.text }]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Items */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Sản phẩm nổi bật
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemsGrid}>
            {featuredItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.itemCard}>
                <View
                  style={[
                    styles.itemImage,
                    { backgroundColor: colors.background },
                  ]}
                >
                  <Text style={styles.itemImageText}>{item.image}</Text>
                  {item.isNew && (
                    <View
                      style={[
                        styles.newBadge,
                        { backgroundColor: colors.error },
                      ]}
                    >
                      <Text style={styles.newBadgeText}>Mới</Text>
                    </View>
                  )}
                </View>
                <View style={styles.itemInfo}>
                  <Text
                    style={[styles.itemTitle, { color: colors.text }]}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <Text style={[styles.itemPrice, { color: colors.primary }]}>
                    {item.price}
                  </Text>
                  <Text
                    style={[
                      styles.itemLocation,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {item.location}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
                Đăng bán
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionCard,
                { backgroundColor: colors.background },
              ]}
            >
              <Ionicons name="heart" size={32} color={colors.error} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                Yêu thích
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionCard,
                { backgroundColor: colors.background },
              ]}
            >
              <Ionicons name="chatbubble" size={32} color={colors.success} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                Tin nhắn
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
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 14,
    color: "#65676b",
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#050505",
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryItem: {
    width: "33.33%",
    padding: 8,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryName: {
    marginTop: 8,
    fontSize: 14,
    color: "#65676b",
    fontWeight: "500",
  },
  itemsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  itemCard: {
    width: "50%",
    padding: 8,
  },
  itemImage: {
    height: 150,
    backgroundColor: "#e4e6eb",
    justifyContent: "center",
    alignItems: "center",
  },
  itemImageText: {
    fontSize: 48,
  },
  itemInfo: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#050505",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1877f2",
    marginBottom: 2,
  },
  itemLocation: {
    fontSize: 12,
    color: "#65676b",
  },
  newBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#1877f2",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: "#1877f2",
    fontWeight: "bold",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionCard: {
    width: "33.33%",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    color: "#65676b",
    fontWeight: "500",
  },
});
