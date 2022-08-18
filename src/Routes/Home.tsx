import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useMatch, useNavigate } from 'react-router-dom';

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
    font-size:68px;
    margin-bottom: 20px;
`
const Overview = styled.p`
    width: 40%;
    font-size:24px;
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

const rowVariants = {
    hidden: {
        x: window.outerWidth + 5,
    },
    visible: {
        x: 0,
    },
    exit: {
        x: -window.outerWidth - 5,
    },
}

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
    console.log(bigMovieMatch);
    const { data, isLoading } = useQuery<IGetMoviesResult>(['movies', 'nowPlaying'], getMovies);
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex(prev => prev === maxIndex ? 0 : prev + 1);
        }
    }
    const toggleLeaving = () => setLeaving(prev => !prev);
    const onBoxClicked = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    }
    return (
        <Wrapper>
            {isLoading ? <Loader>Loading...</Loader> :
                <>
                    <Banner onClick={increaseIndex} bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                        <Title>{data?.results[0].title}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                    </Banner>
                    <Slider>
                        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                            <Row transition={{ type: "tween", duration: 1 }} variants={rowVariants} initial="hidden" animate="visible" exit="exit" key={index} >
                                {data?.results.slice(1).slice(offset * index, offset * index + offset).map(movie =>
                                    <Box
                                        layoutId={movie.id + ""}
                                        key={movie.id}
                                        bgphoto={makeImagePath(movie.backdrop_path, 'w500')}
                                        variants={boxVariants}
                                        whileHover="hover"
                                        initial="normal"
                                        transition={{ type: "tween" }}
                                        onClick={() => onBoxClicked(movie.id)}
                                    >
                                        <Info variants={infoVariants}>
                                            <h4>{movie.title}</h4>
                                        </Info>
                                    </Box>)}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                    <AnimatePresence>
                        {bigMovieMatch ?
                            <motion.div
                                layoutId={bigMovieMatch.params.movieId}
                                style={{
                                    position: "absolute",
                                    width: "40vw",
                                    height: "80vh",
                                    backgroundColor: "red",
                                    top: 50,
                                    left: 0,
                                    right: 0,
                                    margin: "0 auto",
                                }}></motion.div>
                            : null
                        }

                    </AnimatePresence>
                </>
            }
        </Wrapper>
    )
}

export default Home;