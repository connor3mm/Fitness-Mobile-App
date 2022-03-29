import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image} from "react-native";
import { styles } from './Welcomepage';
import { setttingStyles } from './SettingsPage';
import { caloriesStyles } from './CalorieCounterPage';
import { BMIstyles } from './BMICalculatorPage';
import { styling } from './Homepage';
import CustomStatusBar from '../CustomComponents/statusBar';
import {LinearGradient} from 'expo-linear-gradient';


export default function GymsNearMe({navigation}) {

    const homePressedHandler = () => navigation.navigate('Homepage');

    return(
        <SafeAreaView style={[styles.container]}>
            
            <CustomStatusBar/>

            
            <TouchableOpacity onPress={homePressedHandler} style={{ flexDirection: 'row', alignSelf: 'flex-start'}}>
                <Image style={{ width: 25, height: 25, marginVertical: 30, marginRight: 10,}} 
                source={require('../assets/img/angle-left.png')}/>

                <Text style={{ textDecorationLine: 'underline', alignSelf: 'center', 
                fontFamily: 'Righteous_400Regular', color: '#424242', fontSize: 16.5,}}>
                    Dashboard
                </Text>
            </TouchableOpacity>

            <Text style={[caloriesStyles.caloriesItemsText, setttingStyles.title]}>Gyms Near Me</Text>  

            
        </SafeAreaView>

    )
}