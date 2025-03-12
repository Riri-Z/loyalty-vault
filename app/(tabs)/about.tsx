import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from 'react-i18next';

export default function AboutScreen() {
  const { t, i18n } = useTranslation(); // not passing any namespace will use the defaultNS (by default set to 'translation')


  return (
    <View style={styles.container}>
      <Text style={styles.text}>About Screen</Text>
      <Text>Traduction : {t('language')}</Text>
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
