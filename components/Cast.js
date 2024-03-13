import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { fallbackImagePerson, image500 } from '../api/moviedb';

// const {width, height} = Dimensions.get('window');

export default function Cast({cast, navigation}) {
  // -- tova raboti po sushtiq nachin kakto da podadem 'navigation' object prez componenta tam kudeto go vikame (v MovieScreen):
  // const navigation = useNavigation(); 

  return (
    <View style={styles.castCont}>
      <Text style={styles.header}>Top Cast</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {cast.map((person, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('Person', person)}>
              <Image
                // source={require('../assets/images/castImage1.png')}
                source={{uri: image500(person.profile_path) || fallbackImagePerson}}
                style={styles.img}
              />
              <Text style={styles.castInfo}>
                {person.original_name !== undefined && person.original_name.length > 9
                  ? person.original_name.slice(0, 9) + '...'
                  : person.original_name}
              </Text>
              <Text style={styles.castInfo}>
                {person.character !== undefined && person.character.length > 9
                  ? person.character.slice(0, 9) + '...'
                  : person.character}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  castCont: {
    // paddingHorizontal: 20,
    // marginHorizontal: 20,
    // borderWidth: 1,
    // borderColor: 'white',
    paddingVertical: 10,

  },
  header: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
    marginHorizontal: 10
  },
  img: {
    borderWidth: 1,
    borderColor: 'darkgrey',
    // marginRight: 20,
    borderRadius: 100,
    height: 70,
    width: 70,
    marginLeft: 10,
  },
  castInfo: {
    color: 'darkgrey',
    marginLeft: 10,

  },
});
