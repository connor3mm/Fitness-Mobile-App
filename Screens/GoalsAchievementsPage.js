import React, {useState} from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal,
    Animated,
    FlatList,
    Dimensions,
    TouchableWithoutFeedback
} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import {LinearGradient} from 'expo-linear-gradient';
import {styling} from './Homepage';
import {styles} from "./Welcomepage";
import {BMIstyles} from './BMICalculatorPage';
import {formStyles} from './FoodForm';
import {caloriesStyles} from './CalorieCounterPage';
import {RadioButton} from 'react-native-paper';
import {MaterialIcons} from '@expo/vector-icons';
import CardComponent from "../CustomComponents/CardComponent";
import GoalsAchievementsForm from "./GoalsAchievementsForm";

export default function GoalsAchievements({navigation}) {
    const homePressedHandler = () => navigation.navigate('Homepage');
    const menBodyShapePressedHandler = () => navigation.navigate('ChooseMenBodyShape');
    const womenBodyShapePressedHandler = () => navigation.navigate('ChooseWomenBodyShape');

    const [goalChoice, setGoalChoice] = useState('0');
    const [openModal, setOpenModal] = useState(false);

    const [fitnessGoals, setFitnessGoals] = useState([
        {GoalAchievement: 'Lose weight', key: '1'},
        {GoalAchievement: 'Get fit', key: '2'},

    ]);

    const [fitnessAchievements, setFitnessAchievements] = useState([
        {GoalAchievement: 'Walked 10 km', key: '1'},
        {GoalAchievement: 'Lost 10 kg', key: '2'},

    ]);

    const addGoalsAchievements = (name, type) => {
        name.key = Math.random().toString();
        if (type === 'Goals') {
            setFitnessGoals((current) => {
                return [name, ...current];
            });
        }
        if (type === 'Achievements') {
            setFitnessAchievements((current) => {
                return [name, ...current];
            });
        }

        setOpenModal(false);
    };


    return (

        <SafeAreaView style={styles.container}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4356FF', '#3584e4']} locations={[0, 0.9]}
                            style={[styling.dashboard, styles.boxShadow]}>

                <View style={{
                    width: '100%', paddingTop: 50,
                    paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between'
                }}>

                    <TouchableOpacity style={{alignSelf: 'center', marginLeft: 20,}} onPress={homePressedHandler}>
                        <Image style={BMIstyles.homeButton} source={require('../assets/img/option.png')}/>
                        <Text style={{color: '#FFF'}}>Menu</Text>
                    </TouchableOpacity>

                    <Text style={[styling.smallText, BMIstyles.sectionTitle, goalsStyles.sectionTitle]}>Goals &
                        Achievements</Text>

                    <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                        <Text style={{
                            color: 'white', fontFamily: 'Righteous_400Regular',
                            alignSelf: 'center', margin: 5, fontSize: 20,
                        }}>Fit<Text style={[styles.blueText]}>Me</Text>
                        </Text>
                        <Image style={styling.logo} source={require('../assets/img/logo.png')}/>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false} alwaysBounceVertical={true}
                        style={{width: '95%',}}>

                <View>
                    <Text>What body shape would you like to achieve?</Text>
                    <TouchableOpacity
                        style={goalsStyles.buttonStyle}
                        onPress={menBodyShapePressedHandler}
                    >
                        <Text style={goalsStyles.buttonTextStyle}>Choose body shape for men</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={goalsStyles.buttonStyle}
                        onPress={womenBodyShapePressedHandler}
                    >
                        <Text style={goalsStyles.buttonTextStyle}>Choose body shape for women</Text>
                    </TouchableOpacity>
                </View>

                <Modal visible={openModal} animationType='slide'>
                    <TouchableWithoutFeedback>
                        <View style={caloriesStyles.modalText}>
                            <MaterialIcons
                                name='close'
                                size={24}
                                style={caloriesStyles.modalCloseStyle}
                                onPress={() => setOpenModal(false)}
                            />
                            <GoalsAchievementsForm addGoalsAchievements={addGoalsAchievements}/>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <Text style={caloriesStyles.foodAddTitle}>Record your fitness goals and achievements</Text>

                <MaterialIcons
                    name='add'
                    size={24}
                    style={caloriesStyles.modalStyle}
                    onPress={() => setOpenModal(true)}
                />


                <Text style={caloriesStyles.titleStyle}>Goals</Text>
                {fitnessGoals.map(item => (
                    <View key={item.key}>

                        <CardComponent>
                            <Text style={caloriesStyles.item}>{item.GoalAchievement}</Text>
                        </CardComponent>

                    </View>
                ))}

                <Text style={caloriesStyles.titleStyle}>Achievements</Text>
                {fitnessAchievements.map(item => (
                    <View key={item.key}>

                        <CardComponent>
                            <Text style={caloriesStyles.item}>{item.GoalAchievement}</Text>
                        </CardComponent>

                    </View>
                ))}


            </ScrollView>
        </SafeAreaView>

    )
}

export const goalsStyles = StyleSheet.create({
    sectionTitle: {
        fontSize: 21,
    },

    buttonStyle: {
        display: 'flex',
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#4356FF',
        shadowColor: '#4356FF',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },

    buttonTextStyle: {
        fontFamily: 'Righteous_400Regular',
        fontWeight: 'bold',
        color: 'white'
    },

})