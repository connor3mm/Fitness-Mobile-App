import React, {useState} from 'react';
import {Button, SafeAreaView, TextInput, StyleSheet, Text, View} from "react-native";
import {RadioButton} from 'react-native-paper';
import RadioGroup from 'react-native-radio-buttons-group';


const radioButtonsData2 = [{
    id: '1',
    label: 'Stone',
    value: 'stone'
}, {
    id: '2',
    label: 'Pounds',
    value: 'pounds'
}]

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



    const [radioButtons2, setRadioButtons2] = useState(radioButtonsData2)



    function onPressRadioButton2(radioButtonsArray2) {
        setRadioButtons2(radioButtonsArray2);
        setWeightType(!weightType);
    }


    // let radioHandler = (status) => {
    //     this.setState({ status });
    // };

    const calculate = () => {
        console.log(checked)
        console.log(age)
        console.log(massStone)
        console.log(heightFeet)
        console.log(heightInches)
        console.log(activity)
        console.log(heightType)
        console.log(weightType)

        const formValid = heightFeet > 0 && heightInches > 0 && massStone > 0;
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

    return (
        <View style={styles.container}>

            <RadioButton.Group  onValueChange={heightType => setHeightType(heightType)} value={heightType}>
                <RadioButton.Item label="Feet" value="feet" />
                <RadioButton.Item label="CM" value="cm" />
            </RadioButton.Group>




            <Text>Enter Height: </Text>
            <View>

                {heightType === 'feet' ? (
                    <TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder='Feet'
                        onChangeText={(height) => setHeightFeet(height)}
                    />) : null}

                {heightType  === 'feet' ? (
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


            <RadioButton.Group onValueChange={weightType => setWeightType(weightType)} value={weightType}>
                <RadioButton.Item label="Stone" value="stone"/>
                <RadioButton.Item label="Pounds" value="LBS"/>
                <RadioButton.Item label="Kilograms" value="KG"/>
            </RadioButton.Group>


            {/*<RadioGroup*/}
            {/*    radioButtons={radioButtons2}*/}
            {/*    onPress={onPressRadioButton2}*/}
            {/*/>*/}

            <Text>Enter Weight: </Text>
            <View>
                {(weightType === 'stone' )? (
                    <TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder='Stone'
                        onChangeText={(Weight) => setMassStone(Weight)}
                    />) : null}

                {(weightType === 'stone' ) ? (
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

            <View>
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

    emptyDisplay: {
        display: 'none',
    },

    radio: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        textAlign: 'center'
    },

});