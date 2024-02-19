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

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View style={styles.container} className="bg-white dark:bg-black px-4">
      <Button variant="primary" onPress={toggleColorScheme}>
        Toggle Theme
      </Button>

      <View className="w-full mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Avatar className="ml-auto">
              <AvatarImage
                source={{
                  uri: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg",
                }}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Badge>Hi</Badge>
            <Label className="text-gray-700">User Name</Label>
            <Input placeholder="Email" />
            <Label className="text-gray-700 mt-4">Password</Label>
            <Input placeholder="Password" secureTextEntry />
            <Label className="text-gray-700 mt-4">Address</Label>
            <Input placeholder="Address"  />
          </CardContent>
          <CardFooter>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </View>

      <BottomSheet>
        <BottomSheetTrigger>Open Bottom Sheet 1</BottomSheetTrigger>
        <BottomSheetContent>
          <Text>This Bottom Sheet</Text>
        </BottomSheetContent>
      </BottomSheet>

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
