import React, { useState } from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity,ScrollView} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import { Righteous_400Regular} from '@expo-google-fonts/righteous';
import { useFonts } from 'expo-font';


export default function atHomeWorkoutPage({navigation}) {

    const [shouldShow, setshouldShow] = useState(true)
    const [shouldShow1, setshouldShow1] = useState(false)
    const [shouldShow2, setshouldShow2] = useState(false)
    const [shouldShow3, setshouldShow3] = useState(false)
    const [shouldShow4, setshouldShow4] = useState(false)
    const [shouldShow5, setshouldShow5] = useState(false)
    const [shouldShow6, setshouldShow6] = useState(false)
    const [btnTitle, setbtnTitle] = useState("Next")

    const [numTimesClicked, setnumTimesClicked] = useState(1)


    function showNextExercise(){
        setnumTimesClicked(numTimesClicked +1)
        console.log(numTimesClicked);
        switch(numTimesClicked){
            case 1: setshouldShow(!shouldShow);
                    setshouldShow1(!shouldShow1) ;break;

            case 2: setshouldShow1(!shouldShow1);
                    setshouldShow2(!shouldShow2);break;

            case 3: setshouldShow2(!shouldShow2);
                    setshouldShow3(!shouldShow3); break;

            case 4: setshouldShow3(!shouldShow3);
                    setshouldShow4(!shouldShow4); break;

            case 5: setshouldShow4(!shouldShow4);
                    setshouldShow5(!shouldShow5); break;

            case 6: setshouldShow5(!shouldShow5); 
                    setshouldShow6(!shouldShow6);
                    setbtnTitle("Complete"); break;
        }

        if(btnTitle=="Complete") navigation.navigate('WorkoutsPage');
            
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style = {{marginTop: 50,}}>
                <Button title = "Back" onPress={() => navigation.navigate('WorkoutsPage')}/>
            </View>
            
            <View style={styles.ImageContainer}>
                {
                    shouldShow ? (
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/workoutsImages/atHome/burpee_orig.gif')}/>
                    ):null
                }

                {
                    shouldShow1 ? (
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/workoutsImages/atHome/jump-squats_orig.gif')}/>
                    ):null
                }

                {
                    shouldShow2 ? (
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/workoutsImages/atHome/jumping-lunges_orig.gif')}/>
                    ):null
                }

                {
                    shouldShow3 ? (
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/workoutsImages/atHome/leg-raises_orig.gif')}/>
                    ):null
                }

                {
                    shouldShow4 ? (
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/workoutsImages/atHome/push-up_orig.gif')}/>
                    ):null
                }

                {
                    shouldShow5 ? (
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/workoutsImages/atHome/sit-up_orig.gif')}/>
                    ):null
                }

                {
                    shouldShow6 ? (
                        <Text>Workout Complete!</Text>
                    ):null
                }
            </View>



            <View style ={{flex:1,justifyContent:'flex-end', marginBottom:'5%'}}>
                <Button title = {btnTitle} style = {{justifyContent:'flex-end'}} onPress={showNextExercise}/>
            </View>
            
            
        </SafeAreaView>

    )
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        //justifyContent: 'center'   //tova promenq na main axisa
    },

    ImageContainer:{
        flex: 1,
        justifyContent:"center",
    },

    workoutIconImage:{
        height:200,
        width:300
    },

});