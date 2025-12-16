import { useTodoInvalidator } from "@/app/hooks/useTodoInvalidator"
import { apiClient } from "@/app/api/apiClient"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { toast } from "sonner"

export interface UpdateTodoParams {
    id: number
    title: string
    completed: boolean
}

export function useUpdateTodo (): UseMutationResult<void, Error, UpdateTodoParams>  {
    const queryInvalidator = useTodoInvalidator()

    return useMutation({
        mutationFn: async(variables) => {
            await apiClient.patch(`/${variables.id}`, {
                title: variables.title,
                completed: variables.completed
            })
        },

        onMutate: () => {
            toast.info(`Updating todo...`)
        },

        onError:(error, variables) => {
            toast.error(`Error updating todo to: ${variables.title}\nError: ${error.name} : ${error.message}`)
        },

        onSuccess: () => {
            toast.success("Todo updated successfully!")
            queryInvalidator.invalidateTodos()
        }
    })


}