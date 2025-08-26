import { Language, useLanguage } from "@/contexts/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  visible,
  onClose,
}) => {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: "vi", label: t("vietnamese") },
    { code: "ja", label: t("japanese") },
    { code: "en", label: t("english") },
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{t("language")}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.languageList}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageItem,
                  language === lang.code && styles.selectedLanguage,
                ]}
                onPress={() => handleLanguageSelect(lang.code)}
              >
                <Text
                  style={[
                    styles.languageText,
                    language === lang.code && styles.selectedLanguageText,
                  ]}
                >
                  {lang.label}
                </Text>
                {language === lang.code && (
                  <Ionicons name="checkmark" size={24} color="#1877f2" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  closeButton: {
    padding: 4,
  },
  languageList: {
    gap: 12,
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectedLanguage: {
    backgroundColor: "#e7f3ff",
  },
  languageText: {
    fontSize: 16,
    color: "#000",
  },
  selectedLanguageText: {
    color: "#1877f2",
    fontWeight: "600",
  },
});

export default LanguageSelector;
