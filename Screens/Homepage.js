import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";

export default function Home({navigation}) {

    const bmiPressedHandler = () => {
        navigation.navigate('BMICalculatorPage');
    }

    const gymsNearMePressedHandler = () => {
        navigation.navigate('GymsNearMePage');
    }

    const goalsAchievementsPressedHandler = () => {
        navigation.navigate('GoalsAchievementsPage');
    }

    const stepCounterPressedHandler = () => {
        navigation.navigate('StepCounterPage');
    }

    const workoutsPressedHandler = () => {
        navigation.navigate('WorkoutsPage');
    }

    const calorieCounterPressedHandler = () => {
        navigation.navigate('CalorieCounterPage');
    }


    return(
        <View style = {StyleSheet.container}>
            <Text> Hello Screen</Text>
            <View style={{ width: '100%', borderColor: 'orange', }}>
                <Button color="#4356FF" title="Gyms Near Me" onPress={gymsNearMePressedHandler}/>
            </View>
            <View style={{ width: '100%', borderColor: 'orange', }}>
                <Button color="#4356FF" title="BMI Calculator" onPress={bmiPressedHandler}/>
            </View>
            <View style={{ width: '100%', borderColor: 'orange', }}>
                <Button color="#4356FF" title="Goals & Achievements" onPress={goalsAchievementsPressedHandler}/>
            </View>
            <View style={{ width: '100%', borderColor: 'orange', }}>
                <Button color="#4356FF" title="Step Counter" onPress={stepCounterPressedHandler}/>
            </View>
            <View style={{ width: '100%', borderColor: 'orange', }}>
                <Button color="#4356FF" title="Your Workouts" onPress={workoutsPressedHandler}/>
            </View>
            <View style={{ width: '100%', borderColor: 'orange', }}>
                <Button color="#4356FF" title="Calorie Counter" onPress={calorieCounterPressedHandler}/>
            </View>

        </View>

    )
}