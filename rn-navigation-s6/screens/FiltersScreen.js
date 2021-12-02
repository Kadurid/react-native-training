import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import CustomHeaderButton from "../components/CustomHeaderButton";
import Colors from "../constants/Colors";
import { setFilters } from "../store/actions/meals";

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.children}</Text>
            <Switch
                thumbColor={Colors.primaryColor}
                trackColor={{ true: Colors.primaryColor, false: '#ccc' }}
                value={props.value}
                onValueChange={props.onChange}
            />
        </View>
    );
}

const FiltersScreen = props => {
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const { navigation } = props;
    
    const dispatch = useDispatch();
        
    const saveFilter = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        }

        dispatch(setFilters(appliedFilters));
    }, [isVegetarian, isGlutenFree, isVegan, isLactoseFree, dispatch]);

    useEffect(() => {
        navigation.setParams({ save: saveFilter });
    }, [saveFilter]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title} numberOfLines={2}>Available Filters / Restrictions</Text>
            <FilterSwitch value={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)}>Gluten Free</FilterSwitch>
            <FilterSwitch value={isVegan} onChange={newValue => setIsVegan(newValue)}>Vegan</FilterSwitch>
            <FilterSwitch value={isVegetarian} onChange={newValue => setIsVegetarian(newValue)}>Vegetarian</FilterSwitch>
            <FilterSwitch value={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)}>Lactose Free</FilterSwitch>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    }
});

FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filters',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="Menu" iconName='ios-menu' onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} />
                </HeaderButtons>
            );
        },
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="Menu" iconName='ios-save' onPress={navData.navigation.getParam('save')} />
                </HeaderButtons>
            );
        }
    }
}

export default FiltersScreen;