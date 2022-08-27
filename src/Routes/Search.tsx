import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
import SearchList from '../Components/SearchList';
import MovieDetail from '../Components/movie/MovieDetail';
import TvDetail from '../Components/tv/TvDetail';

const Wrapper = styled.div`
    margin-top: 150px;
`

const Search = () => {
    const searchDetailMatch = useMatch<string, string>("/search/:mediaType/:id");
    const searchMatches = useMatch<string, string>('/search/:keyword');
    console.log(searchDetailMatch)
    console.log(searchDetailMatch?.params.id)
    console.log(searchDetailMatch?.params.mediaType)
    return (
        <Wrapper>
            {searchMatches?.params.keyword && (
                <SearchList keyword={searchMatches?.params.keyword}></SearchList>
            )}
            {
                searchDetailMatch?.params.id &&
                (
                    <>
                        {searchMatches?.params.keyword && (
                            <SearchList keyword={searchMatches?.params.keyword}></SearchList>
                        )}
                        <AnimatePresence>
                            {
                                searchDetailMatch?.params.mediaType === 'movie' && <MovieDetail subject={searchDetailMatch.params.mediaType} id={searchDetailMatch.params.id}></MovieDetail>
                            }
                            {
                                searchDetailMatch?.params.mediaType === 'tv' && <TvDetail subject={searchDetailMatch.params.mediaType} id={searchDetailMatch.params.id}></TvDetail>
                            }

                        </AnimatePresence>
                    </>
                )
            }
        </Wrapper>
    )
}

export default Search;