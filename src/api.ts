const API_KEY = "36eac08768828f2c4e7cd1f7365d208d";
const BASE_PATH = "https://api.themoviedb.org/3";
//api.themoviedb.org/3/movie/now_playing?api_key=36eac08768828f2c4e7cd1f7365d208d&language=en-US&page=1
//api.themoviedb.org/3/search/movie?api_key=36eac08768828f2c4e7cd1f7365d208d&query=dune
//api.themoviedb.org/3/movie/616037/credits?api_key=ff60f073259513a99c48e8293fae4fa6&language=ko (영화 직원)
//api.themoviedb.org/3/movie/616037/similar?api_key=36eac08768828f2c4e7cd1f7365d208d&language=ko (비슷한 영화들 리스트)
//api.themoviedb.org/3/genre/movie/list?api_key=36eac08768828f2c4e7cd1f7365d208d&language=ko (장르 리스트)find id
//api.themoviedb.org/3/movie/616037?api_key=36eac08768828f2c4e7cd1f7365d208d&language=ko (디테일) 모든것.

interface Genre {
    id: number;
    name: string;
}

export interface IMovie {
    id: number;
    adult: boolean;
    genre_ids: number[];
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    vote_average: number;
}

export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    },
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export interface IGetMovieDetailResult {
    id: number;
    adult: boolean;
    backdrop_path: string;
    genres: Genre[];
    overview: string;
    release_date: string;
    runtime: number;
    title: string;
    vote_average: number;
}

export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    )
}

export function getMovieDetail(movieId: number) {
    return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    )
}
