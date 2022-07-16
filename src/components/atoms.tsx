import { atom, selector } from 'recoil';

export enum Categories {
    "TO_DO",
    "DOING",
    "DONE"
}

export interface ITodo {
    text: string;
    id: number;
    category: Categories;
}

export const categoryState = atom<Categories>({
    key: 'category',
    default: Categories.TO_DO
})

export const todoState = atom<ITodo[]>({
    key: 'todo',
    default: []
})

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get, getCallback }) => {
        const todos = get(todoState);
        const category = get(categoryState);
        switch (category) {
            case Categories.TO_DO:
                return todos.filter((todo) => todo.category === Categories.TO_DO);
            case Categories.DOING:
                return todos.filter((todo) => todo.category === Categories.DOING);
            case Categories.DONE:
                return todos.filter((todo) => todo.category === Categories.DONE);
            default:
                return todos;
        }
    },
})