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

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View style={styles.container} className="bg-white dark:bg-black px-4">
      <Button variant="destructive" onPress={toggleColorScheme}>
        Outline
      </Button>

      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-red-700">Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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
