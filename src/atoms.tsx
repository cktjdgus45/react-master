import { atom, selector } from 'recoil';

interface IToDoState {
    [key: string]: string[];
}

export const todoState = atom<IToDoState>({
    key: 'todo',
    default: {
        to_do: ['a', 'b'],
        doing: ['c', 'd', 'e'],
        done: ['f'],
    }
});