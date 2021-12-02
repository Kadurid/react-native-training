import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from 'react-redux';
import CustomHeaderButton from "../components/CustomHeaderButton";
import MealList from "../components/MealList";

const FavoritesScreen = props => {
    const favMeals = useSelector(state => state.meals.favoriteMeals);

    if(favMeals.length == 0 || !favMeals){
        return(
            <View style={styles.content}>
                <Text>No favorite meals found. Start adding some!</Text>
            </View>
        );
    }

    return (
        <MealList listData={favMeals} navigation={props.navigation} />
    );
};

FavoritesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="Menu" iconName='ios-menu' onPress={() => { 
                        navData.navigation.toggleDrawer();
                    }} />
                </HeaderButtons>
            );
        }
    }
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FavoritesScreen;