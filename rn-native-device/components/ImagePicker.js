import React, { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import * as ImgPicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'

const ImagePicker = props => {
    const [pickedImage, setPickedImage] = useState()

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
          return;
        }
        const image = await ImgPicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });

        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>

                {!pickedImage ? <Text>No image picked yet.</Text> :
                    <Image style={styles.image}
                        source={{ uri: pickedImage }}
                    />}

            </View>
            <View style={{marginBottom: 10}}>
                <Button
                    title="Take Image"
                    color={Colors.primary}
                    onPress={takeImageHandler}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
})

export default ImagePicker;