import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import { Righteous_400Regular} from '@expo-google-fonts/righteous';
import { useFonts } from 'expo-font';
import { caloriesStyles } from './CalorieCounterPage';
import { styling } from './Homepage';
import { BMIstyles } from './BMICalculatorPage';
import CustomStatusBar from '../CustomComponents/statusBar';


export default function Workouts({navigation}) {
    let [fontsLoaded, error] = useFonts ({
        Righteous_400Regular,
    });

    const homePressedHandler = () => navigation.navigate('Homepage');

    return(
        <SafeAreaView style={styles.container}>

        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#3777D9', '#649eef']} locations={[0,0.9]} style={[styling.dashboard, styles.boxShadow]}>

            <View style={{ width: '100%', paddingTop: 50, paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 20,}} onPress={homePressedHandler}>
                    <Image style={BMIstyles.homeButton} source={require('../assets/img/option.png')}/>
                    <Text style={{ color: '#FFF'}}>Menu</Text>
                </TouchableOpacity>

                <Text style={[styling.smallText, BMIstyles.sectionTitle]}>Workouts</Text>

                <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                    <Text style={{color: 'white', fontFamily: 'Righteous_400Regular', alignSelf: 'center', margin: 15, marginTop: 0, fontSize: 15,}}>
                        Fit<Text style={[styles.blueText]}>Me</Text>
                    </Text>
                </View>
            </View>
        </LinearGradient>

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