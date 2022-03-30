import React, { useState } from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity,ScrollView} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import { Righteous_400Regular} from '@expo-google-fonts/righteous';
import { useFonts } from 'expo-font';


export default function bicepsCorePage({navigation}) {

    const [shouldShow1, setshouldShow1] = useState(true)
    const [shouldShow2, setshouldShow2] = useState(false)
    const [shouldShow3, setshouldShow3] = useState(false)
    const [shouldShow4, setshouldShow4] = useState(false)
    const [shouldShow5, setshouldShow5] = useState(false)
    const [shouldShow6, setshouldShow6] = useState(false)
    const [shouldShow7, setshouldShow7] = useState(false)
    const [btnTitle, setbtnTitle] = useState("Next")

    const [numTimesClicked, setnumTimesClicked] = useState(1)




    function showNextExercise(){
        setnumTimesClicked(numTimesClicked +1)

        switch(numTimesClicked){

            case 1: setshouldShow1(!shouldShow1);
                setshouldShow2(!shouldShow2);break;

            case 2: setshouldShow2(!shouldShow2);
                setshouldShow3(!shouldShow3); break;

            case 3: setshouldShow3(!shouldShow3);
                setshouldShow4(!shouldShow4); break;

            case 4: setshouldShow4(!shouldShow4);
                setshouldShow5(!shouldShow5); break;

            case 5: setshouldShow5(!shouldShow5);
                setshouldShow6(!shouldShow6); break;

            case 6: setshouldShow6(!shouldShow6);
                setshouldShow7(!shouldShow7);
                setbtnTitle("Complete"); break;
        }

        if(btnTitle=="Complete") navigation.navigate('WorkoutsPage');

    }

    return(
        <SafeAreaView style={styles.container}>


            <TouchableOpacity onPress={() => navigation.navigate('WorkoutsPage')}
                              style={{ flexDirection: 'row', alignSelf: 'flex-start', margin: 20,}}>
                <Image style={{ width: 25, height: 25, marginVertical: 30, marginRight: 10,}}
                       source={require('../assets/img/angle-left.png')}/>
                <Text style={{ textDecorationLine: 'underline', alignSelf: 'center',
                    fontFamily: 'Righteous_400Regular', color: '#424242', fontSize: 16.5,}}>
                    Workouts
                </Text>
            </TouchableOpacity>

            <View style={styles.ImageContainer}>

                {
                    shouldShow1 ? (
                        <><Text style={styles.exerText}>Crunches</Text>
                            <Image style={styles.workoutIconImage} source={require('../assets/img/workoutsImages/biceps+core/Crunches.gif')} />
                            <Text style={styles.repsText}>5 sets x 15 reps</Text>
                        </>
                    ):null
                }

                {
                    shouldShow2 ? (
                        <><Text style={styles.exerText}>Decline Crunches</Text>
                            <Image style={styles.workoutIconImage} source={require('../assets/img/workoutsImages/biceps+core/declineCrunches.gif')} />
                            <Text style={styles.repsText}>5 sets x 10 reps</Text>
                        </>
                    ):null
                }

                {
                    shouldShow3 ? (
                        <><Text style={styles.exerText}>Stationary Abdominal Draw In</Text>
                            <Image style={styles.workoutIconImage} source={require('../assets/img/workoutsImages/biceps+core/SAD.gif')} />
                            <Text style={styles.repsText}>60 seconds</Text>
                        </>
                    ):null
                }

                {
                    shouldShow4 ? (
                        <><Text style={styles.exerText}>Incline Dumbbell Curls</Text>
                            <Image style={styles.workoutIconImage} source={require('../assets/img/workoutsImages/biceps+core/IDC.gif')} />
                            <Text style={styles.repsText}>5 sets x 10 reps</Text>
                        </>
                    ):null
                }

                {
                    shouldShow5 ? (
                        <><Text style={styles.exerText}>Seated Dumbbell Curls</Text>
                            <Image style={styles.workoutIconImage} source={require('../assets/img/workoutsImages/biceps+core/SDC.gif')} />
                            <Text style={styles.repsText}>5 sets x 10 reps</Text>
                        </>
                    ):null
                }


                {
                    shouldShow6 ? (
                        <><Text style={styles.exerText}>Wide Grip Standing Barbell Curl</Text>
                            <Image style={styles.workoutIconImage} source={require('../assets/img/workoutsImages/biceps+core/WGSBC.gif')} />
                            <Text style={styles.repsText}>5 sets x 10 reps</Text>
                        </>
                    ):null
                }

                {
                    shouldShow7 ? (
                        <Text style={styles.complete}>Workout Complete!</Text>
                    ):null
                }
            </View>

            <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.btnNext,]}
                               onPress={showNextExercise}>
                <Text style={[styles.buttonText,]}>{btnTitle}</Text>
            </TouchableOpacity>

        </SafeAreaView>

    )
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
    },

    ImageContainer:{
        flex: 1,
        justifyContent:"center",
        alignItems: 'center',
    },

    button:{
        alignItems: 'center',
        padding: 15,
        width: '70%',
        borderWidth: .5,
        borderRadius: 5,
        backgroundColor: '#4356FF',
        borderColor: '#4356FF',
        shadowColor: 'black',
    },

    btnNext:{
        justifyContent:'flex-end',
        marginBottom:'5%'
    },

    btnBack:{
        marginTop:50
    },

    boxShadow: {
        // add box shadow to iOS devices
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 1,
        // add box shadows to android devices
        elevation: 1,
    },


    buttonText:{
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Righteous_400Regular',
    },

    complete:{
        fontFamily: 'Righteous_400Regular',
        textAlign: 'center',
        fontSize: 50
    },

    exerText:{
        fontFamily: 'Righteous_400Regular',
        textAlign: 'center',
        fontSize: 35,
        marginBottom: 120
    },

    repsText: {
        fontFamily: 'Righteous_400Regular',
        textAlign: 'center',
        fontSize: 20
    },

});
