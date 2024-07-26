import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "../../components/EmptyState";
import { signOut, userPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import Infobox from "../../components/Infobox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => userPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-5 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                className="h-5 w-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <Infobox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="mt-5 flex-row">
              <Infobox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles="mr-12"
                titleStyles="text-xl"
              />
              <Infobox
                title="1.8k"
                subtitle="Followers"
                // containerStyles="mt-5"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No Videos found for this Search Query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
