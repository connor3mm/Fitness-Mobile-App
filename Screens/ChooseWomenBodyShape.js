import React, {useRef, useState, useEffect} from 'react';

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
    Dimensions
} from "react-native";
import styleSheet from "react-native-web/dist/exports/StyleSheet";
import {LinearGradient} from 'expo-linear-gradient';
import {styling} from './Homepage';
import {styles} from "./Welcomepage";
import {BMIstyles} from './BMICalculatorPage';
import {formStyles} from './FoodForm';
import {caloriesStyles} from './CalorieCounterPage';
import {goalsStyles} from './GoalsAchievementsPage';
import {RadioButton} from 'react-native-paper';
import {MaterialIcons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import { authentication } from '../firebase/firebase-config';
import { db } from '../firebase/firebase-config';
import {updateDoc, doc, getDoc} from "firebase/firestore/lite";

const {width, height} = Dimensions.get('screen');

const backgrounds = ['#e8cef6', '#caa6e0', '#a36ab3', '#e4aef3'];
const imagesData = [
    {
        "key": "0",
        "title": "She-Hulk",
        "description": "She-Hulk is extraordinarily strong and tough, able to leap great heights, and hold her own in a physical fight against some of the most formidable powerhouses on Earth. " +
            "Follow this workout routine to become strong like She-Hulk: Day 1: Bench Press, Day 2: Deadlift, Day 3: Military Press, Day 4: Squat Day, Day 5: Activity, Parkour and MMA, " +
            "Day 6: Full Body, Day 7: Rest Day.",
        "image": 'https://www.writeups.org/wp-content/uploads/She-Hulk-Marvel-Comics-Avengers-Fantastic-Four-Gisted.jpg'
    },
    {
        "key": "1",
        "title": "Wonder Woman",
        "description": "Wonder Woman is known for her confidence, bravery and physical strength. Follow this five-day workout routine to achieve that 'If No One Else Will Defend The World, Then I Must' look: " +
            "Day 1: HIIT, Legs, Core, Day 2: Chest, Back, Core, Day 3: HIIT arms, Outside shoulders, Core, Day 4: HIIT lower body, Core, " +
            "Day 5: Upper Body, Core, Day 6: Rest Day, Day 7: Rest Day.",
        "image": 'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/87775/89500/Wonder-Woman-DC-Comics-Justice-League-Lifesize-Cardboard-Cutout-available-now-at-starstills__73279.1461157082.jpg?c=2'
    },
    {
        "key": "2",
        "title": "Luisa Madrigal",
        "description": "A disney princess with big arms who can bench press. To look like her, you don't need magical strength. Try this Encanto-inspired workout: " +
            "Snatch: 4 x 6, Single-Arm Push Press: 4 x 6 per side, Overhead Suitcase Carry: 4 x 30 seconds per side, Front-Loaded Lateral Lunge: 4 x 10 per side, Kettlebell Flow: Row into Clean into Overhead Press into Overhead Squat: 2 x 3 flows per side.",
        "image": 'https://cdn11.bigcommerce.com/s-5ylnei6or5/images/stencil/500x659/products/2723/9018/3837_Luisa_DE_40__93267.1644958910.jpg?c=2'
    },
    {
        "key": "3",
        "title": "Mrs Incredible",
        "description": "Strong legs and elastic body, that's all we need! Follow these exercises in your workout to achieve that Elastigirl look: " +
            "Day 1: Total-body, Arms, Abs and Legs, Day 2: Outer-thighs, Glutes, Inner-thighs, Day 3: Legs and Glutes, Day 4: Inner-thighs and Mental Focus, Day 5: Rest Day, Day 6: Spinning 30 minutes, Day 7: Rest Day.",
        "image": 'https://static.wikia.nocookie.net/the-incredibles/images/c/c4/Elastigirl_Transparent.png/revision/latest?cb=20220216212432'
    }
]
const Indicator = ({scrollX}) => {
    return (
        <View style={{position: 'absolute', bottom: 120, flexDirection: 'row'}}>
            {imagesData.map((_, index) => {
                //prev slide, current slide and next slide
                const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.8, 1.4, 0.8],
                    extrapolate: 'clamp',
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.6, 1, 0.6],
                    extrapolate: 'clamp',
                });
                return (
                    <Animated.View
                        key={`indicator-${index}`}
                        style={{
                            height: 10,
                            width: 10,
                            borderRadius: 5,
                            backgroundColor: 'white',
                            margin: 5,
                            transform: [{scale}],
                            opacity,
                        }}
                    />
                );
            })}
        </View>
    );
};

const Backdrop = ({scrollX}) => {
    const backgroundColor = scrollX.interpolate({
        inputRange: backgrounds.map((_, index) => index * width),
        outputRange: backgrounds.map((bg) => bg),
    });
    return (
        <Animated.View
            style={[
                StyleSheet.absoluteFillObject,
                {
                    backgroundColor,
                },
            ]}
        />
    );
};

const Square = ({scrollX}) => {
    const mathFunction = Animated.modulo(Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),1);
    const rotate = mathFunction.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['35deg', '0deg', '35deg'],
    });
    const translateX = mathFunction.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, -height, 0],
    });
    return (
        <Animated.View
            style={{
                width: height,
                height: height,
                backgroundColor: 'white',
                borderRadius: 85,
                position: 'absolute',
                top: -height * 0.6,
                left: -height * 0.33,
                transform: [
                    {
                        rotate,
                    },
                    {
                        translateX,
                    },
                ],
            }}
        />
    )
}

export default function WomenBodyShape({navigation}) {

    const uid = authentication.currentUser.uid;        
    //setting the bodyShape in DB
    const setData = async () =>{
        await updateDoc(doc(db,"users",uid),{
            bodyType: bodyType,
        })
    }


    //getting the bodyShape from DB
    const getUserData = async () => {
        const docRef = doc(db, "users", authentication.currentUser.uid);
        const docSnap = await getDoc(docRef);
        setBodyType(docSnap.get("bodyType"))
    }


    const backToGoalsPage = () => navigation.navigate('GoalsAchievementsPage');

    //for react native to keep track of this value and whenever we rerender this component, the value will not change
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const choiceHandler = () => {
        setKey(key);

        //alert choice selected!yeehaw
        console.log(key);
        backToGoalsPage();
    };

    const [key, setKey] = useState('0');
    const [bodyType, setBodyType] = useState();

    setData();

    const itemsChanged = useRef(({viewableItems}) => {
        setKey(viewableItems[0].index);
    }).current;

    const combinedhandler = () =>{
        choiceHandler();

            switch (key) {
                case 0:
                    setBodyType(imagesData[0].title);
                    break;
                case 1:
                    setBodyType(imagesData[1].title);
                    break;  
                case 2:
                    setBodyType(imagesData[2].title);
                    break;  
                case 3:
                    setBodyType(imagesData[3].title);
                    break;        
            
                default:setBodyType("no body type selected")
                    break;
            }
    }

    useEffect(() => {
        getUserData();
    },[])

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
    const slides = useRef(null);

    return (

        <View style={womenbodyShapeStyles.listView}>
            <Backdrop scrollX={scrollX}/>
            <Square scrollX={scrollX} />
            <AntDesign name="close" size={24} color="black" onPress={backToGoalsPage}
                       style={womenbodyShapeStyles.formCloseStyle}/>
            <Animated.FlatList
                data={imagesData}
                keyExtractor={(item) => item.key}
                horizontal
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false}
                )}
                onViewableItemsChanged={itemsChanged}
                viewabilityConfig={viewConfig}
                ref={slides}
                contentContainerStyle={{paddingBottom: 100}}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                renderItem={({item}) => {
                    return (
                        <View style={{width, alignItems: 'center', padding: 20}}>
                            <View style={{flex: 0.7, justifyContent: 'center'}}>
                                <Image
                                    source={{uri: item.image}}
                                    style={{
                                        width: width / 2,
                                        height: width / 2,
                                        resizeMode: 'contain',
                                    }}
                                />
                            </View>
                            <View style={{flex: 0.3}}>
                                <Text
                                    style={{color: 'white', fontWeight: '800', fontSize: 24, marginBottom: 10}}>{item.title}</Text>
                                <Text style={{color: 'white', fontWeight: '300'}}>{item.description}</Text>
                            </View>
                        </View>
                    );
                }}
            >
            </Animated.FlatList>
            <Indicator scrollX={scrollX}/>

            <View>
                <TouchableOpacity
                    style={womenbodyShapeStyles.buttonStyle}
                    onPress={combinedhandler}
                >
                    <Text style={goalsStyles.buttonTextStyle}>Choose</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

export const womenbodyShapeStyles = StyleSheet.create({
    listView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    formCloseStyle: {
        marginTop: 40,
        marginBottom: 6,
        borderWidth: 2,
        borderStyle: 'dotted',
        borderColor: 'grey',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },

    buttonStyle: {
        display: 'flex',
        height: 60,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        backgroundColor: '#a259b6',
        shadowColor: '#580961',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
        bottom: 40,
    }
})