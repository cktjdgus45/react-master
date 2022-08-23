import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useMatch, useNavigate } from 'react-router-dom';
import MovieDetail from '../Components/MovieDetail';

const Wrapper = styled.div`
    background: black;
`

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Banner = styled.div<{ bgphoto: string }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height:100vh;
    padding: 60px;
    background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)),url(${(props) => props.bgphoto});
    background-size: cover;
`

const Title = styled.h2`
    font-size:58px;
    margin-bottom: 43px;
`
const Overview = styled.p`
    width: 40%;
    font-size: 16px;
    line-height: 1.5rem;
    margin-bottom: 20px;
    `

const DetailButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 170px;
    height: 50px;
    padding: 15px 30px;
    border-radius: 5px;
    border: none;
    background-color: ${props => props.theme.black.lighter};
    color:${props => props.theme.white.lighter};
    transition: all 300ms ease-in-out;
    font-weight: 600;
    font-size: 20px;
    &:hover{
        background-color: ${props => props.theme.black.darker};
    }
`

const Slider = styled.div`
    position: relative;
    top: -100px;
`;

const Row = styled(motion.div)`
    position: absolute;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(6,1fr);
    margin-bottom:5px;
    width: 100%;
`;

const Box = styled(motion.div) <{ bgphoto: string }>`
    background-color: white;
    background-image:url(${(props) => props.bgphoto});
    background-size:cover;
    background-position:center center;
    height: 200px;
    cursor: pointer;
    &:first-child{
        transform-origin: center left;
    }
    &:last-child{
        transform-origin: center right;
    }
`;

const Info = styled(motion.div)`
    opacity:0;
    padding:10px;
    position: absolute;
    width: 100%;
    bottom: 0;
    background: ${(props) => props.theme.black.lighter};
    h4{
        font-size: 18px;
        text-align: center;
    }
`;

const Arrow = styled.h3`
    color: ${props => props.theme.white.lighter};
    width: 25px;
    height: 25px;
    font-size: 26px;
    cursor: pointer;
    transition: all 300ms ease-in-out;
    transform-origin: center;
    &:hover{
        transform: scale(1.3,1.3);
    }
`

const LArrow = styled(motion.div)`
    width: 30px;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content:flex-start;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
`;
const RArrow = styled(motion.div)`
    width: 30px;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content:flex-end;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
`;

const rowVariants = {
    hidden: (isNext: boolean) => {
        return {
            x: isNext ? window.innerWidth : -window.innerWidth,
        };
    },
    visible: {
        x: 0,
    },
    exit: (isNext: boolean) => {
        return {
            x: isNext ? -window.innerWidth : window.innerWidth,
        };
    },
};


const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -80,
        transition: {
            delay: 0.5,
            duaration: 0.1,
            type: "tween",
        },
    },
}

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.2,
            type: "tween",
        }
    }
}

const offset = 6;

const Home = () => {
    const navigate = useNavigate();
    const bigMovieMatch = useMatch("/movies/:movieId");
    const { data, isLoading } = useQuery<IGetMoviesResult>(['movies', 'nowPlaying'], getMovies);
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    console.log(leaving);
    const onDetailClick = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    }
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex(prev => prev === maxIndex ? 0 : prev + 1);
            setIsNext(() => true);
        }
    }
    const decreaseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            setIndex(prev => prev - 1);
            setIsNext(() => false);
        }
    }
    const toggleLeaving = () => setLeaving(prev => !prev);
    const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find(movie => String(movie.id) === bigMovieMatch.params.movieId) as any;
    const [isHovered, setHovered] = useState<Boolean>(false);
    const [isNext, setIsNext] = useState(true);
    return (
        <Wrapper>
            {isLoading ? <Loader>Loading...</Loader> :
                <>
                    <Banner bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                        <Title>{data?.results[0].title}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                        {data && <DetailButton onClick={() => onDetailClick(data?.results[0].id)}>상세 정보</DetailButton>}
                    </Banner>
                    <Slider>
                        <AnimatePresence custom={isNext} initial={false} onExitComplete={toggleLeaving}>
                            <Row custom={isNext} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} transition={{ type: "tween", duration: 1 }} variants={rowVariants} initial="hidden" animate="visible" exit="exit" key={index} >
                                {data?.results.slice(1).slice(offset * index, offset * index + offset).map(movie =>
                                    <Box
                                        layoutId={movie.id + ""}
                                        key={movie.id}
                                        bgphoto={makeImagePath(movie.backdrop_path, 'w500')}
                                        variants={boxVariants}
                                        whileHover="hover"
                                        initial="normal"
                                        transition={{ type: "tween" }}
                                        onClick={() => onDetailClick(movie.id)}
                                    >
                                        <Info variants={infoVariants}>
                                            <h4>{movie.title}</h4>
                                        </Info>
                                    </Box>)}
                                {index !== 0 && (<LArrow onClick={decreaseIndex} initial={{ opacity: 0 }} transition={{ type: 'tween' }} animate={{ opacity: isHovered ? 1 : 0 }} exit={{ opacity: 0 }}> <Arrow>◀️</Arrow></LArrow>)}
                                <RArrow onClick={increaseIndex} initial={{ opacity: 0 }} transition={{ type: 'tween' }} animate={{ opacity: isHovered ? 1 : 0 }} exit={{ opacity: 0 }}>  <Arrow>▶️</Arrow></RArrow>
                            </Row>
                        </AnimatePresence>
                    </Slider>
                    <AnimatePresence>
                        {bigMovieMatch?.params.movieId ?
                            <MovieDetail clickedMovie={clickedMovie} movieId={bigMovieMatch.params.movieId}></MovieDetail>
                            : null
                        }

                    </AnimatePresence>
                </>
            }
        </Wrapper>
    )
}

export default Home;