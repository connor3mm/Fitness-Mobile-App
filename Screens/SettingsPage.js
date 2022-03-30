import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar} from "react-native";
import FooterLogo from '../CustomComponents/footerLogo';
import { caloriesStyles } from "./CalorieCounterPage";


export default function SettingsPage({navigation}) {   

    const homePressedHandler = () => navigation.navigate('Homepage', {transition: 'vertical'});
    const aboutPressedHandler = () => navigation.navigate('AboutPage');
    const [toggleValue, setToggleValue] = useState(false);

    return(
        
        <SafeAreaView style = {[setttingStyles.container]}>

            <StatusBar backgroundColor={'#FFF'} barStyle='dark-content' />

            <TouchableOpacity onPress={homePressedHandler} style={{ flexDirection: 'row', alignSelf: 'flex-start'}}>
                <Image style={{ width: 25, height: 25, marginVertical: 30, marginRight: 10,}} 
                source={require('../assets/img/angle-left.png')}/>

                <Text style={{ textDecorationLine: 'underline', alignSelf: 'center', 
                fontFamily: 'Righteous_400Regular', color: '#424242', fontSize: 16.5,}}>
                    Dashboard
                </Text>
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
                    <TouchableOpacity onPress={aboutPressedHandler} style={[setttingStyles.settingsButton, {alignSelf: 'center'}]}>
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

