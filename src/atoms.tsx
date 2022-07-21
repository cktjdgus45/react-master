import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: localStorage
})

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

    },
    effects_UNSTABLE: [persistAtom],

});





