import React, { useState } from 'react';
import {Image, SafeAreaView, StyleSheet, Text,TextInput, View, Alert, TouchableOpacity, KeyboardAvoidingView} from "react-native";
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
      "The email you've selected is invalid, please choose another one.",
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
      "User not found. Try again.",
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
      "Incorrect password. Try again.",
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
      "You're now logged in.",
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

            <Text style ={{marginBottom:'15%',fontFamily: 'Righteous_400Regular',fontSize:20, textAlign:'center', margin: 10}}>
                Please enter your login credentials bellow
            </Text>

            <KeyboardAvoidingView behavior='padding'>
                <View style={styles.inputText}>

                    <Text style={{ fontFamily: 'Righteous_400Regular', 
                    color: '#3777D9', fontSize: 12.5, marginLeft: 30, marginTop: 15, marginBottom: -10}}>Email</Text>

                    <View style={{ flexDirection: 'row'}}>
                        <TextInput style ={styles.input} placeholder='example@mail.com' value={email} 
                            onChangeText={text => setEmail(text)}>
                        </TextInput>
                        <Image style={{ width: 17.5, height: 17.5, alignSelf: 'center'}} source={require('../assets/img/inbox.png')} />
                    </View>

                    <Text style={{ fontFamily: 'Righteous_400Regular', 
                    color: '#3777D9', fontSize: 12.5, marginLeft: 30, marginTop: 15, marginBottom: -10}}>Password</Text>

                    <View style={{ flexDirection: 'row'}}>
                        <TextInput style ={styles.input} placeholder='xxxxx' value={password} 
                            onChangeText={text => setPassword(text)} secureTextEntry>
                        </TextInput>
                        <Image style={{ width: 17.5, height: 17.5, alignSelf: 'center'}} source={require('../assets/img/key.png')} />
                    </View>
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
        backgroundColor: '#f9fbfc',
        alignItems: 'stretch',
    },

    input:{
        paddingTop: 2,
        paddingBottom: 5,
        margin: 30,
        marginTop: 20,
        marginRight: -20,
        fontFamily: 'Righteous_400Regular',
        borderWidth: 0,
        borderBottomColor: '#4356FF',
        borderBottomWidth: 1.5,
        fontSize: 15,
        width: '80%'
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