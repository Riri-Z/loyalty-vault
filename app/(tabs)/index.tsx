import { View, Text, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text  style={styles.text}>Cards list</Text>
      <Text  style={styles.text}>index</Text>
      <Text  style={styles.text}>index</Text>
      <Text  style={styles.text}>index</Text>
      <Text  style={styles.text}>index</Text>
      <Text  style={styles.text}>index</Text>
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
  },
});