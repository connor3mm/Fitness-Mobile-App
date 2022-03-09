import React from 'react';
import {Button, StyleSheet, Text, View, TextInput} from "react-native";
import { Formik } from 'formik';

export default function FoodFormPage( {addFood, getTotalCaloriesIntake, getRemainingCalories} ) {

    getTotalCaloriesIntake();
    getRemainingCalories();

    return(
        <View style = {styles.container}>
            <Formik
                initialValues={{ foodName: '', calories: '', quantity: ''}}
                onSubmit = {(values) => {
                    addFood(values);
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