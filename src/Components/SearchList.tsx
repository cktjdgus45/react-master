import { useEffect, useState } from 'react';
import { IGetSearchMedia } from '../api';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Row = styled.section`
    display: grid;
    justify-content: center;
    gap: 10px;
    grid-template-columns: repeat(6,15%);
    width: 100%;
    margin-bottom: 80px;
`

const Box = styled(motion.div) <{ bgpath: string }>`
    width: 100%;
    height: 175px;
    background-color: ${props => props.theme.black.lighter};
    background-position: center;
    background-size: cover;
    background-image: url(${props => props.bgpath});
    cursor: pointer;
    `
interface searchListProps {
    keyword: string;
}

const SearchList = ({ keyword }: searchListProps) => {
    const navigate = useNavigate();
    const [data, setData] = useState<IGetSearchMedia>();
    const onBoxClick = (id: number, mediaType: string) => navigate(`/search/${mediaType}/${id}`);
    useEffect(() => {
        const BASE_PATH = "https://api.themoviedb.org/3";
        const API_KEY = process.env.REACT_APP_MOVIEDB_APIKEY;
        fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko&query=${keyword}`)
            .then((response) => response.json())
            .then(data => setData(data));
    }, [keyword])
    return (
        <>
            <Row>
                {
                    data?.results.map(media => <Box layoutId={media.id + `${media.media_type}`} onClick={() => onBoxClick(media.id, media.media_type)} key={media.id} bgpath={makeImagePath(media.backdrop_path, 'w500')} >{media.media_type !== 'movie' ? media.name : media.title}</Box>)
                }
            </Row>
        </>

    )
}

export default SearchList;