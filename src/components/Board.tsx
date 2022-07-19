import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragabbleCard from './DragabbleCard';

const Wrapper = styled.div`
	padding: 20px 10px;
	padding-top:30px;
	background-color: ${props => props.theme.boardColor};
	border-radius:5px ;
	min-height: 200px;
`;

interface IBoardProps {
    todos: string[];
    boardId: string;
}

const Board = ({ todos, boardId }: IBoardProps) => {
    return (
        <Droppable droppableId={boardId}>
            {(provided) => (
                <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
                    {todos.map((todo, index) => (
                        <DragabbleCard key={todo} todo={todo} index={index} />
                    ))}
                    {provided.placeholder}
                </Wrapper>
            )}
        </Droppable>
    )
}

export default Board;