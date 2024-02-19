import "./global.css";

import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import { Button } from "./components/sidcn/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/sidcn/ui/collapsible";
import { ChevronDown } from "lucide-react-native";

export default function App() {
  const { toggleColorScheme } = useColorScheme();
  return (
    <View className="bg-white dark:bg-black px-4 flex-1 justify-center items-center">
      <Button variant="primary" onPress={toggleColorScheme}>
        Toggle
      </Button>

      <View className="flex flex-row mt-10">
        <Collapsible
          show={true}
          onOpenChange={(e) => console.log(e)}
          height={100}
        >
          <CollapsibleTrigger>
            <View className="rounded-md border border-gray-300 dark:border-gray-500 px-4 py-3 flex flex-row w-full">
              <Text className="text-base text-gray-800 flex-1 dark:text-gray-200">
                @sidcn
              </Text>
              <ChevronDown className="ml-auto" color="#9f9f9f" size={20} />
            </View>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col space-y-2">
            <View className="rounded-md border border-gray-300 dark:border-gray-500 px-4 py-3 mt-1">
              <Text className="text-base text-gray-800 dark:text-gray-200">
                @sidcn/ui
              </Text>
            </View>
            <View className="rounded-md border border-gray-300 dark:border-gray-500 px-4 py-3 mt-1">
              <Text className=" text-base text-gray-800 dark:text-gray-200">
                @sidcn/utils
              </Text>
            </View>
          </CollapsibleContent>
        </Collapsible>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
