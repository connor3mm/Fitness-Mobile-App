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
        "title": "Multi-lateral intermediate moratorium",
        "description": "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
        "image": 'https://st.depositphotos.com/1967477/4960/v/600/depositphotos_49600071-stock-illustration-cartoon-bodybuilder.jpg'
    },
    {
        "key": "1",
        "title": "Automated radical data-warehouse",
        "description": "Use the optical SAS system, then you can navigate the auxiliary alarm!",
        "image": 'https://st.depositphotos.com/1967477/4960/v/600/depositphotos_49600071-stock-illustration-cartoon-bodybuilder.jpg'
    },
    {
        "key": "2",
        "title": "Inverse attitude-oriented system engine",
        "description": "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
        "image": 'https://st.depositphotos.com/1967477/4960/v/600/depositphotos_49600071-stock-illustration-cartoon-bodybuilder.jpg'
    },
    {
        "key": "3",
        "title": "Monitored global data-warehouse",
        "description": "We need to program the open-source IB interface!",
        "image": 'https://st.depositphotos.com/1967477/4960/v/600/depositphotos_49600071-stock-illustration-cartoon-bodybuilder.jpg'
    }
]
const Indicator = ({scrollX}) => {
    return (
        <View style={{position: 'absolute', bottom: 170, flexDirection: 'row'}}>
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