import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Image
} from "react-native";
import footerLogo from '../CustomComponents/footerLogo';
import { Righteous_400Regular} from '@expo-google-fonts/righteous';
import { useFonts } from 'expo-font';
import { authentication } from '../firebase/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,} from "firebase/auth";



export default function registerPage({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const registerUser = () => {
        if(password !== password2){
            alertPasswordMatchError();
            return;
        }
        createUserWithEmailAndPassword(authentication, email, password)
        .then((result) => {
            console.log(result);
            alertRegisterUser();
        })
        .catch((error) => {
            console.log(error);
            if(error.code === "auth/invalid-email" || email === "") {alertInvalidEmail(); return;}
            if(error.code === "auth/email-already-in-use") {alertEmailInUse(); return;}
            if(password === "") {alertPasswordError(); return;}
        });
    };

    const alertPasswordError = () =>
        Alert.alert(
            "",
            "Please input a password.",
            [
                {
                    text: "Okay",
                    style: "cancel"
                },
            ]
        );

    const alertPasswordMatchError = () =>
        Alert.alert(
            "",
            "Passwords do not match, try again.",
            [
                {
                    text: "Okay",
                    style: "cancel"
                },
            ]
        );

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

    const alertEmailInUse = () =>
    Alert.alert(
      "",
      "This email is already taken, please choose another one.",
      [
        {
          text: "Okay",
          style: "cancel"
        },
      ]
    );


    const alertRegisterUser = () =>
    Alert.alert(
      "Attention!",
      "Your registration is almost complete. Please click on the \"Next\" button to continue the registration process, otherwise your account will be fully not created.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Next", onPress: () => {
            signInWithEmailAndPassword(authentication, email, password)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
            navigation.navigate('registerFormPage');} }
      ]
    );

    const combinedHandler = () => {
        registerUser();
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

            <Text style ={{marginBottom:'15%',fontFamily: 'Righteous_400Regular',fontSize:20, textAlign:'center'}}>Please enter your new registration credentials bellow</Text>
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

                    <Text style={{ fontFamily: 'Righteous_400Regular', 
                    color: '#3777D9', fontSize: 12.5, marginLeft: 30, marginTop: 15, marginBottom: -10}}>Confirm Password</Text>

                    <View style={{ flexDirection: 'row'}}>
                        <TextInput style ={styles.input} placeholder='xxxxx' value={password2} 
                            onChangeText={text => setPassword2(text)} secureTextEntry>
                        </TextInput>
                        <Image style={{ width: 17.5, height: 17.5, alignSelf: 'center'}} source={require('../assets/img/key.png')} />
                    </View>
                </View>


                <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:'15%'}}>
                    <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.signup,]}
                        onPress={combinedHandler}>
                    <Text style={[styles.buttonText,]}>Register</Text>
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