import React, {useState} from 'react';
import {Button, SafeAreaView,TextInput, StyleSheet, Text, View} from "react-native";
import { RadioButton } from 'react-native-paper';



export default function BMICalculator() {

    const [heightFeet, setHeightFeet] = useState(0);
    const [heightCm, setHeightCm] = useState(0);

    const [massStone, setMassStone] = useState(0);
    const [massLBS, setMassLBS] = useState(0);
    const [massKG, setMassKG] = useState(0);

    const [age, setAge] = useState(0);
    const [checked, setChecked] = React.useState('');

    const [activity, setActivity] = React.useState('');

    const [bmi, setBmi] = useState(0);

    const calculate = () => {
        // console.log(checked)
        // console.log(age)
        // console.log(massStone)
        // console.log(heightFeet)

        const formValid = +heightFeet > 0 && +massStone > 0;
        if (!formValid) {
            return;
        }
        const bmi = +massStone / (+heightFeet) ** 2;
        setBmi(bmi);
    }

    return(
        <View style = {styles.container}>
            <Text>Enter Height:  </Text>
            <TextInput
                keyboardType = 'numeric'
                style ={styles.input}
                placeholder = 'Height'
                onChangeText = {(height) => setHeightFeet(height)}
            />

            <Text>Enter Weight:  </Text>
            <TextInput
                keyboardType = 'numeric'
                style ={styles.input}
                placeholder = 'Weight'
                onChangeText = {(Weight) => setMassStone(Weight)}
            />

            <Text>Enter Age:  </Text>
            <TextInput
                keyboardType = 'numeric'
                style ={styles.input}
                placeholder = 'Age'
                onChangeText = {(Age) => setAge(Age)}
            />

            <View style = {styles.radio}>
            <Text>Choose your Sex:  </Text>

            <RadioButton.Group  onValueChange={checked => setChecked(checked)} value={checked}>
                <RadioButton.Item label="Male" value="first" />
                <RadioButton.Item label="Female" value="second" />
            </RadioButton.Group>
            </View>


            <View style = {styles.radio}>
                <Text>Choose your Activity level:  </Text>

                <RadioButton.Group  onValueChange={activity => setActivity(activity)} value={activity}>
                    <RadioButton.Item label="Low Activity Levels" value="low" />
                    <RadioButton.Item label="Average Activity Levels" value="average" />
                    <RadioButton.Item label="High Activity Levels" value="high" />
                </RadioButton.Group>
            </View>

            <Button backgroundColor="#FFFFFF" title="Calculate" onPress={calculate}/>

        </View>

    );

}


const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200,
    },

    radio: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25
    },

});