import React from "react";
import { ImageBackground, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

const MealItem = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS == 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View style={styles.itemContainer}>
            <TouchableCmp onPress={props.onSelect}>
                <View>
                    <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                        <ImageBackground source={{ uri: props.meal.imageUrl }} style={styles.bgImage}>
                            <Text style={styles.title} numberOfLines={1}>{props.meal.title}</Text>
                        </ImageBackground>
                    </View>
                    <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
                        <Text>{props.meal.duration} min</Text>
                        <Text>{props.meal.complexity.toUpperCase()}</Text>
                        <Text>{props.meal.affordability.toUpperCase()}</Text>
                    </View>
                </View>
            </TouchableCmp>
        </View>
    );
};

const styles = StyleSheet.create({
    mealRow: {
        flexDirection: 'row',
    },
    itemContainer: {
        height: 200,
        width: '100%',
        backgroundColor: '#ccc',
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden'
    },
    mealHeader: {
        height: '85%'
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        textAlign: 'center'
    }
});

export default MealItem;