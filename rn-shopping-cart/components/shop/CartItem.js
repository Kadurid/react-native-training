import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

const CartItem = props => {
    return(
        <View style = {styles.cardItem}>
            <View style={styles.itemData}>
                <Text>
                <Text style={styles.textQty}>{props.item.quantity}</Text> <Text style={styles.title}>{props.item.productTitle} </Text>
                </Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>R${props.item.sum.toFixed(2)}</Text>
                {props.deletable && <TouchableOpacity onPress={props.onRemove} style= {styles.deleteButton}>
                    <Ionicons name={Platform.OS == 'android'? 'md-trash' : 'ios-trash'} size = {23} color='red' />
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textQty: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16

    },
    title: {
        fontSize: 16,
        fontFamily: 'open-sans-bold'
    },
    amount: {
        fontSize: 16,
        color: Colors.secondary,
        fontFamily: 'open-sans-bold'
    },
    deleteButton: {
        marginLeft: 20
    }

});

export default CartItem;