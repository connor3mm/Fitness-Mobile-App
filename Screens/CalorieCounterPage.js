import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal} from "react-native";
import CardComponent from "../CustomComponents/CardComponent";
import { MaterialIcons } from '@expo/vector-icons';
import FoodForm from "./FoodForm";
import styleSheet from "react-native-web/dist/exports/StyleSheet";



export default function CalorieCounter( {navigation} ) {

    const [openModal, setOpenModal] = useState(false);

    const [breakfastFood, setBreakfastFood] = useState([
        {foodName: 'Eggs', calories: 58, quantity: 1, key: '1'}
    ]);
    return(
        <View style = {styles.container}>
            <Text> Calorie Counter Screen</Text>

            <Modal visible={openModal} animationType='slide'>
                <View style = {styles.modalText} >
                    <MaterialIcons
                        name = 'close'
                        size = {24}
                        style = {styles.modalCloseStyle}
                        onPress = {() => setOpenModal(false)}
                    />
                    <FoodForm/>
                </View>
            </Modal>
            <Text style = {styles.foodAddTitle}>Add Breakfast</Text>
            <MaterialIcons
                name = 'add'
                size = {24}
                style = {styles.modalStyle}
                onPress = {() => setOpenModal(true)}
            />

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
    }
})