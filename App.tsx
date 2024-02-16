import "./global.css";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Button from "./components/sidcn/ui/button";
import { useColorScheme } from "nativewind";

export default function App() {
  const { toggleColorScheme } = useColorScheme();
  return (
    <View style={styles.container} className="bg-white dark:bg-black">
      <Button variant="primary" onPress={toggleColorScheme} className="mb-20">
        Toggle Color
      </Button>
      <Button variant="link">Outline</Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
