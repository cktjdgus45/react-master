import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Categories, ITodo, todoState } from './atoms';

const ToDo = ({ text, category, id }: ITodo) => {
    const setTodos = useSetRecoilState(todoState);

    const onClick = (newCategory: ITodo['category']) => {
        setTodos(oldTodos => {
            const targetIndex = oldTodos.findIndex(todo => todo.id === id);
            const newToDo = { text, id, category: newCategory };
            return [...oldTodos.slice(0, targetIndex), newToDo, ...oldTodos.slice(targetIndex + 1)]
        })
    }
    const onDelete = () => {
        setTodos(oldTodos => {
            const targetIndex = oldTodos.findIndex(todo => todo.id === id);
            return [...oldTodos.slice(0, targetIndex), ...oldTodos.slice(targetIndex + 1)];
        })
    }
    return (
        <>
            <li>
                <span>{text}</span>
                {category !== Categories.TO_DO && <button onClick={() => onClick(Categories.TO_DO)}>TO_DO</button>}
                {category !== Categories.DOING && <button onClick={() => onClick(Categories.DOING)}>Doing</button>}
                {category !== Categories.DONE && <button onClick={() => onClick(Categories.DONE)}>DONE</button>}
                <button onClick={onDelete}>Delete</button>
            </li>
        </>
    )
}

export default ToDo;