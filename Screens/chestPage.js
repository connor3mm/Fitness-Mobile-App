import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from "react-native";
import { Righteous_400Regular} from '@expo-google-fonts/righteous';
import { useFonts } from 'expo-font';


export default function chestPage({navigation}) {
    const [shouldShow1, setshouldShow1] = useState(true);
    const [shouldShow2, setshouldShow2] = useState(false);
    const [shouldShow3, setshouldShow3] = useState(false);
    const [shouldShow4, setshouldShow4] = useState(false);
    const [shouldShow5, setshouldShow5] = useState(false);
    const [shouldShow6, setshouldShow6] = useState(false);
    const [shouldShow7, setshouldShow7] = useState(false);
    const [btnTitle, setbtnTitle] = useState("►");
    const [numTimesClicked, setnumTimesClicked] = useState(1);

    function showNextExercise(){
        setnumTimesClicked(numTimesClicked +1);

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
                        <>
                        <Image style={styles.workoutIconImage} source={require('../assets/img/workoutsImages/chestW/benchPress.gif')} />
                        <View style={[styles.footer]}>
                        <View style={{ paddingVertical: 10, }}>
                            <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 25, textAlign: 'center'}}>
                            Bench Press
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
                            <View style={{alignSelf: 'center'}}>
                                <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 15, textAlign:'center'}}>
                                    Sets {"\n"}<Text style={{fontSize: 40, marginVertical: 5}}>5</Text>
                                </Text>
                            </View>

                            <View style={{ borderColor: '#FFF', borderWidth: 3, borderRadius: 20, margin:10, alignSelf: 'center'}}>                        
                            </View>

                            <View style={{alignSelf: 'center'}}>
                                <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 15, textAlign: 'center'}}>
                                    Reps {"\n"}<Text style={{fontSize: 40, marginVertical: 5}}>10</Text>
                                </Text>
                            </View>
                        </View>
                        </View>
                        
                        </>
                    ):null
                }

                {
                    shouldShow2 ? (
                        <>
                        <Image style={styles.workoutIconImage} source={require('../assets/img/workoutsImages/chestW/buttMachine.gif')} />
                        <View style={[styles.footer]}>
                        <View style={{ paddingVertical: 10, }}>
                            <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 25, textAlign: 'center'}}>
                            Butterfly Machine
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
                            <View style={{alignSelf: 'center'}}>
                                <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 15, textAlign:'center'}}>
                                    Sets {"\n"}<Text style={{fontSize: 40, marginVertical: 5}}>5</Text>
                                </Text>
                            </View>

                            <View style={{ borderColor: '#FFF', borderWidth: 3, borderRadius: 20, margin:10, alignSelf: 'center'}}>                        
                            </View>

                            <View style={{alignSelf: 'center'}}>
                                <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 15, textAlign: 'center'}}>
                                    Reps {"\n"}<Text style={{fontSize: 40, marginVertical: 5}}>10</Text>
                                </Text>
                            </View>
                        </View>
                        </View>
                        
                        </>
                    ):null
                }

                {
                    shouldShow3 ? (
                        <>
                        <Image style={styles.workoutIconImage} source={require('../assets/img/workoutsImages/chestW/cableFly.gif')} />
                        <View style={[styles.footer]}>
                        <View style={{ paddingVertical: 10, }}>
                            <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 25, textAlign: 'center'}}>
                            Cable Flys
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
                            <View style={{alignSelf: 'center'}}>
                                <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 15, textAlign:'center'}}>
                                    Sets {"\n"}<Text style={{fontSize: 40, marginVertical: 5}}>3</Text>
                                </Text>
                            </View>

                            <View style={{ borderColor: '#FFF', borderWidth: 3, borderRadius: 20, margin:10, alignSelf: 'center'}}>                        
                            </View>

                            <View style={{alignSelf: 'center'}}>
                                <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 15, textAlign: 'center'}}>
                                    Reps {"\n"}<Text style={{fontSize: 40, marginVertical: 5}}>10</Text>
                                </Text>
                            </View>
                        </View>
                        </View>
                        
                        </>
                    ):null
                }

                {
                    shouldShow4 ? (
                        <>
                        <Image style={styles.workoutIconImage} source={require('../assets/img/workoutsImages/chestW/chestDips.gif')} />
                        <View style={[styles.footer]}>
                        <View style={{ paddingVertical: 10, }}>
                            <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 25, textAlign: 'center'}}>
                            Chest Dip
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
                            <View style={{alignSelf: 'center'}}>
                                <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 15, textAlign:'center'}}>
                                    Sets {"\n"}<Text style={{fontSize: 40, marginVertical: 5}}>4</Text>
                                </Text>
                            </View>

                            <View style={{ borderColor: '#FFF', borderWidth: 3, borderRadius: 20, margin:10, alignSelf: 'center'}}>                        
                            </View>

                            <View style={{alignSelf: 'center'}}>
                                <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 15, textAlign: 'center'}}>
                                    Reps {"\n"}<Text style={{fontSize: 40, marginVertical: 5}}>8</Text>
                                </Text>
                            </View>
                        </View>
                        </View>
                        
                        </>
                    ):null
                }

                {
                    shouldShow5 ? (
                        <>
                        <Image style={styles.workoutIconImage} source={require('../assets/img/workoutsImages/chestW/DMCP.gif')} />
                        <View style={[styles.footer]}>
                        <View style={{ paddingVertical: 10, }}>
                            <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 25, textAlign: 'center'}}>
                            Decline Machine Chest Press
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
                            <View style={{alignSelf: 'center'}}>
                                <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 15, textAlign:'center'}}>
                                    Sets {"\n"}<Text style={{fontSize: 40, marginVertical: 5}}>3</Text>
                                </Text>
                            </View>

                            <View style={{ borderColor: '#FFF', borderWidth: 3, borderRadius: 20, margin:10, alignSelf: 'center'}}>                        
                            </View>

                            <View style={{alignSelf: 'center'}}>
                                <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 15, textAlign: 'center'}}>
                                    Reps {"\n"}<Text style={{fontSize: 40, marginVertical: 5}}>10</Text>
                                </Text>
                            </View>
                        </View>
                        </View>
                        
                        </>
                    ):null
                }


                {
                    shouldShow6 ? (
                        <>
                        <Image style={styles.workoutIconImage} source={require('../assets/img/workoutsImages/chestW/DBAP.gif')} />
                        <View style={[styles.footer]}>
                        <View style={{ paddingVertical: 10, }}>
                            <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 25, textAlign: 'center'}}>
                            Dumbbell Bent Arm Pullover
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
                            <View style={{alignSelf: 'center'}}>
                                <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 15, textAlign:'center'}}>
                                    Sets {"\n"}<Text style={{fontSize: 40, marginVertical: 5}}>3</Text>
                                </Text>
                            </View>

                            <View style={{ borderColor: '#FFF', borderWidth: 3, borderRadius: 20, margin:10, alignSelf: 'center'}}>                        
                            </View>

                            <View style={{alignSelf: 'center'}}>
                                <Text style={{color:'#FFF', fontFamily:'Righteous_400Regular', fontSize: 15, textAlign: 'center'}}>
                                    Reps {"\n"}<Text style={{fontSize: 40, marginVertical: 5}}>10</Text>
                                </Text>
                            </View>
                        </View>
                        </View>
                        
                        </>
                    ):null
                }

                {
                    shouldShow7 ? (
                        <Text style={styles.complete}>Workout Complete!</Text>
                    ):null
                }
            </View>

            
            <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity style={[styles.button, styles.boxShadow, styles.btnNext]} onPress={showNextExercise}>
                    <Text style={{fontFamily: 'Righteous_400Regular'}}>{btnTitle}</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>

    )
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF',
    },

    footer: {
        width: '97.5%',
        alignSelf: 'center',
        margin: 10,
        borderRadius: 15,
        backgroundColor: '#3777D9',
        padding: 15,
        flex: 4,
        justifyContent: 'space-around',

         // add box shadow to iOS devices
         shadowOffset: {width: 6, height: 6},
         shadowOpacity: 0.5,
         shadowRadius: 1,
         // add box shadows to android devices
         elevation: 6,
         shadowColor: '#000',
    },

    workoutIconImage: {
        flex: 10,
        width: 420,
    },

    ImageContainer:{
        flex: 1,
        width: '100%',
    },

    button:{
        alignItems: 'center',
        padding: 15,
        width: '70%',
        borderWidth: .5,
        borderRadius: 5,
        backgroundColor: '#3777D9',
        borderColor: '#3777D9',
        shadowColor: 'black',
    },

    btnNext:{
        justifyContent:'flex-end', 
        backgroundColor: '#FFF',
        width: '47.5%',
        margin: 5,
        borderRadius: 15,
        // add box shadow to iOS devices
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        // add box shadows to android devices
        elevation: 10,
        shadowColor: '#000',
        borderWidth: 1,
        borderColor: '#FFF'
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
        fontSize: 35
    },

});