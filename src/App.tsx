import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { todoState } from './atoms';
import Board from './components/Board';

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
	const onDragEnd = (info: DropResult) => {
		console.log(info);
		const { destination, draggableId, source } = info;
		if (destination?.droppableId === source.droppableId) {
			setTodos(allTodo => {
				const boardCopy = [...allTodo[source.droppableId]];
				boardCopy.splice(source.index, 1);
				boardCopy.splice(destination.index, 0, draggableId);
				return {
					...allTodo,
					[source.droppableId]: boardCopy
				};
			})
		}
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
