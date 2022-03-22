import React from 'react';
import { styles } from "./Welcomepage";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from "react-native";
import { Righteous_400Regular } from '@expo-google-fonts/righteous';
import { useFonts } from 'expo-font';


export default function ProfilePage({navigation}) {

    let [fontsLoaded, error] = useFonts ({
        Righteous_400Regular,
    });

    const homePressedHandler = () => navigation.navigate('Homepage');
        
    return(
        <SafeAreaView>
            
        </SafeAreaView>
    );
    
}

export const styling = StyleSheet.create({

});