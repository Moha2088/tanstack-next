import { useQueryClient } from "@tanstack/react-query"

interface Result {
    invalidateTodos: () => void
}


export function useTodoInvalidator(): Result {
    const queryClient = useQueryClient()

    return {
        invalidateTodos: () => queryClient.invalidateQueries({ queryKey: ["todos"] })
    }
}