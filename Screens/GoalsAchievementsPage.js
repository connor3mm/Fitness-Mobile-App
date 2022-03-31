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
    StatusBar,
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
import { setttingStyles } from './SettingsPage';
import GoalsAchievementsForm from "./GoalsAchievementsForm";
import CustomStatusBar from "../CustomComponents/statusBar";
import { Righteous_400Regular } from '@expo-google-fonts/righteous';
import {authentication, db} from "../firebase/firebase-config";
import { useRoute } from '@react-navigation/native';
import { doc, getDoc, } from "firebase/firestore/lite";

export default function GoalsAchievements({navigation, route}) {

    const uid = authentication.currentUser.uid;

    const getUserData = async () => {
        const docRef = doc(db, "users", authentication.currentUser.uid);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());

          setSex(docSnap.get("sex"))
    
          //getting goals food items from DB
          const fitnessMapGoals = docSnap.data().goals;
    
          const arrayResultGoals = Object.keys(fitnessMapGoals).map((item) => {
            const fitnessMapItemGoals = fitnessMapGoals[item];
            return {
              GoalAchievement: item,
            };
          });
          setFitnessGoals(arrayResultGoals);


          const fitnessMapAchievements = docSnap.data().achievements;
    
          const arrayResultAchievements = Object.keys(fitnessMapAchievements).map((item) => {
            const fitnessMapItemAchievements = fitnessMapAchievements[item];
            return {
              GoalAchievement: item,
            };
          });
          setFitnessAchievements(arrayResultAchievements);
        } else {
          console.log("No such document!");
        }
      };



          //Load data from DB for the card components into the App
    useEffect(() => {
        getUserData();
    },[])


    const homePressedHandler = () => navigation.navigate('Homepage');
    const menBodyShapePressedHandler = () => navigation.navigate('ChooseMenBodyShape');
    const womenBodyShapePressedHandler = () => navigation.navigate('ChooseWomenBodyShape');

    const [openModal, setOpenModal] = useState(false);

    const [sex, setSex] = React.useState();

    const [fitnessGoals, setFitnessGoals] = useState([]);

    const [fitnessAchievements, setFitnessAchievements] = useState([]);

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

            <Text style={[caloriesStyles.caloriesItemsText, setttingStyles.title, {textAlign: 'center'}]}>Goals & Achievements</Text>
            
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