import React, {useState, useEffect} from 'react';
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
    TouchableWithoutFeedback, TextInput
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
import { useRoute } from '@react-navigation/native';
import CustomStatusBar from "../CustomComponents/statusBar";
import {doc, getDoc} from "firebase/firestore/lite";
import {authentication, db} from "../firebase/firebase-config";

export default function GoalsAchievements({navigation, route}) {
    const homePressedHandler = () => navigation.navigate('Homepage');
    const menBodyShapePressedHandler = () => navigation.navigate('ChooseMenBodyShape');
    const womenBodyShapePressedHandler = () => navigation.navigate('ChooseWomenBodyShape');

    const [openModal, setOpenModal] = useState(false);

    const [sex, setSex] = React.useState('Male');

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

    const getUserData = async () =>{

        const docRef = doc(db, "users", authentication.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }

        setSex(docSnap.get("sex"));

        console.log("get user data finished")
    }


    useEffect(() => {
        getUserData();
    }, []);

    return (

        <SafeAreaView style={styles.container}>

            <CustomStatusBar/>

            <TouchableOpacity onPress={homePressedHandler} style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                <Image style={{width: 25, height: 25, marginVertical: 30, marginRight: 10,}}
                       source={require('../assets/img/angle-left.png')}/>

                <Text style={{
                    textDecorationLine: 'underline', alignSelf: 'center',
                    fontFamily: 'Righteous_400Regular', color: '#424242', fontSize: 16.5,
                }}>
                    Dashboard
                </Text>
            </TouchableOpacity>

            <ScrollView showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false} alwaysBounceVertical={true}
                        style={{width: '95%',}}>

                <View>
                    <Text style={[caloriesStyles.foodAddTitle, {marginTop: 15, textAlign: 'center'}]}>What body shape would you like to achieve?</Text>
                </View>

                <View>
                    {sex === 'Male' ? (<TouchableOpacity
                        style={goalsStyles.buttonStyle}
                        onPress={menBodyShapePressedHandler}
                    >
                        <Text style={goalsStyles.buttonTextStyle}>Choose body shape for men</Text>
                    </TouchableOpacity>) : null}
                </View>


                <View>
                    {sex === 'Female' ? (<TouchableOpacity
                        style={goalsStyles.buttonStyleWoman}
                        onPress={womenBodyShapePressedHandler}
                    >
                        <Text style={goalsStyles.buttonTextStyle}>Choose body shape for women</Text>
                    </TouchableOpacity>) : null}
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

                <Text style={[caloriesStyles.foodAddTitle, {marginTop: 40, textAlign: 'center'}]}>Record your fitness goals and achievements</Text>

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

    buttonStyleWoman: {
        display: 'flex',
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#4e2f9e',
        shadowColor: '#580961',
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