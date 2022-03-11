import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard, TextInput, Platform} from "react-native";
import CardComponent from "../CustomComponents/CardComponent";
import { MaterialIcons } from '@expo/vector-icons';
import FoodForm from './FoodForm';
import DateTimePicker from '@react-native-community/datetimepicker';
import styleSheet from "react-native-web/dist/exports/StyleSheet";


export default function CalorieCounter( {navigation} ) {

    const [openModal, setOpenModal] = useState(false);

    const [goalCalories, setGoal] = useState(0);
    const [goalCalories1, setGoal1] = useState(0);

    const [remaining, setRemaining] = useState(0);

    const [totalCalories, setTotal] = useState(0);

    const [date, setDate] = useState(new Date());
    const [pickedMode, setPickedMode] = useState('date');
    const [showed, setShowed] = useState(false);
    const [dateText, setDateText] = useState('');

    const pickedHandler = (event, selected) => {
        const current = selected || date; //if selected = selected, if not it will be the initial date
        setShowed(Platform.OS === 'ios' || Platform.OS === 'android');
        setDate(current);

        let temp = new Date(current);
        let formatted = temp.getDate() + '/' + (temp.getMonth() + 1) + '/' + temp.getFullYear();
        setDateText(formatted);
    }

    const modeShow = (current) => {
        setShowed(true);
        setPickedMode(current);

    }

    const [breakfastFood, setBreakfastFood] = useState([
        {food: 'Eggs', calories: 58, quantity: 1, key: '1'},
        {food: 'Cheese', calories: 50, quantity: 1, key: '2'},
        
    ]);

    const [lunchFood, setLunchFood] = useState([
        {food: 'Apple', calories: 58, quantity: 1, key: '1'},
        {food: 'Cheese', calories: 50, quantity: 1, key: '2'},

    ]);

    const [dinnerFood, setDinnerFood] = useState([
        {food: 'Pasta', calories: 58, quantity: 1, key: '1'},
        {food: 'Cheese', calories: 50, quantity: 1, key: '2'},

    ]);

    const addFood = (foodName,foodType) => {
        foodName.key = Math.random().toString();
        if(foodType === 'Breakfast') {
            setBreakfastFood((current) => {
                return [foodName, ...current]
            })
        }
        if(foodType === 'Lunch') {
            setLunchFood((current) => {
                return [foodName, ...current]
            })
        }
        if(foodType === 'Dinner') {
            setDinnerFood((current) => {
                return [foodName, ...current]
            })
        }

        setOpenModal(false);
    }

    const getTotalCaloriesIntake = () => {
        let total = 0;
        console.log(breakfastFood)
        for (let i = 0; i < breakfastFood.length; i++) {
            total += (parseInt(breakfastFood[i].calories) * parseInt(breakfastFood[i].quantity));
            console.log(breakfastFood[i].calories);
        }

        for (let i = 0; i < lunchFood.length; i++) {
            total += (parseInt(lunchFood[i].calories) * parseInt(lunchFood[i].quantity));
            console.log(lunchFood[i].calories);
        }

        for (let i = 0; i < dinnerFood.length; i++) {
            total += (parseInt(dinnerFood[i].calories) * parseInt(dinnerFood[i].quantity));
            console.log(dinnerFood[i].calories);
        }
        setTotal(total);
    }

    const setDailyGoal = () => {
       setGoal1(goalCalories);
    }

    const getRemainingCalories = () => {
        setRemaining(goalCalories - totalCalories);

    }

    const clickHandler = () => {
        setDailyGoal();
        getRemainingCalories();
    }

    return(
        <View style = {styles.container}>
            <ScrollView>
                <Modal visible={openModal} animationType='slide'>
                    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                        <View style = {styles.modalText} >
                            <MaterialIcons
                                name = 'close'
                                size = {24}
                                style = {styles.modalCloseStyle}
                                onPress = {() => setOpenModal(false)}
                            />
                            <FoodForm addFood={addFood} getTotalCaloriesIntake={getTotalCaloriesIntake} getRemainingCalories={getRemainingCalories} />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <Text>Date: {dateText}</Text>
                <View>
                    <Button title='Pick Date' onPress={() => modeShow('date')}/>
                </View>

                {showed && (
                    <DateTimePicker
                    id = 'datePicker'
                    value = {date}
                    mode = {pickedMode}
                    is24Hour = {true}
                    display = 'default'
                    onChange = {pickedHandler}
                    />
                )}

                <Text>Total calories intake: {totalCalories}</Text>
                <Text>Set a Daily Goal: {goalCalories1}</Text>
                <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                    <View>
                        <TextInput
                            keyboardType = 'numeric'
                            style = {styles.input}
                            placeholder = 'e.g. 2500'
                            onChangeText = {(goal) => setGoal(goal)}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <Text>Remaining Calories: {remaining}</Text>

                <Button title='Submit' onPress = {clickHandler}/>

                <Text style = {styles.foodAddTitle}>Add Food and Drinks</Text>
                <MaterialIcons
                    name = 'add'
                    size = {24}
                    style = {styles.modalStyle}
                    onPress = {() => setOpenModal(true)}
                />
                <Text>Breakfast</Text>
                    { breakfastFood.map (item => (
                        <View key = {item.key}>
                            <TouchableOpacity onPress={() => navigation.navigate('FoodDetails', item)}>
                                <CardComponent>
                                    <Text style = {styles.item}>{item.food}</Text>
                                </CardComponent>
                            </TouchableOpacity>
                        </View>
                    ))}

                <Text>Lunch</Text>
                { lunchFood.map (item => (
                    <View key = {item.key}>
                        <TouchableOpacity onPress={() => navigation.navigate('FoodDetails', item)}>
                            <CardComponent>
                                <Text style = {styles.item}>{item.food}</Text>
                            </CardComponent>
                        </TouchableOpacity>
                    </View>
                ))}

                <Text>Dinner</Text>
                { dinnerFood.map (item => (
                    <View key = {item.key}>
                        <TouchableOpacity onPress={() => navigation.navigate('FoodDetails', item)}>
                            <CardComponent>
                                <Text style = {styles.item}>{item.food}</Text>
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
    },
    input: {
        borderWidth: 2,
        borderColor: 'grey',
        padding: 8,
        width: 200,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginHorizontal: 1,
        marginVertical: 6,

    }
})