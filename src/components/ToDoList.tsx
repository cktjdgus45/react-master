import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

interface IForm {
    todo: string
}

interface ITodo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}


const todoState = atom<ITodo[]>({
    key: 'todo',
    default: []
})

const ToDoList = () => {
    //recoil state library
    const [todos, setTodos] = useRecoilState(todoState);

    //react-hook-form library
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<IForm>();
    const handleValid = ({ todo }: IForm) => {
        console.log("add to do", todo)
        setTodos((oldTodos) => [{ text: todo, id: Date.now(), category: 'TO_DO' }, ...oldTodos]);
        setValue("todo", "");
    }
    return (
        <>
            <h1>To Dos</h1>
            <hr />
            <form onSubmit={handleSubmit(handleValid)}>
                <input placeholder='Write a to do' {...register("todo", { required: "Please Write a Todo" })} />
                <button>Add</button>
            </form>
            <ul>
                {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
            </ul>
        </>
    )
}

export default ToDoList;