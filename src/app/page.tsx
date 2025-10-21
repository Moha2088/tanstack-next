"use client"

import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
} from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Todo } from "@/app/types/types"
import { apiClient } from "@/app/api/apiClient"
import Button from "@/app/components/ui/Button"
import PostForm from "@/app/components/PostForm"
import { Spinner } from "@/components/ui/shadcn-io/spinner"

const queryClient = new QueryClient()

export default function Home() {
    const [fetchData, setFetchData] = useState<boolean>(false)
    const [postData, setPostData] = useState<boolean>(false)

    const [idQuery, setIdQuery] = useState<number>(0)

    const [todo, setTodo] = useState<Todo>()

    useEffect(() => {
        if (postData) {
            setPostData(false)
        }
        if (fetchData) {
            setTimeout(() => {
                setFetchData(false)
            }, 5000)
        }
    }, [postData, fetchData])


    const handleFormData = (todo: Todo) => {
        setTodo(todo)
        setPostData(true)
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex justify-center items-center mt-10 mb-10 flex-col">
                <div className="flex justify-center items-center mb-10 flex-col">
                    <input
                        className="border-2 rounded-md flex items-center p-1 mb-2"
                        value={idQuery}
                        onChange={(val) => setIdQuery(Number(val.target.value))}/>
                    <div>
                        <Button
                            onClick={() => setFetchData(true)}
                        >
                            Fetch Data
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center">
                    {fetchData &&
                        <FetchData id={idQuery}/>
                    }</div>
                <div>
                    <PostForm HandleFormData={handleFormData}/>

                    <div>
                        {postData &&
                            <PostData
                                id={todo?.id}
                                userId={todo?.userId}
                                title={todo?.title}
                                completed={todo?.completed}/>
                        }
                    </div>
                </div>
            </div>
        </QueryClientProvider>
    )
}

function PostData(todo: Todo) {
    console.log("Completed value :" + todo.completed)

    const mutation = useMutation({
        mutationFn: async (newTodo: Todo) => {
            await apiClient.post(
                "/todos",
                newTodo
            )
        },
        onMutate: () => {
            console.log("Posting data..")
        },
        onSuccess: () => {
            console.log("Data posted successfully")
        },
        onError: (err) => {
            console.log("Error fetching data:\n", `${err.name} : ${err.message}`)
            return
        }
    })

    mutation.mutate({
        id: todo.id,
        userId: todo.userId,
        title: todo.title,
        completed: todo.completed,
    })

    return null
}


export interface FetchDataProps {
    id: number
}

function FetchData(props: FetchDataProps) {
    const {isPending, error, data} = useQuery({
        queryKey: ["todoData"],
        queryFn: () =>
            fetch(`https://jsonplaceholder.typicode.com/todos/${props.id}`).then((res) =>
                res.json()
            ),
    })

    if (isPending)
        return (
            <div className="flex justify-center items-center flex-col">
                <Spinner
                    className="text-shadow-gray-300"
                    size={60}
                    variant="circle-filled"/>
                <div>
                    <p>Fetching todo with id: {props.id}...</p>
                </div>
            </div>
        )

    if (error) return <p>Error fetching data!: {error.message}</p>

    return (
        <div>
            <h1>
                <strong>Title: </strong> {data.title}
            </h1>
            <p>
                <strong>Id: </strong> {data.id}
            </p>
            <p>
                <strong>UserId: </strong> {data.userId}
            </p>
            <p>
                <strong>IsCompleted: </strong> {data.completed}
            </p>
        </div>
    )
}
