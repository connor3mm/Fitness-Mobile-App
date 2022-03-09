import React, {useState} from 'react';
import {Button, SafeAreaView, TextInput, StyleSheet, Text, View} from "react-native";
import {RadioButton} from 'react-native-paper';


export default function BMICalculator() {

    //height values
    const [heightType, setHeightType] = useState('feet');

    const [heightFeet, setHeightFeet] = useState(0);
    const [heightInches, setHeightInches] = useState(0);
    const [heightCm, setHeightCm] = useState(0);

    //weight values
    const [weightType, setWeightType] = useState('stone');

    const [massStone, setMassStone] = useState(0);
    const [massStoneLbs, setMassStoneLbs] = useState(0);
    const [massLBS, setMassLBS] = useState(0);
    const [massKG, setMassKG] = useState(0);

    //age values
    const [age, setAge] = useState(0);

    //sex values
    const [checked, setChecked] = React.useState('');

    //activity level value
    const [activity, setActivity] = React.useState('');

    //BMI value
    const [bmi, setBmi] = useState(0);


    const calculate = () => {
        console.log(checked)
        console.log(age)
        console.log(massStone)
        console.log(heightFeet)
        console.log(heightInches)
        console.log(activity)
        console.log(heightType)
        console.log(weightType)

        // const formValid = heightFeet > 0 && heightInches > 0 && massStone > 0;
        // if (!formValid) {
        //     return;
        // }

        let inchCalc
        //converts feet into inches
        if (heightType === 'feet') {
            inchCalc = parseInt(heightFeet * 12) + parseInt(heightInches)
        } else {
            inchCalc = (heightCm * 0.4)
        }


        //converts stone & lbs into lbs
        let weightCalc
        if (weightType === 'stone') {
            weightCalc = (parseInt(massStone) + parseInt(massStoneLbs) / 10)
            weightCalc *= 14

        } else if (weightType === 'LBS') {
            weightCalc = parseInt(massLBS)

        } else {
            weightCalc = parseInt(massKG * 2.2)
        }

        //Calcs BMI
        const bmiCalc = Math.floor((weightCalc / (inchCalc ** 2)) * 703);

        setBmi(bmiCalc);
        console.log(bmiCalc)
    }

    return (
        <View style={styles.container}>

            <View style={styles.radio}>
                <RadioButton.Group onValueChange={heightType => setHeightType(heightType)} value={heightType}>
                    <RadioButton.Item label="Feet" value="feet"/>
                    <RadioButton.Item label="CM" value="cm"/>
                </RadioButton.Group>
            </View>

            <Text>Enter Height: </Text>
            <View>

                {heightType === 'feet' ? (
                    <TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder='Feet'
                        onChangeText={(height) => setHeightFeet(height)}
                    />) : null}

                {heightType === 'feet' ? (
                    <TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder='Inches'
                        onChangeText={(height2) => setHeightInches(height2)}
                    />) : null}

            </View>


            <View>
                {heightType === 'cm' ? (
                    <TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder='Centimeters '
                        onChangeText={(height) => setHeightCm(height)}
                    />) : null}

            </View>

            <View style={styles.radio}>
                <RadioButton.Group style={styles.radio} onValueChange={weightType => setWeightType(weightType)}
                                   value={weightType}>
                    <RadioButton.Item label="Stone" value="stone"/>
                    <RadioButton.Item label="Pounds" value="LBS"/>
                    <RadioButton.Item label="Kilograms" value="KG"/>
                </RadioButton.Group>
            </View>

            <Text>Enter Weight: </Text>
            <View>
                {(weightType === 'stone') ? (
                    <TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder='Stone'
                        onChangeText={(Weight) => setMassStone(Weight)}
                    />) : null}

                {(weightType === 'stone') ? (
                    <TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder='Pounds'
                        onChangeText={(Weight2) => setMassStoneLbs(Weight2)}
                    />) : null}
            </View>

            <View>

                {(weightType === 'LBS') ? (
                    <TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder='Pounds'
                        onChangeText={(Weight) => setMassLBS(Weight)}
                    />) : null}
            </View>

            <View>

                {weightType === "KG" ? (
                    <TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder='Kilograms'
                        onChangeText={(Weight) => setMassKG(Weight)}
                    />) : null}
            </View>


            <Text>Enter Age: </Text>
            <TextInput
                keyboardType='numeric'
                style={styles.input}
                placeholder='Age'
                onChangeText={(Age) => setAge(Age)}
            />

            <View style={styles.radio}>
                <Text>Choose your Sex: </Text>

                <RadioButton.Group onValueChange={checked => setChecked(checked)} value={checked}>
                    <RadioButton.Item label="Male" value="first"/>
                    <RadioButton.Item label="Female" value="second"/>
                </RadioButton.Group>
            </View>


            <View style={styles.radio}>
                <Text>Choose your Activity level: </Text>

                <RadioButton.Group onValueChange={activity => setActivity(activity)} value={activity}>
                    <RadioButton.Item label="Low Activity Levels - Less that 30 minutes a week" value="low"/>
                    <RadioButton.Item label="Average Activity Levels - Between 30-60 minutes a week" value="average"/>
                    <RadioButton.Item label="High Activity Levels - More than 60 minutes a week" value="high"/>
                </RadioButton.Group>
            </View>

            <Button style={styles.submit} backgroundColor="#FFFFFF" title="Calculate" onPress={calculate}/>

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
        alignItems: 'left',
        justifyContent: 'left',
        marginBottom: 25,
        textAlign: 'center',
        paddingRight: 150,
    },

    submit: {
        marginTop: 100,
    },

});