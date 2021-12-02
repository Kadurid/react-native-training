import React from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CategoryGridTile from "../components/CategoryGridTile";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { CATEGORIES } from "../data/dummy-data";


const CategoriesScreen = props => {

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                color={itemData.item.color}
                title={itemData.item.title}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'CategoryMeals', params: {
                            categoryId: itemData.item.id
                        }
                    })
                }} />
        );
    }

    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2} />

    );
};

CategoriesScreen.navigationOptions = navData => {
    return {
        title: 'Meal Categories',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="Menu" iconName='ios-menu' onPress={() => { 
                            navData.navigation.toggleDrawer();
                        }} />
                </HeaderButtons>
            );
        }
    
    };
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoriesScreen;