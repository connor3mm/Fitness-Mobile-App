import React, { useState } from 'react';
import {Button, SafeAreaView, StyleSheet, Text,TextInput, View, Image, Alert, TouchableOpacity,ScrollView, KeyboardAvoidingView} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import { Righteous_400Regular} from '@expo-google-fonts/righteous';
import { useFonts } from 'expo-font';
import { authentication } from '../firebase/firebase-config';
import { signInWithEmailAndPassword, } from "firebase/auth";



export default function loginPage({navigation}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignedIn, setIsSignedIn] = useState("false")


    const signInUser = () => {
        signInWithEmailAndPassword(authentication, email, password)
        .then((result) => {
            console.log(result)
            setIsSignedIn("true");
        })
        .catch((error) => {
            console.log(error);
        })
        console.log("entered sign in functions");
    }

    const createTwoButtonAlert = () =>
    Alert.alert(
      "",
      "You've been logged in",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Continue", onPress: () => {
            navigation.navigate('Homepage');} }
      ]
    );

    const combinedHandler = () => {
        signInUser();
        createTwoButtonAlert()
    }


    return(
        <SafeAreaView style={styles.container}>
            <Text style ={{marginBottom:'15%',fontFamily: 'Righteous_400Regular',fontSize:20, textAlign:'center'}}>Please enter your login credentials bellow</Text>
            <KeyboardAvoidingView behavior='padding'>

                <View style={styles.inputText}>
                    <TextInput style ={styles.input} placeholder='Email' value={email} 
                        onChangeText={text => setEmail(text)}
                    >
                    </TextInput>

                    <TextInput style ={styles.input} placeholder='Password' value={password} 
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    >
                    </TextInput>
                </View>

                
                <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:'15%'}}>

                    <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.signup,]} 
                        onPress={combinedHandler}>
                    <Text style={[styles.buttonText,]}>Login</Text>
                    </TouchableOpacity>

                </View>




            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    input:{
        paddingHorizontal:15,
        paddingVertical:10,
        marginTop:10,
        borderRadius:10,
        borderColor:"black",
        borderWidth:1,
        fontFamily: 'Righteous_400Regular',
    },

    button: {
        alignItems: 'center',
        fontFamily: 'Righteous_400Regular',
        padding: 15,
        width: '60%',
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


    
});