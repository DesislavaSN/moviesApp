import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import { fallbackImagePoster, image185 } from '../api/moviedb';

const {width, height} = Dimensions.get('window');

export default function MovieList({title, data, hideSeeAll = false}) {
  const navigation = useNavigation();
  
  const seeAllMovies = () => {
    navigation.navigate('AllMovies', title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <Text style={styles.header}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity onPress={seeAllMovies}>
            <Text style={styles.seeAllBtn}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('Movie', item)}
            >
              <View style={styles.movieInfo}>
                <Image
                  // source={require('../assets/images/moviePoster2.png')}
                  source={{uri: image185(item.poster_path) || fallbackImagePoster}}
                  style={styles.img}
                />
                <Text style={styles.movieTitle}>
                  {item.title !== undefined && item.title.length > 15
                    ? item.title.slice(0, 15) + '...'
                    : item.title
                  }
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginBottom: 20,
  },
  headerCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  header: {
    color: '#fff',
    fontSize: 20,
  },
  seeAllBtn: {
    color: '#eab308',
    fontSize: 20,
  },
  movieInfo: {
    marginHorizontal: 10,
  },
  img: {
    width: width * 0.35,
    height: height * 0.28,
    borderRadius: 20,
  },
  movieTitle: {
    color: '#fff',
    marginLeft: 5,
  },
  contentContainer: {
    paddingVertical: 20,
  },
});
