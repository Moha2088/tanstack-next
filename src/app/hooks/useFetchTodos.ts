import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query"
import { Todo } from "@/app/types/types"
import { apiClient } from "@/app/api/apiClient"


type Options = Partial<UseQueryOptions<Todo[]>>


export function useFetchTodos(options: Options = {}): UseQueryResult<Todo[]> {
    return useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: async() => {
            return await apiClient.get(`/`).then(res => res.data as Todo[])
        }, ...options
    })
}