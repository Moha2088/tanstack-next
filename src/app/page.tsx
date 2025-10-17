"use client"

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { useState } from "react"
import { Todo } from "@/app/types/types"

const queryClient = new QueryClient()

export default function Home() {
    const queryClient = new QueryClient()

    const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false)

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex justify-center mt-10 mb-10">
                <button
                    className=" rounded-md p-3 bg-black text-white font-bold cursor-pointer"
                    onClick={() => setIsButtonClicked(true)}>Fetch Data
                </button>
            </div>
            <div className="flex justify-center">
                {isButtonClicked &&

                    <FetchData/>
                }
            </div>
        </QueryClientProvider>
    );
}

function FetchData() {
    const {isPending, error, data} = useQuery({
        queryKey: ['todoData'],
        queryFn: () => fetch('https://jsonplaceholder.typicode.com/todos/2')
            .then(res => res.json())

    })

    if (isPending) return <p>Loading</p>

    if (error) return <p>Error fetching data!: {error.message}</p>

    return (
        <div>
            <h1><strong>Title: </strong> {data.title} </h1>
            <p><strong>Id: </strong> {data.id} </p>
            <p><strong>UserId: </strong> {data.userId} </p>
            <p><strong>IsCompleted: </strong> {data.completed} </p>
        </div>

    )

}
