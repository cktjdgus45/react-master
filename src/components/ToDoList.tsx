import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState, toDoSelector } from './atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';




const ToDoList = () => {
    const todos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        const { currentTarget: { value } } = event;
        setCategory(value);
    }
    console.log(category)
    return (
        <>
            <h1>To Dos</h1>
            <CreateToDo />
            <select value={category} onInput={onInput}>
                <option value="TO_DO">To Do</option>
                <option value="DOING">Doing</option>
                <option value="DONE">Done</option>
            </select>
            {todos.map(todo => <ToDo key={todo.id} {...todo} />)}
        </>
    )
}

export default ToDoList;