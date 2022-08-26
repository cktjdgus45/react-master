import React from 'react';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
import SearchList from '../Components/SearchList';

const Wrapper = styled.div`
    margin-top: 150px;
`

const Search = () => {
    const searchMatches = useMatch<string, string>('/search/:keyword');
    return (
        <Wrapper>
            {searchMatches?.params.keyword && (
                <SearchList keyword={searchMatches?.params.keyword}></SearchList>
            )}
        </Wrapper>
    )
}

export default Search;