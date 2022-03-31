import React, { useState, useRef, useEffect } from 'react';
import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, Animated} from "react-native";
import { Righteous_400Regular} from '@expo-google-fonts/righteous';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { getAuth } from "firebase/auth";


export default function Welcome( {navigation} ) {
    let [fontsLoaded, error] = useFonts ({Righteous_400Regular,});

    const buttonPressedHandler = () => navigation.navigate('Homepage');
    const loginPressedHandler = () => navigation.navigate('loginPage');
    const registerPressedHandler = () => navigation.navigate('registerPage');
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        console.log("user is logged in");
        buttonPressedHandler();
    } else {
        console.log("user is not logged in");
    }

    if (!fontsLoaded) console.log("FONT NOT LOADED");

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnimSlow = useRef(new Animated.Value(0)).current;
    const translateRef = useRef(new Animated.Value(50)).current;
    const translateRefY = useRef(new Animated.Value(70)).current;
    const translateRefX = useRef(new Animated.Value(-50)).current;
    const translateRefX2 = useRef(new Animated.Value(-400)).current;
    const dimensionsRef = useRef(new Animated.Value(0)).current;
    const transX = 0;

    const animateView = (toValue: number, animatedRef: Animated.Value, duration: number, delay: number) => {
        return Animated.timing(
          animatedRef,
          {
            toValue,
            duration,
            useNativeDriver: true,
            delay,
          }
        );
    }; 

    useEffect(() => { 
        Animated.parallel([
            animateView(1, fadeAnim, 2000,0),
            animateView(transX, translateRef, 1500),
          ]).start();

        Animated.parallel([
            animateView(1, fadeAnimSlow, 3000, 1000),
            animateView(transX,translateRefY, 2000, 1000)
        ]).start();

        Animated.parallel([
            animateView(transX,translateRefX, 2000, 1000)
        ]).start();

        Animated.parallel([
            animateView(1, dimensionsRef, 2000,2000),
            animateView(transX, translateRefX2, 2000,2000),
        ]).start();

    }, []);

return (
    <SafeAreaView style={styles.container}>
        
        <StatusBar backgroundColor={'#FFF'} barStyle='dark-content' />

        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'stretch'}}>

            <Animated.View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent:'center', 
                opacity: fadeAnim, transform: [{translateY: translateRef }]}}>

                <Text style={styles.title}>Welcome to Fit
                    <Text style={styles.blueText}>Me</Text>
                </Text>
                <Image style={styles.logo} source={require('../assets/img/logo.png')}/>
            </Animated.View>

            
            <Animated.Text style={[styles.slogan, {opacity: fadeAnimSlow, transform: [{translateY: translateRefY }]} ]}>Upgrade your fitness to the next level!</Animated.Text>

            <View style={{ alignSelf: 'center', justifyContent: 'space-between', marginTop: 50, }}>

                <Animated.View style={{ flexDirection: 'row', margin: 17, opacity: fadeAnimSlow, transform: [{translateX: translateRefX}]}}>
                    <Animated.Image style={{ height: 50, width: 50, transform: [{scale: dimensionsRef}]}} source={require('../assets/img/diet.png')} />
                    <Text style={[styles.slogan, { fontSize: 17.5, marginHorizontal: 12.5}, ]}>Track what you eat</Text>
                </Animated.View>

                <Animated.View style={{ flexDirection: 'row', margin: 17, opacity: fadeAnimSlow, transform: [{translateX: translateRefX}]}}>
                    <Animated.Image style={{ height: 50, width: 50, transform: [{scale: dimensionsRef}]}} source={require('../assets/img/barbell.png')}/>
                    <Text style={[styles.slogan, { fontSize: 17.5, marginHorizontal: 12.5}]}>Follow a routine</Text>
                </Animated.View>

                <Animated.View style={{ flexDirection: 'row', margin: 17, opacity: fadeAnimSlow, transform: [{translateX: translateRefX}]}}>
                    <Animated.Image style={{ height: 50, width: 50, transform: [{scale: dimensionsRef}]}} source={require('../assets/img/goal.png')}/>
                    <Text style={[styles.slogan, { fontSize: 17.5, marginHorizontal: 12.5}]}>Achieve your goals</Text>
                </Animated.View>
            </View>
                
        </View>

        <Animated.View style={{ flex: 1, justifyContent: 'flex-end', width: '80%', transform: [{translateX: translateRefX2 }]}}>

            <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.signup,]} 
            onPress={registerPressedHandler}>
                <Text style={[styles.buttonText,]}>New? Get Started </Text>
            </TouchableOpacity>

            <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.login,]} 
            onPress={loginPressedHandler}>
                <Text  style={[styles.buttonText, styles.blueText]}>Existing user? Log in</Text>
            </TouchableOpacity>
            
            <Text style={{textAlign: 'center', fontFamily: 'Righteous_400Regular'}}>OR</Text>

            <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.signup, 
            {backgroundColor: '#8fd4fc', borderColor: '#8fd4fc', marginBottom: 20, marginTop: 10}]} 
            onPress={buttonPressedHandler}>
                <Text style={[styles.buttonText,]}>Quick log in as previous user</Text>
            </TouchableOpacity>


        </Animated.View>
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
        marginBottom: 20,
        marginTop: 15,
        shadowColor: 'black',
    },
 
});

