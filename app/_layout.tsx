import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

import { ThemeProvider } from "@/contexts/ThemeContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
