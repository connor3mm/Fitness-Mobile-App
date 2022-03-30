import React, { useState } from 'react';
//import Toggle from 'react-native-toggle-element';
import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert} from "react-native";
import FooterLogo from '../CustomComponents/footerLogo';
import { caloriesStyles } from "./CalorieCounterPage";
import { setttingStyles } from './SettingsPage';
import { signOut } from "firebase/auth";
import { styles } from "./Welcomepage";
import { authentication } from '../firebase/firebase-config';


export default function ProfilePage({navigation}) {   

    const homePressedHandler = () => navigation.navigate('Homepage', {transition: 'vertical'});
    const [toggleValue, setToggleValue] = useState(false);
    const settingsPressedHandler = () => navigation.navigate('SettingsPage');
    const profilePressedHandler = () => navigation.navigate('ProfilePage');

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
        
        <SafeAreaView style = {[setttingStyles.container]}>

            <TouchableOpacity onPress={homePressedHandler}>
                <Image style={{ width: 30, height: 30, margin: 30, marginLeft: 0,}} source={require('../assets/img/angle-left.png')}/>
            </TouchableOpacity>

            <Text style={[caloriesStyles.caloriesItemsText, setttingStyles.title]}>My Account</Text>  
    
            <ScrollView showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false} alwaysBounceVertical={true} style={{ marginHorizontal: 2.5, marginVertical: 10, }}>

                <View style={[setttingStyles.settingsSection,]}>

                    <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
                        <Image style={{ width: 60, height: 60, alignSelf: 'center', marginRight: 10,}} source={require('../assets/img/language.png')}/>
                        <Text style={[caloriesStyles.caloriesItemsText, { alignSelf: 'center', color: '#424242'}]}>Language</Text>
                    </View>


                    <TouchableOpacity style={[setttingStyles.settingsButton, {alignSelf: 'center'}]}>
                        <Image style={{ width: 15, height: 15, transform: [{ rotate: '180deg'}],}} 
                        source={require('../assets/img/angle-left.png')}/>
                    </TouchableOpacity>
                    
                </View>

                <View style={[setttingStyles.settingsSection,]}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
                        <Image style={{ width: 60, height: 60, alignSelf: 'center', marginRight: 10,}} source={require('../assets/img/notifcations.png')}/>
                        <Text  style={[caloriesStyles.caloriesItemsText, { alignSelf: 'center', color: '#424242'}]}>Notification</Text>
                    </View>
                    <TouchableOpacity style={[setttingStyles.settingsButton, {alignSelf: 'center'}]}>
                        <Image style={{ width: 15, height: 15, transform: [{ rotate: '180deg'}],}} 
                        source={require('../assets/img/angle-left.png')}/>
                    </TouchableOpacity>
                </View>

                <View style={[setttingStyles.settingsSection,]}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
                        <Image style={{ width: 60, height: 60, alignSelf: 'center', marginRight: 10,}} source={require('../assets/img/darkmode.png')}/>
                        <Text  style={[caloriesStyles.caloriesItemsText, { alignSelf: 'center', color: '#424242'}]}>Dark Mode</Text>
                    </View>
                    {/* <Toggle value={toggleValue} onValueChange={(toggleValue) => setToggleValue(toggleValue)} /> */}

                </View>

                <View style={[setttingStyles.settingsSection,]}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
                        <Image style={{ width: 60, height: 60, alignSelf: 'center', marginRight: 10,}} source={require('../assets/img/help.png')}/>
                        <Text  style={[caloriesStyles.caloriesItemsText, { alignSelf: 'center', color: '#424242'}]}>About</Text>
                    </View>
                    <TouchableOpacity style={[setttingStyles.settingsButton, {alignSelf: 'center'}]}>
                        <Image style={{ width: 15, height: 15, transform: [{ rotate: '180deg'}],}} 
                        source={require('../assets/img/angle-left.png')}/>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.signup,]} 
                        onPress={combinedHandler}>
                    <Text style={[styles.buttonText,]}>Sign Out</Text>
                    </TouchableOpacity>
            </ScrollView>
            
            <FooterLogo/>
            
        </SafeAreaView>        
    )
}

export const style = StyleSheet.create({ 
  
    
})

