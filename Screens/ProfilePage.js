import React from 'react';
import {TouchableOpacity, SafeAreaView, StyleSheet, Text, View, Image, Alert} from "react-native";
import { styles } from "./Welcomepage";
import { styling } from './Homepage';
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import { signOut } from "firebase/auth";
import { authentication } from '../firebase/firebase-config';



export default function GoalsAchievements({navigation}) {

    const settingsPressedHandler = () => navigation.navigate('SettingsPage');
    const profilePressedHandler = () => navigation.navigate('ProfilePage');
    const homePressedHandler = () => navigation.navigate('Homepage');


    const signOutUser = async() => {
        console.log(authentication.currentUser.email);
        const result = await signOut(authentication);
        console.log("entered sign out functions");
    }

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Signed out",
      "You've been signed out. Please click on the \"Login\" button to redirect to the log page",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Welcome Page", onPress: () => {
            navigation.navigate('Welcome');} }
      ]
    );


    const combinedHandler = () => {
        signOutUser();
        createTwoButtonAlert();
    }


    return(
        <SafeAreaView style = {[styles.container,] }>
            <Text>Profile Page</Text>

            <View style={[styling.footer]}>
                <TouchableOpacity  onPress={homePressedHandler} style={{ width: '33.3%', alignItems: 'center' }}>
                    <Image  style={[styling.footerIcon, ]} source={require('../assets/img/homepage.png')} />
                    <Text  style={[styles.buttonText, styling.greyText]}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={profilePressedHandler} style={{ width: '33.3%', alignItems: 'center' }}>
                    <Image  style={[styling.footerIcon, ]} source={require('../assets/img/avatar.png')} />
                    <Text  style={[styles.buttonText, styling.greyText]}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={settingsPressedHandler} style={{ width: '33.3%', alignItems: 'center' }}>
                    <Image  style={[styling.footerIcon, ]} source={require('../assets/img/settings.png')} />
                    <Text  style={[styles.buttonText, styling.greyText]}>Settings</Text>
                </TouchableOpacity>
            </View> 

            <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.signup,]} 
                        onPress={combinedHandler}>
                    <Text style={[styles.buttonText,]}>Sign Out</Text>
                    </TouchableOpacity>

        </SafeAreaView>

    )
}