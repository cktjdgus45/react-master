import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { todoState } from './atoms';
import Board from './components/Board';
import Trash from './components/Trash';

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
	height: 100vh;
	gap: 10px;
	grid-template-columns: repeat(3,1fr);
`

const Empty = styled.div`
	width: 100%;
	height:100%;
	display: block;
`

const Form = styled.form`
	width: 100%;
	margin-top: 100px;
	margin-bottom: 30px;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`
const Input = styled.input`
	width: 100%;
	padding: 5px 3px;
`

interface IForm {
	board: string;
}

function App() {
	const [todos, setTodos] = useRecoilState(todoState);
	const setBoard = useSetRecoilState(todoState);
	const { register, handleSubmit, setValue } = useForm<IForm>();
	const onSubmit = ({ board }: IForm) => {
		setBoard(current => {
			return {
				...current,
				[board]: []
			}
		})
		setValue('board', '');
	}
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
		if (destination?.droppableId === 'trash') {
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
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Input type="text" placeholder='add Board' {...register('board', { required: true })} />
				</Form>
				<Boards>
					{Object.keys(todos).map(boardId =>
						<Board key={boardId} todos={todos[boardId]} boardId={boardId} />)}
					<Empty></Empty>
				</Boards>
				<Trash boardId='trash' />
			</Wrapper>
		</DragDropContext>
	)

}

export default App;
