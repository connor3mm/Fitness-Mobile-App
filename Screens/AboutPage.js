import React, { useState } from 'react';
import Toggle from 'react-native-toggle-element';
import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Linking} from "react-native";
import FooterLogo from '../CustomComponents/footerLogo';
import { caloriesStyles } from "./CalorieCounterPage";
import { setttingStyles } from './SettingsPage';
import { stepStyles } from './StepCounterPage';
import styleSheet from "react-native-web/dist/exports/StyleSheet";


export default function AboutPage({navigation}) {   

    const homePressedHandler = () => navigation.navigate('Homepage');
    const settingsPressedHandler = () => navigation.navigate('SettingsPage');
    return(
        
        <SafeAreaView style = {[setttingStyles.container, { padding: 10}]}>
            
            <View style={{ flexDirection: 'row', padding: 15}}>
                <TouchableOpacity onPress={homePressedHandler} style={{ flexDirection: 'row',}}>
                    <Text style={{ textDecorationLine: 'underline', alignSelf: 'center', 
                    fontFamily: 'Righteous_400Regular', color: '#424242', fontSize: 16.5,}}>
                        Dashboard
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={settingsPressedHandler} style={{ flexDirection: 'row'}}>     
                    <Image style={{ width: 15, height: 15, marginVertical: 30, marginHorizontal: 10, transform: [{rotate: '180deg'}]}} 
                    source={require('../assets/img/angle-left.png')}/>

                    <Text style={{ textDecorationLine: 'underline', alignSelf: 'center', 
                    fontFamily: 'Righteous_400Regular', color: '#424242', fontSize: 16.5,}}>
                        Settings
                    </Text>
                </TouchableOpacity>
            </View>
          

            <Text style={[caloriesStyles.caloriesItemsText, setttingStyles.title, {marginLeft: 15}]}>About</Text>  
    
            <ScrollView showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false} alwaysBounceVertical={true} style={{ marginHorizontal: 2.5}}>

            <View style={[stepStyles.section, {width: '100%'}]}>
                <Text style={[caloriesStyles.caloriesItemsText, {color: '#3777D9', fontSize: 20}]}>Group Members{"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText,]}>Angel Angelov{"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText,]}>Ramsey Ediku{"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText,]}>Tamara Jankova{"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText,]}>Connor McGuire{"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText,]}>Cameron Pollock{"\n"}</Text>
            </View>

            <View style={[stepStyles.section]}>
                <Text style={[caloriesStyles.caloriesItemsText, {color: '#3777D9', fontSize: 20}]}>Assets Attributions{"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]} 
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/food')}>Food icons created by Freepik {"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]} 
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/runner')}>Flaticon Runner icons created by Freepik {"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]} 
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/gender')}>Flaticon Gender icons created by Freepik {"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]} 
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/location')}>Flaticon Location icons created by Good Ware {"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]} 
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/location')}>Flaticon Location icons created by Yogi Aprelliyanto {"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]} 
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/target')}>Flaticon Target icons created by Freepik {"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]} 
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/workout')}>Flaticon Workout icons created by Eucalyp {"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]} 
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/calories')}>Flaticon Calories icons created by Freepik {"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]} 
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/home')}>Home icons created by Dooder {"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]} 
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/house')}>Flaticon House icons created by Freepik {"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]} 
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/house')}>Flaticon House icons created by Freepik {"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]} 
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/user')}>Flaticon User icons created by Bombasticon Studio {"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]} 
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/run')}>Flaticon Run icons created by Freepik {"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]} 
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/goal')}>Flaticon Goal icons created by Freepik {"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]} 
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/location')}>Flaticon Location icons created by IconMarketPK {"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]} 
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/calendar')}>Flaticon Calendar icons created by Freepik {"\n"}</Text>
            </View>

            <View style={[stepStyles.section]}>
            <Text style={[caloriesStyles.caloriesItemsText, {color: '#3777D9', fontSize: 20}]}>Libraries used{"\n"}</Text>
                <Text style={[caloriesStyles.caloriesItemsText]}>
                    "@expo-google-fonts/righteous": "^0.2.2",{"\n"}
                    "@react-native-community/art": "^1.2.0",{"\n"}
                    "@react-native-community/datetimepicker": "4.0.0",{"\n"}
                    "@react-navigation/bottom-tabs": "^6.2.0",{"\n"}
                    "@react-navigation/native": "^6.0.8",{"\n"}
                    "expo": "~44.0.0",{"\n"}
                    "expo-app-loading": "~1.3.0",{"\n"}
                    "expo-font": "~10.0.4",{"\n"}
                    "expo-linear-gradient": "~11.0.3",{"\n"}
                    "expo-sensors": "~11.1.0",{"\n"}
                    "expo-status-bar": "~1.2.0",{"\n"}
                    "formik": "^2.2.9",{"\n"}
                    "popup-ui": "^1.2.2",{"\n"}
                    "react": "17.0.1",{"\n"}
                    "react-dom": "17.0.1",{"\n"}
                    "react-native": "0.64.3",{"\n"}
                    "react-native-form-validator": "^0.5.1",{"\n"}
                    "react-native-gesture-handler": "~2.1.0",{"\n"}
                    "react-native-paper": "^4.11.2",{"\n"}
                    "react-native-pedometer-ios-android": "^0.1.0",{"\n"}
                    "react-native-pie": "^1.1.2",{"\n"}
                    "react-native-safe-area-context": "3.3.2",{"\n"}
                    "react-native-svg": "12.1.1",{"\n"}
                    "react-native-toggle-element": "^1.0.1",{"\n"}
                    "react-native-web": "0.17.1",{"\n"}
                    "react-navigation": "^4.4.4",{"\n"}
                    "react-navigation-stack": "^2.10.4",{"\n"}
                    "react-router-dom": "^6.2.2",{"\n"}
                    "yup": "^0.32.11",{"\n"}
                    "react-native-paper": "^4.11.2"{"\n"}
                </Text>
            </View>
              
            </ScrollView>
                        
        </SafeAreaView>        
    )
}

export const aboutStyles = StyleSheet.create({ 
    
})

