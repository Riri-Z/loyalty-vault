import { Stack } from "expo-router";
import '@/i18n'; // This line imports the i18n configuration

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
