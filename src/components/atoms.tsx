import { atom, selector } from 'recoil';

export interface ITodo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}

export const categoryState = atom({
    key: 'category',
    default: 'TO_DO'
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
            case 'TO_DO':
                return todos.filter((todo) => todo.category === "TO_DO");
            case 'DOING':
                return todos.filter((todo) => todo.category === "DOING");
            case 'DONE':
                return todos.filter((todo) => todo.category === "DONE");
            default:
                return todos;
        }
    },
})