import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { Todo } from "@/app/types/types"
import { apiClient } from "@/app/api/apiClient"
import { toast } from "sonner"


export function usePostTodo(): UseMutationResult<void, Error, Todo> {
    return useMutation({
        mutationFn: async (variables) => {
            await apiClient.post(
                "/",
                variables
            )
        },
        onMutate: () => {
            toast.info("Saving todo...")
        },
        onSuccess: (data, variables, onMutateResult, context) => {
            alert(data)
            toast.success("Data posted successfully!", {
                description: `Title: ${variables.title}\nStatus: ${variables.completed}`,
                position: "top-right",
                action: {
                    label: "Exit",
                    onClick: () => {}
                }
            })
        },
        onError: (err) => {
            toast.error(`Error posting data:\n${err.name} : ${err.message}`)
            return
        },
    })
}