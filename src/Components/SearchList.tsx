import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getSearchMovies, getSearchTvshows, IGetContent } from '../api';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import LoadingSpinner from '../Components/Loading/LoadingSpinner';

const Row = styled.section`
    display: grid;
    justify-content: center;
    gap: 10px;
    grid-template-columns: repeat(6,15%);
    width: 100%;
    margin-bottom: 80px;
`

const Box = styled.div<{ bgPath: string }>`
    width: 100%;
    height: 175px;
    background-color: ${props => props.theme.black.lighter};
    background-position: center;
    background-size: cover;
    background-image: url(${props => props.bgPath}); 
    `
interface searchListProps {
    keyword: string;
}

const SearchList = ({ keyword }: searchListProps) => {
    const BASE_PATH = "https://api.themoviedb.org/3";
    const API_KEY = '36eac08768828f2c4e7cd1f7365d208d';
    const [data, setData] = useState<IGetContent>();
    const [movieData, setMovieData] = useState<IGetContent>();
    useEffect(() => {
        fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&language=ko&query=${keyword}`)
            .then((response) => response.json())
            .then(data => setData(data));
        fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko&query=${keyword}`)
            .then((response) => response.json())
            .then(data => setMovieData(data));
    }, [keyword])
    return (
        <>
            <Row>
                {
                    data?.results.map(tv => <Box key={tv.id} bgPath={makeImagePath(tv.backdrop_path, 'w500')} >{tv.name}</Box>)
                }
                {
                    movieData?.results.map(movie => <Box key={movie.id} bgPath={makeImagePath(movie.backdrop_path, 'w500')}>{movie.title}</Box>)
                }
            </Row>
        </>

    )
}

export default SearchList;