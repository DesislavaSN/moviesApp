import React, {useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';

import {fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies} from '../api/moviedb';

const ios = Platform.OS === 'ios';

export default function HomeScreen({navigation}) {
  const [trending, setTrending] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies({
      page: 1,
    });
    // console.log('===>>>', data);
    if(data && data.results) {
      setTrending(data.results);
      setLoading(false);
    }
  }

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    // console.log('UPCOMING MOVIES >>>', data);
    if (data && data.results) {
      setUpcomingMovies(data.results);
    }
  }

  const getTopRatedMovies= async () => {
    const data = await fetchTopRatedMovies();
    if (data) {
      setTopRatedMovies(data.results);
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={ios ? {marginBottom: 8} : {marginBottom: 12}}>
        {/* <StatusBar barStyle={'light-content'} backgroundColor={'red'} /> */}
        <View style={styles.topContainer}>
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color={'#fff'} />
          <Text style={styles.logo}>
            <Text style={styles.logoM}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={28} strokeWidth={2} color={'#fff'} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <Loading />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* trending movies carousel */}
            {trending.length > 0 && <TrendingMovies data={trending} />}

            {/* upcoming movies row */}
            {upcomingMovies.length > 0 && <MovieList title="Upcoming" data={upcomingMovies} />}

            {/* top rated movies row */}
            {topRatedMovies.length > 0 && <MovieList title="Top Rated" data={topRatedMovies} />}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    paddingBottom: 30,
  },
  //   safeArea: {
  //     marginBottom: 12,
  //   },

  topContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  logoM: {
    color: '#eab308',
  },
});
