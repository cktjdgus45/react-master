import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getSearchMovies, getSearchTvshows, IGetContent } from '../api';
import styled from 'styled-components';
import Loading from '../Components/Loading/Loading';

const Wrapper = styled.div`
    margin-top: 150px;
`

const BigTitle = styled.h1`
    font-size: 32px;
    font-weight: 600;
    color:${props => props.theme.white.lighter};
    margin-bottom: 25px;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
`

const Row = styled.section`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(6,300px);
    width: 100%;
    margin-bottom: 80px;
`

const Box = styled.div`
    width: 100%;
    height: 175px;
    background-color: ${props => props.theme.black.lighter};
`

const Search = () => {
    const offset = 6;
    const location = useLocation();
    const [rows, setRows] = useState<number[]>([]);
    const keyword = new URLSearchParams(location.search).get('keyword')! as string;
    const { data, isLoading } = useQuery<IGetContent>(['search', 'movies'], () => getSearchMovies(keyword));
    const { data: tvshows, isLoading: isTvLoading } = useQuery<IGetContent>(['search', 'tvshows'], () => getSearchTvshows(keyword));

    console.log(rows);
    // {data?.results.slice(offset * index, offset * index + offset).map(tv =>
    const getRow = () => {
        if (data) {
            const totlaNum = data?.results.length - 1;
            const temp = totlaNum / offset;
            const Rows = temp === 0 ? temp : temp + 1;
            for (let index = 0; index < Rows - 1; index++) {
                setRows(prev => [...prev, index])
            }
        }
        return rows;
    }
    useEffect(() => {
        getRow();
    }, [])

    return (
        <Wrapper>
            <BigTitle>{keyword}</BigTitle>
            {/* {
                isLoading ? <Loading></Loading> : 
            } */}
            <Content>
                {rows.map(row => (
                    <Row key={Math.random()}>
                        {
                            data?.results.slice(offset * row, offset * row + offset).map(movie =>
                                <Box key={Math.random()}>{movie.title}</Box>
                            )
                        }
                    </Row>
                ))}
            </Content>
        </Wrapper>
    )
}

export default Search;