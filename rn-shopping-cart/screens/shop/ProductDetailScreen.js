import React from "react";
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id == productId));
    const dispatch = useDispatch();
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.buttonContainer}>
                <Button color={Colors.primary} title="Add to Cart" onPress={() => dispatch(cartActions.addToCart(selectedProduct))} />
            </View>
            <Text style={styles.price}>R${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        textAlign: 'center',
        fontSize: 15,
        marginHorizontal: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 22
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 10
    }
});

ProductDetailScreen.navigationOptions = (navData) => {
    const title = navData.navigation.getParam('productTitle');
    return {
        headerTitle: title
    }
}

export default ProductDetailScreen;