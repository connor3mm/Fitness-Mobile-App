import React, {useState} from 'react';
import {Button, SafeAreaView, TextInput, StyleSheet, Text, View, Alert, ScrollView} from "react-native";
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
    let [bmi, setBmi] = useState(0);


    const calculate = () => {

        // const formValid = heightFeet > 0 && heightInches > 0 && massStone > 0;
        let inchCalc
        //converts feet into inches
        if (heightType === 'feet') {
            inchCalc = parseInt(heightFeet * 12) + parseInt(heightInches);
        } else {
            inchCalc = (heightCm * 0.4);
        }

        //converts stone & lbs into lbs
        let weightCalc
        if (weightType === 'stone') {
            weightCalc = (parseInt(massStone) + parseInt(massStoneLbs) / 10);
            weightCalc *= 14;

        } else if (weightType === 'LBS') {
            weightCalc = parseInt(massLBS);

        } else {
            weightCalc = parseInt(massKG * 2.2);
        }

        // if (!formValid) {
        //     return;
        // }

        //Calcs BMI
        bmi = Math.floor((weightCalc / (inchCalc ** 2)) * 703);
        displayMessage(bmi);
    }


    const displayMessage = (bmi) => {

        let weight = '';
        let activityMessage = ''
        let ageMessage = ''

        if (checked === 'first') {
            weight = maleBMI(bmi);
        } else {
            weight = femaleBMI(bmi);
        }

        activityMessage = activityOutputMessage(activity);

        ageMessage = ageOutputMessage(age);

        let message = "\nYour BMI calculation is: " + bmi + "\n\n This puts you into the category of: " + weight + ageMessage + activityMessage;


        Alert.alert("BMI Results!", message, [

            {text: "Close", onPress: () => console.log("Close Pressed")}]);
    }

    const activityOutputMessage = (activity) => {
        let activityMessage = ''
        if (activity === 'low') {
            activityMessage = '\n\nWe recommend increasing your activity levels to an average or higher level'
        }
        if (activity === 'average') {
            activityMessage = '\n\nActivity levels are at a good standard, Keep going! '
        }
        if (activity === 'high') {
            activityMessage = '\n\nActivity Levels are at a great standard, Keep it up!'
        }

        return activityMessage;
    }

    const ageOutputMessage = (age) => {
        let ageMessage = ''

        if (age < 18 && age > 1) {
            ageMessage = "\n\nFor your age, we recommend focusing on adding more nutrition to your diet."
        } else if (age >= 18 && age < 60) {
            ageMessage = "\n\nFor your age, we recommend focusing on high activity levels and improved nutrition.";
        } else if (age >= 60) {
            ageMessage = "\n\nFor your age, we recommend focusing on low intensity activity and improved nutrition.";
        }

        return ageMessage;
    }

    const maleBMI = (bmi) => {

        let weight = '';
        if (bmi < 18.5) {
            weight = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 25) {

            weight = 'Normal Weight';
        } else if (bmi >= 25 && bmi < 30) {

            weight = 'Overweight';
        } else if (bmi >= 30 && bmi < 35) {
            weight = 'Severe Overweight';
        } else if (bmi >= 35) {
            weight = 'Obesity';
        } else {
            weight = 'BMI Could not be calculated';
        }

        return weight;
    }

    const femaleBMI = (bmi) => {

        let weight = '';
        if (bmi < 17.5) {
            weight = 'Underweight';
        } else if (bmi >= 17.5 && bmi < 24) {

            weight = 'Normal Weight';
        } else if (bmi >= 24 && bmi < 29) {

            weight = 'Overweight';
        } else if (bmi >= 29 && bmi < 34) {
            weight = 'Severe Overweight';
        } else if (bmi >= 34) {
            weight = 'Obesity';
        } else {
            weight = 'BMI Could not be calculated';
        }

        return weight;
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.radio}>
                    <RadioButton.Group onValueChange={heightType => setHeightType(heightType)} value={heightType}>
                        <RadioButton.Item label="Feet" value="feet"/>
                        <RadioButton.Item label="CM" value="cm"/>
                    </RadioButton.Group>
                </View>

                <Text>Enter Height: </Text>
                <View>

                    {heightType === 'feet' ? (<TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder='Feet'
                        onChangeText={(height) => setHeightFeet(height)}
                    />) : null}

                    {heightType === 'feet' ? (<TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder='Inches'
                        onChangeText={(height2) => setHeightInches(height2)}
                    />) : null}

                </View>


                <View>
                    {heightType === 'cm' ? (<TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder='Centimeters '
                        onChangeText={(height) => setHeightCm(height)}
                    />) : null}

                </View>

                <View>
                    <RadioButton.Group style={styles.radio} onValueChange={weightType => setWeightType(weightType)}
                                       value={weightType}>
                        <RadioButton.Item label="Stone" value="stone"/>
                        <RadioButton.Item label="Pounds" value="LBS"/>
                        <RadioButton.Item label="Kilograms" value="KG"/>
                    </RadioButton.Group>
                </View>

                <Text>Enter Weight: </Text>
                <View>
                    {(weightType === 'stone') ? (<TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder='Stone'
                        onChangeText={(Weight) => setMassStone(Weight)}
                    />) : null}

                    {(weightType === 'stone') ? (<TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder='Pounds'
                        onChangeText={(Weight2) => setMassStoneLbs(Weight2)}
                    />) : null}
                </View>

                <View>

                    {(weightType === 'LBS') ? (<TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder='Pounds'
                        onChangeText={(Weight) => setMassLBS(Weight)}
                    />) : null}
                </View>

                <View>

                    {weightType === "KG" ? (<TextInput
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

                <View>
                    <Text>Choose your Sex: </Text>

                    <RadioButton.Group onValueChange={checked => setChecked(checked)} value={checked}>
                        <RadioButton.Item label="Male" value="first"/>
                        <RadioButton.Item label="Female" value="second"/>
                    </RadioButton.Group>
                </View>


                <View>
                    <Text>Choose your Activity level: </Text>

                    <RadioButton.Group onValueChange={activity => setActivity(activity)} value={activity}>
                        <RadioButton.Item label="Low Activity Levels - Less that 30 minutes a week" value="low"/>
                        <RadioButton.Item label="Average Activity Levels - Between 30-60 minutes a week"
                                          value="average"/>
                        <RadioButton.Item label="High Activity Levels - More than 60 minutes a week" value="high"/>
                    </RadioButton.Group>
                </View>

                <Button style={styles.submit} backgroundColor="#FFFFFF" title="Calculate" onPress={calculate}/>
            </ScrollView>
        </View>

    );
}


const styles = StyleSheet.create({
    input: {
        borderWidth: 1, borderColor: '#777', padding: 8, margin: 10, width: 200,
    },

    activity: {
        flex: 1,
        marginBottom: 25, textAlign: 'center', paddingRight: 150, paddingBottom: 60,
    },

});
