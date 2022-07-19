import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { todoState } from './atoms';
import Board from './components/Board';
import DragabbleCard from './components/DragabbleCard';

const Wrapper = styled.div`
	display:flex;
	max-width: 680px;
	width: 100%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
`

const Boards = styled.div`
	display: grid;
	width: 100%;
	gap: 10px;
	grid-template-columns: repeat(3,1fr);
`





function App() {
	const [todos, setTodos] = useRecoilState(todoState);
	const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
		// setTodos(oldTodos => {
		// 	const copyTodos = [...oldTodos];
		// 	copyTodos.splice(source.index, 1);
		// 	copyTodos.splice(destination?.index as number, 0, draggableId);
		// 	return copyTodos;
		// })
	}
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					{Object.keys(todos).map(boardId => <Board key={boardId} todos={todos[boardId]} boardId={boardId} />)}
				</Boards>
			</Wrapper>
		</DragDropContext>
	)

}

export default App;
