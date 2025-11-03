import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { Todo } from "@/app/types/types"


export function useFetchTodo(id: number): UseQueryResult<Todo, Error> {
    return useQuery({
        queryKey: ["todoData"],
        queryFn: () =>
            fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res) =>
                res.json()
            ),
    })
}