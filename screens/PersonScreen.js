import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
import {ChevronLeftIcon, HeartIcon} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import {
  fallbackImagePerson,
  fetchPersonDetails,
  image342,
  image500,
  image185,
  fetchPersonMovies,
} from '../api/moviedb';

const {width, height} = Dimensions.get('window');

export default function PersonScreen() {
  const {params: item} = useRoute();
  const navigation = useNavigation();
  const [heart, setFavHeart] = useState(false);
  const [personDetails, setPersonDetails] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log('PERSON SHORT INFO ------', item);

  useEffect(() => {
    getPersonDetails();
    getPersonMovies();
  }, []);

  const getPersonDetails = async () => {
    const data = await fetchPersonDetails(item.id);
    if (data) {
      setPersonDetails(data);
      setLoading(false);
    }
  }

  const getPersonMovies = async () => {
    const data = await fetchPersonMovies(item.id);
    // console.log('PERSON MOVIES ====>>>>', data.cast);
    if (data) {
      setPersonMovies(data.cast);
    }
  }

  return (
    <ScrollView style={{backgroundColor: '#171717', flex: 1}}>
      <View>
        <SafeAreaView style={styles.btnCont}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.arrowBox}>
            <ChevronLeftIcon size={30} color={'#e3dede'} strokeWidth={3.5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFavHeart(!heart)}>
            {heart === true ? (
              <HeartIcon size={34} color={'red'} fill={'red'} />
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
        <SafeAreaView>
          <View>
            <View style={styles.topCont}>
              <View style={styles.imgCont}>
                <Image
                  // source={require('../assets/images/castImage2.png')}
                  source={{
                    uri:
                      image342(personDetails.profile_path) ||
                      fallbackImagePerson,
                  }}
                  style={styles.img}
                />
              </View>
            </View>
            <View style={styles.personNameCont}>
              <Text style={styles.personName}>{personDetails.name}</Text>
              <Text style={styles.personCity}>
                {personDetails.place_of_birth}
              </Text>
            </View>
            <View style={styles.personInfo}>
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Gender</Text>
                <Text style={styles.sectionText}>
                  {personDetails.gender === 2 ? 'Male' : 'Female'}
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Birthday</Text>
                <Text style={styles.sectionText}>{personDetails.birthday}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>known for</Text>
                <Text style={styles.sectionText}>
                  {personDetails.known_for_department}
                </Text>
              </View>
              <View style={styles.sectionLast}>
                <Text style={styles.sectionHeader}>Popularity</Text>
                <Text style={styles.sectionText}>
                  {personDetails.popularity.toFixed(2)}%
                </Text>
              </View>
            </View>
            <View style={styles.biographyCont}>
              <Text style={styles.biographyHeader}>Biography</Text>
              <Text style={styles.biographyText}>
                {personDetails.biography || 'N/A'}
              </Text>
            </View>
          </View>
          {personMovies.length > 0 && (
            <MovieList title="Movies" data={personMovies} hideSeeAll={true} />
          )}
        </SafeAreaView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'absolute',
    // zIndex: 20,
    marginTop: 20,
    marginBottom: 30,
    width: width,
    paddingHorizontal: 10,
  },
  arrowBox: {
    borderColor: '#eab308',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#eab308',
  },
  topCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  imgCont: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'darkgrey',
    borderRadius: 100,
  },
  img: {
    height: height * 0.5,
    width: width * 0.7,
    alignSelf: 'center',
  },
  personNameCont: {
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 30,
  },
  personName: {
    color: '#fff',
    fontSize: 28,
    marginBottom: 7,
  },
  personCity: {
    color: '#737373',
    fontSize: 18,
  },
  personInfo: {
    backgroundColor: '#D3D3D3',
    flexDirection: 'row',
    padding: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    width: width * 0.94,
    alignSelf: 'center',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 50,
  },
  section: {
    borderRightWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    marginRight: 8,
    paddingRight: 10,
  },
  sectionLast: {
    alignItems: 'center',
  },
  sectionHeader: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 3,
  },
  sectionText: {
    color: '#000',
  },
  biographyCont: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  biographyHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
  },
  biographyText: {
    color: '#D3D3D3',
    fontSize: 18,
    marginTop: 10,
  },
});
