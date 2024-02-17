import "./global.css";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import { Button } from "./components/sidcn/ui/button";

import { Input } from "./components/sidcn/ui/input";

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View style={styles.container} className="bg-white dark:bg-black px-4">
      <Button variant="destructive" onPress={toggleColorScheme}>
        Outline
      </Button>
      
      <Input type="email" placeholder="Email" className="mt-10" secureTextEntry />
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
