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

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View style={styles.container} className="bg-white dark:bg-black px-4">
      <Button variant="destructive" onPress={toggleColorScheme}>
        Outline
      </Button>

      <View className="w-full mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>Card Content</CardContent>
          <CardFooter>Card Footer</CardFooter>
        </Card>
      </View>
      <Avatar>
        <AvatarImage
          source={{
            uri: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg",
          }}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
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
