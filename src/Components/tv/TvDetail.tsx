import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getTvCasts, getRelatedTv, getTvDetail, IGetCasts, IGetRelate, ITV, IYouTubeResult } from '../../api';
import { makeImagePath } from '../../utils';
import { motion, useViewportScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import YouTube, { YouTubeProps } from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeOff, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'

const MovieDetailWrapper = styled(motion.div)``;

const Overlay = styled(motion.div)`
    position: fixed;
    top:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    opacity: 0;
    overflow-y: auto;
`;

const BigTv = styled(motion.div)`
    position: absolute;
    width: 60vw;
    overflow-y: scroll;
    height: 100vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: ${props => props.theme.black.darker};
    border-radius: 1%;
    &::-webkit-scrollbar {
    display: none;
}
  -ms-overflow-style: none; 
  @media ${props => props.theme.device.laptop} {
    width: 85vw;
  }
  @media ${props => props.theme.device.mobileL} {
    width: 95vw;
  }
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

const SoundButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    color: ${props => props.theme.white.lighter};
    border-color: ${props => props.theme.white.lighter};
    background-color: transparent;
    border-radius: 50%;
    font-size: 30px;
    position: absolute;
    right: 30px;
    top: 40vh;
`

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
    column-gap: 5px;
    row-gap: 7px;
    flex-wrap: wrap;
`

const Cast = styled.div`
    display:flex;
    flex-direction: column;
    width: 150px;
    height: 300px;
    align-items: center;
    justify-content: center;
    background-color:${props => props.theme.black.lighter};
`

const CastProfile = styled.div<{ profile_path: string }>`
    width: 100%;
    height: 80%;
    border-radius: 2px 2px 0 0;
    border: none;
    margin-bottom: 30px;
    background-image:url(${(props) => props.profile_path});
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
    justify-content: center;
    grid-template-columns: repeat(3,30%);
    padding-bottom: 200px;
    gap: 15px;
    background-color: ${props => props.theme.black.lighter};
    
`

const Content = styled.div`
    width: 100%;
    height: auto;
    border-radius: 3%;
`;

const Poster = styled.div<{ bg: string }>`
    position: relative;
    width: 100%;
    height: 225px;
    background-image: url(${props => props.bg});
    background-position: center center;
    background-size: cover;
`

const SmallTitle = styled.h3`
    position: absolute;
    right: 0;
    top: 0;
    color: ${props => props.theme.white.lighter};
`

const FrameContainer = styled.div`
    position: relative;
    padding-bottom: 39.25%;
    padding-top: 37%;
    width: 300%;
    left: -100%;
    top: 0;
    iframe{
        position: absolute; 
    top: -140px; 
    left: 0; 
    width: 100%; 
    height: 100%;
    }
    @media ${props => props.theme.device.laptopL} {
        padding-bottom: 69.25%;
    }
    @media ${props => props.theme.device.tablet} {
        padding-top: 60%;
        padding-bottom: 75%;
    }
    @media ${props => props.theme.device.mobileL} {
        padding-top: 100%;
        padding-bottom: 100%;
    }
`
const FrameWrapper = styled.div`
    overflow: hidden;
    max-width: 100%;
`

interface IDetailProps {
    id: string;
    subject?: string;
}

const TvDetail = ({ id, subject }: IDetailProps) => {
    const navigate = useNavigate();
    const [mute, setMute] = useState(1);
    const onOverlayClick = () => {
        if (subject === 'tv') {
            navigate(-1);
        } else {
            navigate('/Tv');
        }
    }
    const onCloseModalClick = () => {
        if (subject === 'tv') {
            navigate(-1);
        } else {
            navigate('/Tv');
        }
    }
    const onSoundClick = () => {
        setMute(() => {
            return mute ? 0 : 1;
        })
    }
    const { scrollY } = useViewportScroll();
    const { data, isLoading } = useQuery<ITV>(['tvshows', 'detail'], () => getTvDetail(+id));
    const { data: castData } = useQuery<IGetCasts>(['tvshows', 'casts'], () => getTvCasts(+id));
    const { data: relatedTVs } = useQuery<IGetRelate>(['tvshows', 'related'], () => getRelatedTv(+id));
    const casts = castData?.cast.slice(0, 4);
    const [youtubeVideo, setYoutubeVideo] = useState<IYouTubeResult>();
    const [ready, setReady] = useState(false);
    const relatedTvshows = relatedTVs?.results.slice(0, 12);
    const sliceOverView = (overview: string) => {
        if (overview.length < 127) return overview;
        let words = overview.substring(0, overview.lastIndexOf(' ') / 4);
        words = words.slice(0, words.lastIndexOf('! ')) + '..';
        return words;
    }
    useEffect(() => {
        if (!isLoading) {
            const YT_BASE_PATH = "https://www.googleapis.com/youtube/v3";
            const YT_API_KEY = process.env.REACT_APP_YOUTUBE_APIKEY;
            fetch(`${YT_BASE_PATH}/search?part=snippet&maxResults=1&q=${data?.original_name}-official trailer&type=video&videoDuration=short&key=${YT_API_KEY}`)
                .then((response) => response.json())
                .then((response2) => setYoutubeVideo(response2))
        }
    }, [data, isLoading])
    useEffect(() => {
        document.body.style.overflow = "hidden";
    });
    useEffect(() => {
        setReadyAfterFiveMinute()
    }, [])
    const opts = {
        height: '720',
        width: '405',
        playerVars: {
            autoplay: 1,
            controls: 0,
            autohide: 1,
            loop: 1,
            rel: 0,
            mute,
            modestbranding: 1,
            showinfo: 0,
        },
    }
    const setReadyAfterFiveMinute = () => {
        setTimeout(() => setReady(() => true), 5000);
    }
    const onReady: YouTubeProps['onReady'] = (event) => {
        const youtubePlayer = event.target;
        youtubePlayer.playVideo();
        function setTimeCallback() {
            setReady(() => false);
        }
        const playingTime = (youtubePlayer.getDuration() - 2) * 1000;
        setTimeout(setTimeCallback, playingTime);
    }
    const onEnd = () => {
        setReady(() => false);
    }
    return (
        <MovieDetailWrapper transition={{ type: 'tween' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Overlay onClick={onOverlayClick} animate={{ opacity: 1 }} exit={{ opacity: 0 }}></Overlay>
            <BigTv layoutId={id + `${subject}`} style={{ top: scrollY.get() + 80 }}>
                {
                    data && (
                        <>
                            <BigCover style={{ backgroundImage: `linear-gradient(to top,black,transparent),url(${makeImagePath(data.backdrop_path)})` }} >
                                {ready && (
                                    <FrameWrapper>
                                        <FrameContainer>
                                            <YouTube
                                                videoId={youtubeVideo?.items[0].id.videoId}
                                                id="ytplayer"
                                                title='official-trailer'
                                                opts={opts}
                                                onReady={onReady}
                                                onEnd={onEnd}
                                            />
                                        </FrameContainer>
                                    </FrameWrapper>
                                )}
                            </BigCover>
                            {ready && (<SoundButton onClick={onSoundClick}>{!mute ? <FontAwesomeIcon icon={faVolumeOff} /> : <FontAwesomeIcon icon={faVolumeXmark} />}</SoundButton>)}
                            <CloseModal onClick={onCloseModalClick}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-uia="previewModal-closebtn" role="button" aria-label="close">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z" fill="currentColor">
                                    </path>
                                </svg>
                            </CloseModal>
                            <BigTitle>{data.name}</BigTitle>
                            <InfoWrapper>
                                <MainInfo>
                                    <InfoColumn>
                                        <BigOverview>{data.overview}</BigOverview>
                                    </InfoColumn>
                                    <InfoColumn>
                                        <TimeInfo>
                                            <p>{data.first_air_date.split('-')[0]}</p>
                                            {data.vote_count > 1500 ? (
                                                <Age id="maturity-rating-978" viewBox="0 0 100 100"><path id="FIll---Red" fill="#C52E37" d="M88.728 100H11.27C5.043 100 0 94.957 0 88.73V11.274C0 5.048 5.043 0 11.27 0h77.458C94.954 0 100 5.048 100 11.274V88.73c0 6.227-5.046 11.27-11.272 11.27"></path><path id="18" fill="#FFFFFE" d="M81.473 15.482c.846 0 1.534.687 1.534 1.533v22.099c0 2.036-.283 3.563-.852 4.581-.568 1.02-1.542 1.947-2.918 2.784l-4.581 2.431 4.58 2.156c.777.417 1.424.834 1.93 1.254.51.42.917.931 1.215 1.528.298.6.507 1.32.626 2.157.12.84.182 1.858.182 3.058v23.533c0 .846-.686 1.533-1.533 1.533H43.21a1.536 1.536 0 01-1.535-1.533V59.063c0-2.218.255-3.896.763-5.036.51-1.135 1.538-2.127 3.1-2.961l4.582-2.156-4.581-2.43c-1.376-.838-2.35-1.778-2.92-2.832-.565-1.046-.855-2.563-.855-4.534V17.015c0-.846.688-1.533 1.534-1.533zm-45.008 0V84.13H21.103V34.62h-5.485l7.104-19.136h13.743zm29.913 39.176h-7.89c-.845 0-1.534.686-1.534 1.532v13.737c0 .846.689 1.534 1.535 1.534h7.89c.846 0 1.534-.688 1.534-1.534V56.19c0-.846-.688-1.532-1.535-1.532zm0-26.548h-7.89c-.845 0-1.534.686-1.534 1.532v12.014c0 .846.689 1.533 1.535 1.533h7.89c.846 0 1.534-.687 1.534-1.533V29.642c0-.846-.688-1.532-1.535-1.532z"></path></Age>
                                            ) : (
                                                <Age id="maturity-rating-976" viewBox="0 0 100 100">
                                                    <path id="Fill---Yellow" fill="#DFB039" d="M88.724 100h-77.45C5.049 100 0 94.954 0 88.728V11.274C0 5.048 5.048 0 11.275 0h77.449C94.949 0 100 5.048 100 11.274v77.454C100 94.954 94.95 100 88.724 100"></path><path id="12" fill="#000" d="M36.92 15.484v68.647H21.553V34.62h-5.48l7.097-19.136h13.75zm44.288 0c.848 0 1.535.687 1.535 1.533v18.144c0 1.018-.044 1.885-.133 2.605a8.067 8.067 0 01-.493 1.975 14.48 14.48 0 01-.9 1.843c-.362.631-.84 1.363-1.44 2.204L60.643 70.653h21.923v13.394H41.59v-10.07l26.152-37.29V28.42H57.136v9.345H42.127V17.017c0-.846.687-1.533 1.534-1.533z">
                                                    </path>
                                                </Age>
                                            )}
                                            {data.episode_run_time.map(runtime => (
                                                <p key={runtime}>{`${Math.floor(runtime / 60)}시간${runtime % 60}분`}</p>
                                            ))}
                                            <HD>HD</HD>
                                        </TimeInfo>
                                        <InfoDetail>
                                            <InfoHead>장르 :</InfoHead>
                                            {data.genres.map((genre, index) => index === data.genres.length - 1 ? <InfoContent key={index}>{genre.name}</InfoContent> : <InfoContent key={index}>{genre.name},</InfoContent>)}
                                        </InfoDetail>
                                        <InfoDetail>
                                            <InfoHead>출연 :</InfoHead>
                                            {casts?.map((cast, index) => index === casts.length - 1 ? <InfoContent key={index}>{cast.name}..</InfoContent> : <InfoContent key={index}>{cast.name},</InfoContent>)}
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
                                        {casts?.map(cast => (
                                            <Cast key={cast.id}>
                                                <CastProfile profile_path={makeImagePath(cast.profile_path, 'w200')}></CastProfile>
                                                <CharacterName>{cast.character}</CharacterName>
                                                <CastName>{cast.name}</CastName>
                                            </Cast>
                                        ))}
                                    </Casts>
                                </CastInfo>
                                <RelatedInfo>
                                    <Subject>함꼐 시청된 콘텐츠</Subject>
                                    <RelatedContents>
                                        {relatedTvshows?.map(item => (
                                            <Content key={item.id}>
                                                <Poster bg={makeImagePath(item.backdrop_path, 'w500')}>
                                                    <SmallTitle>{item.name}</SmallTitle>
                                                </Poster>
                                                <TimeInfo>
                                                    {item.vote_count > 1500 ? (
                                                        <Age id="maturity-rating-978" viewBox="0 0 100 100"><path id="FIll---Red" fill="#C52E37" d="M88.728 100H11.27C5.043 100 0 94.957 0 88.73V11.274C0 5.048 5.043 0 11.27 0h77.458C94.954 0 100 5.048 100 11.274V88.73c0 6.227-5.046 11.27-11.272 11.27"></path><path id="18" fill="#FFFFFE" d="M81.473 15.482c.846 0 1.534.687 1.534 1.533v22.099c0 2.036-.283 3.563-.852 4.581-.568 1.02-1.542 1.947-2.918 2.784l-4.581 2.431 4.58 2.156c.777.417 1.424.834 1.93 1.254.51.42.917.931 1.215 1.528.298.6.507 1.32.626 2.157.12.84.182 1.858.182 3.058v23.533c0 .846-.686 1.533-1.533 1.533H43.21a1.536 1.536 0 01-1.535-1.533V59.063c0-2.218.255-3.896.763-5.036.51-1.135 1.538-2.127 3.1-2.961l4.582-2.156-4.581-2.43c-1.376-.838-2.35-1.778-2.92-2.832-.565-1.046-.855-2.563-.855-4.534V17.015c0-.846.688-1.533 1.534-1.533zm-45.008 0V84.13H21.103V34.62h-5.485l7.104-19.136h13.743zm29.913 39.176h-7.89c-.845 0-1.534.686-1.534 1.532v13.737c0 .846.689 1.534 1.535 1.534h7.89c.846 0 1.534-.688 1.534-1.534V56.19c0-.846-.688-1.532-1.535-1.532zm0-26.548h-7.89c-.845 0-1.534.686-1.534 1.532v12.014c0 .846.689 1.533 1.535 1.533h7.89c.846 0 1.534-.687 1.534-1.533V29.642c0-.846-.688-1.532-1.535-1.532z"></path></Age>
                                                    ) : (
                                                        <Age id="maturity-rating-976" viewBox="0 0 100 100">
                                                            <path id="Fill---Yellow" fill="#DFB039" d="M88.724 100h-77.45C5.049 100 0 94.954 0 88.728V11.274C0 5.048 5.048 0 11.275 0h77.449C94.949 0 100 5.048 100 11.274v77.454C100 94.954 94.95 100 88.724 100"></path><path id="12" fill="#000" d="M36.92 15.484v68.647H21.553V34.62h-5.48l7.097-19.136h13.75zm44.288 0c.848 0 1.535.687 1.535 1.533v18.144c0 1.018-.044 1.885-.133 2.605a8.067 8.067 0 01-.493 1.975 14.48 14.48 0 01-.9 1.843c-.362.631-.84 1.363-1.44 2.204L60.643 70.653h21.923v13.394H41.59v-10.07l26.152-37.29V28.42H57.136v9.345H42.127V17.017c0-.846.687-1.533 1.534-1.533z">
                                                            </path>
                                                        </Age>
                                                    )}
                                                    <p>{item.first_air_date.split('-')[0]}</p>
                                                </TimeInfo>
                                                <BigOverview>{item.overview ? sliceOverView(item.overview) : '미리보기 없음'}</BigOverview>
                                            </Content>
                                        ))}
                                    </RelatedContents>
                                </RelatedInfo>
                            </InfoWrapper>
                        </>
                    )
                }
            </BigTv>
        </MovieDetailWrapper>
    )
}
export default TvDetail;