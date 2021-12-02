import React from "react";
import { Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";

const MainButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }

});

export default MainButton;