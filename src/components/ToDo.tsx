import React from 'react';
import { ITodo } from './atoms';

const ToDo = ({ text }: ITodo) => {
    return (
        <>
            <li>{text}</li>
        </>
    )
}

export default ToDo;