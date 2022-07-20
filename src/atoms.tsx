import { atom, selector } from 'recoil';

interface IToDoState {
    [key: string]: ITodo[];
}

export interface ITodo {
    id: number;
    text: string;
}

export const todoState = atom<IToDoState>({
    key: 'todo',
    default: {
        "To Do": [{ id: 1, text: "coding" }, { id: 2, text: 'sleeping' }],
        Doing: [],
        Done: [],
    }
});