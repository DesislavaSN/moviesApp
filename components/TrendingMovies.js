import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import {image500} from '../api/moviedb';
import {ArrowRightIcon, ArrowLeftIcon} from 'react-native-heroicons/outline';

const {width, height} = Dimensions.get('window');

export default function TrendingMovies({data}) {
  console.log('length ==>>', data.length);
  const navigation = useNavigation();

  function selectedMovie(item) {
    navigation.navigate('Movie', item);
  }

  function loadMoreMovies() {
    console.log('LOAD MORE MOVIES BTN PRESSED');
  }

  return (
    <View>
      <Text style={styles.header}>Trending</Text>
      <View style={styles.carouselCont}>
        <Carousel
          data={data} // movies list
          renderItem={({item}) => (
            <MovieCard item={item} selectedMovie={selectedMovie} />
          )} // render an item from the list and display a component - MovieCard
          firstItem={1}
          inactiveSlideOpacity={0.4}
          sliderWidth={width}
          itemWidth={width * 0.62}
          slideStyle={styles.carouselStyle}
        />
        <View style={styles.arrowBtnCont}>
          <TouchableOpacity onPress={() => loadMoreMovies()}>
            <ArrowRightIcon size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const MovieCard = ({item, selectedMovie}) => {
  return (
    <TouchableWithoutFeedback onPress={() => selectedMovie(item)}>
      <Image
        // source={require('../assets/images/moviePoster1.png')}
        source={{uri: image500(item.poster_path)}}
        style={styles.img}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  carouselCont: {
    flexDirection: 'row',
  },
  header: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 18,
    marginLeft: 10,
    marginTop: 30,
  },
  carouselStyle: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 100,
  },

  textCard: {
    color: '#fff',
    fontSize: 20,
  },

  img: {
    // the size of the image is responsive because it uses the dimensions of the device
    width: width * 0.6,
    height: height * 0.5,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  arrowBtnCont: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 100,
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    marginLeft: 30,
    // position: 'relative',
    position: 'absolute',
    zIndex: 10,
    right: 20,
    
  },
});
