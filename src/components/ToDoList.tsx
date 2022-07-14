import React from 'react';
import { useRecoilValue } from 'recoil';
import { todoState } from './atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';




const ToDoList = () => {
    const todos = useRecoilValue(todoState);

    return (
        <>
            <h1>To Dos</h1>
            <hr />
            <CreateToDo />
            <ul>
                {todos.map(todo => <ToDo key={todo.id} {...todo} />)}
            </ul>
        </>
    )
}

export default ToDoList;