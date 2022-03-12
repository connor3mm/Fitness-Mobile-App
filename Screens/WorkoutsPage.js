import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View, Image} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";



export default function Workouts({navigation}) {
    return(
        <SafeAreaView style={styles.container}>
            <View style = {{marginTop: 50, flex: 0.2, backgroundColor: 'yellow'}}>
                <Button title = "Home" onPress={() => navigation.navigate('Homepage')}/>
                <Text>Your Workouts Screensssss</Text>
            </View>

            <Text>Choose one of the bellow workputs to complete</Text>

            <View style = {styles.workoutMain}>
                
                <View style = {[styles.workoutBox,{backgroundColor: '#00BCD4',}]}>
                    <View>
                        <Text>Chest</Text>
                        <Text>Minutes</Text>
                        <Text>Num. of exercises</Text>
                    </View>
                        
                    <View>
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/chestWorkout.png')}/>
                    </View>
                </View>


                <View style = {[styles.workoutBox,{backgroundColor: 'red'}]}>
                    <View>
                        <Text>Core</Text>
                        <Text>Minutes</Text>
                        <Text>Num. of exercises</Text>
                    </View>
                    
                    <View>
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/coreWorkout.png')}/>
                    </View>
                </View>


                <View style = {[styles.workoutBox,{backgroundColor: 'green'}]}>
                    <View>
                        <Text>Legs</Text>
                        <Text>Minutes</Text>
                        <Text>Num. of exercises</Text>
                    </View>
                        <Image style = {styles.workoutIconImage} source={require('../assets/img/legsWorkout.png')}/>
                    <View>
                        
                    </View>
                </View>

            </View>
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
        justifyContent: 'space-evenly',
        alignItems:'center',
        //flexDirection:'row'
    },

    workoutBox:{
        width:'80%',
        height:'25%',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row', 
    },

    workoutIconImage:{
        width: 135,
        height: 135,
        margin: 20,
        marginLeft: 40
        //alignItems: "left"
    }
});