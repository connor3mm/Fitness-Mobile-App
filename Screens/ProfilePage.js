import React, { useState, useEffect } from 'react';
//import Toggle from 'react-native-toggle-element';
import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert} from "react-native";
import { caloriesStyles } from "./CalorieCounterPage";
import { setttingStyles } from './SettingsPage';
import { signOut } from "firebase/auth";
import { doc, getDoc} from 'firebase/firestore/lite';
import { db } from '../firebase/firebase-config';
import { authentication } from '../firebase/firebase-config';


export default function ProfilePage({navigation}) {   

    const homePressedHandler = () => navigation.navigate('Homepage', {transition: 'vertical'});
    const [toggleValue, setToggleValue] = useState(false);
    const settingsPressedHandler = () => navigation.navigate('SettingsPage');
    const profilePressedHandler = () => navigation.navigate('ProfilePage');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [sex, setSex] = useState("");
    const [targetCalories, setTargetCalories] = useState();
    const [dailyCalories, setDailyCalories] = useState();
    const [dailySteps, setDailySteps] = useState();
    const [weight, setWeight] = useState("");


    const signOutUser = async() => {
        console.log(authentication.currentUser.email);
        const result = await signOut(authentication);
        console.log("entered sign out functions");
    };

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Sign out",
      "Would you like to sign out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => {
            navigation.navigate('Welcome');} }
      ]
    );

    const combinedHandler = () => {
        signOutUser();
        createTwoButtonAlert();
    };

    const getUserData = async () =>{
        const docRef = doc(db, "users", authentication.currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }

        setFirstName(docSnap.get("firstName"));
        setSex(docSnap.get("sex"));
        setWeight(docSnap.get("weight"));
        setTargetCalories(docSnap.get("targetCalories"));
        setDailyCalories(docSnap.get("dailyCalories"));
        setDailySteps(docSnap.get("currentSteps"));
        setEmail(docSnap.get("Email"));
        console.log("get user data finished");
    };

    useEffect(() => { 
        getUserData();
    }, []);


    return(
        
        <SafeAreaView style = {[setttingStyles.container]}>

            <TouchableOpacity onPress={homePressedHandler} style={{ flexDirection: 'row', alignSelf: 'flex-start'}}>
                <Image style={{ width: 25, height: 25, marginVertical: 30, marginRight: 10,}} 
                source={require('../assets/img/angle-left.png')}/>

                <Text style={{ textDecorationLine: 'underline', alignSelf: 'center', 
                fontFamily: 'Righteous_400Regular', color: '#424242', fontSize: 16.5,}}>
                    Dashboard
                </Text>
            </TouchableOpacity>
    
            <ScrollView showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false} alwaysBounceVertical={true} style={{ width: '95%'}}>
                
                <View style={{ marginVertical: 30}}>
                    <Text style={[caloriesStyles.caloriesItemsText, { fontSize: 37.5, opacity: .75}]}>Hello,</Text>
                    <Text style={[caloriesStyles.caloriesItemsText, { fontSize: 50, color: '#3777D9'}]}>{firstName}</Text>
                </View>

                <View>
                    <View style={[profilestyle.section, {backgroundColor: '#dee0fc'}]}>
                        <Text style={[caloriesStyles.caloriesItemsText, {opacity: .5,}]}>Email</Text>
                        <Text style={[caloriesStyles.caloriesItemsText, { fontSize: 17.5}]}>{email}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={[profilestyle.section, {borderColor: '#B3B3B3', borderWidth: .5} ]}>
                            <Image style={{ width: 40, height: 40, margin: 10, marginTop: 20, alignSelf: 'center'}} 
                            source={require('../assets/img/calories.png')} />
                            <Text style={[caloriesStyles.caloriesItemsText, {fontSize: 22.5, alignSelf: 'center'}]}>{dailyCalories}</Text>
                            <Text style={[caloriesStyles.caloriesItemsText, {textAlign: 'center'}]}>Calories Today </Text>
                        </View>

                        <View style={{width: '50%'}}>

                            <View style={[profilestyle.section, {backgroundColor: '#a9aefc'}]}>
                                <Text style={[caloriesStyles.caloriesItemsText, {opacity: .5,}]}>
                                    Age
                                </Text>
                                <Text style={[caloriesStyles.caloriesItemsText,{fontSize: 20}]}>19</Text>
                            </View>
                            
                            <View style={[profilestyle.section, {backgroundColor: '#3777D9', borderColor:'#FFF', borderWidth: .5}]}>
                                <Text style={[caloriesStyles.caloriesItemsText, {opacity: .5, color: '#FFF'}]}>
                                    Sex
                                </Text>
                                <Text style={[caloriesStyles.caloriesItemsText,{fontSize: 20, color: '#FFF'}]}>{sex}</Text>
                            </View>

                            <View style={[profilestyle.section, {backgroundColor: '#0010f9'}]}>
                                <Text style={[caloriesStyles.caloriesItemsText, {opacity: .5, color: '#FFF'}]}>
                                    Weight
                                </Text>
                                <Text style={[caloriesStyles.caloriesItemsText,{fontSize: 20, color: '#FFF'}]}>{weight} (KG)</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[profilestyle.section, {backgroundColor: '#8fd4fc', flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <Text style={[caloriesStyles.caloriesItemsText, {opacity: .7, alignSelf: 'center', color: '#FFF'}]}>Steps walked today</Text>
                        <Text style={[caloriesStyles.caloriesItemsText, { fontSize: 22.5, color: '#FFF'}]}>{dailySteps}</Text>
                    </View>
                </View>


                <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.signup,]}
                                   onPress={combinedHandler}>
                    <Text style={[styles.buttonText,]}>Sign Out</Text>
                </TouchableOpacity>

            </ScrollView>
                        
        </SafeAreaView>        
    )
}

export const profilestyle = StyleSheet.create({ 
  
    section: {
        borderRadius: 15,
        backgroundColor: '#FFF',
        padding: 25,
        marginVertical: 10,
    },
    
})

