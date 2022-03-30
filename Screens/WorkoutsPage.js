import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity,ScrollView, StatusBar} from "react-native";
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
        <SafeAreaView style={styles.container}>

            <StatusBar backgroundColor={'#f9fbfc'} barStyle='dark-content' />

            <TouchableOpacity onPress={homePressedHandler} style={{ flexDirection: 'row',}}>
                <Image style={{ width: 30, height: 30, marginVertical: 30, marginRight: 10,}}
                       source={require('../assets/img/angle-left.png')}/>

                <Text style={{ textDecorationLine: 'underline', alignSelf: 'center',
                    fontFamily: 'Righteous_400Regular', color: '#424242', fontSize: 16.5,}}>
                    Dashboard
                </Text>
            </TouchableOpacity>

            <Text style={[caloriesStyles.caloriesItemsText, setttingStyles.title,styles.alignText ]}>Workouts</Text>

            <ScrollView showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false} alwaysBounceVertical={true} style={styles.workoutMain}>

                <View style={[styles.infoBoard,]}>
                    <Image style={{ opacity: .25, width: 200, height: 250,position: 'absolute', top: -10, left: -49,}}
                           source={require('../assets/img/muscle.png')}/>

                    <Text style={{ color: 'white', fontFamily: 'Righteous_400Regular', lineHeight: 40, fontSize: 15}}>
                        Welcome to the FitMe workout page! {"\n"}
                        Find a variety of workouts GIFs that demo the exercise!{"\n"}
                        Get the lean, muscular physique you are after!
                    </Text>
                </View>

                <TouchableOpacity style = {[styles.workoutBox,]} onPress={() => navigation.navigate('bicepsCorePage')}>

                    <Text style = {styles.workoutText}>Biceps {"\n"}&{"\n"}Core</Text>
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
        backgroundColor: '#f9fbfc',
        padding: 20,
    },

    workoutMain:{
        flex: 1,
    },

    workoutBox:{
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        flex:1,
        marginTop:'7.5%',
        marginLeft:'2.5%',
        marginRight:'2.5%',
        justifyContent:"space-around",
        alignItems:"center",
        backgroundColor: '#fff',
        borderColor: '#FFF',
        elevation: 5,
        shadowColor: '#424242',
        shadowOffset: {width: 5, height: 5}
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

    alignText:{
        textAlign: 'center',
    },

});
