import React from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Banner = styled.section`
    width: 100vw;
    height: 85vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image:linear-gradient(to top,black,transparent),url('https://assets.nflxext.com/ffe/siteui/vlv3/ac824598-245b-4828-b14f-5cff9074f4d0/953c5c8a-e9f2-497c-a447-abdcb437183c/KR-ko-20220822-popsignuptwoweeks-perspective_alpha_website_small.jpg');
    background-size: cover;
    background-position: center center;
`

const Start = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media ${props => props.theme.device.laptop} {
        text-align: center;
    }
    @media ${props => props.theme.device.mobileS} {
        text-align: center;
    }
`

const BigTitle = styled.h1`
    font-size: 60px;
    font-weight: 700;
    text-align: center;
    @media ${props => props.theme.device.laptop} {
        font-size: 50px;
    }
    @media ${props => props.theme.device.mobileS} {
        font-size: 40px;
}
`
const Title = styled.h1`
    font-size: 50px;
    font-weight: 700;
    @media ${props => props.theme.device.laptop} {
        font-size:40px;
    }
    @media ${props => props.theme.device.mobileS} {
        font-size:30px;
}
`
const MiddleTitle = styled.h3`
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 30px;
    margin-top: 30px;
    @media ${props => props.theme.device.laptop} {
        font-size : 22.5px;
    }
    @media ${props => props.theme.device.mobileS} {
        font-size : 20px;
}
`
const SmallTitle = styled.h5`
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 25px;
    @media ${props => props.theme.device.laptop} {
        font-size: 17.5px;
    }
    @media ${props => props.theme.device.mobileS} {
        font-size: 15px;
}
`

const Form = styled.form`
    display: flex;
    width: 90%;
    input{
        border-radius: 3px;
        padding: 20px 5px;
        width: 70%;
        font-size: 17px;
    }
    @media ${props => props.theme.device.laptop} {
        flex-direction: column;
        input,button{
            width: 100%;
        }
    }
    @media ${props => props.theme.device.mobileS} {
        flex-direction: column;
        input,button{
            width: 100%;
        }
    }
    `
const Button = styled.button`
    width: 30%;
    border-radius: 3px;
    text-align: center;
    padding: 15px 25px;
    height: 100%;
    border: none;
    margin-left: 1px;
    background-color: ${props => props.theme.red};
    font-size: 30px;
    color: ${props => props.theme.white.lighter};
`

const Section = styled.section`
    width: 100vw;
    height: 50vh;
    padding: 20px 40px;
    background-color: #000000;
    border-bottom: 7px solid ${props => props.theme.black.lighter};
    border-top: 7px solid ${props => props.theme.black.lighter};
    @media ${props => props.theme.device.laptop} {
        height: auto;
    }
    @media ${props => props.theme.device.mobileS} {
        height: auto;
    }
`;
const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media ${props => props.theme.device.laptop} {
        flex-direction: column;
    }
    @media ${props => props.theme.device.mobileS} {
        flex-direction: column;
    }
`;
const Content = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media ${props => props.theme.device.laptop} {
        width: 100%;
    }
    @media ${props => props.theme.device.mobileS} {
        width: 100%;
    }
`;

const ContentBox = styled.div`
    width: 50%;
    @media ${props => props.theme.device.laptop} {
        
    }
    @media ${props => props.theme.device.mobileS} {
        flex-direction: column;
        text-align: center;
        width: auto;
    }
    @media ${props => props.theme.device.laptopL} {
        width: 80%;
    }
`;

const ContentMedia = styled.div`
    width: 50%;
    height: 100%;
    @media ${props => props.theme.device.laptop} {
        width: 100%;
        margin-bottom: 30px;
    }
    @media ${props => props.theme.device.mobileS} {
        width: 100%;
        margin-bottom: 30px;
    }
`;

const ContentType = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    img{
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
    }
`

interface IFormData {
    email: string;
}

const Intro = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, } = useForm<IFormData>();
    const onSubmit = (data: IFormData) => {
        navigate('/login', { state: { data } });
    }
    return (
        <>
            <Banner>
                <Start>
                    <BigTitle>영화와 시리즈를<br />무제한으로.</BigTitle>
                    <MiddleTitle>다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.</MiddleTitle>
                    <SmallTitle>시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요.</SmallTitle>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("email")} type='text' placeholder='이메일 주소'></input>
                        <Button>시작하기</Button>
                    </Form>
                </Start>
            </Banner>
            <Section>
                <ContentWrapper>
                    <Content>
                        <ContentBox>
                            <Title>TV로 즐기세요.</Title>
                            <MiddleTitle>스마트 TV, PlayStation, Xbox, Chromecast, Apple TV, 블루레이 플레이어 등 다양한 디바이스에서 시청하세요.</MiddleTitle>
                        </ContentBox>
                    </Content>
                    <ContentMedia>
                        <ContentType>
                            <video autoPlay loop muted src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"></video>
                        </ContentType>
                    </ContentMedia>
                </ContentWrapper>
            </Section>
            <Section>
                <ContentWrapper>
                    <ContentMedia>
                        <ContentType>
                            <img alt='kids' src='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg'></img>
                        </ContentType>
                    </ContentMedia>
                    <Content>
                        <ContentBox>
                            <Title>다양한 디바이스에서 시청하세요.</Title>
                            <MiddleTitle>각종 영화와 시리즈를 스마트폰, 태블릿, 노트북, TV에서 무제한으로 스트리밍하세요. 추가 요금이 전혀 없습니다.</MiddleTitle>
                        </ContentBox>
                    </Content>
                </ContentWrapper>
            </Section>
            <Section>
                <ContentWrapper>
                    <Content>
                        <ContentBox>
                            <Title>즐겨 보는 콘텐츠를 저장해 오프라인으로 시청하세요.</Title>
                            <MiddleTitle>간편하게 저장하고 빈틈없이 즐겨보세요.</MiddleTitle>
                        </ContentBox>
                    </Content>
                    <ContentMedia>
                        <ContentType>
                            <video autoPlay loop muted src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v"></video>
                        </ContentType>
                    </ContentMedia>
                </ContentWrapper>
            </Section>
            <Section>
                <ContentWrapper>
                    <ContentMedia>
                        <ContentType>
                            <img alt='kids' src='https://occ-0-395-325.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABe3Dqef6rg30BxYraI75i97IeQjD0YxUuToAnSA23dl0XQFrjXaFTWIB0HHy4TH_s094NU-9IjLpE_96AvWpTZTAQOR_icyEYcsB.png?r=acf'></img>
                        </ContentType>
                    </ContentMedia>
                    <Content>
                        <ContentBox>
                            <Title>어린이 전용 프로필을 만들어 보세요.</Title>
                            <MiddleTitle>자기만의 공간에서 좋아하는 캐릭터와 즐기는 신나는 모험. 자녀에게 이 특별한 경험을 선물하세요. 넷플릭스 회원이라면 무료입니다.</MiddleTitle>
                        </ContentBox>
                    </Content>
                </ContentWrapper>
            </Section>
        </>
    )
}
export default Intro;