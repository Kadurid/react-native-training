import React from "react";
import { Image, Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import DefaultText from "../UI/DefaultText";
import Card from "../UI/Card";

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;

    if(Platform.OS == 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <TouchableCmp onPress={props.onSelect} useForeground>
            <Card style={styles.product}>
                <View style={styles.imgContainer}>
                    <Image style={styles.image} source={{ uri: props.product.imageUrl }} />
                </View>
                <View style={styles.textContainer}>
                    <DefaultText style={styles.title}>{props.product.title}</DefaultText>
                    <DefaultText style={styles.price}>R${props.product.price.toFixed(2)}</DefaultText>
                </View>
                <View style={styles.buttonContainer}>
                   {props.children}
                </View>
            </Card>
        </TouchableCmp>
    );
}

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20,
        overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        height: '25%',
        paddingHorizontal: 20
    },
    textContainer: {
        alignItems: 'center',
        height: '15%',
        // padding: 10
        // justifyContent: 'center'
    },
    imgContainer: {
        flex: 1,
        width: '100%',
        height: '60%'

    }
});

export default ProductItem;