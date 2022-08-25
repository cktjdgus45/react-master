
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getMovies, IGetContent, } from '../api';
import { makeImagePath } from '../utils';
import { useNavigate, useMatch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import LoadingSpinner from '../Components/Loading/LoadingSpinner';
import MovieDetail from '../Components/movie/MovieDetail';
import MovieSlider from '../Components/movie/MovieSlider';


const Wrapper = styled.div`
    background: black;
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




const Home = () => {
    const navigate = useNavigate();
    const bigMovieMatch = useMatch<string, string>("/movies/:movieId/:subject");
    const middleMovieMatch = useMatch<string, string>("/movies/:movieId/");
    const { data, isLoading } = useQuery<IGetContent>(['movies', 'top_rated'], () => getMovies('top_rated'));
    const onDetailClick = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    }
    useEffect(() => {
        document.body.style.overflow = "scroll";
    });
    return (
        <Wrapper>
            {
                isLoading ? <LoadingSpinner /> : (
                    <>
                        <Banner bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                            <Title>{data?.results[0].title}</Title>
                            <Overview>{data?.results[0].overview}</Overview>
                            {data && <DetailButton onClick={() => onDetailClick(data?.results[0].id)}>상세 정보</DetailButton>}
                        </Banner>
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