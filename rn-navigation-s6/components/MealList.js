import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import MealItem from "./MealItem";

const MealList = props => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

    const renderMealItem = itemData => {
        const isFav = favoriteMeals.some(meal => meal.id === itemData.item.id)
        return (
            <MealItem meal={itemData.item} onSelect={() => {
                props.navigation.navigate({
                    routeName: 'MealDetail',
                    params: {
                        mealId: itemData.item.id,
                        mealTitle: itemData.item.title,
                        isFav: isFav
                    }
                })
            }} />
        );
    }

    return (
        <View style={styles.list}>
            <FlatList data={props.listData} renderItem={renderMealItem} style={{ width: '100%' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    }
});

export default MealList;