import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image} from "react-native";
import { Righteous_400Regular} from '@expo-google-fonts/righteous';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function Welcome( {navigation} ) {
    let [fontsLoaded, error] = useFonts ({
        Righteous_400Regular,
    });

    const buttonPressedHandler = () => navigation.navigate('Homepage');
    if (!fontsLoaded) return <AppLoading/>

return (
    <SafeAreaView style={styles.container}>

        <View style={{ flex: 2.5, justifyContent: 'center', alignItems: 'stretch'}}>

            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                <Text style={styles.title}>Welcome to Fit
                    <Text style={styles.blueText}>Me</Text>
                </Text>
                <Image style={styles.logo} source={require('../assets/img/barbell.png')}/>
            </View>
           
            <Text style={styles.slogan}>Upgrade your fitness to the next level!</Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', width: '80%', marginBottom: 1, }}>

            <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.signup,]} 
            onPress={buttonPressedHandler}>
                <Text style={[styles.buttonText,]}>New! Get Started </Text>
            </TouchableOpacity>

            <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.login, ]} 
            onPress={buttonPressedHandler}>
                <Text  style={[styles.buttonText, styles.blueText]}>Existing user? Log In</Text>
            </TouchableOpacity>

        </View>
    </SafeAreaView>
);
}


//  styles
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
    },

    title: {
        fontSize: 40.5,
        color: '#424242',
        fontFamily: 'Righteous_400Regular',
    },

    slogan: {
        fontSize: 15.5,
        fontFamily: 'Righteous_400Regular',
        color: '#424242',
        alignSelf: 'center',
    },

    blueText: {
        color: '#4356FF',
    },

    logo: {
        width: 45,
        height: 45,
        transform: [{ rotate: '45deg'}, {translateX: -20}]
    },

    button: {
        alignItems: 'center',
        fontFamily: 'Righteous_400Regular',
        padding: 15,
        width: '100%',
        borderWidth: .5,
        borderRadius: 5,
    },


    buttonText: {
        color: 'white', 
        textAlign: 'center', 
        fontFamily: 'Righteous_400Regular'
    },

    boxShadow: {
        // add box shadow to iOS devices
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 1,
        // add box shadows to android devices
        elevation: 1,
    },

    signup: {
        backgroundColor: '#4356FF',
        borderColor: '#4356FF',
        shadowColor: 'black',
    },

    login: {
        backgroundColor: '#FFF',
        borderColor: '#b3b3b3',
        marginBottom: 75,
        marginTop: 15,
        shadowColor: 'black',
    },
 
});

