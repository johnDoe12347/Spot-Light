import InitialLayout from "@/component/InitialLayout";
import ClerkAndConvexProvider from "@/Provider/ClerkAndConvexProvider";
import { SplashScreen } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  //   const [fontLoaded]=useFonts({

  //   })
  return (
    <ClerkAndConvexProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#ddcd1bff",
          }}>
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkAndConvexProvider>
  );
}
