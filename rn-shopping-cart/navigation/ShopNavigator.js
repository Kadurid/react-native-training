import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Button, Platform, SafeAreaView, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import Colors from "../constants/Colors";

import StartupScreen from "../screens/StartupScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import AuthScreen from "../screens/user/AuthScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import { useDispatch } from "react-redux";
import * as authActions from './../store/actions/auth';

const defaultNavOpt = 
    {
        headerStyle: {
            backgroundColor: Platform.OS =='android'? Colors.primary: '',
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS =='android'? 'white': Colors.primary,
        
    }


const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
}, {
    defaultNavigationOptions: defaultNavOpt,
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android'? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.tintColor}/>
    }
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    defaultNavigationOptions: defaultNavOpt,
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android'? 'md-create' : 'ios-create'} size={23} color={drawerConfig.tintColor}/>
    }

});

const UserNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    ProductDetail: ProductDetailScreen,
    EditProduct: EditProductScreen,
}, {
    defaultNavigationOptions: defaultNavOpt,
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android'? 'md-person' : 'ios-person'} size={23} color={drawerConfig.tintColor}/>
    }
})

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    User: UserNavigator
}, {
    contentOptions : {
        activeTintColor: Colors.primary,
    },
    contentComponent: props => {
        const dispatch = useDispatch();
        return (
            <View style = {{flex: 1, paddingTop: 20}}>
                <SafeAreaView forceInset = {{top: 'always', horizontal: 'never'}}>
                    <DrawerItems {...props}  />
                    <Button title="Logout" color={Colors.primary} onPress={() => {
                        dispatch(authActions.logout());
                        // props.navigation.navigate('Auth');
                    }} />
                </SafeAreaView>
            </View>
        )
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavOpt
})

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth:AuthNavigator,
    Shop: ShopNavigator
})

export default createAppContainer(MainNavigator);