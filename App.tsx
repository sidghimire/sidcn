import "./global.css";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import { Button } from "./components/sidcn/ui/button";

import { Input } from "./components/sidcn/ui/input";
import Label from "./components/sidcn/ui/label";
import { Card } from "./components/sidcn/ui/card";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/sidcn/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./components/sidcn/ui/avatar";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetTrigger,
} from "./components/sidcn/ui/bottomsheet";
import { Badge } from "./components/sidcn/ui/badge";
import { Checkbox } from "./components/sidcn/ui/checkbox";
import { useState } from "react";

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [toggle, setToggle] = useState(false);
  return (
    <View style={styles.container} className="bg-white dark:bg-black px-4">
      <Button variant="primary" onPress={toggleColorScheme}>
        Toggle
      </Button>

      <View className="flex flex-row mt-10">
        <Checkbox disabled={true} value={toggle} onValueChange={setToggle} />
        {toggle && <Label>This is the Label for Checkbox</Label>}
      </View>

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
