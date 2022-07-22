import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

interface ITrashProps {
    boardId: string;
}

interface IAreaProps {
    isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? props.theme.isCardDraggingOver : props.theme.cardColor};
    transition: background-color .3s ease-in-out;
    font-size: 2rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position:fixed;
    right: 2rem;
    bottom: 2rem;
    z-index: 99999;
    text-align: center;
    transition: transform .3s ease-in-out;
    &:hover{
        transform: ${props => props.isDraggingOver ? `scale(1.1)` : `scale(1)`};
    }
`

const style = {
    transform: 'translateY(10px)'
}

const Trash = ({ boardId }: ITrashProps) => {
    return (
        <>
            <Droppable droppableId={boardId}>
                {(provided, snapshot) => ((
                    <Area isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                        <FontAwesomeIcon icon={faTrashCan} style={style} />
                    </Area>
                ))}
            </Droppable>
        </>
    )
}
export default Trash;