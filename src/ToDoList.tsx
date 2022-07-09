import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const ToDoList = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data: any,) => console.log(data);
    const onError = (errors: any,) => console.log(errors);
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <input placeholder='Write a to do' {...register("todo")} />
                <button>Add</button>
            </form>
        </>
    )
}

export default ToDoList;