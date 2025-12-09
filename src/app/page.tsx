"use client"

import { PostTodoParams, usePostTodo } from "@/app/hooks"
import { useFetchTodos } from "@/app/hooks/useFetchTodos"
import TodoItem from "@/app/components/TodoItem"
import { UpdateTodoParams, useUpdateTodo } from "@/app/hooks/useUpdateTodo"
import PostForm from "@/app/components/PostForm"
import { DeleteTodoParams, useDeleteTodo } from "@/app/hooks/useDeleteTodo"
import { Spinner } from "@/components/ui/shadcn-io/spinner"


export default function Home() {
    const postMutation = usePostTodo()
    const updateMutation = useUpdateTodo()
    const deleteMutation = useDeleteTodo()

    const fetchTodosQuery = useFetchTodos()


    const postTodo = (params: PostTodoParams) => {
        postMutation.mutate({
            title: params.title,
            completed: params.completed
        })
    }

    const updateTodo = (params: UpdateTodoParams) => {
        updateMutation.mutate({
            id: params.id,
            title: params.title,
            completed: params.completed
        })
    }

    const deleteTodo = (params: DeleteTodoParams) => deleteMutation.mutate({ id: params.id })


    return (
        <div className="flex justify-center items-center mt-10 mb-10 flex-col">
            <div className="mb-20">
                <PostForm postTodo={postTodo} />
            </div>

            <div className="p-5">
                <p className="flex justify-center font-bold text-2xl text-white bg-black p-4 rounded-md mb-5 w-40">Tasks</p>
            </div>

            {fetchTodosQuery.isLoading &&
                <div>
                    <strong className="text-lg">Fetching todos...</strong>                    
                    <div className="flex justify-center p-5">
                        <Spinner size={40} />
                    </div>
                </div>
            }

            {fetchTodosQuery.data?.length == 0 &&
                <div>
                    <strong className="text-lg">No todos found!</strong>
                </div>
            }

            {fetchTodosQuery.data && fetchTodosQuery.data.length > 0 &&
                fetchTodosQuery.data.map(x => (
                    <TodoItem
                        key={x.id}
                        id={x.id}
                        title={x.title}
                        completed={x.completed}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                    />
                ))
            }
        </div>
    )
}