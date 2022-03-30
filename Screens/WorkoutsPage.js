import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ImageBackground} from "react-native";
import { Righteous_400Regular} from '@expo-google-fonts/righteous';
import { useFonts } from 'expo-font';
import { caloriesStyles } from './CalorieCounterPage';
import { setttingStyles } from './SettingsPage';


export default function Workouts({navigation}) {
    let [fontsLoaded, error] = useFonts ({
        Righteous_400Regular,
    });

    const homePressedHandler = () => navigation.navigate('Homepage');

    return(
        <SafeAreaView style={workoutStyles.container}>
            
            <TouchableOpacity onPress={homePressedHandler} style={{ flexDirection: 'row',}}>
                <Image style={{ width: 30, height: 30, marginVertical: 30, marginRight: 10,}} 
                source={require('../assets/img/angle-left.png')}/>

                <Text style={{ textDecorationLine: 'underline', alignSelf: 'center', 
                fontFamily: 'Righteous_400Regular', color: '#424242', fontSize: 16.5,}}>
                    Dashboard
                </Text>
            </TouchableOpacity>

            <Text style={[caloriesStyles.caloriesItemsText, setttingStyles.title]}>Workouts</Text>  


            <ScrollView showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false} alwaysBounceVertical={true} style={workoutStyles.workoutMain}>

                <View style={[workoutStyles.infoBoard,]}> 
                    <Image style={{ opacity: .25, width: 200, height: 250,position: 'absolute', top: -10, left: -49,}} 
                    source={require('../assets/img/muscle.png')}/>
                    
                    <Text style={{ color: 'white', fontFamily: 'Righteous_400Regular', lineHeight: 40, fontSize: 15}}>
                        Welcome to the FitMe workout page! {"\n"}
                        Find a variety of workouts GIFs that demo the exercise!{"\n"}
                        Get the lean, muscular physique you are after!
                    </Text>
                </View>

                <TouchableOpacity style = {[workoutStyles.workoutBox]} onPress={() => navigation.navigate('bicepsCorePage')}>
                    <Text style = {workoutStyles.workoutText}>Biceps{"\n"}&{"\n"}Core</Text>
                    <Image style = {{height: 135, width: 220}} source={require('../assets/img/workoutsImages/icons/icon_bicepsCore.png')}/>
                </TouchableOpacity>
                
                <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', justifyContent:'space-between'}}>
                    <TouchableOpacity style = {[workoutStyles.workoutBox, {width: '48.5%'}]} onPress={() => navigation.navigate('tricepsPage')}>
                        <Text style = {workoutStyles.workoutText}>Tric{"\n"}eps</Text>
                        <Image style = {workoutStyles.workoutIconImage} source={require('../assets/img/workoutsImages/icons/icon_triceps2.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style = {[workoutStyles.workoutBox, {width: '48.5%'}]} onPress={() => navigation.navigate('chestPage')}>
                        <Text style = {workoutStyles.workoutText}>Chest</Text>
                        <Image style = {workoutStyles.workoutIconImage} source={require('../assets/img/workoutsImages/icons/icon_chest.png')}/>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', justifyContent:'space-between'}}>
                    <TouchableOpacity style = {[workoutStyles.workoutBox, {width: '48.5%'}]} onPress={() => navigation.navigate('backPage')}>
                        <Text style = {workoutStyles.workoutText}>Ba{"\n"}ck</Text>
                        <Image style = {workoutStyles.workoutIconImage} source={require('../assets/img/workoutsImages/icons/icon_back.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style = {[workoutStyles.workoutBox, {width: '48.5%'}]} onPress={() => navigation.navigate('legsPage')}>
                        <Text style = {workoutStyles.workoutText}>Legs</Text>
                        <Image style = {workoutStyles.workoutIconImage} source={require('../assets/img/workoutsImages/icons/icon_legs.png')}/>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
            
        </SafeAreaView>

    )
}


export const workoutStyles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fbfc',
        height: '100%',
        padding: 15,
    },

    workoutMain:{
        flex: 3,
        width: '97.5%'
    },

    infoBoard: { 
        backgroundColor: '#3777D9',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 17.5,

        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowColor: '#000',
        elevation: 10,
        flex: 1,
    },

    workoutBox:{
        borderWidth: 1,
        borderColor: '#FFF',
        borderRadius: 10,
        flexDirection: 'row', 
        padding: 10,        
        justifyContent:"flex-end",
        alignItems:"center",
        backgroundColor: '#FFF',

        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowColor: '#3777D9',
        elevation: 10,
        marginVertical: 5,
    },

    workoutIconImage:{
        width: 105,
        height: 105,
        marginLeft: 40,
    },

    workoutText:{
        fontFamily: 'Righteous_400Regular',
        fontSize: 45,
        color:  '#B3B3B3',
        opacity: .2,
        textAlign: 'left',
        position: 'absolute',
        left: -2.5,
        top: -10,
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

    btnBack:{
        marginTop:50,
        width:"100%"
    },

    blueText: {
        color: '#3777D9',
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