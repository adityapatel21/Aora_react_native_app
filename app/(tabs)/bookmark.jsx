import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Bookmark = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-col justify-center items-center mt-7">
        <Text className="font-psemibold text-2xl text-white">Bookmark</Text>
        <Text className="font-plight text-white">Coming Soon</Text>
      </View>
    </SafeAreaView>
  );
};

export default Bookmark;
