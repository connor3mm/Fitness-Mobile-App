import React, {useState} from 'react';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView,
    TouchableOpacity,
    Image,
    Vibration,
    Platform
} from "react-native";
import { styling } from './Homepage';
import { RadioButton } from 'react-native-paper';
import { styles } from "./Welcomepage";
import { caloriesStyles } from './CalorieCounterPage';
import { setttingStyles } from './SettingsPage';
import CustomStatusBar from '../CustomComponents/statusBar';

export default function BMICalculator({navigation}) {
    const homePressedHandler = () => navigation.navigate('Homepage');

    //height values
    const [heightType, setHeightType] = useState('feet');

    const [heightFeet, setHeightFeet] = useState(-1);
    const [heightInches, setHeightInches] = useState(0);
    const [heightCm, setHeightCm] = useState(-1);

    //weight values
    const [weightType, setWeightType] = useState('stone');

    const [massStone, setMassStone] = useState(-1);
    const [massStoneLbs, setMassStoneLbs] = useState(0);
    const [massLBS, setMassLBS] = useState(-1);
    const [massKG, setMassKG] = useState(-1);

    //age values
    const [age, setAge] = useState(0);

    //sex values
    const [checked, setChecked] = React.useState('0');

    //activity level value
    const [activity, setActivity] = React.useState('');

    //BMI value
    let [bmi, setBmi] = useState(0);



    const vibrate = () => {
        if (Platform.OS === "ios") {
            const interval = setInterval(() => Vibration.vibrate(), 500);
            setTimeout(() => clearInterval(interval), 1000);
        } else {

            Vibration.vibrate(500);
        }
    };

    /**
     * checks the form to validate inputs
     * @returns {boolean}
     */
    const fullFormValidation = () => {
        let formValidation = true;

        //sex validation
        if (checked === "0") {
            setChecked('');
            formValidation = false;
        }

        //height Validation
        let feetValidation = heightType === 'feet' && (heightFeet === -1 || heightFeet <= 0);
        let cmValidation = heightType === 'cm' && (heightCm === -1 || heightCm <= 0);

        if (feetValidation) {
            setHeightFeet(0);
            formValidation = false;
        }

        if (cmValidation) {
            setHeightCm(0);
            formValidation = false;
        }

        //weight Validation
        let stoneValidation = weightType === 'stone' && (massStone === -1 || massStone <= 0);
        let lbsValidation = weightType === 'LBS' && (massLBS === -1 || massLBS <= 0);
        let kgValidation = weightType === 'KG' && (massKG === -1 || massKG <= 0);

        if (stoneValidation) {
            setMassStone(0);
            formValidation = false;
        }

        if (lbsValidation) {
            setMassLBS(0);
            formValidation = false;
        }

        if (kgValidation) {
            setMassKG(0);
            formValidation = false;
        }

        //age validation
        if (age !== 0 && (age <= 0 || age >= 120)) {
            setAge(-1);
            formValidation = false;
        }

        return formValidation;
    };


    /**
     * calculates BMI with height, weight and sex as a minimum, age and activity levels optional
     */
    const calculate = () => {

        let formValidation = fullFormValidation();

        //cancel calculation if validation is false
        if (!formValidation) return;

        let inchCalc;

        //converts feet into inches
        if (heightType === 'feet') {
            inchCalc = parseInt(heightFeet * 12) + parseInt(heightInches);
        } else {
            inchCalc = (heightCm * 0.4);
        }

        //converts stone & lbs into lbs
        let weightCalc;
        if (weightType === 'stone') {
            weightCalc = (parseInt(massStone) + parseInt(massStoneLbs) / 10);
            weightCalc *= 14;

        } else if (weightType === 'LBS') {
            weightCalc = parseInt(massLBS);

        } else {
            weightCalc = parseInt(massKG * 2.2);
        }

        //Calculates BMI
        bmi = Math.floor((weightCalc / (inchCalc ** 2)) * 703);
        displayMessage(bmi);
    };


    /**
     * Creates the alert display message
     * @param bmi
     */
    const displayMessage = (bmi) => {
        //variables
        let weight = '';
        let activityMessage = '';
        let ageMessage = '';

        //Check if user is male or female
        if (checked === 'first') {
            weight = maleBMI(bmi);
        } else {
            weight = femaleBMI(bmi);
        }

        //create activity message
        activityMessage = activityOutputMessage(activity);

        //create age message
        ageMessage = ageOutputMessage(age);

        //create final message
        let message = "\nYour BMI calculation is: " + bmi + "\n\n This puts you into the category of: " + weight + ageMessage + activityMessage;
        vibrate();
        //Output for the Alert
        Alert.alert("BMI Results!", message, [

            {text: "Close", onPress: () => console.log("Close Pressed")}]);
    };


    /**
     * Creates activity message
     * @param activity
     * @returns {string}
     */
    const activityOutputMessage = (activity) => {
        let activityMessage = '';
        if (activity === 'low') activityMessage = '\n\nWe recommend increasing your activity levels to an average or higher level';

        if (activity === 'average') activityMessage = '\n\nActivity levels are at a good standard, Keep going! ';

        if (activity === 'high') activityMessage = '\n\nActivity Levels are at a great standard, Keep it up!';

        return activityMessage;
    };


    /**
     * Creates age message
     * @param age
     * @returns {string}
     */
    const ageOutputMessage = (age) => {
        let ageMessage = '';

        if (age < 18 && age > 1) {
            ageMessage = "\n\nFor your age, we recommend focusing on adding more nutrition to your diet.";
        } else if (age >= 18 && age < 60) {
            ageMessage = "\n\nFor your age, we recommend focusing on high activity levels and improved nutrition.";
        } else if (age >= 60) {
            ageMessage = "\n\nFor your age, we recommend focusing on low intensity activity and improved nutrition.";
        }

        return ageMessage;
    };


    /**
     * calculates male bmi output
     * @param bmi
     * @returns {string}
     */
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
    };


    /**
     * calculates female bmi output
     * @param bmi
     * @returns {string}
     */
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
    };


    /**
     * resets height values if radio button changes
     * @param heightType
     */
    const resetHeightValue = (heightType) => {
        setHeightType(heightType);
        setHeightFeet(-1);
        setHeightInches(0);
        setHeightCm(-1);
    };

    /**
     * resets weight value if radio button changes
     * @param weightType
     */
    const resetWeightValue = (weightType) => {
        setWeightType(weightType);
        setMassStone(-1);
        setMassStoneLbs(0);
        setMassLBS(-1);
        setMassKG(-1);
    };


    return (
        <SafeAreaView style={styles.container}>
        
            <TouchableOpacity onPress={homePressedHandler} style={{ flexDirection: 'row', alignSelf: 'flex-start'}}>
                <Image style={{ width: 25, height: 25, marginVertical: 30, marginRight: 10,}} 
                source={require('../assets/img/angle-left.png')}/>

                <Text style={{ textDecorationLine: 'underline', alignSelf: 'center', 
                fontFamily: 'Righteous_400Regular', color: '#424242', fontSize: 16.5,}}>
                    Dashboard
                </Text>
            </TouchableOpacity>


            <ScrollView showsVerticalScrollIndicator={false} style={{height: '90%',}}>

                <Text style={[caloriesStyles.caloriesItemsText, setttingStyles.title]}>BMI Calculator</Text>  

                <Text style={[styling.blackText, BMIstyles.sectionHeading,]}>Enter Height: </Text>

                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', alignItems: 'center',}}>
                        {heightType === 'feet' ? (<TextInput
                            contextMenuHidden={true}
                            keyboardType='numeric'
                            style={[BMIstyles.input, BMIstyles.shortInput]}
                            placeholder='Feet'
                            onChangeText={(height) => setHeightFeet(height)}
                        />) : null}

                        {heightType === 'feet' ? (<TextInput
                            contextMenuHidden={true}
                            keyboardType='numeric'
                            style={[BMIstyles.input, BMIstyles.shortInput]}
                            placeholder='Inches'
                            onChangeText={(height2) => setHeightInches(height2)}
                        />) : null}


                    </View>


                    <View>
                        {heightType === 'cm' ? (<TextInput
                            contextMenuHidden={true}
                            keyboardType='numeric'
                            style={[BMIstyles.input,]}
                            placeholder='Centimeters '
                            onChangeText={(height) => setHeightCm(height)}
                        />) : null}


                    </View>

                    <View style={BMIstyles.radio}>
                        <RadioButton.Group onValueChange={heightType => resetHeightValue(heightType)}
                                           value={heightType}>
                            <RadioButton.Item label="Feet" value="feet"/>
                            <RadioButton.Item label="CM" value="cm"/>
                        </RadioButton.Group>
                    </View>

                </View>

                <View>
                    {heightFeet === 0 ? (
                        <Text style={BMIstyles.errorMessage}>Please fill Feet input box with a positive
                            integer</Text>) : null}
                </View>

                <View>
                    {heightCm === 0 ? (
                        <Text style={BMIstyles.errorMessage}>Please fill CM input box with a positive
                            integer</Text>) : null}
                </View>

                <Text style={[styling.blackText, BMIstyles.sectionHeading]}>Enter Weight: </Text>

                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', alignItems: 'center',}}>
                        {(weightType === 'stone') ? (<TextInput
                            contextMenuHidden={true}
                            keyboardType='numeric'
                            style={BMIstyles.input}
                            placeholder='Stone'
                            onChangeText={(Weight) => setMassStone(Weight)}
                        />) : null}

                        {(weightType === 'stone') ? (<TextInput
                            contextMenuHidden={true}
                            keyboardType='numeric'
                            style={[BMIstyles.input]}
                            placeholder='Pounds'
                            onChangeText={(Weight2) => setMassStoneLbs(Weight2)}
                        />) : null}


                    </View>

                    <View>
                        {(weightType === 'LBS') ? (<TextInput
                            contextMenuHidden={true}
                            keyboardType='numeric'
                            style={BMIstyles.input}
                            placeholder='Pounds'
                            onChangeText={(Weight) => setMassLBS(Weight)}
                        />) : null}


                    </View>

                    <View>
                        {weightType === "KG" ? (<TextInput
                            contextMenuHidden={true}
                            keyboardType='numeric'
                            style={BMIstyles.input}
                            placeholder='Kilograms'
                            onChangeText={(Weight) => setMassKG(Weight)}
                        />) : null}


                    </View>


                    <View>
                        <RadioButton.Group style={BMIstyles.radio}
                                           onValueChange={weightType => resetWeightValue(weightType)}
                                           value={weightType}>
                            <RadioButton.Item label="Stone" value="stone"/>
                            <RadioButton.Item label="Pounds" value="LBS"/>
                            <RadioButton.Item label="Kilograms" value="KG"/>
                        </RadioButton.Group>
                    </View>

                </View>


                <View>
                    {massStone === 0 ? (
                        <Text style={BMIstyles.errorMessage}>Please fill Stone input box with a positive
                            integer</Text>) : null}
                </View>

                <View>
                    {massLBS === 0 ? (
                    <Text style={BMIstyles.errorMessage}>Please fill Pounds input box with a positive
                        integer</Text>) : null}
                </View>

                <View>
                    {massKG === 0 ? (
                        <Text style={BMIstyles.errorMessage}>Please fill Kilogram input box with a positive
                            integer</Text>) : null}

                </View>



                <View>
                    <Text style={[styling.blackText, BMIstyles.sectionHeading]}>Enter Age (Optional): </Text>

                    <View style={{
                        width: '100%', flex: 1, flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                        <TextInput
                            contextMenuHidden={true}
                            keyboardType='numeric'
                            style={[BMIstyles.input,]}
                            placeholder='Age'
                            onChangeText={(Age) => setAge(Age)}
                        />
                    </View>

                    <View>
                        {age === -1 ? (
                            <Text style={BMIstyles.errorMessage}>Please fill age with a positive
                                integer between 1-120</Text>) : null}
                    </View>
                </View>

                
                <View>
                    <Text style={[styling.blackText, BMIstyles.sectionHeading]}>Choose your Sex: </Text>

                    <View style={{
                        width: '100%', flex: 1, flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                        <RadioButton.Group
                            onValueChange={checked => setChecked(checked)} value={checked}>
                            <RadioButton.Item label="Male" value="first"/>
                            <RadioButton.Item label="Female" value="second"/>
                        </RadioButton.Group>
                    </View>

                </View>

                <View>
                    {checked === '' ? (<Text style={BMIstyles.errorMessage}>Please choose a sex</Text>) : null}
                </View>


                <View>
                    <Text style={[styling.blackText, BMIstyles.sectionHeading]}>
                        Choose your Activity level (Optional): </Text>

                    <RadioButton.Group onValueChange={activity => setActivity(activity)} value={activity}>
                        <RadioButton.Item style={{ color: 'red',}} label="Low - Less that 30 minutes a week" value="low"/>
                        <RadioButton.Item label="Average - Between 30-60 minutes a week" value="average"/>
                        <RadioButton.Item label="Highs - More than 60 minutes a week" value="high"/>
                    </RadioButton.Group>
                </View>

            <TouchableOpacity style={BMIstyles.submit} onPress={calculate}>
                <Text style={[styling.whiteText,{ textAlign: 'center'}]}>Calculate BMI</Text>
            </TouchableOpacity>

            </ScrollView>

        </SafeAreaView>
    );
}


export const BMIstyles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 150,
        alignItems: 'center',
    },

    shortInput: {
        // width: '45%',
    },

    homeButton: {
        width: 35,
        height: 35, 
        alignSelf: 'center',
    },

    sectionTitle: {
        fontSize: 30,
        margin: 20.5,
    },

    sectionHeading: { 
        textAlign: 'center',
        margin: 25,
        fontSize: 19,
        color: '#3777D9',
    },

    activity: {
        flex: 1,
        marginBottom: 25,
        textAlign: 'center',
        paddingRight: 150,
        paddingBottom: 60,
    },

    alignText:{
        textAlign: 'center',
    },

    errorMessage: {
        color: '#d90f32',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
    },

    submit: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: '#b3b3b3',
        shadowOpacity: 1,
        shadowRadius: 22.5,
        elevation: 3,

        padding: 15,
        marginVertical: 20,
        backgroundColor: '#3777D9',
        borderRadius: 5,
    },

    radio: {
        justifyContent: 'flex-start',
    },
})
