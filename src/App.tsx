import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { todoState } from './atoms';
import DragabbleCard from './components/DragabbleCard';

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
									<DragabbleCard key={todo} todo={todo} index={index} />
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
