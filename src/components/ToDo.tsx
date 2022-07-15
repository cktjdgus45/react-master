import React from 'react';
import { useSetRecoilState } from 'recoil';
import { ITodo, todoState } from './atoms';

const ToDo = ({ text, category, id }: ITodo) => {
    const setTodos = useSetRecoilState(todoState);

    const onClick = (newCategory: ITodo['category']) => {
        setTodos(oldTodos => {
            const targetIndex = oldTodos.findIndex(todo => todo.id === id);
            const newToDo = { text, id, category: newCategory };
            return [...oldTodos.slice(0, targetIndex), newToDo, ...oldTodos.slice(targetIndex + 1)]
        })
    }
    return (
        <>
            <li>
                <span>{text}</span>
                {category !== "TO_DO" && <button onClick={() => onClick("TO_DO")}>TO_DO</button>}
                {category !== "DOING" && <button onClick={() => onClick("DOING")}>Doing</button>}
                {category !== "DONE" && <button onClick={() => onClick("DONE")}>DONE</button>}
            </li>
        </>
    )
}

export default ToDo;