import { createContext , useContext } from "react"

export const todoContext = createContext({
    todos : [
        {
            id : 1,
            todo : "msg",
            completed : false,
        }
    ],
    addTodo : (todo) => {},
    removeTodo : (id) => {},
    updateTodo : (id , todo) => {},
    complete : (id) => {}
})

export const useTodo = () => {
    return useContext(todoContext);
}

export const TodoProvider = todoContext.Provider