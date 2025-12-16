import { createContext, useContext } from "react"


type TodoContextResult = number | undefined

export const TodoContext = createContext<TodoContextResult>(undefined)

/**
 * 
 * @returns The id for a Todo item
 */
export function useTodoContext(): number {
    const context = useContext(TodoContext)

    if(!context) {
        throw new Error("Out of scope!")
    }

    return context
}