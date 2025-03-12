import { View, Text, StyleSheet } from "react-native";
import LanguagePicker from "@/components/LanguagePicker";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>settings Screen</Text>
      <View style={styles.options}>
        <LanguagePicker />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    flex: 1,
  },
  options: {
    flex: 2,
  }
});
