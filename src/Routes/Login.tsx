import { User } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthService from '../firebase/auth_service';


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

const SocialButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 5px;
    transition: background-color 200ms ease-in-out;
    &:hover{
        background-color: ${props => props.theme.black.lighter};
    }
`
const SocialAuthBox = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    padding: 10px;
`

interface IFormData {
    email: string;
    password: string;
}

interface ILocationData {
    state: {
        data: {
            email: string;
        }
    }
}

interface ILoginProps {
    authService: AuthService;
}


const Login = ({ authService }: ILoginProps) => {
    const navigate = useNavigate();
    const { register, handleSubmit, } = useForm<IFormData>();
    const location = useLocation()! as unknown as ILocationData | null;
    const email = location?.state && location.state.data.email;

    const goToHome = (user: User) => {
        navigate('/', {
            state: {
                uid: user.uid,
                displayName: user.displayName,
                photoUrl: user.photoURL
            }
        });
    }

    const onSubmit = (data: IFormData) => {
        authService.emailLogin(data.email, data.password).then(data => goToHome(data.user));
    }
    const onClick = (socialName: string) => {
        authService.login(socialName)?.then(data => goToHome(data.user));
    }

    useEffect(() => {
        authService.onAuthChange((user: User | null) => {
            user && goToHome(user);
        })
    })


    return (
        <LoginWrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <BigTitle>로그인</BigTitle>
                <Input type='text' placeholder='이메일 주소 또는 전화번호' defaultValue={email ? email : ''}{...register('email')}></Input>
                <Input type='password' placeholder='비밀번호' {...register('password')}></Input>
                <LoginButton>로그인</LoginButton>
                <SocialAuthBox>
                    <SocialButton onClick={() => onClick('Google')}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/36px-Google_%22G%22_Logo.svg.png?20210618182606 1.5x, https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/48px-Google_%22G%22_Logo.svg.png?20210618182606 2x" alt="google" />
                    </SocialButton>
                    <SocialButton onClick={() => onClick('Github')}>
                        <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true">
                            <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                    </SocialButton>
                </SocialAuthBox>
            </Form>
        </LoginWrapper>
    )
}

export default Login;