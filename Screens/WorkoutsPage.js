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
           
            <TouchableOpacity  activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.btnBack,]} 
            onPress={() => navigation.navigate('Homepage')}>
                <Text style={{fontFamily: 'Righteous_400Regular',color:"white"}}>Back to menu</Text>
            </TouchableOpacity>

            

            <ScrollView style = {styles.workoutMain}> 
                
                <TouchableOpacity style = {[styles.workoutBox,]} onPress={() => navigation.navigate('bicepsCorePage')}>
                    
                        <Text style = {styles.workoutText}>Biceps {"\n"}and{"\n"}Core</Text>
                        <Image style = {{height:135, width: 180,}} source={require('../assets/img/workoutsImages/icons/icon_bicepsCore.png')}/>
                    
                </TouchableOpacity>
                

                <TouchableOpacity style = {[styles.workoutBox,]} onPress={() => navigation.navigate('tricepsPage')}>
                   
                        <Text style = {styles.workoutText}>Triceps</Text>
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/workoutsImages/icons/icon_triceps2.png')}/>
                    
                </TouchableOpacity>


                <TouchableOpacity style = {[styles.workoutBox,]} onPress={() => navigation.navigate('chestPage')}>

                        <Text style = {styles.workoutText}>Chest</Text>
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/workoutsImages/icons/icon_chest.png')}/>

                </TouchableOpacity>


                <TouchableOpacity style = {[styles.workoutBox,]} onPress={() => navigation.navigate('backPage')}>

                        <Text style = {styles.workoutText}>Back</Text>
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/workoutsImages/icons/icon_back.png')}/>
                
                </TouchableOpacity>


                <TouchableOpacity style = {[styles.workoutBox,]} onPress={() => navigation.navigate('legsPage')}>

                        <Text style = {styles.workoutText}>Legs</Text>
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/workoutsImages/icons/icon_legs.png')}/>
               
                </TouchableOpacity>
            </ScrollView>
            
        </SafeAreaView>

    )
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    workoutMain:{
        flex: 1,
    },

    workoutBox:{
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row', 
        flex:1,
        marginTop:'10%',
        marginLeft:'10%',
        marginRight:'10%',
        justifyContent:"space-around",
        alignItems:"center",
        backgroundColor: '#fff'
    },

    workoutIconImage:{
        width: 135,
        height: 135,
        marginLeft: 40,
        //backgroundColor:"black",
    },

    workoutText:{
        //padding: 5,
        fontFamily: 'Righteous_400Regular',
        fontSize:20,
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

    btnBack:{
        marginTop:50,
        width:"100%"
    },

    boxShadow: {
        // add box shadow to iOS devices
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 1,
        // add box shadows to android devices
        elevation: 1,
    },


});