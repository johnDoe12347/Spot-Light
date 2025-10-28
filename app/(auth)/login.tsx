// import { COLORS } from "@/constant/theme";
// import { style } from "@/styles/auth.style";
// import { useSSO } from "@clerk/clerk-expo";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';

// const Login = () => {
//     const{startSSOFlow}=useSSO();
//     const router = useRouter();

//     const handleGoogleSignIn = async () => {
//         try{
//            const { createdSessionId, setActive } = await startSSOFlow({
//              strategy: "oauth_google",
//         });

//         if (setActive && createdSessionId){
//             setActive({session: createdSessionId});
//             router.replace("/(tabs)");
//         }  

//         } catch (err){
//             console.error("OAuth eoor:",err);
            
//         }
//     };
    
//     return (
//         <View style ={style.container}>

//             {/* BRAND SECTION */}
//             <View style ={style.brandSection}>
//                 <View style = {style.logoContainer}>
//                     <Ionicons name="leaf" size={32} color={COLORS.primary}/>
//                 </View>
//                 <Text style={style.appName}>sportlight</Text>
//                 <Text style={style.tagline}>don't miss anything</Text>
//             </View>

//         {/* ILLUSTRATION */}
//       <View style={style.illustrationContainer}>
//         <Image
//           source={require("../../assets/images/login.png")}
//           style={style.illustration}
//           resizeMode="cover"
//         />
//       </View>

//       {/* LOGIN SECTION */}
//       <View style={style.loginSection}>
//         <TouchableOpacity
//           style={style.googleButton}
//           onPress={handleGoogleSignIn}
//           activeOpacity={0.9}
//         >
//           <View style={style.googleIconContainer}>
//             <Ionicons name="logo-google" size={20} color={COLORS.surface} />
//           </View>
//           <Text style={style.googleButtonText}>Continue with Google</Text>
//         </TouchableOpacity>
//         <Text style={style.termsText}>
//           By continuing, you agree to our Terms and Privacy Policy
//         </Text>
//       </View>

//         </View>
//     );
// }

// const styles = StyleSheet.create({})

// export default Login;

import React from "react";
import { COLORS } from "@/constant/theme";
import { style } from "@/styles/auth.style";
import { useSSO } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

// Required for OAuth in Expo
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const router = useRouter();
  const { startSSOFlow } = useSSO();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      // ✅ type-safe check
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      } else {
        Alert.alert("Login cancelled", "Please try again.");
      }
    } catch (err) {
      console.error("OAuth error:", err);
      Alert.alert("Login failed", "Something went wrong during sign-in.");
    }
  };

  return (
    <View style={style.container}>
      {/* BRAND SECTION */}
      <View style={style.brandSection}>
        <View style={style.logoContainer}>
          <Ionicons name="leaf" size={32} color={COLORS.primary} />
        </View>
        <Text style={style.appName}>sportlight</Text>
        <Text style={style.tagline}>don't miss anything</Text>
      </View>

      {/* ILLUSTRATION */}
      <View style={style.illustrationContainer}>
        <Image
          source={require("../../assets/images/login.png")}
          style={style.illustration}
          resizeMode="cover"
        />
      </View>

      {/* LOGIN SECTION */}
      <View style={style.loginSection}>
        <TouchableOpacity
          style={style.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}
        >
          <View style={style.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color={COLORS.surface} />
          </View>
          <Text style={style.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <Text style={style.termsText}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Login;


