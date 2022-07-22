import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: localStorage
})
const { persistAtom: AtomStorj } = recoilPersist({
    key: 'atom-storj',
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

export const themeState = atom({
    key: 'theme',
    default: false,
    effects_UNSTABLE: [AtomStorj]
})





