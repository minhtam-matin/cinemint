const API_KEY = "6e304c5c45d3e12cb557e11fb8d3cb77";

const requests = (number, numTwo) => {
  const api = {
    "now-playing": `/movie/now_playing?api_key=${API_KEY}&language=vi-VN&page=${number}`,
    "get-popular": `/movie/popular?api_key=${API_KEY}&language=vi-VN&page=${number}`,
    "top-rated": `/movie/top_rated?api_key=${API_KEY}&language=vi-VN&page=${number}`,
    "up-coming": `/movie/upcoming?api_key=${API_KEY}&language=vi-VN&page=${number}`,
    genres: `/genre/movie/list?api_key=${API_KEY}&language=vi-VN`,
    listMovie: `discover/movie?api_key=${API_KEY}&language=vi-VN&include_adult=false&include_video=false&page=${number}&with_genres=${numTwo}`,
    listTV: `discover/tv?api_key=${API_KEY}&language=vi-VN&include_adult=false&include_video=false&page=${number}&with_genres=${numTwo}`,
    "tv-top-rated": `/tv/top_rated?api_key=${API_KEY}&language=vi-VN&page=${number}`,
    "tv-get-popular": `/tv/popular?api_key=${API_KEY}&language=vi-VN&page=${number}`,
    "movie-start": `/person/popular?api_key=${API_KEY}&language=en-US&page=${number}`,
    "movie-detail": `/movie/${number}?api_key=${API_KEY}&language=vi-VN`,
    "tv-detail": `/tv/${number}?api_key=${API_KEY}&language=vi-VN`,
    "movie-detail-en": `/movie/${number}?api_key=${API_KEY}&language=en-US`,
    "person-detail-en": `/person/${number}?api_key=${API_KEY}&language=en-US`,
    "tv-detail-en": `/tv/${number}?api_key=${API_KEY}&language=en-US`,
    castMovie: `/movie/${number}/credits?api_key=${API_KEY}&language=en-US`,
    castTV: `/tv/${number}/credits?api_key=${API_KEY}&language=en-US`,
    recommendMovie: `movie/${number}/recommendations?api_key=${API_KEY}&language=en-US`,
    recommendTV: `tv/${number}/recommendations?api_key=${API_KEY}&language=en-US`,
    personMovies: `person/${number}/movie_credits?api_key=${API_KEY}&language=en-US`,
    personTv: `person/${number}/tv_credits?api_key=${API_KEY}&language=en-US`,
    personSocials: `person/${number}/external_ids?api_key=${API_KEY}&language=en-US`,
  };
  return api;
};

export default requests;
