import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {
  fallbackImagePoster,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  image500,
} from '../api/moviedb';
import {ArrowUpIcon, ArrowDownIcon} from 'react-native-heroicons/outline';
import Loading from '../components/Loading';

const {width, height} = Dimensions.get('window');

export default function AllMoviesScreen() {
  const navigation = useNavigation();
  const {params: title} = useRoute();
  const [upcomingMovies, setUpcomingMovies] = useState({});
  const [upcomingMoviesArr, setUpcomingMoviesArr] = useState([]);
  const [topRated, setTopRated] = useState({});
  const [topRatedArr, setTopRatedArr] = useState([]);
  const scrollRef = useRef();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    upcomingData();
    topRatedData();
  }, []);

  async function upcomingData() {
    const data = await fetchUpcomingMovies({
      page: page + 1,
    });
    if (data) {
      setUpcomingMovies(data);
      setUpcomingMoviesArr(prev => [...prev, ...data.results]);
      setPage(prev => prev + 1);
      setLoading(false);
    }
  }

  async function topRatedData() {
    const data = await fetchTopRatedMovies({
      page: page + 1,
    });
    if (data) {
      setTopRated(data);
      setTopRatedArr(prev => [...prev, ...data.results]);
      setPage(prev => prev + 1);
    }
  }

  function scrollToTop() {
    scrollRef.current?.scrollTo({
      y: 0,
      animation: true,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerCont}>
        <TouchableOpacity
          style={styles.backBtnCont}
          onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={30} color={'#e3dede'} strokeWidth={3.5} />
        </TouchableOpacity>
        <Text style={styles.header}>
          List of <Text>{title}</Text> <Text style={{color: '#eab308'}}>M</Text>
          ovies
        </Text>
      </View>
      {loading ? (
        <Loading />
      ) : title === 'Upcoming' ? (
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          style={styles.scrollCont}>
          <Text style={styles.resultsText}>
            Results ({upcomingMovies.total_results})
          </Text>
          <View style={styles.resultsContr}>
            {upcomingMoviesArr.map((item, i) => {
              return (
                <View key={i} style={styles.movieCont}>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('Movie', item)}>
                    <Image
                      style={styles.img}
                      source={{
                        uri: image500(item.poster_path) || fallbackImagePoster,
                      }}
                    />
                  </TouchableWithoutFeedback>
                  <Text style={styles.movieTitle}>
                    {item?.title?.length > 15
                      ? item.title.slice(0, 15) + '...'
                      : item.title}
                  </Text>
                </View>
              );
            })}
          </View>          
          {page < upcomingMovies.total_pages ? (
            <View style={styles.arrowBtnCont}>
              <TouchableOpacity onPress={() => upcomingData()}>
                <ArrowDownIcon size={20} color={'white'} />
              </TouchableOpacity>
            </View>
          ) : page === upcomingMovies.total_pages ? (
            <View style={styles.arrowBtnCont}>
              <TouchableOpacity onPress={() => setTimeout(scrollToTop, 800)}>
                <ArrowUpIcon size={20} color={'white'} />
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      ) : (
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          style={styles.scrollCont}>
          <Text style={styles.resultsText}>
            Results ({topRated.total_results})
          </Text>
          <View style={styles.resultsContr}>
            {topRatedArr.map((item, i) => {
              return (
                <View key={i} style={styles.movieCont}>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('Movie', item)}>
                    <Image
                      style={styles.img}
                      source={{
                        uri: image500(item.poster_path) || fallbackImagePoster,
                      }}
                    />
                  </TouchableWithoutFeedback>
                  <Text style={styles.movieTitle}>
                    {item?.title?.length > 15
                      ? item.title.slice(0, 15) + '...'
                      : item.title}
                  </Text>
                </View>
              );
            })}
          </View>
          {page < topRated.total_pages ? (
            <View style={styles.arrowBtnCont}>
              <TouchableOpacity onPress={() => topRatedData()}>
                <ArrowDownIcon size={20} color={'white'} />
              </TouchableOpacity>
            </View>
          ) : page === topRated.total_pages ? (
            <View style={styles.arrowBtnCont}>
              <TouchableOpacity onPress={() => setTimeout(scrollToTop, 800)}>
                <ArrowUpIcon size={20} color={'white'} />
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262626',
    flex: 1,
  },
  headerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: 10,
    marginVertical: 20,
  },
  backBtnCont: {
    borderColor: '#eab308',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#eab308',
    width: 35,
    height: 35,
    marginLeft: 10,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    // marginRight: width * 0.05,
    marginRight: 45,

  },
  m: {
    color: '#eab308',
  },
  scrollCont: {
    padding: 5,
  },
  resultsText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '300',
    marginLeft: 5,
    marginBottom: 20,
  },
  resultsContr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  movieCont: {
    marginBottom: 20,
  },

  img: {
    width: width * 0.47,
    height: height * 0.5,
    borderRadius: 20,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
    marginLeft: 10,
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
    marginTop: 15,
    marginBottom: 30,
  },
});
