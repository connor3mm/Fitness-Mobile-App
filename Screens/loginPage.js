import React, { useState } from 'react';
import {Button, SafeAreaView, StyleSheet, Text,TextInput, View, Image, Alert, TouchableOpacity,ScrollView, KeyboardAvoidingView} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import { Righteous_400Regular} from '@expo-google-fonts/righteous';
import { useFonts } from 'expo-font';
import { authentication } from '../firebase/firebase-config';
import { signInWithEmailAndPassword, } from "firebase/auth";



export default function loginPage({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const signInUser = () => {
        signInWithEmailAndPassword(authentication, email, password)
        .then((result) => {
            console.log(result);
            alertLogin();
        })
        .catch((error) => {
            console.log(error);
            if(error.code === "auth/invalid-email") alertInvalidEmail();
            if(error.code === "auth/wrong-password") alertWrongPassword();
            if(error.code === "auth/user-not-found") alertUserNotFound();
            
        });
        console.log("entered sign in functions");
    };


    const alertInvalidEmail = () =>
    Alert.alert(
      "",
      "The email you've selected is invalid, please choose another one",
      [
        {
          text: "Okay",
          style: "cancel"
        },
      ]
    );


    const alertUserNotFound = () =>
    Alert.alert(
      "",
      "User not found",
      [
        {
          text: "Okay",
          style: "cancel"
        },
      ]
    );


    const alertWrongPassword = () =>
    Alert.alert(
      "",
      "Incorrect password",
      [
        {
          text: "Okay",
          style: "cancel"
        },
      ]
    );

    const alertLogin = () =>
    Alert.alert(
      "",
      "You've been logged in",
      [
        { text: "Continue", onPress: () => {
            navigation.navigate('Homepage');} }
      ]
    );

    const combinedHandler = () => {
        signInUser();
    };


    return(
        <SafeAreaView style={styles.container}>

            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}
                              style={{ flexDirection: 'row', alignSelf: 'flex-start', margin: 20,}}>
                <Image style={{ width: 25, height: 25, marginVertical: 30, marginRight: 10,}}
                       source={require('../assets/img/angle-left.png')}/>
                <Text style={{ textDecorationLine: 'underline', alignSelf: 'center',
                    fontFamily: 'Righteous_400Regular', color: '#424242', fontSize: 16.5,}}>
                    Welcome
                </Text>
            </TouchableOpacity>

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