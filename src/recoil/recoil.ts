import { atom } from 'recoil';

interface User {
    displayName: string;
    photoURL: string;
    uid: string;
}

export const loginState = atom<User>({
    key: 'loginState',
    default: {
        displayName: '',
        photoURL: '',
        uid: ''
    }
})

