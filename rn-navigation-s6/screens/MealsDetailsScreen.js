import React, { useCallback, useEffect } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from "../components/CustomHeaderButton";
import MealDetails from "../components/MealDetails";
import { toggleFavorite } from "../store/actions/meals";

const MealsDetailsScreen = props => {
    const mealId = props.navigation.getParam('mealId');

    const availableMeals = useSelector(state => state.meals.filteredMeals)
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);
    const currentMealIsFavorite = useSelector(state =>
         state.meals.favoriteMeals.some(meal => meal.id === mealId));

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch( toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({isFav: currentMealIsFavorite});
    },[currentMealIsFavorite]);

    useEffect(() =>  {
        props.navigation.setParams({toggleFav: toggleFavoriteHandler});
    }, [toggleFavoriteHandler])


    return (
        <MealDetails meal={selectedMeal}/>
    );
};

MealsDetailsScreen.navigationOptions = (navigationData) => {
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');

    return {
        headerTitle: mealTitle,
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title='Favorite' iconName={isFavorite? 'heart': 'heart-outline'} onPress={toggleFavorite} />
                </HeaderButtons>
            );
        }
    };
};

export default MealsDetailsScreen;