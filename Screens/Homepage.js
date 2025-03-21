import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from "./Welcomepage";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar,
    Alert
} from "react-native";
import { Righteous_400Regular } from '@expo-google-fonts/righteous';
import { useFonts } from 'expo-font';
import CustomStatusBar from '../CustomComponents/statusBar';
import AppLoading from 'expo-app-loading';
import { authentication } from '../firebase/firebase-config';
import { db } from '../firebase/firebase-config';
import { doc, getDoc} from 'firebase/firestore/lite';
import { useIsFocused } from "@react-navigation/native";
import {signOut} from "firebase/auth";


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
    const settingsPressedHandler = () => navigation.navigate('SettingsPage');
    const profilePressedHandler = () => navigation.navigate('ProfilePage');
    const homePressedHandler = () => navigation.navigate('Homepage');
    const WelcomepressedHandler = () => navigation.navigate('Welcome');


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [sex, setSex] = useState("");
    const [targetCalories, setTargetCalories] = useState();
    const [dailyCalories, setDailyCalories] = useState();
    const [targetSteps, setTargetSteps] = useState();
    const [dailySteps, setDailySteps] = useState();
    const [weight, setWeight] = useState("");

    const isFocused = navigation.useIsFocused;


    const getUserData = async () =>{
        const docRef = doc(db, "users", authentication.currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
            setFirstName(docSnap.get("firstName"));
            setSex(docSnap.get("sex"));
            setWeight(docSnap.get("weight"));
            setLastName(docSnap.get("lastName"));
            setTargetCalories(docSnap.get("targetCalories"));
            setDailyCalories(docSnap.get("dailyCalories"));
            setTargetSteps(docSnap.get("goalSteps"));
            setDailySteps(docSnap.get("currentSteps"));
            console.log("get user data finished");
    };


    useEffect(() => {
        // Interval to update count
        getUserData();
        const interval = setInterval(() => {
            getUserData();
        }, 2000);

        // Subscribe for the focus Listener
        const unsubscribe = navigation.addListener('focus', () => {
            getUserData();
        });

        return () => {
            // Clear setInterval in case of screen unmount
            getUserData();
            clearTimeout(interval);
            // Unsubscribe for the focus Listener
            unsubscribe;
        };
    }, [navigation]);

    const signOutUser = async() => {
        console.log(authentication.currentUser.email);
        const result = await signOut(authentication);
        console.log("entered sign out functions");
    };

    const createTwoButtonAlert = () =>
        Alert.alert(
            "Sign out",
            "Would you like to sign out?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => {
                        signOutUser();
                        navigation.navigate('Welcome');} }
            ]
        );


    const combinedHandler = () => {
        createTwoButtonAlert();
    };
        
    return(
        <SafeAreaView style = {[styles.container, styling.menuContainer, {backgroundColor: '#f9fbfc'}]}>

            <CustomStatusBar />

            <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
            colors={['#3777D9', '#649eef']} locations={[0,0.9]} 
            style={[styling.dashboard, styles.boxShadow]}>
                
                <View style={{ width: '100%', paddingTop: 50, paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[styling.smallText, styling.profileName]}>{firstName}</Text>

                    <View style={{flexDirection: 'row',}}>
                        <Text style={{color: 'white', fontFamily: 'Righteous_400Regular', 
                        alignSelf: 'center', margin: 5, fontSize: 20,}}>Fit<Text style={[styles.blueText]}>Me</Text></Text>
                        <Image style={styling.logo} source={require('../assets/img/logo.png')}/>
                    </View>
                 
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
                    
                    <View style={{ flexDirection: 'row', width: '45%', margin: 15,}}>
                            <Image style={{ width: 40, height: 40, alignSelf: 'center', marginRight: 10,}} 
                            source={require('../assets/img/equality.png')} />
                            <View>
                                <Text style={[styling.smallText]}>Sex</Text>
                                <Text style={[styling.whiteText]}>{sex}</Text>
                            </View>
                    </View>
                    
                    <View style={{ flexDirection: 'row', width: '45%', margin: 15,}}>
                        <Image style={{ width: 40, height: 40, alignSelf: 'center', marginRight: 10,}} 
                        source={require('../assets/img/weight.png')} />
                        <View>
                            <Text style={[styling.smallText]}>Weight</Text>
                            <Text style={[styling.whiteText]}>{weight} KG</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
                    <View style={{ flexDirection: 'row', width: '45%', margin: 15,}}>
                        <Image style={{ width: 40, height: 40, alignSelf: 'center', marginRight: 10,}} 
                        source={require('../assets/img/runner.png')} />
                        <View>
                            <Text style={[styling.smallText]}>Daily Steps</Text>
                            <Text style={[styling.whiteText]}>{dailySteps}/{targetSteps}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: '45%', margin: 15,}}>
                        <Image style={{ width: 40, height: 40, alignSelf: 'center', marginRight: 10,}} 
                        source={require('../assets/img/diet.png')} />
                        <View>
                            <Text style={[styling.smallText]}>Daily Calories</Text>
                            <Text style={[styling.whiteText]}>{dailyCalories}/{targetCalories}</Text>
                        </View>
                    </View> 
                </View>
            </LinearGradient>

            <ScrollView vertical={true} showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false} alwaysBounceVertical={true} 
            style={{width: '95%',}}>

            <View style={[styling.menu,]}>
                <TouchableOpacity activeOpacity={.7} style={[styles.button, styles.login, styling.menuIcon,
                {backgroundColor: 'pink', borderColor: 'pink', fontSize: 20}]} 
                onPress={gymsNearMePressedHandler}>
                    <Text  style={[styles.buttonText, styling.blackText, {color: 'red'}]}>Coming Soon!</Text>
                    <Image style={[styling.menuIconImage, ]} source={require('../assets/img/location.png')}/>
                    <Text  style={[styles.buttonText]}>Gyms Near Me</Text>
                </TouchableOpacity>
                <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.login, 
                styling.menuIcon ]} 
                onPress={goalsAchievementsPressedHandler}>
                    <Image style={[styling.menuIconImage, ]} source={require('../assets/img/goal.png')}/>
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
                    <Image style={[styling.menuIconImage, ]} source={require('../assets/img/calories.png')}/>
                    <Text  style={[styles.buttonText, styling.blackText]}>Calorie Counter</Text>
                </TouchableOpacity>
            </View>

            <View style={[styling.menu,]}>
               <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.login, 
                styling.menuIcon ]} 
                onPress={stepCounterPressedHandler}>
                    <Image style={[styling.menuIconImage, ]} source={require('../assets/img/jogging.png')}/>
                    <Text  style={[styles.buttonText, styling.blackText]}>Step Counter</Text>
                </TouchableOpacity>
               <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.login, 
                styling.menuIcon ]} 
                onPress={workoutsPressedHandler}>
                    <Image style={[styling.menuIconImage, ]} source={require('../assets/img/barbell.png')}/>
                    <Text  style={[styles.buttonText, styling.blackText]}>Your Workouts</Text>
                </TouchableOpacity>
            </View>

            </ScrollView>
            
            <View style={[styling.footer]}>

                <TouchableOpacity onPress={profilePressedHandler} style={{ marginVertical: 17.5,}}>
                    <Image style={[styling.footerIcon, ]} source={require('../assets/img/avatar.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={combinedHandler}
                style={{ marginVertical: 17.5, backgroundColor: '#3777D9', borderRadius: 30, transform: [{translateY: -35}, {scale: 1.5}]}}>
                    <Image style={[styling.footerIcon, ]} source={require('../assets/img/log-out.png')} />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={settingsPressedHandler} style={{ marginVertical: 17.5,}}>
                    <Image style={[styling.footerIcon, ]} source={require('../assets/img/gear.png')} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        
    )
    
}

export const styling = StyleSheet.create({

    smallTitle: {
        fontSize: 25,
    },

    smallLogo: {
        width: 22.5,
        height: 22.5,
    },

    dashboard: { 
        padding: 3,
        width: '102%',
        marginTop: -10,
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,        
        backgroundColor: '#3777D9',
        marginBottom: 10,
    },

    profileName: {
        color: '#FFF',
        fontSize: 30,
        fontFamily: 'Righteous_400Regular',
    },

    menuContainer: {
        padding: 2,
    },

    menu: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        height: '24%',  
        marginVertical: 5,
    },

    logo: {
        width: 22.5,
        height: 22.5,
        alignSelf: 'center',
        transform: [{ rotate: '45deg'}, {translateX: -20}]
    },

    menuIcon: {
        width: '47.5%',
        height: '100%',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: .5,
        borderRadius: 10,
        borderColor: '#FFF',

        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowColor: '#3777D9',
        elevation: 10,
    },

    menuIconImage: {
        width: 60,
        height: 60, 
        margin: 10,
    },

    blackText: {
        fontFamily: 'Righteous_400Regular',
        color: '#424242',
    },  

    greyText: {
        color: '#424242',
        fontSize: 14,
        marginTop: 5,
    },

    whiteText: {
        color: '#FFF',
        fontFamily: 'Righteous_400Regular',
        fontSize: 17.5,
    },  

    smallText: {
        fontSize: 15,
        fontFamily: 'Righteous_400Regular',
        color: '#FFF',
    },  

    footer: {
        flexDirection: 'row', 
        backgroundColor: '#FFF', 
        width: '105%', 
        borderRadius: 10, 
        marginBottom: -3,
        justifyContent: 'space-around',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,

        shadowOffset: { width: 10, height: 10 },
        shadowColor: '#000',
        elevation: 15,
    },

    footerIcon: {
        width: 23,
        height: 23,
        alignSelf: 'center',
        margin: 10,
    },
})