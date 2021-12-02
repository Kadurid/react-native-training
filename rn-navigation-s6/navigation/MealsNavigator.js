import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Colors from "../constants/Colors";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import MealsDetailsScreen from "../screens/MealsDetailsScreen";
import { createDrawerNavigator } from "react-navigation-drawer";
import FiltersScreen from "../screens/FiltersScreen";

const defaultNavOptions = {
    // initialRouteName: 'MealDetail',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS == 'android' ? Colors.primaryColor : ''
        },
        headerTintColor: Platform.OS == 'ios' ? Colors.primaryColor : 'white'
    }
}

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
    },
    CategoryMeals: {
        screen: CategoryMealsScreen
    },

    MealDetail: {
        screen: MealsDetailsScreen
    }
}, defaultNavOptions);


const FavoritesNavigator = createStackNavigator({
    Favorites: {
        screen: FavoritesScreen,
    },
    MealDetail: {
        screen: MealsDetailsScreen
    }
}, defaultNavOptions);

const tabConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons size={25} name='fast-food' color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor

        }
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons size={25} name='heart' color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor
        }
    }
}

const FilterNavigator = createStackNavigator({
    Filter: FiltersScreen
}, {
    navigationOptions: {
        drawerLabel: 'Filters'
    },
    defaultNavigationOptions: defaultNavOptions.defaultNavigationOptions
});


const MealsFavTabNavigator = Platform.OS == 'android' ? createMaterialBottomTabNavigator(tabConfig, {
    activeTintColor: Colors.accentColor,
    shifting: true,

}) : createBottomTabNavigator(tabConfig, {
    tabBarOptions: {
        activeTintColor: Colors.accentColor
    }
})

const MainNavigator = createDrawerNavigator(
    {
        MealsFavs: {
            screen: MealsFavTabNavigator,
            navigationOptions: {
                drawerLabel: 'Meals'
            }
        },
        Filters: FilterNavigator
    },
    {
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }

        }
    });



export default createAppContainer(MainNavigator);