const API_KEY = "36eac08768828f2c4e7cd1f7365d208d";
const BASE_PATH = "https://api.themoviedb.org/3";

interface Genre {
    id: number;
    name: string;
}

export interface ITV {
    first_air_date: string;
    genres: Genre[];
    episode_run_time: [];
    name: string;
    overview: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
}

interface Cast {
    name: string;
    profile_path: string;
    character: string;
    id: number;
}

interface Relate {
    id: number;
    vote_count: number;
    backdrop_path: string;
    title: string;
    overview: string;
    release_date: string;
    first_air_date: string;
    name: string;
}

export interface IContent {
    id: number;
    vote_count: number;
    genre_ids: number[];
    backdrop_path: string;
    poster_path: string;
    title: string;
    name: string;
    overview: string;
    vote_average: number;
}


export interface IGetContent {
    dates: {
        maximum: string;
        minimum: string;
    },
    page: number;
    results: IContent[];
    total_pages: number;
    total_results: number;
}

export interface IGetDetailResult {
    id: number;
    vote_count: number;
    backdrop_path: string;
    genres: Genre[];
    overview: string;
    release_date: string;
    runtime: number;
    title: string;
    vote_average: number;
}

export interface IGetCasts {
    cast: Cast[];
}

export interface IGetRelate {
    results: Relate[];
}

export function getMovies(subject: string) {
    return fetch(`${BASE_PATH}/movie/${subject}?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    )
}


export function getMovieDetail(movieId: number) {
    return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    )
}

export function getMovieCasts(id: number) {
    return fetch(`${BASE_PATH}/movie/${id}/credits?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    )
}

export function getRelatedMovie(movieId: number) {
    return fetch(`${BASE_PATH}/movie/${movieId}/similar?api_key=${API_KEY}&language=ko`).then(
        response => response.json()
    )
}
export function getTvCasts(id: number) {
    return fetch(`${BASE_PATH}/tv/${id}/credits?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    )
}

export function getRelatedTv(tvId: number) {
    return fetch(`${BASE_PATH}/tv/${tvId}/similar?api_key=${API_KEY}&language=ko`).then(
        response => response.json()
    )
}

export function getTvDetail(tv_id: number) {
    return fetch(`${BASE_PATH}/tv/${tv_id}?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    )
}

export function getTvshows(subject: string) {
    return fetch(`${BASE_PATH}/tv/${subject}?api_key=${API_KEY}&language=ko`).then(
        (response) => response.json()
    )
}

