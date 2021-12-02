import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const ListItem = props => {
    return(
        <View style={styles.listItem}>
            <Text>{props.children}</Text>
        </View>
    );
}

const MealDetails = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
            <Image style={styles.image} source={{uri: props.meal.imageUrl}}/>
            <View style={styles.details}>
                <Text>{props.meal.duration} min</Text>
                <Text>{props.meal.complexity.toUpperCase()}</Text>
                <Text>{props.meal.affordability.toUpperCase()}</Text>
            </View>
            <View>
                <Text style={styles.title}>Ingredients</Text>
                {props.meal.ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
                <Text style={styles.title}>Steps</Text>
                {props.meal.steps.map(step => <ListItem key={step}>{step}</ListItem>)}
            </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    screen: {
        flex: 1,
        margin: 15
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 10
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1
    }
});

export default MealDetails;