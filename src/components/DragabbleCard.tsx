import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { useSetRecoilState } from 'recoil';
import { todoState } from '../atoms';

const Card = styled.div<{ isDragging: boolean }>`
display: flex;
justify-content: space-between;
border-radius:5px ;
padding: 10px 10px;
width: inherit;
margin-bottom: 5px;
background-color: ${props => props.isDragging ? props.theme.isCardDraggingOver : props.theme.isCardNotDraggingOver};
box-shadow:${props => props.isDragging ? "1px 4px 1px 5px" : ""}
`;


interface IDragabbleCardProps {
    todoId: number;
    todoText: string;
    index: number;
    boardId: string;
}

const style = {
    cursor: 'pointer'
}

const DragabbleCard = ({ todoId, todoText, index, boardId }: IDragabbleCardProps) => {

    const setTodos = useSetRecoilState(todoState);

    const onClick = (boardId: string) => {
        setTodos(allBoard => {
            const copyBoard = [...allBoard[boardId]];
            const arr = copyBoard.filter(todo => todo.id !== todoId);
            return {
                ...allBoard,
                [boardId]: arr
            };
        })
    }


    return (
        <Draggable key={todoId} draggableId={todoId + ""} index={index}>
            {(provided, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {todoText}
                    <FontAwesomeIcon style={style} onClick={() => onClick(boardId)} icon={faXmark}></FontAwesomeIcon>
                </Card>)}
        </Draggable>
    )
}

export default React.memo(DragabbleCard);