import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragabbleCard from './DragabbleCard';

const Wrapper = styled.div`
	padding: 20px 10px;
	padding-top:10px;
	background-color: ${props => props.theme.boardColor};
	border-radius:5px ;
    width:300px;
	min-height: 300px;
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

interface IAreaProps {
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
}

interface IBoardProps {
    todos: string[];
    boardId: string;
}

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? "#F4DFD0" : props.draggingFromThisWith ? "#FAEEE0" : "#CDBBA7"};
    flex-grow: 1;
    transition: background-color .3s ease-in-out;
`


const Board = ({ todos, boardId }: IBoardProps) => {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(provided, snapshot) => (
                    <Area isDraggingOver={snapshot.isDraggingOver} draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} ref={provided.innerRef} {...provided.droppableProps}>
                        {todos.map((todo, index) => (
                            <DragabbleCard key={todo} todo={todo} index={index} />
                        ))}
                        {provided.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    )
}

export default Board;