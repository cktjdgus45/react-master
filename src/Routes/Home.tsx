import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeOff, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getMovies, IContent, IGetContent, IYouTubeResult, } from '../api';
import { makeImagePath } from '../utils';
import { useNavigate, useMatch } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../Components/Loading/LoadingSpinner';
import MovieDetail from '../Components/movie/MovieDetail';
import MovieSlider from '../Components/movie/MovieSlider';
import AuthService from '../firebase/auth_service';
import YouTube, { YouTubeProps } from 'react-youtube';

const Wrapper = styled.div`
`

const Banner = styled.div<{ bgphoto: string }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width:100%;
    height:100vh;
    padding: 60px;
    background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)),url(${(props) => props.bgphoto});
    background-size: cover;
    background-position: center center;
    @media ${props => props.theme.device.tablet} {
        padding: 0px;
    }
`
const MovieInfo = styled(motion.div)`
    position: absolute;
    left: 25px;
    top: 350px;
    width: 40%;
    height: 200px;
    @media ${props => props.theme.device.mobileL} {
        position: static;
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
        font-size: 16px;
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
    top: -80px; 
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

interface IHomeProps {
    authService: AuthService;
}

const Home = ({ authService }: IHomeProps) => {
    const navigate = useNavigate();
    const bigMovieMatch = useMatch<string, string>("/movies/:movieId/:subject");
    const [youtubeVideo, setYoutubeVideo] = useState<IYouTubeResult>();
    const [mute, setMute] = useState(1);
    const [movie, setMovie] = useState<IContent>();
    const [ready, setReady] = useState(false);
    const onSoundClick = () => {
        setMute(() => {
            return mute ? 0 : 1;
        })
    }

    const { data, isLoading } = useQuery<IGetContent>(['movies', 'top_rated'], async () => await getMovies('top_rated'));
    const onDetailClick = (movieId: number) => {
        setReady(() => false);
        navigate(`/movies/${movieId}/movie`);
    }
    const setReadyAfterFiveMinute = () => {
        setTimeout(() => setReady(() => true), 5000);
    }
    useEffect(() => {
        bigMovieMatch && setReady(() => false);
    }, [bigMovieMatch]);

    useEffect(() => {
        document.body.style.overflowY = "scroll";
    });
    useEffect(() => {
        if (!isLoading) {
            const YT_BASE_PATH = "https://www.googleapis.com/youtube/v3";
            const YT_API_KEY = "AIzaSyC6HBrHhpuY7pFjW1uMYZ1u5AjG-DxTk-c";
            const index = data?.results.findIndex(movie => movie.title === '기생충')! as number;
            const movie = data?.results[index];
            setMovie(movie);
            fetch(`${YT_BASE_PATH}/search?part=snippet&maxResults=1&q=${movie?.original_title}-official trailer&type=video&videoDuration=short&key=${YT_API_KEY}`)
                .then((response) => response.json())
                .then((response2) => setYoutubeVideo(response2))
        }
    }, [data?.results, isLoading])
    useEffect(() => {
        authService.onAuthChange(user => {
            if (!user) {
                navigate('/react-master');
            }
        })
    })
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
        const playingTime = (youtubePlayer.getDuration() - 2) * 1000;
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
                        <Banner bgphoto={makeImagePath(movie?.backdrop_path || "")}>
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
                                    <MovieInfo layoutId='test' transition={{ type: 'tween', ease: 'linear', duration: 1 }}>
                                        <Title>{movie?.title}</Title>
                                        {movie && <DetailButton onClick={() => onDetailClick(movie?.id)}>상세 정보</DetailButton>}
                                    </MovieInfo>
                                </FrameWrapper>
                            ) : (
                                <motion.div layoutId='test' style={{ width: '100vw' }}>
                                    <Title>{movie?.title}</Title>
                                    <Overview>{movie?.overview}</Overview>
                                    {movie && <DetailButton onClick={() => onDetailClick(movie?.id)}>상세 정보</DetailButton>}
                                </motion.div>
                            )}
                        </Banner>
                        {ready && (<SoundButton onClick={onSoundClick}>{!mute ? <FontAwesomeIcon icon={faVolumeOff} /> : <FontAwesomeIcon icon={faVolumeXmark} />}</SoundButton>)}
                        <BannerSlider>
                            <MovieSlider subject='now_playing'></MovieSlider>
                        </BannerSlider>
                        <Devider></Devider>
                        <MovieSlider subject='popular'></MovieSlider>
                        <MovieSlider subject='top_rated'></MovieSlider>
                        <MovieSlider subject='upcoming'></MovieSlider>
                        <AnimatePresence>
                            {bigMovieMatch?.params.movieId && bigMovieMatch.params.subject ?
                                <MovieDetail subject={bigMovieMatch.params.subject} id={bigMovieMatch.params.movieId}></MovieDetail>
                                : null
                            }
                        </AnimatePresence>
                    </>
                )
            }
        </Wrapper>
    )
}

export default Home;