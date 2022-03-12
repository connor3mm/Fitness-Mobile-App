import React, {useState} from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    Platform,
    SafeAreaView, Image
} from "react-native";
import CardComponent from "../CustomComponents/CardComponent";
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialIcons} from '@expo/vector-icons';
import FoodForm from './FoodForm';
import DateTimePicker from '@react-native-community/datetimepicker';
import {styling} from './Homepage';
import {styles} from "./Welcomepage";
import styleSheet from "react-native-web/dist/exports/StyleSheet";


export default function CalorieCounter({navigation}) {
    //to set the modal open or close
    const [openModal, setOpenModal] = useState(false);

    //goal calories values
    const [goalCalories, setGoal] = useState(0);
    const [goalCalories1, setGoal1] = useState(0);

    //values for remaining calories
    const [remaining, setRemaining] = useState(0);

    //values for total/for each section calories
    const [totalCalories, setTotal] = useState(0);
    const [totalCaloriesBreakfast, setTotalBreakfastCalories] = useState('');
    const [totalCaloriesLunch, setTotalLunchCalories] = useState('');
    const [totalCaloriesDinner, setTotalDinnerCalories] = useState('');

    //values for date picker
    const [date, setDate] = useState(new Date());
    const [pickedMode, setPickedMode] = useState('date');
    const [showed, setShowed] = useState(false);
    const [dateText, setDateText] = useState('');

    //array for breakfast foods
    const [breakfastFood, setBreakfastFood] = useState([
        {Food: 'Eggs', Calories: 58, Quantity: 1, key: '1'},
        {Food: 'Cheese', Calories: 50, Quantity: 1, key: '2'},

    ]);

    //array for lunch foods
    const [lunchFood, setLunchFood] = useState([
        {Food: 'Apple', Calories: 58, Quantity: 1, key: '1'},
        {Food: 'Cheese', Calories: 50, Quantity: 1, key: '2'},

    ]);

    //array for dinner foods
    const [dinnerFood, setDinnerFood] = useState([
        {Food: 'Pasta', Calories: 58, Quantity: 1, key: '1'},
        {Food: 'Cheese', Calories: 50, Quantity: 1, key: '2'},

    ]);

    /**
     * handler used for date picker
     * @param event
     * @param selected
     */
    const pickedHandler = (event, selected) => {
        const current = selected || date; //if selected = selected, if not it will be the initial date
        setShowed(Platform.OS === 'ios' || Platform.OS === 'android');
        setDate(current);

        let temp = new Date(current);
        let formatted = temp.getDate() + '/' + (temp.getMonth() + 1) + '/' + temp.getFullYear();
        setDateText(formatted);
    }

    /**
     * to show the picked date
     * @param current
     */
    const modeShow = (current) => {
        setShowed(true);
        setPickedMode(current);

    }

    /**
     * to add food to the lists when FoodForm is submitted
     * @param foodName
     * @param foodType
     */
    const addFood = (foodName, foodType) => {
        foodName.key = Math.random().toString();
        if (foodType === 'Breakfast') {
            setBreakfastFood((current) => {
                return [foodName, ...current]
            })
        }
        if (foodType === 'Lunch') {
            setLunchFood((current) => {
                return [foodName, ...current]
            })
        }
        if (foodType === 'Dinner') {
            setDinnerFood((current) => {
                return [foodName, ...current]
            })
        }

        setOpenModal(false);
    }

    /**
     * total calories intake calculation
     */
    const getTotalCaloriesIntake = () => {
        let total = 0;

        for (let i = 0; i < breakfastFood.length; i++) {
            total += (parseInt(breakfastFood[i].Calories) * parseInt(breakfastFood[i].Quantity));
        }

        for (let i = 0; i < lunchFood.length; i++) {
            total += (parseInt(lunchFood[i].Calories) * parseInt(lunchFood[i].Quantity));
        }

        for (let i = 0; i < dinnerFood.length; i++) {
            total += (parseInt(dinnerFood[i].Calories) * parseInt(dinnerFood[i].Quantity));
        }
        setTotal(total);
    }

    /**
     * to get calories intake only for breakfast foods
     */
    const getTotalBreakfastCalories = () => {
        let total = 0;

        for (let i = 0; i < breakfastFood.length; i++) {
            total += (parseInt(breakfastFood[i].Calories) * parseInt(breakfastFood[i].Quantity));
        }

        setTotalBreakfastCalories(total);
    }

    /**
     * to get calories only for lunch foods
     */
    const getTotalLunchCalories = () => {
        let total = 0;

        for (let i = 0; i < lunchFood.length; i++) {
            total += (parseInt(lunchFood[i].Calories) * parseInt(lunchFood[i].Quantity));
        }

        setTotalLunchCalories(total);
    }

    /**
     * to get total calories for dinner foods
     */
    const getTotalDinnerCalories = () => {
        let total = 0;

        for (let i = 0; i < dinnerFood.length; i++) {
            total += (parseInt(dinnerFood[i].Calories) * parseInt(dinnerFood[i].Quantity));
        }

        setTotalDinnerCalories(total);
    }

    /**
     * used to set daily goal when given input
     */
    const setDailyGoal = () => {
        setGoal1(goalCalories);
    }

    /**
     * remaining calories calculation
     */
    const getRemainingCalories = () => {
        setRemaining(goalCalories - totalCalories);

    }

    /**
     * this function combines remaining calories calculation and setting daily goal
     * so both functions are called when the user submits the button so when daily goal is changed
     * the remaining calories change too
     */
    const clickHandler = () => {
        setDailyGoal();
        getRemainingCalories();
    }

    return (
        <SafeAreaView style={caloriesStyles.container}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            colors={['#4356FF', '#3584e4']} locations={[0, 0.9]}
                            style={[styling.dashboard, styles.boxShadow]}>

                <View style={{
                    width: '100%', paddingTop: 50,
                    paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between'
                }}>
                    <Text style={[styling.smallText, styling.profileName]}>Calorie Counter</Text>

                    <View style={{flexDirection: 'row',}}>
                        <Text style={{
                            color: 'white', fontFamily: 'Righteous_400Regular',
                            alignSelf: 'center', margin: 5, fontSize: 20,
                        }}>Fit<Text style={[styles.blueText]}>Me</Text>
                        </Text>
                        <Image style={styling.logo} source={require('../assets/img/barbell.png')}/>
                    </View>
                </View>
            </LinearGradient>
            <ScrollView style={{height: '90%',}}>
                <View style={caloriesStyles.caloriesInfo}>

                    <View style={{
                        width: '100%', paddingTop: 20,
                        paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between'
                    }}>

                        <Text style={caloriesStyles.caloriesItems}>{goalCalories1} kcals</Text>
                        <Text style={caloriesStyles.caloriesItems}>{totalCalories} kcals</Text>
                        <Text style={caloriesStyles.caloriesItems}>{remaining} kcals</Text>

                    </View>

                    <View style={{
                        width: '100%', paddingTop: 10,
                        paddingLeft: 42, paddingRight: 20, flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                        <Text style={caloriesStyles.caloriesItemsText}>Goal</Text>
                        <Text style={caloriesStyles.caloriesItemsText}>     Consumed</Text>
                        <Text style={caloriesStyles.caloriesItemsText}>Remaining</Text>
                    </View>
                </View>
                <Text>Date: {dateText}</Text>
                <View>
                    <Button title='Pick Date' onPress={() => modeShow('date')}/>
                </View>

                {showed && (
                    <DateTimePicker
                        id='datePicker'
                        value={date}
                        mode={pickedMode}
                        is24Hour={true}
                        display='default'
                        onChange={pickedHandler}
                    />
                )}
                <Text>Set a Daily Goal: {goalCalories1}</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <TextInput
                            keyboardType='numeric'
                            style={caloriesStyles.input}
                            placeholder='e.g. 2500'
                            onChangeText={(goal) => setGoal(goal)}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <Button title='Submit' onPress={clickHandler}/>

                <Modal visible={openModal} animationType='slide'>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={caloriesStyles.modalText}>
                            <MaterialIcons
                                name='close'
                                size={24}
                                style={caloriesStyles.modalCloseStyle}
                                onPress={() => setOpenModal(false)}
                            />
                            <FoodForm addFood={addFood}
                                      getTotalCaloriesIntake={getTotalCaloriesIntake}
                                      getRemainingCalories={getRemainingCalories}
                                      getTotalBreakfastCalories={getTotalBreakfastCalories}
                                      getTotalLunchCalories={getTotalLunchCalories}
                                      getTotalDinnerCalories={getTotalDinnerCalories}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <Text style={caloriesStyles.foodAddTitle}>Add Food and Drinks</Text>
                <MaterialIcons
                    name='add'
                    size={24}
                    style={caloriesStyles.modalStyle}
                    onPress={() => setOpenModal(true)}
                />
                <Text>Breakfast: {totalCaloriesBreakfast}</Text>
                {breakfastFood.map(item => (
                    <View key={item.key}>
                        <TouchableOpacity onPress={() => navigation.navigate('FoodDetails', item)}>
                            <CardComponent>
                                <Text style={caloriesStyles.item}>{item.Food}</Text>
                            </CardComponent>
                        </TouchableOpacity>
                    </View>
                ))}

                <Text>Lunch: {totalCaloriesLunch}</Text>
                {lunchFood.map(item => (
                    <View key={item.key}>
                        <TouchableOpacity onPress={() => navigation.navigate('FoodDetails', item)}>
                            <CardComponent>
                                <Text style={caloriesStyles.item}>{item.Food}</Text>
                            </CardComponent>
                        </TouchableOpacity>
                    </View>
                ))}

                <Text>Dinner: {totalCaloriesDinner}</Text>
                {dinnerFood.map(item => (
                    <View key={item.key}>
                        <TouchableOpacity onPress={() => navigation.navigate('FoodDetails', item)}>
                            <CardComponent>
                                <Text style={caloriesStyles.item}>{item.Food}</Text>
                            </CardComponent>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>

    )
}

const caloriesStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
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
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginHorizontal: 1,
        marginVertical: 6,

    },
    caloriesItems: {
        borderRadius: 20,
        borderColor: '#3584E4',
        borderWidth: 10,
        elevation: 3,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 20,
        fontFamily: 'Righteous_400Regular',
    },
    caloriesItemsText: {
        color: '#000',
        fontFamily: 'Righteous_400Regular',
    },
    caloriesInfo: {
        borderRadius: 5,
        borderColor: '#bbb',
        borderBottomWidth: 5,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        paddingRight: 5,

    }
})