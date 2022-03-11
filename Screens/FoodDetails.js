import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import CardComponent from "../CustomComponents/CardComponent";



export default function FoodDetails( {navigation} ) {
    return(
        <View style = {styles.container}>
            <Text>Food Details Screen</Text>
            <CardComponent>
                <Text>Food: { navigation.getParam('Food')}</Text>
                <Text>Calories: { navigation.getParam('Calories')}</Text>
                <Text>Quantity: { navigation.getParam('Quantity')}</Text>
            </CardComponent>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        padding: 30,
        fontSize: 15.5,
        color: '#424242',

    }
})