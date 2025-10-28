import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import React, { Children } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SecureStore from "expo-secure-store";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {ConvexReactClient} from "convex/react";

const convex =new ConvexReactClient (process.env.EXPO_PUBLIC_CONVEX_URL!,{
    unsavedChangesWarning:false,
})

const tokenCache ={
 async getToken(key:string){
  try{
    return await SecureStore.getItemAsync(key)
  }catch(err){
    return null;
  }
 },
 async saveToken (key:string,value: string){
try{
 return await SecureStore.setItemAsync(key,value)
}catch(err){
  return;
}
 }
}

const ClerkAndConvexProvider = ({children}:{children: React.ReactNode}) => {
    return (
       <ClerkProvider publishableKey="pk_test_c2hhcnAtdG9hZC00Ni5jbGVyay5hY2NvdW50cy5kZXYk" tokenCache={tokenCache}>
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
            <ClerkLoaded>{children}</ClerkLoaded>
        </ConvexProviderWithClerk>   
       </ClerkProvider>
    );
}

const styles = StyleSheet.create({})

export default ClerkAndConvexProvider;
