import React, {useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Image,
    ScrollView,
} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import {Righteous_400Regular} from '@expo-google-fonts/righteous';
import {useFonts} from 'expo-font';
import {authentication} from '../firebase/firebase-config';
import {doc, setDoc} from "firebase/firestore/lite";
import {db} from '../firebase/firebase-config';
import {RadioButton} from "react-native-paper";


export default function registerFormPage({navigation}) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [targetSteps, setTargetSteps] = useState("");
    const [weight, setWeight] = useState("");

    const uid = authentication.currentUser.uid;


    const setData = async () => {
        //creates doc with the user info
        await setDoc(doc(db, "users", uid), {
            uid: uid,
            firstName: firstName,
            lastName: lastName,
            targetCalories: 0,
            dailyCalories: 0,
            consumedCalories: 0,
            goalSteps: 0,
            currentSteps: 0,
            totalCaloriesBreakfast: 0,
            totalCaloriesLunch: 0,
            totalCaloriesDinner: 0,
            weight: weight,
            age: age,
            sex: sex,
        });
    };


    const createTwoButtonAlert = () =>
        Alert.alert(
            "Registratioon Complete",
            "Your registration is now complete. Please click on the \"Continue\" button to redirect to the main menu",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Complete", onPress: () => {
                        navigation.navigate('Homepage');
                    }
                }
            ]
        );


    const alertAgeNaN = () =>
        Alert.alert(
            "",
            "Age is invalid, please use a positive number.",
            [
                {
                    text: "Okay",
                    style: "cancel"
                },
            ]
        );


    const alertWeightNaN = () =>
        Alert.alert(
            "",
            "Weight is invalid, please use a positive number.",
            [
                {
                    text: "Okay",
                    style: "cancel"
                },
            ]
        );

    const alertSexNaN = () =>
        Alert.alert(
            "",
            "Sex has Not been chosen.",
            [
                {
                    text: "Okay",
                    style: "cancel"
                },
            ]
        );

    const alertNameNaN = () =>
        Alert.alert(
            "",
            "First or Second name has not been inputted.",
            [
                {
                    text: "Okay",
                    style: "cancel"
                },
            ]
        );


    const combinedHandler = () => {
        if (firstName === "" || lastName === "") alertNameNaN();
        else if (isNaN(age) || age < 0 || age === "") alertAgeNaN();
        else if (isNaN(weight) || weight < 0 || weight === "") alertWeightNaN();
        else if (sex === "") alertSexNaN();
        else {
            setData();
            createTwoButtonAlert();
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <Text style={{
                marginBottom: '15%', fontFamily: 'Righteous_400Regular',
                fontSize: 20, textAlign: 'center', marginTop: 20
            }}>Please enter your information below</Text>
            <KeyboardAvoidingView behavior='padding'>

                <ScrollView showsVerticalScrollIndicator={false} style={{height: '70%',}}>

                    <View style={styles.inputText}>

                        <Text style={{
                            fontFamily: 'Righteous_400Regular',
                            color: '#3777D9', fontSize: 12.5, marginLeft: 30, marginTop: 15, marginBottom: -10
                        }}>First Name</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput style={styles.input} placeholder='John' value={firstName}
                                       onChangeText={text => setFirstName(text)}>
                            </TextInput>
                            <Image style={{width: 17.5, height: 17.5, alignSelf: 'center'}}
                                   source={require('../assets/img/user.png')}/>
                        </View>

                        <Text style={{
                            fontFamily: 'Righteous_400Regular',
                            color: '#3777D9', fontSize: 12.5, marginLeft: 30, marginTop: 15, marginBottom: -10
                        }}>Second name</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput style={styles.input} placeholder='Doe' value={lastName}
                                       onChangeText={text => setLastName(text)}>
                            </TextInput>
                            <Image style={{width: 17.5, height: 17.5, alignSelf: 'center'}}
                                   source={require('../assets/img/user.png')}/>
                        </View>


                        <Text style={{
                            fontFamily: 'Righteous_400Regular',
                            color: '#3777D9', fontSize: 12.5, marginLeft: 30, marginTop: 15, marginBottom: -10
                        }}>Age</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput style={styles.input} placeholder='18' value={age}
                                       onChangeText={text => setAge(text)}>
                            </TextInput>
                            <Image style={{width: 17.5, height: 17.5, alignSelf: 'center'}}
                                   source={require('../assets/img/age-group.png')}/>
                        </View>


                        <Text style={{
                            fontFamily: 'Righteous_400Regular',
                            color: '#3777D9', fontSize: 12.5, marginLeft: 30, marginTop: 15, marginBottom: -10
                        }}>Weight</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput style={styles.input} placeholder='Weight in KG' value={weight}
                                       onChangeText={text => setWeight(text)}>
                            </TextInput>
                            <Image style={{width: 17.5, height: 17.5, alignSelf: 'center'}}
                                   source={require('../assets/img/weight2.png')}/>
                        </View>

                        <Text style={{
                            fontFamily: 'Righteous_400Regular',
                            color: '#3777D9', fontSize: 12.5, marginLeft: 30, marginTop: 15, marginBottom: -10
                        }}>Sex</Text>
                        <RadioButton.Group
                            onValueChange={sex => setSex(sex)} value={sex}>
                            <RadioButton.Item label="Male" value="Male"/>
                            <RadioButton.Item label="Female" value="Female"/>
                        </RadioButton.Group>

                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '15%'}}>
                        <TouchableOpacity activeOpacity={.7} style={[styles.button, styles.boxShadow, styles.signup,]}
                                          onPress={combinedHandler}>
                            <Text style={[styles.buttonText,]}>Finish</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>

    )
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fbfc',
        alignItems: 'stretch',
    },

    input: {
        paddingTop: 2,
        paddingBottom: 5,
        margin: 30,
        marginTop: 20,
        marginRight: -20,
        //fontFamily: 'Righteous_400Regular',
        borderWidth: 0,
        borderBottomColor: '#4356FF',
        borderBottomWidth: 1.5,
        fontSize: 15,
        width: '80%'
    },

    button: {
        alignItems: 'center',
        //fontFamily: 'Righteous_400Regular',
        padding: 15,
        width: '60%',
        borderWidth: .5,
        borderRadius: 5,
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        //fontFamily: 'Righteous_400Regular'
    },

    boxShadow: {
        // add box shadow to iOS devices
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 1,
        // add box shadows to android devices
        elevation: 1,
    },

    signup: {
        backgroundColor: '#4356FF',
        borderColor: '#4356FF',
        shadowColor: 'black',
    },
});