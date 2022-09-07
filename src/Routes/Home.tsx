import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeOff, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getMovies, IGetContent, IYouTubeResult, } from '../api';
import { makeImagePath } from '../utils';
import { useNavigate, useMatch } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../Components/Loading/LoadingSpinner';
import MovieDetail from '../Components/movie/MovieDetail';
import MovieSlider from '../Components/movie/MovieSlider';
import AuthService from '../firebase/auth_service';


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

const BannerSlider = styled.div`
    position: absolute;
    bottom: -200px;
    width: 100%;
    height: auto;
    display: block;
`;

const Devider = styled.div`
    width: 100%;
    height: 300px;
    display: block;
`
const FrameContainer = styled.div`
    position: absolute;
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
    overflow: hidden;
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
const MovieInfo = styled(motion.div)`
    position: absolute;
    left: 25px;
    top: 350px;
    width: 40%;
    height: 200px;
`

interface IHomeProps {
    authService: AuthService;
}

const Home = ({ authService }: IHomeProps) => {
    const navigate = useNavigate();
    const bigMovieMatch = useMatch<string, string>("/movies/:movieId/:subject");
    const middleMovieMatch = useMatch<string, string>("/movies/:movieId/");
    const [youtubeVideo, setYoutubeVideo] = useState<IYouTubeResult>();
    const [mute, setMute] = useState(1);
    const [ready, setReady] = useState(false);
    const onSoundClick = () => {
        setMute(() => {
            return mute ? 0 : 1;
        })
    }
    const { data, isLoading } = useQuery<IGetContent>(['movies', 'top_rated'], async () => await getMovies('top_rated'));
    const onDetailClick = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    }
    const setReadyAfterFiveMinute = () => {
        setTimeout(() => setReady(() => true), 5000);
    }
    useEffect(() => {
        document.body.style.overflowY = "scroll";
    });
    useEffect(() => {
        if (!isLoading) {
            const YT_BASE_PATH = "https://www.googleapis.com/youtube/v3";
            const YT_API_KEY = "AIzaSyAPn-gok6TUy-KeBkXMaOVGFOXuWFwl_HE";
            fetch(`${YT_BASE_PATH}/search?part=snippet&maxResults=1&q=${data?.results[10].original_title}-official trailer&type=video&videoDuration=short&key=${YT_API_KEY}`)
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
    return (
        <Wrapper>
            {
                isLoading ? <LoadingSpinner /> : (
                    <>
                        {setReadyAfterFiveMinute()}
                        <Banner bgphoto={makeImagePath(data?.results[10].backdrop_path || "")}>
                            {ready ? (
                                <FrameWrapper>
                                    <FrameContainer>
                                        <iframe title="official-trailer" id="ytplayer" typeof='text/html' width="720" height="405"
                                            src={`https://www.youtube.com/embed/${youtubeVideo?.items[0].id.videoId}?autoplay=1&controls=0&loop=1&playlist=${youtubeVideo?.items[0].id.videoId}&mute=${mute}&modestbranding=1&showinfo=0`}
                                            frameBorder="0" allowFullScreen />
                                    </FrameContainer>
                                    <MovieInfo layoutId='test' transition={{ type: 'tween', ease: 'linear', duration: 1.5 }}>
                                        <Title>{data?.results[10].title}</Title>
                                        {data && <DetailButton onClick={() => onDetailClick(data?.results[10].id)}>상세 정보</DetailButton>}
                                    </MovieInfo>
                                </FrameWrapper>
                            ) : (
                                <motion.div layoutId='test' style={{ width: '70%' }}>
                                    <Title>{data?.results[10].title}</Title>
                                    <Overview>{data?.results[10].overview}</Overview>
                                    {data && <DetailButton onClick={() => onDetailClick(data?.results[10].id)}>상세 정보</DetailButton>}
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
                            {middleMovieMatch?.params.movieId ?
                                <MovieDetail id={middleMovieMatch.params.movieId}></MovieDetail>
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