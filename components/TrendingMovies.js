import React, {useEffect, useRef, useState} from 'react';
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
import {fetchTrendingMovies, image500} from '../api/moviedb';
import {ChevronRightIcon} from 'react-native-heroicons/outline';

const {width, height} = Dimensions.get('window');

export default function TrendingMovies({data}) {
  // console.log('TRENDING ==>>', data);
  const navigation = useNavigation();
  const [allMovies, setAllMovies] = useState(data);
  const [nextPage, setNextPage] = useState(1);
  const [currItemIndex, setCurrItemIndex] = useState({});

  function selectedMovie(item) {
    navigation.navigate('Movie', item);
  }

  // useEffect(() => {
  //   loadMoreMovies();
  // },[]);

  async function loadMoreMovies() {
    const data = await fetchTrendingMovies({
      page: nextPage + 1,
    });
    // console.log('LOADING MORE MOVICES ===>>>', data.results);
    if (data && data.results) {
      setAllMovies(prev => [...prev, ...data.results]);
      setNextPage(prev => prev + 1);
      return (
        <View>
          <Text style={styles.header}>Trending</Text>
          <Carousel
            data={allMovies} // movies list
            renderItem={({item}) => (
              <MovieCard item={item} selectedMovie={selectedMovie} />
            )}
            firstItem={1}
            inactiveSlideOpacity={0.4}
            sliderWidth={width}
            itemWidth={width * 0.62}
            slideStyle={styles.carouselStyle}
          />
        </View>
      );
    }
  }

  return (
    <View>
      <Text style={styles.header}>Trending</Text>
      <View style={styles.carouselCont}>
        <Carousel
          data={allMovies} // movies list
          renderItem={({item, index}) => (
            setCurrItemIndex(index),
            (<MovieCard item={item} selectedMovie={selectedMovie} />)
          )} // render an item from the list and display a component - MovieCard
          firstItem={1}
          inactiveSlideOpacity={0.4}
          sliderWidth={width}
          itemWidth={width * 0.62}
          slideStyle={styles.carouselStyle}
        />
        {/* {console.log('curr item index ===', currItemIndex)}
        {console.log('allMovies length >>>', allMovies.length - 1)} */}
        {allMovies.length - 1 === currItemIndex && (
          <TouchableOpacity
            style={styles.arrowBtnCont}
            onPress={() => loadMoreMovies()}>
            <ChevronRightIcon size={20} color={'white'} />
          </TouchableOpacity>
        )}
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
    // borderWidth: 1,
    // borderColor: 'white',
    // borderRadius: 100,
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    marginLeft: 30,
    position: 'absolute',
    zIndex: 10,
    right: 20,
  },
  arrowBtnsCont: {
    height: height * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
