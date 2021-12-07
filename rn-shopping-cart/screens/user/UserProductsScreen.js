import React from "react";
import { Alert, Button, FlatList, Platform, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as productsAction from '../../store/actions/products'

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();
    const selectItemHandler = (item) => {
        props.navigation.navigate('ProductDetail',
            {
                productId: item.id,
                productTitle: item.title
            });
    }

    const deleteHandler = (id) => {
        Alert.alert("Are you sure?", "Do you really want to delete this item?",
            [
                { text: "No", style: 'default' },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(productsAction.deleteProduct(id));
                    }
                }
            ])
    }

    if (userProducts.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>No products found, maybe start creating some</Text>
            </View>
        )
    }

    return (
        <FlatList
            keyExtractor={item => item.id}
            data={userProducts}
            renderItem={itemData =>
                <ProductItem
                    product={itemData.item}
                    onSelect={() => selectItemHandler(itemData.item)}
                >
                    <Button
                        color={Colors.primary}
                        title="Edit"
                        onPress={() => {
                            props.navigation.navigate('EditProduct', {
                                productId: itemData.item.id
                            })
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title="Delete"
                        onPress={() => deleteHandler(itemData.item.id)}
                    />
                </ProductItem>
            }
        />
    );
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Products",
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="Menu"
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                        onPress={() => {
                            navData.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            )
        },
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="Add"
                        iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                        onPress={() => {
                            navData.navigation.navigate('EditProduct');
                        }}
                    />
                </HeaderButtons>
            )
        }

    }
}


export default UserProductsScreen;