import React from 'react';
import {TouchableOpacity, SafeAreaView, StyleSheet, Text, View, Image} from "react-native";
import { styles } from "./Welcomepage";
import { styling } from './Homepage';
import styleSheet from "react-native-web/dist/exports/StyleSheet";



export default function GoalsAchievements({navigation}) {

    const settingsPressedHandler = () => navigation.navigate('SettingsPage');

    const profilePressedHandler = () => navigation.navigate('ProfilePage');

    const homePressedHandler = () => navigation.navigate('Homepage');

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

        </SafeAreaView>

    )
}