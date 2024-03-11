import axios from 'axios';
import {apiKey} from '../constants';

const baseUrl = 'https://api.themoviedb.org/3';
const trendingMovies = `${baseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMovies = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMovies = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMovieEndpoint = `${baseUrl}/search/movie?api_key=${apiKey}`;

const image500 = path =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
const image342 = path =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
const image185 = path =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;
const fallbackImagePoster =
  'https://tqsmagazine.co.uk/wp-content/themes/artpop-pro/assets/images/fallback-image.png';
const fallbackImagePerson =
  'https://www.pngitem.com/pimgs/m/649-6490124_katie-notopoulos-katienotopoulos-i-write-about-tech-round.png';

const apiRequest = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// const url = 'https://api.themoviedb.org/3/search/movie?query=oppenheimer&include_adult=false&language=en-US&page=1';

const searchMovie = params => {
  return apiRequest(searchMovieEndpoint, params);
}

const fetchTrendingMovies = async (params) => {
  return apiRequest(trendingMovies, params);
};

const fetchUpcomingMovies = async () => {
  return apiRequest(upcomingMovies);
};

const fetchTopRatedMovies = async () => {
  return apiRequest(topRatedMovies);
};

// fetch person data:
const fetchPersonDetails = async person_id => {
  return apiRequest(`${baseUrl}/person/${person_id}?api_key=${apiKey}`);
};

const fetchPersonMovies = async person_id => {
  return apiRequest(`${baseUrl}/person/${person_id}/movie_credits?api_key=${apiKey}`);
};

// fetch movie data:
const fetchMovieDetails = async movie_id => {
  return apiRequest(`${baseUrl}/movie/${movie_id}?api_key=${apiKey}`);
};

const fetchCastsMovie = async movie_id => {
  return apiRequest(`${baseUrl}/movie/${movie_id}/credits?api_key=${apiKey}`);
};

const fetchSimilarMovies = async movie_id => {
  return apiRequest(`${baseUrl}/movie/${movie_id}/similar?api_key=${apiKey}`);
};

export {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchMovieDetails,
  fetchCastsMovie,
  fetchPersonDetails,
  fetchSimilarMovies,
  fetchPersonMovies,
  searchMovie,
  image500,
  image342,
  image185,
  fallbackImagePoster,
  fallbackImagePerson,
};
