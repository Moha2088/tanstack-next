"use client"

import { useEffect, useState } from "react"
import { Todo } from "@/app/types/types"
import Button from "@/app/components/ui/Button"
import PostForm from "@/app/components/PostForm"
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { toast } from "sonner"
import { usePostTodo } from "@/app/hooks/usePostTodo"
import { useFetchTodo } from "@/app/hooks/useFetchTodo"


export default function Home() {
    const [fetchData, setFetchData] = useState<boolean>(false)
    const [idQuery, setIdQuery] = useState<string>("")


    useEffect(() => {
        if (fetchData) {
            setTimeout(() => {
                setFetchData(false)
            }, 5000)
        }
    }, [fetchData])

    const hasInput = () => {
        return !isNaN(Number(idQuery)) && idQuery.trim() != ""
    }

    const postDataMutation = usePostTodo()

    const handleFormData = (todo: Todo) => {
        postDataMutation.mutate({
            id: todo.id,
            userId: todo.userId,
            title: todo.title,
            completed: todo.completed
        })
    }

    return (
        <div className="flex justify-center items-center mt-10 mb-10 flex-col">
            <div className="flex justify-center items-center mb-10 flex-col">
                <input
                    className="border-2 rounded-md flex items-center p-1 mb-2"
                    value={idQuery}
                    onChange={(val) => setIdQuery(val.target.value)}/>
                <div>
                    <Button
                        disabled={!hasInput()}
                        onClick={() => setFetchData(true)}
                    >
                        Fetch Data
                    </Button>
                </div>
            </div>
            <div className="flex justify-center">
                {fetchData &&
                    <FetchData id={Number(idQuery)}/>
                }</div>
            <div>
                <PostForm HandleFormData={handleFormData}/>
            </div>
        </div>
    )
}


export interface FetchDataProps {
    id: number
}

function FetchData(props: FetchDataProps) {
    const { id } = props

    const { isPending, isSuccess, error, data } = useFetchTodo(id)


    if (isPending) {
        return (
            <div className="flex justify-center items-center flex-col">
                <Spinner
                    className="text-shadow-gray-300"
                    size={60}
                    variant="circle-filled"/>
                <div>
                    <p>Fetching todo with id: {id}...</p>
                </div>
            </div>
        )
    }

    if (isSuccess) {
        toast.success(`Todo Id: ${id} has been fetched successfully!`, {
            position: "top-right"
        })
    }

    if (error) {
        toast.error("Error fetching data", {
            position: "top-right"
        })
        return
    }

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
