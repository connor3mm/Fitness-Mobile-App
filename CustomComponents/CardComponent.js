import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from "react-native";

export default function CardComponent(props) {
    return (
        <View style = {styles.cardItem}>
            <View style={styles.cardText}>
                { props.children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardItem: {
        borderRadius: 5,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardText: {
        marginHorizontal: 18,
        marginVertical: 20,
    }
})