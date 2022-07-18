import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
	const onDragEnd = () => { }
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div>
				<Droppable droppableId='one'>
					{(provided) => (
						<ul ref={provided.innerRef} {...provided.droppableProps}>
							<Draggable draggableId='draggable-1' index={0}>
								{(provided) => <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>One</li>}
							</Draggable>
							<Draggable draggableId='draggable-2' index={1}>
								{(provided) => <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>Two</li>}
							</Draggable>
						</ul>
					)}
				</Droppable>

			</div>
		</DragDropContext>
	)

}

export default App;
