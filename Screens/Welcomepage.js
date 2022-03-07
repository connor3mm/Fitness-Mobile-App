import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from "react-native";

import {
    Righteous_400Regular
} from '@expo-google-fonts/righteous';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {NavigationActions as navigation} from "react-navigation";

export default function Welcome( {navigation} ) {
    let [fontsLoaded, error] = useFonts ({
        Righteous_400Regular,
    });

    const buttonPressedHandler = () => {
        console.log("boo")
        navigation.navigate('Homepage');
    }

    if (!fontsLoaded) return <AppLoading/>




return (
    <SafeAreaView style={styles.container}>
        <View style={{ flex: 2.5, justifyContent: 'center'}}>
            <Text style={styles.text}>Welcome to Fit<Text style={styles.blueText}>Me</Text></Text>
            <Text style={styles.smallText}>Upgrade your fitness to the next level!</Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', width: '80%', marginBottom: 1, }}>
            <View style={{ width: '100%', marginBottom: 75, marginTop: 15, borderColor: '#4356FF', borderWidth: 3,  color: 'white', }}>
                <Button backgroundColor="#FFFFFF" title="Home Page For Testing(REMOVE LATER!)" onPress={buttonPressedHandler}/>
            </View>

            <View style={{ width: '100%', borderColor: 'orange', }}>
                <Button color="#4356FF" title="New! Get Started"/>
            </View>
            <View style={{ width: '100%', marginBottom: 75, marginTop: 15, borderColor: '#4356FF', borderWidth: 3,  color: 'white', }}>
                <Button color="#4356FF" title="Existing user? Log In"/>
            </View>
        </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    text: {
        fontSize: 45.5,
        color: '#424242',
        fontFamily: 'Righteous_400Regular',
    },

    smallText: {
        fontSize: 15.5,
        fontFamily: 'Righteous_400Regular',
        color: '#424242',
        alignSelf: 'center',

    },

    blueText: {
        color: '#4356FF',
    },

});