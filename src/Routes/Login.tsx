import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
const LoginWrapper = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image:linear-gradient(to top,black,transparent),url('https://assets.nflxext.com/ffe/siteui/vlv3/ac824598-245b-4828-b14f-5cff9074f4d0/953c5c8a-e9f2-497c-a447-abdcb437183c/KR-ko-20220822-popsignuptwoweeks-perspective_alpha_website_small.jpg');
    background-size: cover;
    background-position: center center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 70px 65px;
    background-color: rgba(0,0,0,0.9);
`;
const BigTitle = styled.h1`
    font-size: 35px;
    font-weight: 600;
    margin-bottom: 30px;
    color: ${props => props.theme.white.lighter};
`;
const Input = styled.input`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 20px 10px;
    
    background-color:${props => props.theme.black.lighter};
    color: ${props => props.theme.white.lighter};
    &::placeholder{
        font-size: 20px;
    }
`;

const LoginButton = styled.button`
    padding: 15px 130px;
    color: ${props => props.theme.white.lighter};
    background-color: ${props => props.theme.red};
    font-size: 17px;
    font-weight: 600;
`;

interface IFormData {
    email: string;
    password: number;
}

interface ILocationData {
    state: {
        data: {
            email: string;
        }
    }
}

const Login = () => {
    const { register, handleSubmit, } = useForm<IFormData>();
    const location = useLocation()! as unknown as ILocationData;
    const email = location.state.data.email;
    const onSubmit = (data: IFormData) => {
        console.log(data);
    }
    return (
        <LoginWrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <BigTitle>로그인</BigTitle>
                <Input type='text' placeholder='이메일 주소 또는 전화번호' defaultValue={email ? email : ''}{...register('email')}></Input>
                <Input type='password' placeholder='비밀번호' {...register('password')}></Input>
                <LoginButton>로그인</LoginButton>
            </Form>
        </LoginWrapper>
    )
}

export default Login;