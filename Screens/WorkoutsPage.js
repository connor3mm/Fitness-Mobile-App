import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity,ScrollView} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import { Righteous_400Regular} from '@expo-google-fonts/righteous';
import { useFonts } from 'expo-font';





export default function Workouts({navigation}) {
    let [fontsLoaded, error] = useFonts ({
        Righteous_400Regular,
    });


    return(
        <SafeAreaView style={styles.container}>
            <View style = {{marginTop: 50, flexDirection: "row", justifyContent:"space-evenly"}}>
                <Button title = "Home" onPress={() => navigation.navigate('Homepage')} style = {styles.Button}/>
            </View>

            

            <ScrollView style = {styles.workoutMain}> 

                <Text style = {{fontFamily: 'Righteous_400Regular',marginLeft:'10%', marginRight:'10%', marginTop:'5%'}}>Choose one of the bellow workputs to complete</Text>

                
                <TouchableOpacity style = {[styles.workoutBox,{backgroundColor: '#00BCD4',}]}>
                      
                    <View style = {styles.workoutText}>
                        <Text style = {styles.workoutSingleText}>Chest</Text>
                        <Text style = {styles.workoutSingleText}>Minutes</Text>
                        <Text style = {styles.workoutSingleText}>Num. of exercises: </Text>
                    </View>
                        
                    <View>
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/chestWorkout.png')}/>
                    </View>
                    
                </TouchableOpacity>
                

                <TouchableOpacity style = {[styles.workoutBox,{backgroundColor: 'red'}]}>
                    <View style = {styles.workoutText}>
                        <Text style = {styles.workoutSingleText}>Core</Text>
                        <Text style = {styles.workoutSingleText}>Minutes</Text>
                        <Text style = {styles.workoutSingleText}>Num. of exercises: </Text>
                    </View>
                    
                    <View>
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/coreWorkout.png')}/>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style = {[styles.workoutBox,{backgroundColor: 'green'}]}>
                    <View style = {styles.workoutText}>
                        <Text style = {styles.workoutSingleText}>Legs</Text>
                        <Text style = {styles.workoutSingleText}>Minutes</Text>
                        <Text style = {styles.workoutSingleText}>Num. of exercises: </Text>
                    </View>
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/legsWorkout.png')}/>
                </TouchableOpacity>


                <TouchableOpacity style = {[styles.workoutBox,{backgroundColor: 'green'}]}>
                    <View style = {styles.workoutText}>
                        <Text style = {styles.workoutSingleText}>Back</Text>
                        <Text style = {styles.workoutSingleText}>Minutes</Text>
                        <Text style = {styles.workoutSingleText}>Num. of exercises: </Text>
                    </View>
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/legsWorkout.png')}/>
                </TouchableOpacity>


                <TouchableOpacity style = {[styles.workoutBox,{backgroundColor: 'green'}]} onPress={() => navigation.navigate('atHomeWorkoutPage')}>
                    <View style = {styles.workoutText}>
                        <Text style = {styles.workoutSingleText}>Home</Text>
                        <Text style = {styles.workoutSingleText}>Minutes</Text>
                        <Text style = {styles.workoutSingleText}>Num. of exercises: </Text>
                    </View>
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/legsWorkout.png')}/>
                </TouchableOpacity>

            </ScrollView>
            
        </SafeAreaView>

    )
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        //alignItems: 'center',
        //justifyContent: 'flex-end'   //tova promenq na main axisa
    },

    workoutMain:{
        flex: 1,
        //justifyContent: 'space-evenly',
        //alignItems:'center',
        //width:"95%",
    },

    workoutBox:{
        width:'80%',
        height:'25%',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row', 
        flex:1,
        marginTop:'10%',
        marginLeft:'10%',
        marginRight:'10%',
    },

    workoutIconImage:{
        width: 135,
        height: 135,
        margin: 20,
        marginLeft: 40,
    },

    workoutText:{
        marginLeft: 15,
        marginTop: 30,
    },

    workoutSingleText:{
        padding: 5,
        fontFamily: 'Righteous_400Regular',
    },

    workoutIconGif:{
        width: 200,
        height: 200
    }


});