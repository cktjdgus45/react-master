import React from 'react';
import { useRecoilValue } from 'recoil';
import { toDoSelector } from './atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';




const ToDoList = () => {
    const [toDo, doing, done] = useRecoilValue(toDoSelector);
    return (
        <>
            <CreateToDo />
            <h1>ToDo</h1>
            <hr />
            <ul>
                {toDo.map(toDo => <ToDo key={toDo.id} {...toDo} />)}
            </ul>
            <h1>Doing</h1>
            <hr />
            <ul>
                {doing.map(doing => <ToDo key={doing.id} {...doing} />)}
            </ul>
            <h1>Done</h1>
            <hr />
            <ul>
                {done.map(done => <ToDo key={done.id} {...done} />)}
            </ul>
        </>
    )
}

export default ToDoList;