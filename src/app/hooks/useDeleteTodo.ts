import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { useTodoInvalidator } from "@/app/hooks/useTodoInvalidator"
import { apiClient } from "@/app/api/apiClient"
import { toast } from "sonner"


export interface DeleteTodoParams {
    id: number
}

export function useDeleteTodo (): UseMutationResult<void, Error, DeleteTodoParams> {

    const queryInvalidator = useTodoInvalidator()

    return useMutation({
        mutationFn: async(variables) => {
            await apiClient.delete(`/${variables.id}`)
        },

        onMutate: (variables) => {
            toast.info(`Deleting todo with id: ${variables.id}`)
        },

        onError: (error) => {
            toast.error(`Failed to delete todo, Error: ${error.name} : ${error.message}`)
        },

        onSuccess: (variables) => {
            toast.success("Todo deleted successfully!")
            queryInvalidator.invalidateTodos()
        }
    })
}