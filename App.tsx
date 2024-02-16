import "./global.css";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import Button from "./components/sidcn/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./components/sidcn/ui/alert";
import { Terminal } from "lucide-react-native";

export default function App() {
  const { colorScheme,toggleColorScheme } = useColorScheme();
  return (
    <View style={styles.container} className="bg-white dark:bg-black px-4">
      <Button variant="destructive" onPress={toggleColorScheme}>Outline</Button>

      <Alert variant="destructive" className={''}>
        <Terminal color={colorScheme=="light"?'#ff0000':'#ff0000'} size={20} />
        <AlertTitle>Heads up !</AlertTitle>
        <AlertDescription className=''>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
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
