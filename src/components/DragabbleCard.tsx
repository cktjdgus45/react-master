import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
border-radius:5px ;
padding: 10px 10px;
margin-bottom: 5px;
	background-color: ${props => props.theme.cardColor};
`;

interface IDragabbleCardProps {
    todo: string;
    index: number;
}

const DragabbleCard = ({ todo, index }: IDragabbleCardProps) => {
    return (
        <Draggable key={todo} draggableId={todo} index={index}>
            {(provided) => <Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{todo}</Card>}
        </Draggable>
    )
}

export default React.memo(DragabbleCard);