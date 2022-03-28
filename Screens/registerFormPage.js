import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text,TextInput, View, TouchableOpacity, Alert, KeyboardAvoidingView} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import { Righteous_400Regular} from '@expo-google-fonts/righteous';
import { useFonts } from 'expo-font';
import { authentication } from '../firebase/firebase-config';
import { collections, getDocs, doc, setDoc } from "firebase/firestore/lite";
import { db } from '../firebase/firebase-config';



export default function registerFormPage({navigation}) {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [sex, setSex] = useState("")
    const [targetSteps, setTargetSteps] = useState("")
    const [weight, setWeight] = useState("")

    const uid = authentication.currentUser.uid;


    const setData = async () => {
        //creates doc with the user info
        await setDoc(doc(db,"users",uid),{
            uid: uid,
            firstName: firstName,
            lastName: lastName,
            targetCalories: 0,
            dailyCalories: 0,
            consumedCalories: 0,
            goalSteps: 0,
            currentSteps: 0,
            weight: weight,
            age: age,
            sex: sex,
        })
    }

    
    const createTwoButtonAlert = () =>
    Alert.alert(
      "Registratioon Complete",
      "Your registration is now complete. Please click on the \"Continue\" button to redirect to the main menu",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Complete", onPress: () => {
            navigation.navigate('Homepage');} }
      ]
    );


    const alertAgeNaN = () =>
    Alert.alert(
      "",
      "Age is invalid, please use a positive number",
      [
        {
          text: "Okay",
          style: "cancel"
        },
      ]
    );


    const alertWeightNaN = () =>
    Alert.alert(
      "",
      "Weight is invalid, please use a positive number",
      [
        {
          text: "Okay",
          style: "cancel"
        },
      ]
    );



    const combinedHandler = () => {
        if(isNaN(age) || age < 0 || age === "") alertAgeNaN()
            else if(isNaN(weight) || weight < 0 || weight === "") alertWeightNaN()
                    else{
                        setData();
                        createTwoButtonAlert();
                    }
    }


    

    return(
        <SafeAreaView style={styles.container}>
            <Text style ={{marginBottom:'15%',fontFamily: 'Righteous_400Regular',fontSize:20, textAlign:'center'}}>Please enter your information bellow</Text>
            <KeyboardAvoidingView behavior='padding'>

                <View style={styles.inputText}>
                    <TextInput style ={styles.input} placeholder='First name' value={firstName} 
                        onChangeText={text => setFirstName(text)}
                    >
                    </TextInput>

                    <TextInput style ={styles.input} placeholder='Last name' value={lastName} 
                        onChangeText={text => setLastName(text)}
                    >
                    </TextInput>

                    <TextInput style ={styles.input} placeholder='Age' value={age} 
                        onChangeText={text => setAge(text)}
                    >
                    </TextInput>

                    <TextInput style ={styles.input} placeholder='Sex' value={sex} 
                        onChangeText={text => setSex(text)}
                    >
                    </TextInput>

                    <TextInput style ={styles.input} placeholder='Current weight' value={weight} 
                        onChangeText={text => setWeight(text)}
                    >
                    </TextInput>
                </View>

                
                <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:'15%'}}>
                    <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.signup,]} 
                        onPress={combinedHandler}>  
                    <Text style={[styles.buttonText,]}>Finish Registration</Text>
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