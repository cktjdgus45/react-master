const API_KEY = "36eac08768828f2c4e7cd1f7365d208d";
const BASE_PATH = "https://api.themoviedb.org/3";
// https://api.themoviedb.org/3/movie/now_playing?api_key=36eac08768828f2c4e7cd1f7365d208d&language=en-US&page=1
//https://api.themoviedb.org/3/search/movie?api_key=36eac08768828f2c4e7cd1f7365d208d&query=dune

interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
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

export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
        (response) => response.json()
    )
}