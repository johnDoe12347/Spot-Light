import { Header } from '@react-navigation/elements';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons} from  "@expo/vector-icons";
import { COLORS } from '@/constant/theme';

const Layout = () => {
    return (
      <Tabs
      screenOptions={{
        tabBarShowLabel:false,
        headerShown:false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.greycolor,
        tabBarStyle:{
            backgroundColor: "black",
            borderTopWidth: 0,
            position: "absolute",
            elevation:0,
            height: 40,
            paddingBottom: 8,
        },
        }}>

        <Tabs.Screen  
        name = 'index' 
        options={{
            tabBarIcon:({size,color}) => <Ionicons name = "home" size={size} color={color}/>,
        }}/>

        <Tabs.Screen  
        name = 'bookmark' 
        options={{
            tabBarIcon:({size,color}) => <Ionicons name = "bookmark" size={size} color={color}/>,
        }}/>

         <Tabs.Screen  
         name = 'create' 
         options={{
            tabBarIcon: ({size}) => (
              <Ionicons name ='add-circle' size={size} color={COLORS.primary} />
            ),
         }}/>

        <Tabs.Screen  
        name = 'notification' 
        options={{
            tabBarIcon:({size,color}) => <Ionicons name = "heart" size={size} color={color}/>,
        }}/>

        <Tabs.Screen  
        name = 'profile' 
        options={{
            tabBarIcon:({size,color}) => <Ionicons name = "person-circle" size={size} color={color}/>,
        }}/>

      </Tabs>
    );
}
const styles = StyleSheet.create({})
export default Layout;
