import "./global.css";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import Button from "./components/sidcn/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/sidcn/ui/accordion";
import { Badge } from "./components/sidcn/ui/badge";

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View style={styles.container} className="bg-white dark:bg-black px-4">
      <Button variant="destructive" onPress={toggleColorScheme}>
        Outline
      </Button>

      <Badge variant="destructive">Badge</Badge>

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
