import React, {useRef, useState} from 'react';
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

const {width, height} = Dimensions.get('screen');

const backgrounds = ['#7fb4fa', '#A5BBFF', '#6a7cb3', '#3584E4'];
const imagesData = [
    {
        "key": "0",
        "title": "Popeye",
        "description": "The secret to getting this body shape is in the spinach! Popeye is known for his big forearms, add these exercises to your program to achieve that 'I am strong to the finich, because I eats me spinach' look: " +
            "Exercise 1: Barbell wrist curls, Exercise 2: Barbell reverse curls, Exercise 3: Wrist curler.",
        "image": 'https://static.wikia.nocookie.net/p__/images/0/00/Popeye_the_Sailor.png/revision/latest?cb=20200203002738&path-prefix=protagonist'
    },
    {
        "key": "1",
        "title": "Tarzan",
        "description": "To get your body into Tarzan shape you need to follow the Tarzan 21 Weeks Workout Plan: " +
            "Day 1: Lower Body, Day 2: Rest Day, Day 3: Chest and Front Delts, Day 4: Rest Day, Day 5: Back and Middle, Rear Delts, Day 6: Rest Day, Day 7: Arms.",
        "image": 'https://static.wikia.nocookie.net/parody/images/e/e2/Tarzan_Character.png/revision/latest?cb=20151017214610'
    },
    {
        "key": "2",
        "title": "Hercules",
        "description": "This 12-week routine will set you on the proper track to developing a body like the iconic Hercules: " +
            "Day 1: Legs, Day 2: Back, Day 3: Shoulders, Day 4: Arms/Abs, Day 5: Legs, Day 6: Chest, Day 7: Rest Day.",
        "image": 'https://static.wikia.nocookie.net/thedescendants/images/7/76/Hercules.png/revision/latest?cb=20160330210222'
    },
    {
        "key": "3",
        "title": "Johny Bravo",
        "description": "Johny Bravo is known for his big chest and big biceps. Include these exercises in your workout to make your biceps bigger: " +
            "Weighted Chin-ups: 3 sets of 6-8, 8-10, 10-12 reps, Inverted Rows: 3 sets of 8-10 reps, Suspension Trainer Curls: 2 sets to failure (quick reps), Finisher: Isometric Bar Holds + Slow Eccentric: 1 set for max time.",
        "image": 'https://m.media-amazon.com/images/I/41TdUT83mgL._AC_.jpg'
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

export default function MenBodyShape({navigation}) {

    const backToGoalsPage = () => navigation.navigate('GoalsAchievementsPage');

    const choiceHandler = () => {
        setKey(key);

        //alert choice selected!yeehaw
        console.log(key);
        backToGoalsPage();
    };


    //for react native to keep track of this value and whenever we rerender this component, the value will not change
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [key, setKey] = useState('0');
    const itemsChanged = useRef(({viewableItems}) => {
        setKey(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
    const slides = useRef(null);

    return (

        <View style={menbodyShapeStyles.listView}>
            <Backdrop scrollX={scrollX}/>
            <Square scrollX={scrollX} />
            <AntDesign name="close" size={24} color="black" onPress={backToGoalsPage}
                       style={menbodyShapeStyles.formCloseStyle}/>
            <Animated.FlatList
                data={imagesData}
                keyExtractor={(item) => item.key}
                horizontal
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false},
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
                    style={menbodyShapeStyles.buttonStyle}
                    onPress={choiceHandler}
                >
                    <Text style={goalsStyles.buttonTextStyle}>Choose</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

export const menbodyShapeStyles = StyleSheet.create({
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
        backgroundColor: '#4356FF',
        shadowColor: '#4356FF',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
        bottom: 40,
    }
})