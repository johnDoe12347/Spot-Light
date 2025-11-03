// import Post from "@/component/Post";
import { Loader } from "@/component/Loader";
import Post from "@/component/Post";
// import StoriesSection from "@/component/Stories";  
import { COLORS } from "@/constant/theme";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useState } from "react";
import { FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/feed.style";
import { STORIES } from "@/constant/mock-data";
import Story from "@/component/Story";

export default function Index() {
  const { signOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const posts = useQuery(api.posts.getFeedPosts);
  if (posts === undefined) return <Loader />;
  if (posts.length === 0) return <NoPostsFound />;
  // this does nothing
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>spotlight</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.whitecolour} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListHeaderComponent={<StoriesSection />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      />
    </View>
  );
}
const StoriesSection =()=>{
  return(
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
      {STORIES.map((story)=>(
        <Story key={story.id} story={story}/>
      ))}
    </ScrollView>
  )
}

const NoPostsFound = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: COLORS.backgroundcolor,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ fontSize: 20, color: COLORS.primary }}>No posts yet</Text>
  </View>
);
