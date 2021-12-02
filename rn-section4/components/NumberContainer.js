import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

const NumberContainer = props => {
    return(
        <View style={styles.numberContainer}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    numberContainer: {
        borderWidth: 2,
        borderColor: colors.secondary,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        color: colors.secondary,
        fontSize: 22,
        fontWeight: 'bold'

    }
})
export default NumberContainer;