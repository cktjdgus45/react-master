import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { todoState } from './components/atoms';

const Wrapper = styled.div`
	display:flex;
	max-width: 480px;
	width: 100%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
`

const Boards = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(1,1fr);
`

const Board = styled.div`
	padding: 20px 10px;
	padding-top:30px;
	background-color: ${props => props.theme.boardColor};
	border-radius:5px ;
	min-height: 200px;
`;
const Card = styled.div`
border-radius:5px ;
padding: 10px 10px;
margin-bottom: 5px;
	background-color: ${props => props.theme.cardColor};
`;


function App() {
	const [todos, setTodos] = useRecoilState(todoState);
	const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
		setTodos(oldTodos => {
			const copyTodos = [...oldTodos];
			copyTodos.splice(source.index, 1);
			copyTodos.splice(destination?.index as number, 0, draggableId);
			return copyTodos;
		})
	}
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					<Droppable droppableId='one'>
						{(provided) => (
							<Board ref={provided.innerRef} {...provided.droppableProps}>
								{todos.map((todo, index) => (
									<Draggable key={todo} draggableId={todo} index={index}>
										{(provided) => <Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{todo}</Card>}
									</Draggable>
								))}
								{provided.placeholder}
							</Board>
						)}
					</Droppable>
				</Boards>

			</Wrapper>
		</DragDropContext>
	)

}

export default App;
