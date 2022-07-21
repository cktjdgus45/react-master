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
    background-color: ${props => props.isDraggingOver ? "#F4DFD0" : "#F0EBE3"};
    transition: background-color .3s ease-in-out;
    font-size: 2rem;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    position:fixed;
    right: 1.3px;
    bottom: 1.3px;
    z-index: 99999;
    text-align: center;
    transition: transform .3s ease-in-out;
    &:hover{
        transform: ${props => props.isDraggingOver ? `scale(1.1)` : `scale(1)`};
    }
`

const style = {
    transform: 'translateY(24px)'
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