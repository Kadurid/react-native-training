import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import { isLoading } from 'expo-font';





const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState()
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    const selectItemHandler = (item) => {
        props.navigation.navigate('ProductDetail', {
            productId: item.id,
            productTitle: item.title
        });
    }

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true)
        try {
        await dispatch(productActions.fetchProducts()).then();
        } catch(err) {
            setError(err.message);
        }
        setIsRefreshing(false)
    },[dispatch, setIsLoading, setError])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);

        return () => {
            willFocusSub.remove();
        }
    }, [loadProducts])

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts])

    if(error) {
        return (
            <View style={styles.loadingContainer}>
               <Text>An error ocurred!</Text>
               <Button color={Colors.primary} title="Try again" onPress={loadProducts} />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    if(!isLoading && products.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <Text>No products found, maybe start adding some!</Text>
            </View>
        )
    }

    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            renderItem={itemData =>
                <ProductItem
                    product={itemData.item}
                    onSelect={() => {
                        selectItemHandler(itemData.item)
                    }}
                >
                    <Button
                        color={Colors.primary}
                        title="View Details"
                        onPress={() => {
                            selectItemHandler(itemData.item)
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title="Add to Cart"
                        onPress={() => dispatch(cartActions.addToCart(itemData.item))}
                    />
                </ProductItem>
            }

        />
    );

}

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title='Cart' iconName={Platform.OS == 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {
                        navData.navigation.navigate('Cart')
                    }} />
                </HeaderButtons>
            )
        },
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
        }
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default ProductsOverviewScreen;