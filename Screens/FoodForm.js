import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, TextInput} from "react-native";
import {RadioButton} from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';

const validation = yup.object({
    food: yup.string().required().min(2),
    calories: yup.string().required().min(0),
    quantity: yup.string().required().min(1),
})

export default function FoodFormPage( {addFood, getTotalCaloriesIntake, getRemainingCalories} ) {

    getTotalCaloriesIntake();
    getRemainingCalories();

    const [foodType,setFoodType] = useState('0');

    return(
        <View style = {styles.container}>
            <Formik
                initialValues={{ food: '', calories: '', quantity: ''}}
                validationSchema={validation}
                onSubmit = {(values) => {
                    if(foodType === '0') {
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
                            onChangeText = {formikProps.handleChange('food')}
                            value = {formikProps.values.food}
                            onBlur = {formikProps.handleBlur('food')}
                        />
                        <Text style = {styles.errorMessage}> {formikProps.touched.food && formikProps.errors.food} </Text>
                        <TextInput
                            style = {styles.inputStyle}
                            placeholder = 'Calories for one quantity'
                            onChangeText = {formikProps.handleChange('calories')}
                            value = {formikProps.values.calories}
                            keyboardType = 'numeric'
                            onBlur = {formikProps.handleBlur('calories')}
                        />
                        <Text style = {styles.errorMessage}> {formikProps.touched.calories && formikProps.errors.calories} </Text>
                        <TextInput
                            style = {styles.inputStyle}
                            placeholder = 'Quantity'
                            onChangeText = {formikProps.handleChange('quantity')}
                            value = {formikProps.values.quantity}
                            keyboardType = 'numeric'
                            onBlur = {formikProps.handleBlur('quantity')}
                        />
                        <Text style = {styles.errorMessage}> {formikProps.touched.quantity && formikProps.errors.quantity} </Text>
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