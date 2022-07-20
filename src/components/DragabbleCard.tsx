import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
border-radius:5px ;
padding: 10px 10px;
width: inherit;
margin-bottom: 5px;
background-color: ${props => props.isDragging ? "#FFE7BF" : props.theme.bgColor};
box-shadow:${props => props.isDragging ? "1px 4px 1px 5px" : ""}
`;

interface IDragabbleCardProps {
    todoId: number;
    todoText: string;
    index: number;
}

const DragabbleCard = ({ todoId, todoText, index }: IDragabbleCardProps) => {
    return (
        <Draggable key={todoId} draggableId={todoId + ""} index={index}>
            {(provided, snapshot) =>
                <Card
                    isDragging={snapshot.isDragging}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {todoText}
                </Card>}
        </Draggable>
    )
}

export default React.memo(DragabbleCard);