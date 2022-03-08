import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal} from "react-native";
import CardComponent from "../CustomComponents/CardComponent";
import { MaterialIcons } from '@expo/vector-icons';
import styleSheet from "react-native-web/dist/exports/StyleSheet";



export default function CalorieCounter( {navigation} ) {

    const [openModal, setOpenModal] = useState(false);

    const [breakfastFood, setBreakfastFood] = useState([
        {foodName: 'Eggs', calories: 58, quantity: 1, key: '1'}
    ]);
    return(
        <View style = {styles.container}>
            <Text> Calorie Counter Screen</Text>
            <Modal visible={openModal}>
                <View style = {styles.modalText} >
                    <Text>Welcome to the modal</Text>
                </View>
            </Modal>
            <ScrollView>
                { breakfastFood.map (item => (
                    <View key = {item.key}>
                        <TouchableOpacity onPress={() => navigation.navigate('FoodDetails', item)}>
                            <CardComponent>
                                <Text style = {styles.item}>{item.foodName}</Text>
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

    }
})