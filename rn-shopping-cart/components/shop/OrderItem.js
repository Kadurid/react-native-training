import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import colors from '../../constants/Colors';
import Card from "../UI/Card";
import CartItem from "./CartItem";

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <Card style={styles.item}>
            <View style={styles.summary}>
                <Text style={styles.amount}>R$ {props.item.totalAmount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.item.readableDate}</Text>
            </View>
            <Button color={colors.primary} title={showDetails ? "Hide Details" : "Show Details"} onPress={() => setShowDetails(prevState => !prevState)} />
            {showDetails && <View style={styles.detailItems}>
                {props.item.items.map(cartItem => <CartItem key={cartItem.productId} item={cartItem}/> )}
                </View>}
        </Card>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        margin: 20,
        alignItems: 'center'
    },
    summary: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date : {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        color: '#888'
    },
    detailItems: {
        width: '100%'
    }
});

export default OrderItem;