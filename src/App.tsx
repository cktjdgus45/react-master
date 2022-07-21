import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { todoState } from './atoms';
import Board from './components/Board';

const Wrapper = styled.div`
	display:flex;
	flex-direction: column;
	max-width: 680px;
	width: 100%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
`

const Boards = styled.div`
	display: grid;
	gap: 10px;
	grid-template-columns: repeat(3,1fr);
`

const Empty = styled.div`
	width: 100%;
	height:100%;
	display: block;
`




function App() {
	const [todos, setTodos] = useRecoilState(todoState);
	const onDragEnd = (info: DropResult) => {
		const { destination, source } = info;
		if (!destination) return;
		if (destination?.droppableId === source.droppableId) {
			setTodos(allBoards => {
				const boardCopy = [...allBoards[source.droppableId]];
				const taskObj = boardCopy[source.index];
				boardCopy.splice(source.index, 1);
				boardCopy.splice(destination.index, 0, taskObj);
				return {
					...allBoards,
					[source.droppableId]: boardCopy
				};
			})
		}
		if (destination?.droppableId === 'trashBoard') {
			setTodos(allBoards => {
				const sourceBoard = [...allBoards[source.droppableId]];
				sourceBoard.splice(source.index, 1);
				return {
					...allBoards,
					[source.droppableId]: sourceBoard
				}
			})
			return;
		}
		if (destination?.droppableId !== source.droppableId) {
			setTodos(allBoards => {
				const sourceBoard = [...allBoards[source.droppableId]];
				const targetBoard = [...allBoards[destination?.droppableId]];
				const taskObj = sourceBoard[source.index];
				sourceBoard.splice(source.index, 1);
				targetBoard.splice(destination?.index, 0, taskObj);
				return {
					...allBoards,
					[source.droppableId]: sourceBoard,
					[destination.droppableId]: targetBoard
				};
			})
		}
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					{Object.keys(todos).map(boardId =>
						<Board key={boardId} todos={todos[boardId]} boardId={boardId} />)}
					<Empty></Empty>
					<Board key='trashBoard' boardId='trashBoard' />
				</Boards>
			</Wrapper>
		</DragDropContext>
	)

}

export default App;
