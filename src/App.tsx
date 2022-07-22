import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoState } from './atoms';
import Board from './components/Board';
import Nav from './components/Nav';
import Trash from './components/Trash';
import { createGlobalStyle, } from 'styled-components';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { themeState } from './atoms';


const GlobalStyle = createGlobalStyle`
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);
  * { font-family: 'Spoqa Han Sans Neo', 'sans-serif'; }
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
  background-color: ${props => props.theme.bgColor};
}
a {
  text-decoration:none;
  color:inherit;
}
input{
  border: none;
  outline: none;
}

button{
  cursor: pointer;
}

`;

const Wrapper = styled.div`
	display:flex;
	flex-direction: column;
	max-width: 680px;
	width: 100%;
	margin: 0 auto;
	margin-top: 4rem;
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


function App() {
	const [todos, setTodos] = useRecoilState(todoState);
	const isDark = useRecoilValue(themeState);
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
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<GlobalStyle />
			<Nav />
			<DragDropContext onDragEnd={onDragEnd}>
				<Wrapper>
					<Boards>
						{Object.keys(todos).map(boardId =>
							<Board key={boardId} todos={todos[boardId]} boardId={boardId} />)}
						<Empty></Empty>
					</Boards>
					<Trash boardId='trash' />
				</Wrapper>
			</DragDropContext>

		</ThemeProvider>
	)

}

export default App;
