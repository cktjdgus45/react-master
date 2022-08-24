
import styled from 'styled-components';
import Slider from '../Components/Slider';
import { useQuery } from 'react-query';
import { getMovies, IGetMovies, } from '../api';
import { makeImagePath } from '../utils';
import { useNavigate } from 'react-router-dom';


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

const Home = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useQuery<IGetMovies>(['movies', 'top_rated'], () => getMovies('top_rated'));
    const onDetailClick = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    }
    return (
        <Wrapper>
            {
                isLoading ? 'loading' : (
                    <>
                        <Banner bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                            <Title>{data?.results[0].title}</Title>
                            <Overview>{data?.results[0].overview}</Overview>
                            {data && <DetailButton onClick={() => onDetailClick(data?.results[0].id)}>상세 정보</DetailButton>}
                        </Banner>
                        <Slider subject='now_playing'></Slider>
                        <Slider subject='popular'></Slider>
                        <Slider subject='top_rated'></Slider>
                        <Slider subject='upcoming'></Slider>
                    </>
                )
            }
        </Wrapper>
    )
}

export default Home;