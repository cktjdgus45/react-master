import { atom, selector } from 'recoil';

interface IToDoState {
    [key: string]: string[];
}

export const todoState = atom<IToDoState>({
    key: 'todo',
    default: {
        "To Do": ['a', 'b'],
        Doing: ['c', 'd', 'e'],
        Done: ['f'],
    }
});