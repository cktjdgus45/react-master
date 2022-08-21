import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
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

const Overlay = styled(motion.div)`
    position: fixed;
    top:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    opacity: 0;
`;

const BigMovie = styled(motion.div)`
    position: absolute;
    height: 100%;
    width: 45vw;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: ${props => props.theme.black.darker};
    border-radius: 1%;
`;

const CloseModal = styled.div`
    cursor: pointer;
    margin: 1em;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    svg{
        background-color: #181818;
    border-radius: 50%;
    height: 36px;
    padding: 8px;
    width: 36px;
    }
`;

const MovieDetail = styled(motion.div)``;

const BigCover = styled.div`
    width: 100%;
    background-size:cover;
    background-position:center center;
    height:500px;
    overflow: hidden;
    border-radius: 1%;
`;

const BigTitle = styled.h3`
    color:${(props) => props.theme.white.lighter};
    font-size: 36px;
    position:relative;
    top: -60px;
    padding: 20px;
`;

const BigOverview = styled.p`
    color: ${props => props.theme.white.lighter};
    font-size: 15px;
    line-height: 1.5rem;
    letter-spacing: 0.5px;
    ;
`;
const MainInfo = styled.div`
    display: grid;
    position:relative;
    top: -70px;
    grid-template-columns: 2fr 1fr;
    width: 100%;
`

const TimeInfo = styled.div`
    display: flex;
    align-items:center;
    width:100%;
    height: auto;
    padding: 3px;
    margin-bottom: 30px;
    gap: 5px;
`

const Age = styled.svg`
    width: 30px;
    height: 30px;
`

const HD = styled.p`
    font-size: 12px;
    padding: 1px 5px;
    border: 0.3px solid white;
    border-radius: 7%;
`


const InfoColumn = styled.div`
    width: 100%;
    padding: 10px;
    &:first-child{
        padding: 30px;
    }
`

const InfoWrapper = styled.div`
    margin-bottom: 15px;
    `
const InfoHead = styled.span`
    color: #474747;
    font-size: 15px;
    `;

const InfoContent = styled.span`
    color: ${props => props.theme.white.lighter};
    font-size: 14px;
    padding-left: 5px;
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
    const { scrollY } = useViewportScroll();
    const { data, isLoading } = useQuery<IGetMoviesResult>(['movies', 'nowPlaying'], getMovies);
    console.log(data);
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const onOverlayClick = () => navigate('/');
    const onCloseModalClick = () => navigate('/');
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
        }
    }
    const toggleLeaving = () => setLeaving(prev => !prev);
    const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find(movie => String(movie.id) === bigMovieMatch.params.movieId);
    return (
        <Wrapper>
            {isLoading ? <Loader>Loading...</Loader> :
                <>
                    <Banner onClick={increaseIndex} bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                        <Title>{data?.results[0].title}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                        {data && <DetailButton onClick={() => onDetailClick(data?.results[0].id)}>상세 정보</DetailButton>}
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
                                        onClick={() => onDetailClick(movie.id)}
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
                            <MovieDetail initial={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }}>
                                <Overlay onClick={onOverlayClick} animate={{ opacity: 1 }} exit={{ opacity: 0 }}></Overlay>
                                <BigMovie layoutId={bigMovieMatch.params.movieId} style={{ top: scrollY.get() + 40 }}>
                                    {
                                        clickedMovie && (
                                            <>
                                                <BigCover style={{ backgroundImage: `linear-gradient(to top,black,transparent),url(${makeImagePath(clickedMovie.backdrop_path)})` }} />
                                                <CloseModal onClick={onCloseModalClick}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-uia="previewModal-closebtn" role="button" aria-label="close">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z" fill="currentColor">
                                                        </path>
                                                    </svg>
                                                </CloseModal>
                                                <BigTitle>{clickedMovie.title}</BigTitle>
                                                <MainInfo>
                                                    <InfoColumn>
                                                        <BigOverview>{clickedMovie.overview}</BigOverview>
                                                    </InfoColumn>
                                                    <InfoColumn>
                                                        <TimeInfo>
                                                            <p>2017</p>
                                                            <Age id="maturity-rating-976" viewBox="0 0 100 100">
                                                                <path id="Fill---Yellow" fill="#DFB039" d="M88.724 100h-77.45C5.049 100 0 94.954 0 88.728V11.274C0 5.048 5.048 0 11.275 0h77.449C94.949 0 100 5.048 100 11.274v77.454C100 94.954 94.95 100 88.724 100"></path><path id="12" fill="#000" d="M36.92 15.484v68.647H21.553V34.62h-5.48l7.097-19.136h13.75zm44.288 0c.848 0 1.535.687 1.535 1.533v18.144c0 1.018-.044 1.885-.133 2.605a8.067 8.067 0 01-.493 1.975 14.48 14.48 0 01-.9 1.843c-.362.631-.84 1.363-1.44 2.204L60.643 70.653h21.923v13.394H41.59v-10.07l26.152-37.29V28.42H57.136v9.345H42.127V17.017c0-.846.687-1.533 1.534-1.533z">
                                                                </path>
                                                            </Age>
                                                            <p>1시간 56분</p>
                                                            <HD>HD</HD>
                                                        </TimeInfo>
                                                        <InfoWrapper>
                                                            <InfoHead>장르 :</InfoHead>
                                                            <InfoContent>밀리터리 영화,미국 영화 , 액션,어드벤쳐</InfoContent>
                                                        </InfoWrapper>
                                                        <InfoWrapper>
                                                            <InfoHead>출연 :</InfoHead>
                                                            <InfoContent>콜 하우저,조시 켈리,대니엘 세브리</InfoContent>
                                                        </InfoWrapper>
                                                        <InfoWrapper>
                                                            <InfoHead>평점 :</InfoHead>
                                                            <InfoContent>{clickedMovie.vote_average}</InfoContent>
                                                        </InfoWrapper>
                                                    </InfoColumn>
                                                </MainInfo>
                                            </>
                                        )
                                    }
                                </BigMovie>
                            </MovieDetail>
                            : null
                        }

                    </AnimatePresence>
                </>
            }
        </Wrapper>
    )
}

export default Home;