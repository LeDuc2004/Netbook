import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "vi" | "ja" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  vi: {
    profile: "Cá nhân",
    language: "Ngôn ngữ",
    vietnamese: "Tiếng Việt",
    japanese: "Tiếng Nhật",
    english: "Tiếng Anh",
    settings: "Cài đặt",
    logout: "Đăng xuất",
    editProfile: "Chỉnh sửa trang cá nhân",
    followers: "Người theo dõi",
    following: "Đang theo dõi",
    posts: "Bài viết",
    friends: "Bạn bè",
    photos: "Ảnh",
    videos: "Video",
    work: "Công việc",
    education: "Học vấn",
    joinedDate: "Tham gia Facebook",
    updateInfo: "Cập nhật thông tin của bạn",
    privacy: "Quyền riêng tư",
    privacyDesc: "Kiểm soát ai có thể xem thông tin của bạn",
    notifications: "Thông báo",
    notificationsDesc: "Quản lý thông báo và âm thanh",
    languageDesc: "Chọn ngôn ngữ hiển thị",
    help: "Trợ giúp & Hỗ trợ",
    helpDesc: "Tìm hiểu thêm về Facebook",
    about: "Giới thiệu",
    aboutDesc: "Phiên bản 1.0.0",
    darkMode: "Chế độ tối",
    lightMode: "Chế độ sáng",
    darkModeDesc: "Đang bật chế độ tối",
    lightModeDesc: "Đang bật chế độ sáng",
    home: "Trang chủ",
    stories: "Tin",
    createPost: "Tạo bài viết",
    whatOnMind: "Bạn đang nghĩ gì?",
    liveVideo: "Video trực tiếp",
    photo: "Ảnh",
    feeling: "Cảm xúc",
    hoursAgo: "giờ trước",
    like: "Thích",
    comment: "Bình luận",
    share: "Chia sẻ",
  },
  ja: {
    profile: "プロフィール",
    language: "言語",
    vietnamese: "ベトナム語",
    japanese: "日本語",
    english: "英語",
    settings: "設定",
    logout: "ログアウト",
    editProfile: "プロフィールを編集",
    followers: "フォロワー",
    following: "フォロー中",
    posts: "投稿",
    friends: "友達",
    photos: "写真",
    videos: "動画",
    work: "仕事",
    education: "学歴",
    joinedDate: "Facebook参加日",
    updateInfo: "プロフィール情報を更新",
    privacy: "プライバシー",
    privacyDesc: "あなたの情報を見られる人を管理",
    notifications: "通知",
    notificationsDesc: "通知とサウンドを管理",
    languageDesc: "表示言語を選択",
    help: "ヘルプとサポート",
    helpDesc: "Facebookについて詳しく知る",
    about: "概要",
    aboutDesc: "バージョン1.0.0",
    darkMode: "ダークモード",
    lightMode: "ライトモード",
    darkModeDesc: "ダークモードがオン",
    lightModeDesc: "ライトモードがオン",
    home: "ホーム",
    stories: "ストーリー",
    createPost: "投稿を作成",
    whatOnMind: "何を考えていますか？",
    liveVideo: "ライブ動画",
    photo: "写真",
    feeling: "気持ち",
    hoursAgo: "時間前",
    like: "いいね",
    comment: "コメント",
    share: "シェア",
  },
  en: {
    profile: "Profile",
    language: "Language",
    vietnamese: "Vietnamese",
    japanese: "Japanese",
    english: "English",
    settings: "Settings",
    logout: "Logout",
    editProfile: "Edit Profile",
    followers: "Followers",
    following: "Following",
    posts: "Posts",
    friends: "Friends",
    photos: "Photos",
    videos: "Videos",
    work: "Work",
    education: "Education",
    joinedDate: "Joined Facebook",
    updateInfo: "Update your profile information",
    privacy: "Privacy",
    privacyDesc: "Control who can see your information",
    notifications: "Notifications",
    notificationsDesc: "Manage notifications and sound",
    languageDesc: "Choose display language",
    help: "Help & Support",
    helpDesc: "Learn more about Facebook",
    about: "About",
    aboutDesc: "Version 1.0.0",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    darkModeDesc: "Dark mode is on",
    lightModeDesc: "Light mode is on",
    home: "Home",
    stories: "Stories",
    createPost: "Create Post",
    whatOnMind: "What's on your mind?",
    liveVideo: "Live Video",
    photo: "Photo",
    feeling: "Feeling",
    hoursAgo: "hours ago",
    like: "Like",
    comment: "Comment",
    share: "Share",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("vi");

  useEffect(() => {
    // Load saved language preference
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("language");
        if (savedLanguage) {
          setLanguageState(savedLanguage as Language);
        }
      } catch (error) {
        console.error("Error loading language:", error);
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem("language", lang);
      setLanguageState(lang);
    } catch (error) {
      console.error("Error saving language:", error);
    }
  };

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
