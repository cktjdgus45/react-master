import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragabbleCard from './DragabbleCard';
import { useForm } from "react-hook-form";
import { ITodo, todoState } from '../atoms';
import { useSetRecoilState } from 'recoil';

const Wrapper = styled.div`
	padding: 20px 10px;
	padding-top:10px;
	background-color: ${props => props.theme.boardColor};
	border-radius:5px ;
    width:300px;
	height: 300px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 12px;
    text-align: center;
    height: 50px;
`
const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? "#F4DFD0" : props.draggingFromThisWith ? "#FAEEE0" : "#CDBBA7"};
    flex-grow: 1;
    transition: background-color .3s ease-in-out;
`
const Form = styled.form`
    width:100%;
`
const Input = styled.input`
    width: 100%;
    padding: 5px 10px;
    border-radius: 4px;
    margin-bottom: 5px;
`

interface IAreaProps {
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
}

interface IBoardProps {
    todos?: ITodo[];
    boardId: string;
}

interface IForm {
    todo: string;
}


const Board = ({ todos, boardId }: IBoardProps) => {
    const setToDos = useSetRecoilState(todoState);
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<IForm>();
    const onSubmit = ({ todo }: IForm) => {
        const newToDo: ITodo = {
            id: Date.now(),
            text: todo
        }
        setToDos(allBoards => {
            return {
                ...allBoards,
                [boardId]: [...allBoards[boardId], newToDo]
            }
        })
        setValue('todo', '');
    }
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            {boardId !== 'trashBoard' ?
                <>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Input {...register('todo', { required: true })} type="text" placeholder={`Add task on ${boardId}`}></Input>
                    </Form>
                    <Droppable droppableId={boardId}>
                        {(provided, snapshot) => (
                            <Area isDraggingOver={snapshot.isDraggingOver} draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} ref={provided.innerRef} {...provided.droppableProps}>
                                {todos?.map((todo, index) => (
                                    <DragabbleCard
                                        key={todo.id}
                                        todoId={todo.id}
                                        todoText={todo.text}
                                        index={index}
                                        boardId={boardId} />
                                ))}
                                {provided.placeholder}
                            </Area>
                        )}
                    </Droppable>
                </>
                :
                <Droppable droppableId={boardId}>
                    {(provided, snapshot) => ((
                        <Area isDraggingOver={snapshot.isDraggingOver} draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} ref={provided.innerRef} {...provided.droppableProps}>

                        </Area>
                    ))}
                </Droppable>
            }
        </Wrapper>
    )
}

export default Board;