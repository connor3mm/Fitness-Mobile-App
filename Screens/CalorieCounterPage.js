import React, {useState, useEffect, Component} from 'react';
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
    SafeAreaView,
    Image,
    Animated,
} from "react-native";

import CardComponent from "../CustomComponents/CardComponent";
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialIcons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import FoodForm from './FoodForm';
import DateTimePicker from '@react-native-community/datetimepicker';
import {styling} from './Homepage';
import {styles} from "./Welcomepage";
import {BMIstyles} from './BMICalculatorPage';
import SVG, {G, Circle} from 'react-native-svg';
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import {circle} from 'react-native/Libraries/Animated/Easing';

import { authentication } from '../firebase/firebase-config';
import { db } from '../firebase/firebase-config';
import { collections, updateDoc, doc, setDoc, arrayUnion, getDoc} from "firebase/firestore/lite";


export default function CalorieCounter({navigation}) {
    const uid = authentication.currentUser.uid;


    const setUserCalories = async () => {
        
        await updateDoc(doc(db,"users",uid),{
            targetCalories: goalCalories,
            dailyCalories: totalCalories,
        })
    }


    //array for breakfast foods
    const [breakfastFood, setBreakfastFood] = useState([]);

    //array for lunch foods
    const [lunchFood, setLunchFood] = useState([]);

    //array for dinner foods
    const [dinnerFood, setDinnerFood] = useState([]);



const getUserData = async () => {
    const docRef = doc(db, "users", authentication.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      //getting breakfast food items from DB
      const foodMapBreakfast = docSnap.data().breakfastFood;

      const arrayResultBreakfast = Object.keys(foodMapBreakfast).map((item) => {
        const foodMapItemBreakfast = foodMapBreakfast[item];
        return {
          Food: item,
          Calories: foodMapItemBreakfast.Calories,
          Quantity: foodMapItemBreakfast.Quantity,
          key: foodMapItemBreakfast.key,
        };
      });
      console.log("arrayResult", arrayResultBreakfast);
      setBreakfastFood(arrayResultBreakfast);


      
      //getting lunch food items from DB
      const foodMapLunch = docSnap.data().lunchFood;

      const arrayResultLunch = Object.keys(foodMapLunch).map((item) => {
        const foodMapItemLunch = foodMapLunch[item];
        return {
          Food: item,
          Calories: foodMapItemLunch.Calories,
          Quantity: foodMapItemLunch.Quantity,
          key: foodMapItemLunch.key,
        };
      });
      console.log("arrayResult", arrayResultLunch);
      setLunchFood(arrayResultLunch);


      //getting dinner food items from DB
      const foodMapDinner = docSnap.data().dinnerFood;

      const arrayResultDinner = Object.keys(foodMapDinner).map((item) => {
        const foodMapItemDinner = foodMapDinner[item];
        return {
          Food: item,
          Calories: foodMapItemDinner.Calories,
          Quantity: foodMapItemDinner.Quantity,
          key: foodMapItemDinner.key,
        };
      });
      console.log("arrayResult", arrayResultDinner);
      setDinnerFood(arrayResultDinner);
    } else {
      console.log("No such document!");
    }
  };


    
    //Load data from DB for the card components into the App
    useEffect(() => {
        getUserData();
    },[])


    const homePressedHandler = () => navigation.navigate('Homepage');

    //to set the modal open or close
    const [openModal, setOpenModal] = useState(false);

    //goal calories values
    const [goalCalories, setGoal] = useState(0);//izpozlvai tova za DB
    const [goalCalories1, setGoal1] = useState(0);

    //values for remaining calories
    const [remaining, setRemaining] = useState(0);

    //values for total/for each section calories
    const [totalCalories, setTotal] = useState(0);//current callories - reset every 24 hours
    const [totalCaloriesBreakfast, setTotalBreakfastCalories] = useState('');//reset every 24 hours
    const [totalCaloriesLunch, setTotalLunchCalories] = useState('');//reset every 24 hours
    const [totalCaloriesDinner, setTotalDinnerCalories] = useState('');//reset every 24 hours

    //values for date picker
    const [date, setDate] = useState(new Date());
    const [pickedMode, setPickedMode] = useState('date');
    const [showed, setShowed] = useState(false);
    const [dateText, setDateText] = useState('');

    

    const [goalAchieved, setGoalAchieved] = useState("");

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
        setDateText(formatte);
    };

    /**
     * to show the picked date
     * @param current
     */
    const modeShow = (current) => {
        setShowed(true);
        setPickedMode(current);
    };

    /**
     * to add food to the lists when FoodForm is submitted
     * @param foodName
     * @param foodType
     */
    const addFood = (foodName, foodType) => {
        foodName.key = Math.random().toString();
        if (foodType === 'Breakfast') {
            setBreakfastFood((current) => {
                return [foodName, ...current];
            });
        }
        if (foodType === 'Lunch') {
            setLunchFood((current) => {
                return [foodName, ...current];
            });
        }
        if (foodType === 'Dinner') {
            setDinnerFood((current) => {
                return [foodName, ...current];
            });
        }

        setOpenModal(false);
    };

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
    };

    /**
     * to get calories intake only for breakfast foods
     */
    const getTotalBreakfastCalories = () => {
        let total = 0;

        for (let i = 0; i < breakfastFood.length; i++) {
            total += (parseInt(breakfastFood[i].Calories) * parseInt(breakfastFood[i].Quantity));
        }

        setTotalBreakfastCalories(total);
    };

    /**
     * to get calories only for lunch foods
     */
    const getTotalLunchCalories = () => {
        let total = 0;

        for (let i = 0; i < lunchFood.length; i++) {
            total += (parseInt(lunchFood[i].Calories) * parseInt(lunchFood[i].Quantity));
        }

        setTotalLunchCalories(total);
    };

    /**
     * to get total calories for dinner foods
     */
    const getTotalDinnerCalories = () => {
        let total = 0;

        for (let i = 0; i < dinnerFood.length; i++) {
            total += (parseInt(dinnerFood[i].Calories) * parseInt(dinnerFood[i].Quantity));
        }

        setTotalDinnerCalories(total);
    };

    /**
     * used to set daily goal when given input
     */
    const setDailyGoal = () => {
        setGoal1(goalCalories);
    };

    /**
     * remaining calories calculation
     */
    const getRemainingCalories = () => {
        setRemaining(goalCalories - totalCalories);

    };

    const getGoalAchievedMessage = () => {
        const message = "You have achieved your daily calorie goal!";
        if (remaining === 0) {
            setGoalAchieved(message);
        }
    };

    /**
     * this function combines remaining calories calculation and setting daily goal
     * so both functions are called when the user submits the button so when daily goal is changed
     * the remaining calories change too. It also adds the target and goal calories in the DB
     */
    const clickHandler = () => {
        setDailyGoal();
        getRemainingCalories();
        setUserCalories();
    };

    /*  adding svg animation */
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const AnimatedValue = React.useRef(new Animated.Value(0)).current;
    const circleRef = React.useRef();
    let percentage = isNaN(totalCalories / goalCalories1) || (isFinite(totalCalories / goalCalories1)) == false ?
        0 : (totalCalories / goalCalories1) * 100;
    let max = 100;

    const animation = (toValue) => {
        return Animated.timing(AnimatedValue, {
            toValue,
            duration: 1000,
            delay: 100,
            useNativeDriver: true,
        }).start();
    };

    React.useEffect(() => {
        animation(percentage);
        AnimatedValue.addListener((v) => {
            if (circleRef?.current) {
                let maxPerc = 100 * (v.value) / max;
                const strokeDashoffset = (2 * Math.PI * 50) - ((2 * Math.PI * 50) * maxPerc) / 100;
                circleRef.current.setNativeProps({
                    strokeDashoffset,
                });
            }
        });
    });

    return (
        <SafeAreaView style={styles.container}>

            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4356FF', '#3584e4']} locations={[0, 0.9]}
                            style={[styling.dashboard, styles.boxShadow]}>

                <View style={{
                    width: '100%', paddingTop: 50,
                    paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between'
                }}>

                    <TouchableOpacity style={{alignSelf: 'center', marginLeft: 20,}} onPress={homePressedHandler}>
                        <Image style={BMIstyles.homeButton} source={require('../assets/img/option.png')}/>
                        <Text style={{color: '#FFF'}}>Menu</Text>
                    </TouchableOpacity>

                    <Text style={[styling.smallText, BMIstyles.sectionTitle, caloriesStyles.sectionTitle]}>Calorie
                        Counter</Text>

                    <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                        <Text style={{
                            color: 'white', fontFamily: 'Righteous_400Regular',
                            alignSelf: 'center', margin: 5, fontSize: 20,
                        }}>Fit<Text style={[styles.blueText]}>Me</Text>
                        </Text>
                        <Image style={styling.logo} source={require('../assets/img/logo.png')}/>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false} alwaysBounceVertical={true}
                        style={{width: '95%',}}>

                <View style={{marginTop: 15}}>
                    {remaining === 0 && totalCalories > 0 && goalCalories > 0 ? (
                        <AntDesign name="checkcircle" size={24} color="blue">
                            <Text style={{fontFamily: 'Righteous_400Regular'}}> You have achieved your daily calorie
                                goal!</Text>
                        </AntDesign>
                    ) : null}
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center', marginTop: 2.5, padding: 10,
                }}>

                    <SVG width={175} height={175}>
                        <G rotation="-90" origin={[62.5, 62.5]}>
                            <Circle cx='25%' cy='50%' stroke={'#CEE4FF'} strokeWidth={12.5} r={50}
                                    strokeOpacity={.75} fill="transparent"></Circle>

                            <AnimatedCircle ref={circleRef} cx='25%' cy='50%' stroke={'#4356FF'} strokeWidth={12.5}
                                            r={50}
                                            strokeOpacity={.75} fill="transparent" strokeDasharray={2 * Math.PI * 50}
                                            strokeDashoffset={2 * Math.PI * 50} strokeLinecap={'round'}>
                            </AnimatedCircle>
                        </G>
                    </SVG>

                    <View style={caloriesStyles.caloriesInfo}>
                        <View style={{flexDirection: 'row',}}>
                            <Image style={{width: 10, height: 10, alignSelf: 'center'}}
                                   source={require('../assets/img/indicator-1.png')}/>
                            <Text style={caloriesStyles.caloriesItems}>Consumed calories</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Image style={{width: 10, height: 10, alignSelf: 'center'}}
                                   source={require('../assets/img/indicator-2.png')}/>
                            <Text style={caloriesStyles.caloriesItems}>Leftover calories</Text>
                        </View>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    width: '95%', alignSelf: 'center', marginVertical: 30,
                }}>

                    <View>
                        <Text style={[caloriesStyles.caloriesItemsText, {textAlign: 'center'}]}>Goal KCal</Text>
                        <View style={[caloriesStyles.buttonContainer, {alignSelf: 'center', width: 100,}]}>
                            <Text style={[caloriesStyles.caloriesItemsText]}>{goalCalories1}</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={[caloriesStyles.caloriesItemsText, {textAlign: 'center'}]}>Consumed KCal</Text>
                        <View style={[caloriesStyles.buttonContainer, {alignSelf: 'center', width: 100,}]}>
                            <Text style={[caloriesStyles.caloriesItemsText]}>{totalCalories}</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={[caloriesStyles.caloriesItemsText, {textAlign: 'center'}]}>Leftover KCal</Text>
                        <View style={[caloriesStyles.buttonContainer, {alignSelf: 'center', width: 100,}]}>
                            <Text style={[caloriesStyles.caloriesItemsText]}>{remaining}</Text>
                        </View>
                    </View>

                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View style={{marginVertical: 15, alignItems: 'center'}}>
                        <Text style={caloriesStyles.caloriesItemsText}>Set a calorie goal:</Text>
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


                    </View>

                    <View style={{marginVertical: 15, alignItems: 'center',}}>
                        <Text style={caloriesStyles.caloriesItemsText}>Pick a day to meet the goal:</Text>
                        <TouchableOpacity style={caloriesStyles.buttonContainer} onPress={() => modeShow('date')}>
                            <Image style={caloriesStyles.button} source={require('../assets/img/calendar.png')}/>
                            <Text style={[caloriesStyles.caloriesItemsText]}>{dateText}</Text>
                        </TouchableOpacity>
                    </View>
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

                <TouchableOpacity style={BMIstyles.submit}
                                  onPress={clickHandler}>
                    <Text style={[styling.whiteText, {textAlign: 'center'}]}>Set Target</Text>
                </TouchableOpacity>

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
                <Text style={caloriesStyles.titleStyle}>Breakfast: {totalCaloriesBreakfast}</Text>
                {breakfastFood && breakfastFood?.map((item) => (
                    <View key={item.key}>
                    <TouchableOpacity onPress={() => navigation.navigate("FoodDetails", item)}>
                        <CardComponent>
                        <View style={{flexDirection: "row",justifyContent: "space-between",}}>
                            <Text style={caloriesStyles.item}>{item.Food}</Text>
                                            <AntDesign name="right" size={15} color="black"/>
                                        </View>
                                    </CardComponent>
                                </TouchableOpacity>
                            </View>
                        ))}

                <Text style={caloriesStyles.titleStyle}>Lunch: {totalCaloriesLunch}</Text>
                {lunchFood && lunchFood?.map((item) => (
                    <View key={item.key}>
                        <TouchableOpacity onPress={() => navigation.navigate('FoodDetails', item)}>
                            <CardComponent>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={caloriesStyles.item}>{item.Food}</Text>
                                    <AntDesign name="right" size={15} color="black"/>
                                </View>
                            </CardComponent>
                        </TouchableOpacity>
                    </View>
                ))}

                <Text style={caloriesStyles.titleStyle}>Dinner: {totalCaloriesDinner}</Text>
                {dinnerFood && dinnerFood?.map((item) => (
                    <View key={item.key}>
                        <TouchableOpacity onPress={() => navigation.navigate('FoodDetails', item)}>
                            <CardComponent>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={caloriesStyles.item}>{item.Food}</Text>
                                    <AntDesign name="right" size={15} color="black"/>
                                </View>
                            </CardComponent>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>

    )
}

export const caloriesStyles = StyleSheet.create({

    item: {
        fontSize: 16.5,
        color: '#424242',
    },

    modalText: {
        flex: 1,
    },

    buttonContainer: {
        shadowOffset: {width: 5, height: 5},
        elevation: 5,
        shadowColor: '#000',
        width: 60,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFF',
        marginVertical: 10,
        borderRadius: 5,
    },

    button: {
        width: 45,
        height: 45,
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

    sectionTitle: {
        fontSize: 25,
    },

    foodAddTitle: {
        color: '#4356FF',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        fontSize: 18,
        fontFamily: 'Righteous_400Regular',
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
        borderWidth: 0,
        borderBottomWidth: 3,
        borderBottomColor: '#4356FF',
        padding: 10,
        backgroundColor: '#FFF',
        marginHorizontal: 1,
        fontFamily: 'Righteous_400Regular',
        width: 100,
        maxWidth: 100,
        marginVertical: 10,
        textAlign: 'center',

    },

    caloriesItems: {
        paddingVertical: 15,
        paddingHorizontal: 5,
        fontFamily: 'Righteous_400Regular',
    },

    caloriesItemsText: {
        fontFamily: 'Righteous_400Regular',
    },

    caloriesInfo: {
        borderRadius: 10,
        borderColor: '#FFF',
        borderWidth: 1,
        backgroundColor: '#FFF',
        shadowOffset: {width: 10, height: 10},
        shadowColor: '#000',
        elevation: 3,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
    },

    titleStyle: {
        fontWeight: 'bold',
        fontFamily: 'Righteous_400Regular',
        backgroundColor: '#f1f2fc',
        padding: 10,
        fontSize: 18,
        marginTop: 20,

    },

})