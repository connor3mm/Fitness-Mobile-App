import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, TextInput} from "react-native";
import {RadioButton} from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';

const validation = yup.object({
    Food: yup.string().required().min(2),
    Calories: yup.string().required().min(0).
    test('not-negative', 'Please enter a positive number', (val) => {return parseInt(val) > 0;}), //if this returns falls, the validation fails and it will display the message
    Quantity: yup.string().required().min(1).
    test('not-negative', 'Please enter a positive number', (val) => {return parseInt(val) > 0;}),
})

export default function FoodFormPage( {addFood, getTotalCaloriesIntake, getRemainingCalories, getTotalBreakfastCalories, getTotalLunchCalories, getTotalDinnerCalories} ) {

    getTotalCaloriesIntake();
    getRemainingCalories();
    getTotalBreakfastCalories();
    getTotalLunchCalories();
    getTotalDinnerCalories();

    const [foodType,setFoodType] = useState('0');

    return(
        <View style = {styles.container}>
            <Formik
                initialValues={{ Food: '', Calories: '', Quantity: ''}}
                validationSchema={validation}
                onSubmit = {(values) => {
                    if(foodType <= '0') {
                        setFoodType('');
                        return
                    }
                    addFood(values,foodType);

                }}
            >
                { (formikProps) => (
                    <View>
                        <TextInput
                            style = {styles.inputStyle}
                            placeholder = 'Food name'
                            onChangeText = {formikProps.handleChange('Food')}
                            value = {formikProps.values.Food}
                            onBlur = {formikProps.handleBlur('Food')}
                        />
                        <Text style = {styles.errorMessage}> {formikProps.touched.Food && formikProps.errors.Food} </Text>
                        <TextInput
                            style = {styles.inputStyle}
                            placeholder = 'Calories for one quantity'
                            onChangeText = {formikProps.handleChange('Calories')}
                            value = {formikProps.values.Calories}
                            keyboardType = 'numeric'
                            onBlur = {formikProps.handleBlur('Calories')}
                        />
                        <Text style = {styles.errorMessage}> {formikProps.touched.Calories && formikProps.errors.Calories} </Text>
                        <TextInput
                            style = {styles.inputStyle}
                            placeholder = 'Quantity'
                            onChangeText = {formikProps.handleChange('Quantity')}
                            value = {formikProps.values.Quantity}
                            keyboardType = 'numeric'
                            onBlur = {formikProps.handleBlur('Quantity')}
                        />
                        <Text style = {styles.errorMessage}> {formikProps.touched.Quantity && formikProps.errors.Quantity} </Text>
                        <View>
                            <RadioButton.Group onValueChange={foodType => setFoodType(foodType)}
                                               value={foodType} id='radioGroup'>
                                <RadioButton.Item label="Breakfast" value="Breakfast"/>
                                <RadioButton.Item label="Lunch" value="Lunch"/>
                                <RadioButton.Item label="Dinner" value="Dinner"/>
                            </RadioButton.Group>
                        </View>
                        <View>
                            {foodType === '' ? (<Text style={styles.errorMessage}>Please choose time of day</Text>) : null}
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
    errorMessage: {
        color: '#d90f32',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',

    },

})