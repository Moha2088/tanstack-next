import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { apiClient } from "@/app/api/apiClient"
import { toast } from "sonner"
import { useTodoInvalidator } from "@/app/hooks/useTodoInvalidator"

export interface PostTodoParams {
    title: string
    completed: boolean
}


export function usePostTodo(): UseMutationResult<void, Error, PostTodoParams> {
    const queryInvalidator = useTodoInvalidator()

    return useMutation({
        mutationFn: async (variables) => {
            await apiClient.post(
                "/",
                variables
            )
        },
        
        onMutate: () => {
            toast.info("Creating todo...")
        },

        onSuccess: (data, variables) => {
            toast.success("Data posted successfully!", {
                description: `Title: ${variables.title}\nStatus: ${variables.completed}`,
                position: "top-right",
                action: {
                    label: "Exit",
                    onClick: () => {}
                }
            })

            queryInvalidator.invalidateTodos()

        },

        onError: (err) => {
            toast.error(`Error posting data:\n${err.name} : ${err.message}`)
            return
        },
    })
}