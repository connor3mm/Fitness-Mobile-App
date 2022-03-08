import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard, TextInput} from "react-native";
import CardComponent from "../CustomComponents/CardComponent";
import { MaterialIcons } from '@expo/vector-icons';
import FoodForm from './FoodForm';
import styleSheet from "react-native-web/dist/exports/StyleSheet";



export default function CalorieCounter( {navigation} ) {

    const [openModal, setOpenModal] = useState(false);

    const [goalCalories, setGoal] = useState(0);

    const [breakfastFood, setBreakfastFood] = useState([
        {foodName: 'Eggs', calories: 58, quantity: 1, key: '1'},
        {foodName: 'Cheese', calories: 50, quantity: 1, key: '2'},
        
    ]);

    const [totalCalories, setTotal] = useState(0);

    const addFood = (food) => {
        food.key = Math.random().toString();
        setBreakfastFood((current) => {
            return [food, ...current]
        })
        setOpenModal(false);
    }

    const getTotalCaloriesIntake = () => {
        let total = 0;
        console.log(breakfastFood)
        for (let i = 0; i < breakfastFood.length; i++) {
            total += (parseInt(breakfastFood[i].calories) * parseInt(breakfastFood[i].quantity));
            console.log(breakfastFood[i].calories);
        }
        setTotal(total);
        console.log(total);

    }

    return(
        <View style = {styles.container}>

            <Modal visible={openModal} animationType='slide'>
                <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                    <View style = {styles.modalText} >
                        <MaterialIcons
                            name = 'close'
                            size = {24}
                            style = {styles.modalCloseStyle}
                            onPress = {() => setOpenModal(false)}
                        />
                        <FoodForm addFood={addFood} getTotalCaloriesIntake={getTotalCaloriesIntake}/>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Text>Total calories intake: {totalCalories}</Text>
            <TextInput>

            </TextInput>
            <Text style = {styles.foodAddTitle}>Add Breakfast</Text>
            <MaterialIcons
                name = 'add'
                size = {24}
                style = {styles.modalStyle}
                onPress = {() => setOpenModal(true)}
            />

            <ScrollView>
                { breakfastFood.map (item => (
                    <View key = {item.key}>
                        <TouchableOpacity onPress={() => navigation.navigate('FoodDetails', item)}>
                            <CardComponent>
                                <Text style = {styles.item}>{item.foodName}</Text>
                            </CardComponent>
                        </TouchableOpacity>
                    </View>
                    ))}
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       padding: 20,
    },
    item: {
        fontSize: 16.5,
        color: '#424242',

    },
    modalText: {
        flex: 1,
    },
    modalStyle: {
        marginBottom: 10,
        borderWidth: 2,
        borderStyle: 'dotted',
        borderColor: 'grey',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    foodAddTitle: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        fontSize: 18,
       fontWeight: 'bold',
    },
    modalCloseStyle: {
        marginTop: 35,
        marginBottom: 0,
        borderWidth: 2,
        borderStyle: 'dotted',
        borderColor: 'grey',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    }
})