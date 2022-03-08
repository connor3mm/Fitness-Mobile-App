import React, {useState} from 'react';
import {Button, SafeAreaView,TextInput, StyleSheet, Text, View} from "react-native";
import { RadioButton } from 'react-native-paper';



export default function BMICalculator() {

    const [heightFeet, setHeightFeet] = useState(0);
    const [heightInches, setHeightInches] = useState(0);
    const [heightCm, setHeightCm] = useState(0);

    const [massStone, setMassStone] = useState(0);
    const [massStoneLbs, setMassStoneLbs] = useState(0);
    const [massLBS, setMassLBS] = useState(0);
    const [massKG, setMassKG] = useState(0);

    const [age, setAge] = useState(0);
    const [checked, setChecked] = React.useState('');

    const [activity, setActivity] = React.useState('');

    const [bmi, setBmi] = useState(0);

    const calculate = () => {
         console.log(checked)
         console.log(age)
         console.log(massStone)
         console.log(heightFeet)
         console.log(heightInches)

        const formValid = heightFeet > 0 &&  heightInches > 0 && massStone > 0;
        if (!formValid) {
            return;
        }

        //converts feet into inches
        const inchCalc = (heightFeet * 12) + heightInches

        //converts stone & lbs into kg
        let weightCalc = (massStone * 14) + massStoneLbs
        weightCalc *= 0.45

        //Calcs BMI
        const bmi = weightCalc / (inchCalc) ** 2;

        setBmi(bmi);
        console.log(bmi)
    }

    return(
        <View style = {styles.container}>
            <Text>Enter Height:  </Text>
            <TextInput
                keyboardType = 'numeric'
                style ={styles.input}
                placeholder = 'Feet'
                onChangeText = {(height) => setHeightFeet(height)}
            />

            <TextInput
                keyboardType = 'numeric'
                style ={styles.input}
                placeholder = 'Inches'
                onChangeText = {(height2) => setHeightInches(height2)}
            />

            <Text>Enter Weight:  </Text>
            <TextInput
                keyboardType = 'numeric'
                style ={styles.input}
                placeholder = 'Stone'
                onChangeText = {(Weight) => setMassStone(Weight)}
            />

            <TextInput
                keyboardType = 'numeric'
                style ={styles.input}
                placeholder = 'Pounds'
                onChangeText = {(Weight2) => setMassStoneLbs(Weight2)}
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
                    <RadioButton.Item label="Low Activity Levels - Less that 30 minutes a week" value="low" />
                    <RadioButton.Item label="Average Activity Levels - Between 30-60 minutes a week" value="average" />
                    <RadioButton.Item label="High Activity Levels - More than 60 minutes a week" value="high" />
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