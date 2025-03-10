import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Image, ScrollView} from "react-native";
import {RadioButton} from 'react-native-paper';
import {Formik, useFormik} from 'formik';
import * as yup from 'yup';
import {caloriesStyles} from './CalorieCounterPage';
import {styles} from './Welcomepage';
import {styling} from './Homepage';
import FooterLogo from '../CustomComponents/footerLogo';
import { authentication } from '../firebase/firebase-config';
import { db } from '../firebase/firebase-config';
import {updateDoc, doc} from "firebase/firestore/lite";


const validation = yup.object({
    Food: yup.string().required().min(2),
    Calories: yup.string().required().min(0).test('not-negative', 'Please enter a positive number', (val) => {
        return parseInt(val) > 0;
    }), //if this returns falls, the validation fails and it will display the message
    Quantity: yup.string().required().min(1).test('not-negative', 'Please enter a positive number', (val) => {
        return parseInt(val) > 0;
    }),
});

export default function FoodFormPage({
                                         addFood,
                                         getTotalCaloriesIntake,
                                         getRemainingCalories,
                                         getTotalBreakfastCalories,
                                         getTotalLunchCalories,
                                         getTotalDinnerCalories
                                     }) {

    getTotalCaloriesIntake();
    getRemainingCalories();
    getTotalBreakfastCalories();
    getTotalLunchCalories();
    getTotalDinnerCalories();


    const uid = authentication.currentUser.uid;        

    const setData = async (foodItem, foodType) => {
        try {      
            if(foodType ==="Breakfast"){
                await updateDoc(doc(db, "users", uid), {
                    [`breakfastFood.${foodItem.Food}`]: foodItem,});
            }

            if(foodType ==="Lunch"){
                await updateDoc(doc(db, "users", uid), {
                    [`lunchFood.${foodItem.Food}`]: foodItem,});
            }
            if(foodType ==="Dinner"){
                await updateDoc(doc(db, "users", uid), {
                    [`dinnerFood.${foodItem.Food}`]: foodItem,});
            }

            console.log("added successfully");
            
        } catch (error) {
        console.log("error adding document", error.message);
            }
        };
    

    

    const [foodType, setFoodType] = useState('0');

    return (
        <SafeAreaView style={formStyles.container}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <Formik
                    initialValues={{Food: '', Calories: '', Quantity: ''}}
                    validationSchema={validation}
                    onSubmit={(values) => {
                        if (foodType <= '0') {
                            setFoodType('');
                            return
                        }
                        setData(values, foodType);
                        console.log(values);
                        addFood(values, foodType);
                    }}>

                    {(formikProps) => (
                        <View>
                            <Text style={[caloriesStyles.caloriesItemsText,
                                {textAlign: 'center', color: '#3777D9', marginVertical: 12.5, fontSize: 22.5,}]}>
                                Add Food Item
                            </Text>

                            <View style={{flexDirection: 'row', marginVertical: 7.5, width: '100%',}}>
                                <Image style={{height: 35, width: 35, alignSelf: 'center'}}
                                       source={require('../assets/img/diet.png')}/>

                                <TextInput
                                    style={[formStyles.inputStyle, caloriesStyles.caloriesItemsText]}
                                    placeholder='Food name'
                                    onChangeText={formikProps.handleChange('Food')}
                                    value={formikProps.values.Food}
                                    onBlur={formikProps.handleBlur('Food')}/>
                            </View>

                            <View>
                                <Text style={[formStyles.errorMessage, caloriesStyles.caloriesItemsText]}>
                                    {formikProps.touched.Food && formikProps.errors.Food}
                                </Text>
                            </View>

                            <View style={{flexDirection: 'row', marginVertical: 7.5, width: '100%',}}>
                                <Image style={{height: 35, width: 35, alignSelf: 'center'}}
                                       source={require('../assets/img/calories.png')}/>
                                <TextInput
                                    style={[formStyles.inputStyle, caloriesStyles.caloriesItemsText]}
                                    placeholder='Calories per package/plate'
                                    onChangeText={formikProps.handleChange('Calories')}
                                    value={formikProps.values.Calories}
                                    keyboardType='numeric'
                                    onBlur={formikProps.handleBlur('Calories')}/>
                            </View>

                            <View>
                                <Text style={[formStyles.errorMessage, caloriesStyles.caloriesItemsText]}>
                                    {formikProps.touched.Calories && formikProps.errors.Calories}
                                </Text>
                            </View>

                            <View style={{flexDirection: 'row', marginVertical: 7.5, width: '100%',}}>
                                <Image style={{height: 35, width: 35, alignSelf: 'center'}}
                                       source={require('../assets/img/numbers.png')}/>
                                <TextInput
                                    style={[formStyles.inputStyle, caloriesStyles.caloriesItemsText]}
                                    placeholder='Quantity'
                                    onChangeText={formikProps.handleChange('Quantity')}
                                    value={formikProps.values.Quantity}
                                    keyboardType='numeric'
                                    onBlur={formikProps.handleBlur('Quantity')}/>
                            </View>

                            <View>
                                <Text style={[formStyles.errorMessage, caloriesStyles.caloriesItemsText]}> {
                                    formikProps.touched.Quantity && formikProps.errors.Quantity}
                                </Text>
                            </View>

                            <View style={{marginVertical: 35,}}>
                                <RadioButton.Group onValueChange={foodType => setFoodType(foodType)} value={foodType}
                                                   id='radioGroup'>
                                    <RadioButton.Item style={[formStyles.radioInput,]} label="Breakfast"
                                                      value="Breakfast"/>
                                    <RadioButton.Item style={[formStyles.radioInput,]} label="Lunch" value="Lunch"/>
                                    <RadioButton.Item style={[formStyles.radioInput,]} label="Dinner" value="Dinner"/>
                                </RadioButton.Group>
                            </View>

                            <View>
                                {foodType === '' ? (
                                    <Text style={[formStyles.errorMessage, caloriesStyles.caloriesItemsText]}>Please
                                        choose time of day</Text>) : null}
                            </View>

                            <TouchableOpacity activeOpacity={.7}
                                              style={[styles.button, styles.boxShadow, styles.signup,]}
                                              onPress={formikProps.handleSubmit }>
                                <Text style={[styles.buttonText,]}> + Add Food</Text>
                            </TouchableOpacity>


                        </View>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    )
}

export const formStyles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 15,
    },

    inputStyle: {
        borderBottomColor: '#3777D9',
        borderBottomWidth: 2,
        fontSize: 15,
        marginVertical: 12.5,
        padding: 7.5,
        width: '80%',
        marginLeft: 10,
    },

    errorMessage: {
        color: '#d90f32',
        fontWeight: 'bold',
        marginBottom: 7.5,
        marginTop: 6,
        textAlign: 'center',
    },

    radioInput: {
        borderColor: '#3777D9',
        borderWidth: 2,
        borderRadius: 5,
        elevation: 3,
        shadowOffset: {width: 3, height: 3},
        shadowColor: '#3584e4',
        marginVertical: 10,
    },

})