import React, { useState } from 'react';
import Toggle from 'react-native-toggle-element';
import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from "react-native";
import FooterLogo from '../CustomComponents/footerLogo';
import { caloriesStyles } from "./CalorieCounterPage";
import { setttingStyles } from './SettingsPage';


export default function ProfilePage({navigation}) {   

    const homePressedHandler = () => navigation.navigate('Homepage', {transition: 'vertical'});
    const [toggleValue, setToggleValue] = useState(false);

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
            </ScrollView>
            
            <FooterLogo/>
            
        </SafeAreaView>        
    )
}

export const style = StyleSheet.create({ 
  
    
})

