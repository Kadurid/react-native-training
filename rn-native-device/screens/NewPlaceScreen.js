import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import * as placeActions from '../store/actions/places'
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    setTitleValue(text);
  }

  const savePlaceHandler = () => {
    dispatch(placeActions.addPlace(titleValue, selectedImage, selectedLocation));
    props.navigation.goBack();
  }

  const imageTakenHandler = imagePath => {
    console.log(imagePath);
    setSelectedImage(imagePath);
  }

  const locationPickedHandler =useCallback( location => {
    setSelectedLocation(location);
  },[setSelectedLocation])

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler}/>
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }

});

export default NewPlaceScreen;