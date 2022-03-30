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
    };

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
                    <Text style={[caloriesStyles.caloriesItemsText, { fontSize: 50, color: '#3777D9'}]}>Ramsey</Text>
                </View>

                <View>
                    <View style={[profilestyle.section, {backgroundColor: '#dee0fc'}]}>
                        <Text style={[caloriesStyles.caloriesItemsText, {opacity: .5,}]}>Email</Text>
                        <Text style={[caloriesStyles.caloriesItemsText, { fontSize: 17.5}]}>ramseyediku02@gmail.com</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={[profilestyle.section, {borderColor: '#B3B3B3', borderWidth: .5} ]}>
                            <Image style={{ width: 40, height: 40, margin: 10, marginTop: 20, alignSelf: 'center'}} 
                            source={require('../assets/img/calories.png')} />
                            <Text style={[caloriesStyles.caloriesItemsText, {fontSize: 22.5, alignSelf: 'center'}]}>3000</Text>
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
                                <Text style={[caloriesStyles.caloriesItemsText,{fontSize: 20, color: '#FFF'}]}>Male</Text>
                            </View>

                            <View style={[profilestyle.section, {backgroundColor: '#0010f9'}]}>
                                <Text style={[caloriesStyles.caloriesItemsText, {opacity: .5, color: '#FFF'}]}>
                                    Weight
                                </Text>
                                <Text style={[caloriesStyles.caloriesItemsText,{fontSize: 20, color: '#FFF'}]}>87 (KG)</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[profilestyle.section, {backgroundColor: '#8fd4fc', flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <Text style={[caloriesStyles.caloriesItemsText, {opacity: .7, alignSelf: 'center', color: '#FFF'}]}>Steps walked today</Text>
                        <Text style={[caloriesStyles.caloriesItemsText, { fontSize: 22.5, color: '#FFF'}]}>3000</Text>
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
        // elevation: 5,
        // shadowColor: '#000',
        // shadowOffset: {width: 6, height: 6},
        // shadowOpacity: 0.5,
        // shadowRadius: 1,
    },
    
})

