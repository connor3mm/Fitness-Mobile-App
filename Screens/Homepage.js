import React from 'react';
import { Bottomnavbar } from '../Stack/appStack';
import { NavigationContainer } from '@react-navigation/native';
import { styles } from "./Welcomepage";
import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Touchable, TouchableHighlight} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import { TabRouter } from 'react-navigation';
import { Righteous_400Regular} from '@expo-google-fonts/righteous';
import { useFonts } from 'expo-font';


export default function Home({navigation}) {

    let [fontsLoaded, error] = useFonts ({
        Righteous_400Regular,
    });

    const bmiPressedHandler = () => navigation.navigate('BMICalculatorPage');
    
    const gymsNearMePressedHandler = () => navigation.navigate('GymsNearMePage');
    
    const goalsAchievementsPressedHandler = () => navigation.navigate('GoalsAchievementsPage');
    
    const stepCounterPressedHandler = () => navigation.navigate('StepCounterPage');
    
    const workoutsPressedHandler = () => navigation.navigate('WorkoutsPage');
    
    const calorieCounterPressedHandler = () => navigation.navigate('CalorieCounterPage');
    

    return(
        <SafeAreaView style = {[styles.container, styling.menuContainer,]}>
            <ScrollView style={{width: '100%',}}>

            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent:'center'
            , padding: 10, }}>
                <Text style={[styles.title, styling.smallTitle, ]}>Fit<Text style={styles.blueText}>Me</Text></Text>
                <Image style={[styles.logo, styling.smallLogo, ]} source={require('../assets/img/barbell.png')}/>
            </View> 

            <View style={[styling.dashboard, styles.boxShadow]}>

                <View style={{ width: '100%', padding: 10,}}>
                    <Text style={[styling.profileName,]}>Connor M.</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
                <View style={{ flexDirection: 'row', width: '45%', margin: 15,}}>
                        <Image style={{ width: 40, height: 40, alignSelf: 'center', marginRight: 10,}} 
                        source={require('../assets/img/equality.png')} />
                        <View>
                            <Text style={[styling.smallText]}>Sex</Text>
                            <Text style={[styling.whiteText]}>Male</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: '45%', margin: 15,}}>
                        <Image style={{ width: 40, height: 40, alignSelf: 'center', marginRight: 10,}} 
                        source={require('../assets/img/weight.png')} />
                        <View>
                            <Text style={[styling.smallText]}>Weight</Text>
                            <Text style={[styling.whiteText]}>89 KG</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
                <View style={{ flexDirection: 'row', width: '45%', margin: 15,}}>
                        <Image style={{ width: 40, height: 40, alignSelf: 'center', marginRight: 10,}} 
                        source={require('../assets/img/runner.png')} />
                        <View>
                            <Text style={[styling.smallText]}>Daily Steps</Text>
                            <Text style={[styling.whiteText]}>1000/8000</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: '45%', margin: 15,}}>
                        <Image style={{ width: 40, height: 40, alignSelf: 'center', marginRight: 10,}} 
                        source={require('../assets/img/diet.png')} />
                        <View>
                            <Text style={[styling.smallText]}>Daily Calories</Text>
                            <Text style={[styling.whiteText]}>1000/2900</Text>
                        </View>
                    </View> 
                </View>
            </View>

            <View style={[styling.menu,]}>
                <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.login, 
                styling.menuIcon ]} 
                onPress={gymsNearMePressedHandler}>
                    <Image style={[styling.menuIconImage, ]} source={require('../assets/img/location.png')}/>
                    <Text  style={[styles.buttonText, styling.blackText]}>Gyms Near Me</Text>
                </TouchableOpacity>
                <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.login, 
                styling.menuIcon ]} 
                onPress={goalsAchievementsPressedHandler}>
                    <Image style={[styling.menuIconImage, ]} source={require('../assets/img/target.png')}/>
                    <Text  style={[styles.buttonText, styling.blackText]}>Goals & Achievements</Text>
                </TouchableOpacity>
            </View>

            <View style={[styling.menu,]}>
               <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.login, 
                styling.menuIcon ]} 
                onPress={bmiPressedHandler}>
                    <Image style={[styling.menuIconImage, ]} source={require('../assets/img/bmi.png')}/>
                    <Text  style={[styles.buttonText, styling.blackText]}>Find your BMI</Text>
                </TouchableOpacity>
                <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.login, 
                styling.menuIcon ]} 
                onPress={calorieCounterPressedHandler}>
                    <Image style={[styling.menuIconImage, ]} source={require('../assets/img/kcal.png')}/>
                    <Text  style={[styles.buttonText, styling.blackText]}>Calorie Counter</Text>
                </TouchableOpacity>
            </View>

            <View style={[styling.menu,]}>
               <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.login, 
                styling.menuIcon ]} 
                onPress={stepCounterPressedHandler}>
                    <Image style={[styling.menuIconImage, ]} source={require('../assets/img/human-footprint.png')}/>
                    <Text  style={[styles.buttonText, styling.blackText]}>Step Counter</Text>
                </TouchableOpacity>
               <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.login, 
                styling.menuIcon ]} 
                onPress={workoutsPressedHandler}>
                    <Image style={[styling.menuIconImage, ]} source={require('../assets/img/dumbbells.png')}/>
                    <Text  style={[styles.buttonText, styling.blackText]}>Your Workouts</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>

            <View style={[styling.footer]}>
                <TouchableOpacity style={{ width: '33.3%', alignItems: 'center' }}>
                    <Image  style={[styling.footerIcon, ]} source={require('../assets/img/homepage.png')} />
                    <Text  style={[styles.buttonText, styling.greyText]}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '33.3%', alignItems: 'center' }}>
                    <Image  style={[styling.footerIcon, ]} source={require('../assets/img/avatar.png')} />
                    <Text  style={[styles.buttonText, styling.greyText]}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '33.3%', alignItems: 'center' }}>
                    <Image  style={[styling.footerIcon, ]} source={require('../assets/img/settings.png')} />
                    <Text  style={[styles.buttonText, styling.greyText]}>Settings</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
        
    )
    
}

const styling = StyleSheet.create({
    smallTitle: {
        fontSize: 25,
    },

    smallLogo: {
        width: 22.5,
        height: 22.5,
    },

    dashboard: { 
        width: '92.5%',
        padding: 2,
        marginHorizontal: 'auto',
        borderRadius: 10, 
        backgroundColor: '#4356FF',
    },

    profileName: {
        color: '#FFF',
        fontWeight: "700",
        fontFamily: 'Righteous_400Regular',
        fontSize: 25,
    },

    menuContainer: {
        padding: 2,
    },

    menu: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        height: '20%',  
        marginVertical: 5,
    },

    menuIcon: {
        width: '45%',
        height: '100%',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    menuIconImage: {
        width: 60,
        height: 60,
        margin: 10,
    },

    blackText: {
        color: '#424242',
    },  

    greyText: {
        color: '#FFF',
        fontSize: 14,
        marginTop: 5,
    },

    whiteText: {
        color: '#FFF',
        fontWeight: "700",
        fontFamily: 'Righteous_400Regular',
        fontSize: 17.5,
    },  

    smallText: {
        fontSize: 15,
        fontFamily: 'Righteous_400Regular',
        color: '#FFF',
    },  

    footer: { 
        shadowOffset: { width: 10, height: 10 },
        shadowColor: '#b3b3b3',
        shadowOpacity: 1,
        shadowRadius: 22.5,
        elevation: 3,

        backgroundColor : "#4356FF", 
        height: '9%', 
        maxHeight: '9%', 
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    footerIcon: {
        width: 23,
        height: 23,
    },
})