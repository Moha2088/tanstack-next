"use client";

import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Todo } from "@/app/types/types";
import axios from "axios";
import Button from "@/app/components/ui/Button"
import PostForm from "@/app/components/PostForm"

const queryClient = new QueryClient();

export default function Home() {
    const [fetchData, setFetchData] = useState<boolean>(false);
    const [postData, setPostData] = useState<boolean>(false);

    useEffect(() => {
        if (postData) {
            setPostData(false);
        }
        if (fetchData) {
            setTimeout(() => {
                setFetchData(false);
            }, 5000);
        }
    }, [postData, fetchData]);

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex justify-center items-center mt-10 mb-10 flex-col">
                <div className="mb-10">
                    <Button
                        onClick={() => setFetchData(true)}
                    >
                        Fetch Data
                    </Button>
                </div>
                <div className="flex justify-center">{fetchData && <FetchData/>}</div>
                <div>

                    <PostForm />

                    <Button
                        onClick={() => setPostData(true)}
                    >
                        Post Data
                    </Button>
                    <div>{postData && <PostData/>}</div>
                </div>
            </div>
        </QueryClientProvider>
    );
}

function PostData(todo: Todo) {
    const mutation = useMutation({
        mutationFn: async (newTodo: Todo) => {
            const response = await axios.post(
                "https://jsonplaceholder.typicode.com/todos",
                newTodo
            );
        },
        onSuccess: () => {
            console.log("Data posted successfully");
        },
    });

    useEffect(() => {
        mutation.mutate({
            id: 300,
            userId: 400,
            title: "New Todo Item",
            completed: false,
        });
    }, [mutation]);

    return null;
}

function FetchData() {
    const {isPending, error, data} = useQuery({
        queryKey: ["todoData"],
        queryFn: () =>
            fetch("https://jsonplaceholder.typicode.com/todos/2").then((res) =>
                res.json()
            ),
    });

    if (isPending) return <p>Loading</p>;

    if (error) return <p>Error fetching data!: {error.message}</p>;

    return (
        <div>
            <h1>
                <strong>Title: </strong> {data.title}{" "}
            </h1>
            <p>
                <strong>Id: </strong> {data.id}{" "}
            </p>
            <p>
                <strong>UserId: </strong> {data.userId}{" "}
            </p>
            <p>
                <strong>IsCompleted: </strong> {data.completed}{" "}
            </p>
        </div>
    );
}
