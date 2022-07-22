import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { themeState, todoState } from '../atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const Nav = styled.nav`
    position:fixed;
    top: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: auto;
    background-color: ${props => props.theme.bgColor};
    padding: 3px 5px;
    z-index: 99999;
`
const Logo = styled.span`
    font-size: 20px;
    font-weight: bold;
    line-height: 0.1;
`

const Form = styled.form`
	width: 25%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 20px;
`
const Input = styled.input`
	width: 100%;
	padding: 5px 3px;
    border-radius: 20px;
`

const Button = styled.button<{ isDark: boolean }>`
    display:flex;
    align-items: center;
    font-size: 1.3rem;
    justify-content: center;
    padding: 10px;
    color: ${props => props.theme.textColor};
    border: none;
    border-radius: 50%;
    background-color: transparent;
    transition: background 300ms ease-in-out;
    &:hover{
        background: ${props => props.isDark ? 'hsla(0,0%,100%,.2)' : 'hsla(20,20%,70%,.2)'};
    }
`

interface IForm {
    board: string;
}


const NavComponent = () => {
    const setBoard = useSetRecoilState(todoState);
    const [isDark, setIsDark] = useRecoilState(themeState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const onSubmit = ({ board }: IForm) => {
        setBoard(current => {
            return {
                ...current,
                [board]: []
            }
        })
        setValue('board', '');
    }
    const onToggle = () => {
        setIsDark((currnet: boolean) => {
            return !currnet;
        })
    }
    return (
        <Nav>
            <h1>
                <Logo>TODO</Logo>
                <br />
                <Logo>BOARD</Logo>
            </h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" placeholder='add Board' {...register('board', { required: true })} />
            </Form>
            <Button isDark={isDark} onClick={onToggle}>
                {isDark ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
            </Button>
        </Nav>
    )
}

export default NavComponent;