import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, StatusBar} from "react-native";
import { Righteous_400Regular} from '@expo-google-fonts/righteous';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function Welcome( {navigation} ) {
    let [fontsLoaded, error] = useFonts ({
        Righteous_400Regular,
    });

    const buttonPressedHandler = () => navigation.navigate('Homepage');
    if (!fontsLoaded) return <AppLoading/>;

return (
    <SafeAreaView style={styles.container}>

        <StatusBar backgroundColor="#FFF" barStyle='dark-content'/>

        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'stretch'}}>

            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                <Text style={styles.title}>Welcome to Fit
                    <Text style={styles.blueText}>Me</Text>
                </Text>
                <Image style={styles.logo} source={require('../assets/img/logo.png')}/>
            </View>
            
            <Text style={styles.slogan}>Upgrade your fitness to the next level!</Text>

            <View style={{ alignSelf: 'center', justifyContent: 'space-between', marginTop: 50, }}>
                <View style={{ flexDirection: 'row', margin: 17,}}>
                    <Image style={{ height: 50, width: 50}} source={require('../assets/img/diet.png')} />
                    <Text style={[styles.slogan, { fontSize: 17.5, marginHorizontal: 12.5}, ]}>Track what you eat</Text>
                </View>

                <View style={{ flexDirection: 'row', margin: 17,}}>
                    <Image style={{ height: 50, width: 50}} source={require('../assets/img/barbell.png')}/>
                    <Text style={[styles.slogan, { fontSize: 17.5, marginHorizontal: 12.5}]}>Follow a routine</Text>
                </View>

                <View style={{ flexDirection: 'row', margin: 17,}}>
                    <Image style={{ height: 50, width: 50}} source={require('../assets/img/goal.png')}/>
                    <Text style={[styles.slogan, { fontSize: 17.5, marginHorizontal: 12.5}]}>Achieve your goals</Text>
                </View>
            </View>
                
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', width: '80%', marginBottom: 1, }}>

            <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.signup,]} 
            onPress={buttonPressedHandler}>
                <Text style={[styles.buttonText,]}>New? Get Started </Text>
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
        padding: 15
    },

    title: {
        fontSize: 38.5,
        color: '#424242',
        fontFamily: 'Righteous_400Regular',
    },

    slogan: {
        fontSize: 14,
        fontFamily: 'Righteous_400Regular',
        color: '#424242',
        alignSelf: 'center',
    },

    blueText: {
        color: '#3777D9',
    },

    logo: {
        width: 40,
        height: 40,
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
        elevation: 2.5,
    },

    signup: {
        backgroundColor: '#3777D9',
        borderColor: '#3777D9',
        shadowColor: 'black',
    },

    login: {
        backgroundColor: '#FFF',
        borderColor: '#b3b3b3',
        marginBottom: 50,
        marginTop: 15,
        shadowColor: 'black',
    },
 
});

