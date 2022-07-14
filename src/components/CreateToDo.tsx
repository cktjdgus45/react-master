import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { todoState } from './atoms';

interface IForm {
    todo: string
}


const CreateToDo = () => {
    const setTodos = useSetRecoilState(todoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handleValid = ({ todo }: IForm) => {
        console.log("add to do", todo)
        setTodos((oldTodos) => [{ text: todo, id: Date.now(), category: 'TO_DO' }, ...oldTodos]);
        setValue("todo", "");
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleValid)}>
                <input placeholder='Write a to do' {...register("todo", { required: "Please Write a Todo" })} />
                <button>Add</button>
            </form>
        </>
    )
}

export default CreateToDo;