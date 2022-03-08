import React from 'react';
import {Button, StyleSheet, Text, View, TextInput} from "react-native";
import { Formik } from 'formik';

export default function FoodForm() {
    return(
        <View style = {styles.container}>
            <Formik
                initialValues={{ foodName: '', calories: '', quantity: ''}}
                onSubmit = {(values) => {
                    console.log(values);
                }}
            >
                //render different text inputs
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
                            placeholder = 'Food name'
                            onChangeText = {formikProps.handleChange('calories')}
                            value = {formikProps.values.calories}
                        />
                        <TextInput
                            style = {styles.inputStyle}
                            placeholder = 'Food name'
                            onChangeText = {formikProps.handleChange('quantity')}
                            value = {formikProps.values.quantity}
                        />

                        <Button title='submit' color='blue' onPress={formikProps.handleSubmit()}/>
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