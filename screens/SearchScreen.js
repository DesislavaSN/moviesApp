import React, {useState, useRef} from 'react';
import {
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {XMarkIcon} from 'react-native-heroicons/outline';
import Loading from '../components/Loading';
import {fallbackImagePoster, image500, searchMovie} from '../api/moviedb';
import debounce from 'debounce';
import {ArrowUpIcon, ArrowDownIcon} from 'react-native-heroicons/outline';

const {width, height} = Dimensions.get('window');

export default function SearchScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [pages, setPages] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [param, setParam] = useState('');
  const scrollRef = useRef();

  const handleSearch = value => {
    if (value && value.length >= 3) {
      setParam(value);
      searchMovie({
        query: value,
        include_adult: false,
        language: 'en-US',
        page: pages,
      })
        .then(data => {
          if (data) {
            setLoading(false);
            setResult(data.results);
            setPages(data.total_pages);
            setTotalResults(data.total_results);
          }
        })
        .catch(err => {
          console.log('Error occure on handleSearch fn', err);
        });
    } else {
      setLoading(false);
      setResult([]);
    }
  };

  // debounce(fn, time) - (debounce library used) --> fn koqto zabavq handleSearch() za 400ms;
  const hanleTextDebounce = debounce(handleSearch, 800);

  function loadMoreMovies() {
    setNextPage(prev => prev + 1);
    searchMovie({
      query: param,
      include_adult: false,
      language: 'en-US',
      page: nextPage + 1,
    })
      .then(data => {
        if (data) {
          setLoading(false);
          setResult(prev => [...prev, ...data.results]);
          setPages(data.total_pages);
        }
      })
      .catch(err => {
        console.log('Error occure on handleSearch fn', err);
      });
  }

  function scrollToTop() {
    scrollRef.current?.scrollTo({
      y: 0,
      animation: true,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputCont}>
        <TextInput
          style={styles.input}
          placeholder="Search Movie"
          cursorColor={'white'}
          placeholderTextColor={'white'}
          onChangeText={hanleTextDebounce}
        />
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss;
            navigation.navigate('Home');
          }}
          style={styles.xBtnCont}>
          <XMarkIcon size={25} color={'#fff'} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          style={styles.scrollCont}>
          <Text style={styles.resultsText}>Results ({totalResults})</Text>
          <View style={styles.resultsCont}>
            {result?.length === 0 ? (
              <Image
                source={require('../assets/images/movieTime.png')}
                style={styles.img}
              />
            ) : (
              result?.map((item, i) => {
                return (
                  <TouchableWithoutFeedback
                    key={i}
                    onPress={() => navigation.navigate('Movie', item)}>
                    <View style={styles.movieCont}>
                      <Image
                        // source={require('../assets/images/moviePoster1.png')}
                        source={{
                          uri:
                            image500(item.poster_path) || fallbackImagePoster,
                        }}
                        style={styles.imgMovie}
                      />
                      <Text style={styles.titleMovie}>
                        {item?.title?.length > 15
                          ? item?.title?.slice(0, 15) + '...'
                          : item?.title}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })
            )}
          </View>
          {pages > nextPage ? (
            <View style={styles.arrowBtnCont}>
              <TouchableOpacity onPress={() => loadMoreMovies()}>
                <ArrowDownIcon size={20} color={'white'}/>
              </TouchableOpacity>
            </View>
          ) : totalResults !== 0 ? (
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
  inputCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#737373',
    borderRadius: 50,
    paddingVertical: 8,
    width: width * 0.95,
    alignSelf: 'center',
  },
  input: {
    paddingHorizontal: 20,
    // color: '#737373',
    color: 'white',
    fontSize: 18,
    fontWeight: '300',
  },
  xBtnCont: {
    borderWidth: 1,
    borderColor: '#737373',
    borderRadius: 100,
    padding: 13,
    backgroundColor: '#737373',
    marginRight: 5,
  },
  scrollCont: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  resultsText: {
    color: '#fff',
  },
  resultsCont: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  movieCont: {
    marginBottom: 20,
  },
  imgMovie: {
    borderRadius: 20,
    width: width * 0.45,
    height: height * 0.4,
  },
  titleMovie: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  img: {
    width: width,
    height: height * 0.61,
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
