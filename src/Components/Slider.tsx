import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMovies, } from '../api';
import { makeImagePath } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useMatch, useNavigate } from 'react-router-dom';
import MovieDetail from '../Components/MovieDetail';


const SliderWrapper = styled.div`
    position: relative;
    top: -100px;
`;

const SliderCopy = styled.div`
    margin-top: 200px;
`

const Row = styled(motion.div)`
    position: absolute;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(6,1fr);
    margin-bottom:5px;
    width: 100%;
`;
const RowCopy = styled(motion.div)`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(6,1fr);
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

const BigTitle = styled.h1`
    font-size: 32px;
    font-weight: 600;
    color:${props => props.theme.white.lighter};
    margin-bottom: 10px;
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

interface ISliderProps {
    subject: subject;
}

type subject = 'now_playing' | 'popular' | 'top_rated' | 'upcoming';

const Slider = ({ subject }: ISliderProps) => {
    const navigate = useNavigate();
    const bigMovieMatch = useMatch("/movies/:movieId");
    const { data } = useQuery<IGetMovies>(['movies', `${subject}`], () => getMovies(subject));
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const onDetailClick = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    }
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = data.results.length;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex(prev => prev === maxIndex ? 0 : prev + 1);
            console.log(index);
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
    const [isHovered, setHovered] = useState<Boolean>(false);
    const [isNext, setIsNext] = useState(true);
    return (
        <>
            <SliderCopy>
                <BigTitle>{subject}</BigTitle>
                <AnimatePresence custom={isNext} initial={false} onExitComplete={toggleLeaving}>
                    <Row custom={isNext} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} transition={{ type: "tween", duration: 1 }} variants={rowVariants} initial="hidden" animate="visible" exit="exit" key={index} >
                        {data?.results.slice(offset * index, offset * index + offset).map(movie =>
                            <Box
                                layoutId={movie.id + `${subject}`}
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
            </SliderCopy>
            <AnimatePresence>
                {bigMovieMatch?.params.movieId ?
                    <MovieDetail movieId={bigMovieMatch.params.movieId}></MovieDetail>
                    : null
                }
            </AnimatePresence>
        </>
    )
}

export default Slider;