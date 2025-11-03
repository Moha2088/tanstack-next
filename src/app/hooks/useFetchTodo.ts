import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { Todo } from "@/app/types/types"
import { apiClient } from "@/app/api/apiClient"


export function useFetchTodo(id: number): UseQueryResult<Todo, Error> {
    return useQuery({
        queryKey: ["todoData"],
        queryFn: () =>
            apiClient.get(`/todos/${id}`).then((res) => res.data),
    })
}