import { Stack } from "expo-router";
import { SafeAreaFrameContext, SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {ClerkProvider} from "@clerk/clerk-expo";

import InitialLayout from "@/component/InitialLayout";
import ClerkAndConvexProvider from "@/Provider/ClerkAndConvexProvider";

export default function RootLayout() {
  return (
  <ClerkAndConvexProvider>
  <SafeAreaProvider>
    <SafeAreaView 
    style={{
      flex:1,
      backgroundColor: "#ddcd1bff",
    }}>
   <InitialLayout/>
  </SafeAreaView>
  </SafeAreaProvider>
  </ClerkAndConvexProvider>
  )
}
