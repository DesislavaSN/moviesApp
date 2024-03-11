import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChevronLeftIcon, HeartIcon} from 'react-native-heroicons/outline';
import LinearGradient from 'react-native-linear-gradient';
import {useRoute} from '@react-navigation/native';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import {
  fallbackImagePoster,
  fetchCastsMovie,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from '../api/moviedb';

const {width, height} = Dimensions.get('screen');

export default function MovieScreen({navigation}) {
  const {params: item} = useRoute();

  const [heart, setFavHeart] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // call the movie's details through api
  useEffect(() => {
    setLoading(true);
    getMovieDetails();
    getCastsMovie();
    getSimilarMovies();
  }, []);
  
  const getMovieDetails = async () => {
    const data = await fetchMovieDetails(item.id);
    // console.log('MOVIE DETAILS ----->>>', data);
    if (data) {
      setMovieDetails(data);
      setLoading(false);
    }
  }

  const getCastsMovie = async () => {
    const data = await fetchCastsMovie(item.id);
    // console.log('DATAAAA casts >>--->>>', data.cast);
    if (data) {
      setCast(data.cast);
    }
  }

  const getSimilarMovies = async () => {
    const data = await fetchSimilarMovies(item.id);
    // console.log('SIMILAR MOVIES =====>>', data.results);
    if (data) {
      setSimilarMovies(data.results);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <SafeAreaView style={styles.btnCont}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.arrowBox}>
            <ChevronLeftIcon size={30} color={'#e3dede'} strokeWidth={3.5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFavHeart(!heart)}>
            {heart === true ? (
              <HeartIcon size={34} color={'#eab308'} fill={'#eab308'} />
            ) : (
              <HeartIcon
                size={34}
                color={'#fff'}
                fill={'#fff'}
                strokeWidth={2.5}
              />
            )}
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      {loading ? (
        <Loading />
      ) : (
          <View>
            <Image
              // source={require('../assets/images/moviePoster1.png')}
              source={{
                uri: image500(movieDetails.poster_path) || fallbackImagePoster,
              }}
              style={styles.img}
            />
            <LinearGradient
              colors={[
                'transparent',
                'rgba(23, 23, 23, 0.5)',
                'rgba(23, 23, 23, 1)',
              ]}
              start={{x: 0.2, y: 0}}
              end={{x: 0.5, y: 1.5}}
              style={styles.gradient}
            />
            <View style={{position: 'relative'}}>
              <Text style={styles.title}>{movieDetails.title}</Text>
              <View style={styles.movieShortInfo}>
                <Text style={styles.shortInfoText}>
                  Released • {movieDetails.release_date.slice(0, 4)} •{' '}
                  {movieDetails.runtime} min
                </Text>
              </View>
              <View style={styles.movieShortInfo}>
                {/* <Text style={styles.shortInfoText}>Action • Drama • War</Text> */}
                {movieDetails.genres.map((el, i) => {
                  return (
                    <Text key={i} style={styles.shortInfoText}>
                      {' '}
                      {i === 0
                        ? `${el.name}`
                        : i < movieDetails.genres.length
                        ? `• ${el.name}`
                        : `${el.name}`}
                    </Text>
                  );
                })}
              </View>
              <Text style={styles.movieText}>{movieDetails.overview}</Text>

              {/* cast details */}
              <Cast cast={cast} navigation={navigation} />

              {/* Similar movies */}
              {similarMovies.length > 0 && (
                <MovieList
                  title="Similar Movies"
                  data={similarMovies}
                  hideSeeAll={true}
                />
              )}
            </View>
          </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
  },
  text: {
    color: '#fff',
  },
  arrowBox: {
    borderColor: '#eab308',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#eab308',
  },
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 20,
    marginTop: 20,
    width: width,
    paddingHorizontal: 10,
  },
  img: {
    height: height * 0.75,
    width: width,
    alignSelf: 'center',
  },
  gradient: {
    position: 'absolute',
    marginBottom: 0,
    width: width,
    height: height * 0.75,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
    width: width * 0.8,
    textAlign: 'center',
  },
  movieShortInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    justifyContent: 'center',
    width: width * 0.5,
    marginBottom: 20,
  },
  shortInfoText: {
    color: 'darkgrey',
  },
  movieText: {
    color: 'darkgrey',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
});
