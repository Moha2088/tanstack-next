"use client"

import { PostTodoParams, usePostTodo } from "@/app/hooks"
import { useFetchTodos } from "@/app/hooks/useFetchTodos"
import TodoItem from "@/app/components/TodoItem"
import { UpdateTodoParams, useUpdateTodo } from "@/app/hooks/useUpdateTodo"
import PostForm from "@/app/components/PostForm"
import { DeleteTodoParams, useDeleteTodo } from "@/app/hooks/useDeleteTodo"


export default function Home() {
    const postMutation = usePostTodo()
    const updateMutation = useUpdateTodo()
    const deleteMutation = useDeleteTodo()

    const todos = useFetchTodos().data


    const postTodo = (params: PostTodoParams) => {
        postMutation.mutate({
            title: params.title,
            completed: params.completed
        })
    }

    const updateTodo = (params: UpdateTodoParams) => {
        alert("Updating todo: " + params.id)
        updateMutation.mutate({
            id: params.id,
            title: params.title,
            completed: params.completed
        })
    }

    const deleteTodo = (params: DeleteTodoParams) => {
        alert("Deleting todo: " + params.id)
        deleteMutation.mutate({
            id: params.id
        })
    }


    return (
        <div className="flex justify-center items-center mt-10 mb-10 flex-col">
            <div className="mb-20">
                <PostForm postTodo={postTodo} />
            </div>

            <p className="flex justify-center font-bold text-2xl text-white bg-black p-4 rounded-md mb-5 min-w-40">Tasks</p>

            {todos && todos.length > 0 &&
                todos.map(x => (
                    <TodoItem
                        id={x.id}
                        key={x.title}
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