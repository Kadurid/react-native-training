import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game is Over!</TitleText>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('../assets/success.png')}
                        // source={{uri: 'https://149357200.v2.pressablecdn.com/wp-content/uploads/2016/03/customer-success-o-que-e-e-como-pode-ajudar-sua-empresa.jpg'}}
                        resizeMode='cover' />
                </View>
                <View style={styles.textContainer}>
                    <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.rightGuess}</Text></BodyText>
                </View>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: '100%',
        width: '100%',

    },
    imageContainer: {
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderColor: 'black',
        borderWidth: 3,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    textContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 40
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
});

export default GameOverScreen;