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

const Title = styled.h1`
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 12px;
    text-align: center;
    height: 50px;
`

interface IBoardProps {
    todos: string[];
    boardId: string;
}

const Board = ({ todos, boardId }: IBoardProps) => {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {todos.map((todo, index) => (
                            <DragabbleCard key={todo} todo={todo} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Wrapper>
    )
}

export default Board;