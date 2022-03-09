import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, TextInput} from "react-native";
import {RadioButton} from 'react-native-paper';
import { Formik } from 'formik';

export default function FoodFormPage( {addFood, getTotalCaloriesIntake, getRemainingCalories} ) {

    getTotalCaloriesIntake();
    getRemainingCalories();

    const [foodType,setFoodType] = useState('');

    return(
        <View style = {styles.container}>
            <Formik
                initialValues={{ foodName: '', calories: '', quantity: ''}}
                onSubmit = {(values) => {
                    addFood(values,foodType);
                    console.log(values);
                }}
            >
                { (formikProps) => (
                    <View>
                        <TextInput
                            style = {styles.inputStyle}
                            placeholder = 'Food name'
                            onChangeText = {formikProps.handleChange('foodName')}
                            value = {formikProps.values.foodName}
                        />
                        <TextInput
                            style = {styles.inputStyle}
                            placeholder = 'Calories for one quantity'
                            onChangeText = {formikProps.handleChange('calories')}
                            value = {formikProps.values.calories}
                            keyboardType = 'numeric'
                        />
                        <TextInput
                            style = {styles.inputStyle}
                            placeholder = 'Quantity'
                            onChangeText = {formikProps.handleChange('quantity')}
                            value = {formikProps.values.quantity}
                            keyboardType = 'numeric'
                        />

                        <View>
                            <RadioButton.Group onValueChange={foodType => setFoodType(foodType)}
                                               value={foodType}>
                                <RadioButton.Item label="Breakfast" value="Breakfast"/>
                                <RadioButton.Item label="Lunch" value="Lunch"/>
                                <RadioButton.Item label="Dinner" value="Dinner"/>
                            </RadioButton.Group>
                        </View>

                        <Button title='Submit' onPress={formikProps.handleSubmit} color='dodgerblue'/>
                    </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    inputStyle: {
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 6,
        padding: 10,
        fontSize: 16,
    },

})