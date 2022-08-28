import React from 'react';
import styled from 'styled-components';

const Banner = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image:linear-gradient(to top,black,transparent),url('https://assets.nflxext.com/ffe/siteui/vlv3/ac824598-245b-4828-b14f-5cff9074f4d0/953c5c8a-e9f2-497c-a447-abdcb437183c/KR-ko-20220822-popsignuptwoweeks-perspective_alpha_website_small.jpg');

`

const Start = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const BigTitle = styled.h1`
    font-size: 60px;
    font-weight: 700;
    text-align: center;
`
const MiddleTitle = styled.h3`
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 30px;
    margin-top: 30px;
`
const SmallTitle = styled.h5`
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 25px;
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

const Intro = () => {
    return (
        <>
            <Banner>
                <Start>
                    <BigTitle>영화와 시리즈를<br />무제한으로.</BigTitle>
                    <MiddleTitle>다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.</MiddleTitle>
                    <SmallTitle>시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요.</SmallTitle>
                    <Form>
                        <input type='text' placeholder='이메일 주소'></input>
                        <Button>시작하기</Button>
                    </Form>
                </Start>
            </Banner>
        </>
    )
}
export default Intro;