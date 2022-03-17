import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from "react-native";
import CardComponent from "../CustomComponents/CardComponent";
import { caloriesStyles } from './CalorieCounterPage';
import { styling } from './Homepage';
import { formStyles } from './FoodForm';


export default function FoodDetails( {navigation} ) {
    return(
        <SafeAreaView style = {[formStyles.container, styles.container]}>
            <Text style={[caloriesStyles.caloriesItemsText, 
                { color: '#4356FF', fontSize: 20, textAlign: 'center', marginTop: 25,}]}>Food Details</Text>
            <CardComponent>
                
                <View style={{flexDirection: 'row', marginVertical: 7.5, width: '100%',}}>
                    <Image style={{height: 30, width: 30, alignSelf: 'center'}}
                                        source={require('../assets/img/diet.png')}/>
                    <Text style={[caloriesStyles.caloriesItemsText, { margin: 10, fontSize: 15, }]} >
                        Food: <Text style={{color: '#3584e4'}}>{ navigation.getParam('Food')}</Text>
                    </Text>
                </View>
           
                <View style={{flexDirection: 'row', marginVertical: 7.5, width: '100%',}}>
                    <Image style={{height: 30, width: 30, alignSelf: 'center'}}
                                        source={require('../assets/img/calories.png')}/>
                    <Text style={[caloriesStyles.caloriesItemsText, { margin: 10, fontSize: 15, }]} >
                        Calories: <Text style={{color: '#3584e4'}}>{ navigation.getParam('Calories')}</Text>
                    </Text>
                </View>                   

                <View style={{flexDirection: 'row', marginVertical: 7.5, width: '100%',}}>
                    <Image style={{height: 30, width: 30, alignSelf: 'center'}}
                                        source={require('../assets/img/numbers.png')}/>
                    <Text style={[caloriesStyles.caloriesItemsText, { margin: 10, fontSize: 15, }]} >
                        Quantity: <Text style={{color: '#3584e4'}}>{ navigation.getParam('Quantity')}</Text>
                    </Text>
                </View>

                <View style={{flexDirection: 'row', alignSelf: 'flex-end', position: 'absolute', top: 150, right: -20,}}>
                    <Text style={{color: '#4356FF', fontFamily: 'Righteous_400Regular', fontSize: 16,}}>
                        FitMe
                    </Text>
                    <Image style={styling.logo} source={require('../assets/img/logo.png')}/>
                </View>
            </CardComponent>

            
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: '#FFF',
    }
})
