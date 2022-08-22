import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovieDetail, IGetMovieDetailResult, IGetMoviesResult, IMovie } from '../api';
import { makeImagePath } from '../utils';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MovieDetailWrapper = styled(motion.div)``;

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
    height: auto;
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

const InfoWrapper = styled.div`
    padding: 0 10px;
`;

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
    flex-wrap: wrap;
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
`

const InfoDetail = styled.div`
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

const CastInfo = styled.div`
    width: 100%;
    height: 100%;
`

const Subject = styled.h3`
    font-size: 30px;
    margin-bottom: 30px;
    color: ${props => props.theme.white.lighter};
`

const Casts = styled.div`
    display:flex;
    align-items: center;
    justify-content:space-around;
    width: 100%;
    height: auto;
    gap: 3px;
`

const Cast = styled.div`
    display:flex;
    flex-direction: column;
    height: 300px;
    align-items: center;
    justify-content: center;
    background-color:${props => props.theme.black.lighter};
`

const CastProfile = styled.div`
    width: 150px;
    height: 80%;
    border-radius: 2px 2px 0 0;
    border: none;
    margin-bottom: 30px;
    background-image:url('https://image.tmdb.org/t/p/w200/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg');
    background-size: cover;
    background-position: center center;
`
const CharacterName = styled.h6`
    font-size: 15px;
    color: ${props => props.theme.white.lighter};
    margin-bottom: 15px;
    height: auto;
`

const CastName = styled.h6`
    font-size: 20px;
    color: ${props => props.theme.white.lighter};
    height:auto;
    padding-bottom: 15px;
`

const RelatedInfo = styled.div`
    margin-top: 15px;
`;

const RelatedContents = styled.div`
    display: grid;
    grid-template-columns: repeat(3,auto);
    gap: 15px;
    background-color: ${props => props.theme.black.lighter};
    
`

const Content = styled.div`
    width: 100%;
    height: auto;
    border-radius: 3%;
`;

const Poster = styled.div`
    position: relative;
    width: 100%;
    height: 225px;
    background-image: url('https://image.tmdb.org/t/p/w500/p1F51Lvj3sMopG948F5HsBbl43C.jpg');
    background-position: center center;
    background-size: cover;
`

const Runtime = styled.h3`
    position: absolute;
    right: 0;
    top: 0;
    color: ${props => props.theme.white.lighter};
`

interface IMovieDetailProps {
    clickedMovie: IMovie;
    movieId: string;
}

const MovieDetail = ({ clickedMovie, movieId }: IMovieDetailProps) => {
    const navigate = useNavigate();
    const onOverlayClick = () => navigate('/');
    const onCloseModalClick = () => navigate('/');
    const { scrollY } = useViewportScroll();
    const { data, isLoading } = useQuery<IGetMovieDetailResult>(['movies', 'detail'], () => getMovieDetail(+movieId));
    console.log(data);

    return (
        <MovieDetailWrapper initial={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }}>
            <Overlay onClick={onOverlayClick} animate={{ opacity: 1 }} exit={{ opacity: 0 }}></Overlay>
            <BigMovie layoutId={movieId} style={{ top: scrollY.get() + 40 }}>
                {
                    data && (
                        <>
                            <BigCover style={{ backgroundImage: `linear-gradient(to top,black,transparent),url(${makeImagePath(data.backdrop_path)})` }} />
                            <CloseModal onClick={onCloseModalClick}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-uia="previewModal-closebtn" role="button" aria-label="close">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z" fill="currentColor">
                                    </path>
                                </svg>
                            </CloseModal>
                            <BigTitle>{data.title}</BigTitle>
                            <InfoWrapper>
                                <MainInfo>
                                    <InfoColumn>
                                        <BigOverview>{data.overview}</BigOverview>
                                    </InfoColumn>
                                    <InfoColumn>
                                        <TimeInfo>
                                            <p>{data.release_date.split('-')[0]}</p>
                                            <Age id="maturity-rating-976" viewBox="0 0 100 100">
                                                <path id="Fill---Yellow" fill="#DFB039" d="M88.724 100h-77.45C5.049 100 0 94.954 0 88.728V11.274C0 5.048 5.048 0 11.275 0h77.449C94.949 0 100 5.048 100 11.274v77.454C100 94.954 94.95 100 88.724 100"></path><path id="12" fill="#000" d="M36.92 15.484v68.647H21.553V34.62h-5.48l7.097-19.136h13.75zm44.288 0c.848 0 1.535.687 1.535 1.533v18.144c0 1.018-.044 1.885-.133 2.605a8.067 8.067 0 01-.493 1.975 14.48 14.48 0 01-.9 1.843c-.362.631-.84 1.363-1.44 2.204L60.643 70.653h21.923v13.394H41.59v-10.07l26.152-37.29V28.42H57.136v9.345H42.127V17.017c0-.846.687-1.533 1.534-1.533z">
                                                </path>
                                            </Age>
                                            <p>{`${Math.floor(data.runtime / 60)}시간${data.runtime % 60}분`}</p>
                                            <HD>HD</HD>
                                        </TimeInfo>
                                        <InfoDetail>
                                            <InfoHead>장르 :</InfoHead>
                                            {data.genres.map((genre, index) => index === data.genres.length - 1 ? <InfoContent>{genre.name}</InfoContent> : <InfoContent>{genre.name},</InfoContent>)}
                                        </InfoDetail>
                                        <InfoDetail>
                                            <InfoHead>출연 :</InfoHead>
                                            <InfoContent>콜 하우저,조시 켈리,대니엘 세브리</InfoContent>
                                        </InfoDetail>
                                        <InfoDetail>
                                            <InfoHead>평점 :</InfoHead>
                                            <InfoContent>{data.vote_average.toFixed(2)}</InfoContent>
                                        </InfoDetail>
                                    </InfoColumn>
                                </MainInfo>
                                <CastInfo>
                                    <Subject>주요 등장인물</Subject>
                                    <Casts>
                                        <Cast>
                                            <CastProfile></CastProfile>
                                            <CharacterName>오딘슨 역</CharacterName>
                                            <CastName>김우빈</CastName>
                                        </Cast>
                                    </Casts>
                                </CastInfo>
                                <RelatedInfo>
                                    <Subject>함꼐 시청된 콘텐츠</Subject>
                                    <RelatedContents>
                                        <Content>
                                            <Poster>
                                                <Runtime>{`${Math.floor(data.runtime / 60)}시간${data.runtime % 60}분`}</Runtime>
                                            </Poster>
                                            <TimeInfo>
                                                <p>{data.release_date.split('-')[0]}</p>
                                                <Age id="maturity-rating-976" viewBox="0 0 100 100">
                                                    <path id="Fill---Yellow" fill="#DFB039" d="M88.724 100h-77.45C5.049 100 0 94.954 0 88.728V11.274C0 5.048 5.048 0 11.275 0h77.449C94.949 0 100 5.048 100 11.274v77.454C100 94.954 94.95 100 88.724 100"></path><path id="12" fill="#000" d="M36.92 15.484v68.647H21.553V34.62h-5.48l7.097-19.136h13.75zm44.288 0c.848 0 1.535.687 1.535 1.533v18.144c0 1.018-.044 1.885-.133 2.605a8.067 8.067 0 01-.493 1.975 14.48 14.48 0 01-.9 1.843c-.362.631-.84 1.363-1.44 2.204L60.643 70.653h21.923v13.394H41.59v-10.07l26.152-37.29V28.42H57.136v9.345H42.127V17.017c0-.846.687-1.533 1.534-1.533z">
                                                    </path>
                                                </Age>
                                                <p>{`${Math.floor(data.runtime / 60)}시간${data.runtime % 60}분`}</p>
                                                <HD>HD</HD>
                                            </TimeInfo>
                                            <BigOverview>{data.overview}</BigOverview>
                                        </Content>
                                    </RelatedContents>
                                </RelatedInfo>
                            </InfoWrapper>
                        </>
                    )
                }
            </BigMovie>
        </MovieDetailWrapper>
    )
}
export default MovieDetail;