import React, { useState } from 'react';
//import Toggle from 'react-native-toggle-element';
import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from "react-native";
import FooterLogo from '../CustomComponents/footerLogo';
import { caloriesStyles } from "./CalorieCounterPage";
import styleSheet from "react-native-web/dist/exports/StyleSheet";


export default function SettingsPage({navigation}) {   

    const homePressedHandler = () => navigation.navigate('Homepage', {transition: 'vertical'});
    const [toggleValue, setToggleValue] = useState(false);

    return(
        
        <SafeAreaView style = {[setttingStyles.container]}>

            <TouchableOpacity onPress={homePressedHandler}>
                <Image style={{ width: 30, height: 30, margin: 30, marginLeft: 0,}} source={require('../assets/img/angle-left.png')}/>
            </TouchableOpacity>

            <Text style={[caloriesStyles.caloriesItemsText, setttingStyles.title]}>Settings</Text>  
    
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
            </ScrollView>
            
            <FooterLogo/>
            
        </SafeAreaView>        
    )
}

export const setttingStyles = StyleSheet.create({ 
    container: {
        padding: 30,
        backgroundColor: '#FFF',
        height: '100%',
    },

    title: {
        fontSize: 45,
        color: '#3777D9',
        marginVertical: 30
    },
    
    settingsSection: { 
        flexDirection: 'row',
        marginVertical: 17.5,
        justifyContent: 'space-between', 
    },

    settingsButton: {
        width: 40,
        height: 40,
        backgroundColor: '#efefef',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
})

