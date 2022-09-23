
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getSearchYoutube, getTvshows, IContent, IGetContent, IYouTubeResult, } from '../api';
import { makeImagePath } from '../utils';
import { useNavigate, useMatch } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../Components/Loading/LoadingSpinner';
import TvSlider from '../Components/tv/TvSlider';
import TvDetail from '../Components/tv/TvDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeOff, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'
import YouTube, { YouTubeProps } from 'react-youtube';

const Wrapper = styled.div`
`

const Banner = styled.div<{ bgphoto: string }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height:100vh;
    padding: 60px;
    background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)),url(${(props) => props.bgphoto});
    background-size: cover;
    @media ${props => props.theme.device.tablet} {
        padding: 0px;
    }
`

const Title = styled.h2`
    font-size:58px;
    margin-bottom: 43px;
    @media ${props => props.theme.device.mobileL} {
        font-size:25px;
    }
    @media ${props => props.theme.device.tablet} {
        font-size:30px;
    }
`
const Overview = styled.p`
    width: 40%;
    font-size: 16px;
    line-height: 1.5rem;
    margin-bottom: 20px;
    @media ${props => props.theme.device.tablet}{
        width: 100%;
    }
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
    @media ${props => props.theme.device.tablet} {
        padding: 10px 20px;
        width: 130px;
    }
`

const BannerSlider = styled.div`
    position: absolute;
    bottom: -200px;
    width: 100%;
    height: auto;
    display: block;
    @media ${props => props.theme.device.tablet} {
        position: static;
    }
`;

const Devider = styled.div`
    width: 100%;
    height: 300px;
    display: block;
`
const FrameContainer = styled.div`
    position: relative;
    padding-bottom: 39.25%;
    padding-top: 10%;
    width: 300%;
    left: -100%;
    top: 0;
    iframe{
        position: absolute; 
    top: -104px; 
    left: 0; 
    width: 100%; 
    height: 100%;
    }
`

const FrameWrapper = styled.div`
    max-width: 100%;
`
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
    top: 75vh;
`
const TvInfo = styled(motion.div)`
    position: absolute;
    left: 25px;
    top: 350px;
    width: 40%;
    height: 200px;
    @media ${props => props.theme.device.mobileL} {
        position: static;
    }
`

const Tv = () => {
    const navigate = useNavigate();
    const useTvMatch = useMatch("/tvshows/:tvId/:subject");
    const [mute, setMute] = useState(1);
    const [ready, setReady] = useState(false);
    const [tv, setTv] = useState<IContent>();
    const [youtubeVideo, setYoutubeVideo] = useState<IYouTubeResult>();

    const { data, isLoading } = useQuery<IGetContent>(['tvshows', 'top_rated'], () => getTvshows('top_rated'));

    const onDetailClick = (tvId: number) => {
        setReady(() => false);
        navigate(`/tvshows/${tvId}/tv`);
    }

    const onSoundClick = () => {
        setMute(() => {
            return mute ? 0 : 1;
        })
    }
    const setReadyAfterFiveMinute = () => {
        setTimeout(() => setReady(() => true), 5000);
    }
    useEffect(() => {
        useTvMatch && setReady(() => false);
    }, [useTvMatch]);

    useEffect(() => {
        document.body.style.overflowY = "scroll";
    });
    useEffect(() => {
        if (!isLoading) {
            const index = data?.results.findIndex(tv => tv.name === '아케인')! as number;
            const tv = data?.results[index];
            setTv(tv);
            tv &&
                getSearchYoutube(tv.original_name)
                    ?.then(response => response.json())
                    .then(json => setYoutubeVideo(json));
        }
    }, [data?.results, isLoading])

    const opts = {
        height: '720',
        width: '405',
        playerVars: {
            autoplay: 1,
            controls: 0,
            autohide: 1,
            rel: 0,
            mute: mute,
            modestbranding: 1,
            showinfo: 0,
        },
    }
    const onReady: YouTubeProps['onReady'] = (event) => {
        const youtubePlayer = event.target;
        youtubePlayer.playVideo();
        function setTimeCallback() {
            setReady(() => false);
        }
        const playingTime = (youtubePlayer.getDuration() - 3.5) * 1000;
        setTimeout(setTimeCallback, playingTime);
    }
    const onEnd = () => {
        setReady(() => false);
    }
    useEffect(() => {
        setReadyAfterFiveMinute()
    }, [])
    return (
        <Wrapper>
            {
                isLoading ? <LoadingSpinner /> : (
                    <>
                        <Banner bgphoto={makeImagePath(tv?.backdrop_path || "")}>
                            {ready ? (
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
                                    <TvInfo layoutId='test' transition={{ type: 'tween', ease: 'linear', duration: 1 }}>
                                        <Title>{tv?.name}</Title>
                                        {tv && <DetailButton onClick={() => onDetailClick(tv?.id)}>상세 정보</DetailButton>}
                                    </TvInfo>
                                </FrameWrapper>
                            ) : (
                                <motion.div layoutId='test' style={{ width: '70%' }}>
                                    <Title>{tv?.name}</Title>
                                    <Overview>{tv?.overview}</Overview>
                                    {tv && <DetailButton onClick={() => onDetailClick(tv?.id)}>상세 정보</DetailButton>}
                                </motion.div>
                            )}
                        </Banner>
                        {ready && <SoundButton onClick={onSoundClick}>{!mute ? <FontAwesomeIcon icon={faVolumeOff} /> : <FontAwesomeIcon icon={faVolumeXmark} />}</SoundButton>}
                        <BannerSlider>
                            <TvSlider subject='on_the_air'></TvSlider>
                        </BannerSlider>
                        <Devider></Devider>
                        <TvSlider subject='airing_today'></TvSlider>
                        <TvSlider subject='popular'></TvSlider>
                        <TvSlider subject='top_rated'></TvSlider>
                        <AnimatePresence>
                            {useTvMatch?.params.tvId && useTvMatch.params.subject ?
                                <TvDetail subject={useTvMatch.params.subject} id={useTvMatch.params.tvId}></TvDetail>
                                : null
                            }
                        </AnimatePresence>
                    </>
                )
            }
        </Wrapper>
    )
}

export default Tv;