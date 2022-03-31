import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Image, ScrollView} from "react-native";
import {RadioButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as yup from 'yup';
import {caloriesStyles} from './CalorieCounterPage';
import {styles} from './Welcomepage';
import {styling} from './Homepage';
import { authentication } from '../firebase/firebase-config';
import { db } from '../firebase/firebase-config';
import {updateDoc, doc} from "firebase/firestore/lite";

const validation = yup.object({
    GoalAchievement: yup.string().required().min(2),
});

export default function GoalsAchievementsFormPage({addGoalsAchievements}) {

    const uid = authentication.currentUser.uid;        

    const setData = async (values, type) => {
        try {      
            if(type ==="Goals"){
                await updateDoc(doc(db, "users", uid), {
                    [`goals.${values.GoalAchievement}`]: values,});
            }

            if(type ==="Achievements"){
                await updateDoc(doc(db, "users", uid), {
                    [`achievements.${values.GoalAchievement}`]: values,});
            }

            console.log("added successfully");
            
        } catch (error) {
        console.log("error adding document", error.message);
            }
        };

    const [type, setType] = useState('0');

    return (
        <SafeAreaView style={formStyles.container}>

            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <Formik
                    initialValues={{GoalAchievement: ''}}
                    validationSchema={validation}
                    onSubmit={(values) => {
                        if (type <= '0') {
                            setType('');
                            return
                        }
                        setData(values, type);
                        addGoalsAchievements(values, type);
                    }}>

                    {(formikProps) => (
                        <View>
                            <Text style={[caloriesStyles.caloriesItemsText,
                                {textAlign: 'center', color: '#4356FF', marginVertical: 12.5, fontSize: 22.5,}]}>
                                Add Goals & Achievements
                            </Text>

                            <View style={{flexDirection: 'row', marginVertical: 7.5, width: '100%',}}>
                                <Image style={{height: 35, width: 35, alignSelf: 'center'}}
                                       source={require('../assets/img/GoalsPictures/success.png')}/>

                                <TextInput
                                    style={[formStyles.inputStyle, caloriesStyles.caloriesItemsText]}
                                    placeholder='Goals and achievements'
                                    onChangeText={formikProps.handleChange('GoalAchievement')}
                                    value={formikProps.values.GoalAchievement}
                                    onBlur={formikProps.handleBlur('GoalAchievement')}/>
                            </View>

                            <View>
                                <Text style={[formStyles.errorMessage, caloriesStyles.caloriesItemsText]}>
                                    {formikProps.touched.GoalAchievement && formikProps.errors.GoalAchievement}
                                </Text>
                            </View>


                            <View style={{marginVertical: 35,}}>
                                <RadioButton.Group onValueChange={type => setType(type)} value={type}
                                                   id='radioGroup'>
                                    <RadioButton.Item style={[formStyles.radioInput,]} label="Goals"
                                                      value="Goals"/>
                                    <RadioButton.Item style={[formStyles.radioInput,]} label="Achievements"
                                                      value="Achievements"/>
                                </RadioButton.Group>
                            </View>

                            <View>
                                {type === '' ? (
                                    <Text style={[formStyles.errorMessage, caloriesStyles.caloriesItemsText]}>Please
                                        choose one</Text>) : null}
                            </View>

                            <TouchableOpacity activeOpacity={.7}
                                              style={[styles.button, styles.boxShadow, styles.signup, ]}
                                              onPress={formikProps.handleSubmit}>
                                <Text style={[styles.buttonText,]}> + Add Goals and Achievements</Text>
                            </TouchableOpacity>


                        </View>
                    )}
                </Formik>
            </ScrollView>

            <View style={{flexDirection: 'row', alignSelf: 'center', position: 'absolute', bottom: 15,}}>
                <Text style={{color: '#4356FF', fontFamily: 'Righteous_400Regular', fontSize: 16,}}>
                    FitMe
                </Text>
                <Image style={styling.logo} source={require('../assets/img/logo.png')}/>
            </View>
        </SafeAreaView>
    )
}

export const formStyles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 15,
    },

    inputStyle: {
        borderBottomColor: '#3777D9',
        borderBottomWidth: 2,
        fontSize: 15,
        marginVertical: 12.5,
        padding: 7.5,
        width: '80%',
        marginLeft: 10,
    },

    errorMessage: {
        color: '#d90f32',
        fontWeight: 'bold',
        marginBottom: 7.5,
        marginTop: 6,
        textAlign: 'center',
    },

    radioInput: {
        borderColor: '#4356FF',
        borderWidth: 2,
        borderRadius: 5,
        elevation: 3,
        shadowOffset: {width: 3, height: 3},
        shadowColor: '#3584e4',
        marginVertical: 10,
    },

})