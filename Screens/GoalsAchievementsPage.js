import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image} from "react-native";
import { styles } from './Welcomepage';
import { BMIstyles } from './BMICalculatorPage';
import { styling } from './Homepage';
import CustomStatusBar from '../CustomComponents/statusBar';
import {LinearGradient} from 'expo-linear-gradient';



export default function GoalsAchievements({ navigation }) {
    const homePressedHandler = () => navigation.navigate('Homepage');

    return(
        <SafeAreaView style={[styles.container]}>
            
            <CustomStatusBar/>

            <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#3777D9', '#649eef']} locations={[0,0.9]} style={[styling.dashboard, styles.boxShadow]}>
                <View style={{ width: '100%', paddingTop: 50, paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 20,}} onPress={homePressedHandler}>
                        <Image style={BMIstyles.homeButton} source={require('../assets/img/option.png')}/>
                        <Text style={{ color: '#FFF'}}>Menu</Text>
                    </TouchableOpacity>

                    <Text style={[styling.smallText, BMIstyles.sectionTitle]}>Calorie Counter</Text>

                    <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                        <Text style={{color: 'white', fontFamily: 'Righteous_400Regular', alignSelf: 'center', margin: 15, marginTop: 0, fontSize: 15,}}>
                            Fit<Text style={[styles.blueText]}>Me</Text>
                        </Text>
                    </View>
                </View>
            </LinearGradient>            
        </SafeAreaView>
    )
}