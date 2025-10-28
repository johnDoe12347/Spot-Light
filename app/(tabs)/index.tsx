import {Image,Pressable,Text,TouchableOpacity,View} from "react-native";
import { style } from "../../styles/auth.style";
import{Link} from "expo-router";
import { useAuth } from '@clerk/clerk-expo';
import React from 'react';

const Index = () => {
    const {signOut} = useAuth();
    return (
        <View style={style.container}>
            <TouchableOpacity onPress={()=> signOut()}>
             <Text style={{ color: "white"}}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}
export default Index;
