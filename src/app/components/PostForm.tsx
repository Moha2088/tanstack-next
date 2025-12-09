import { ChangeEvent, useState } from "react"
import { PostTodoParams } from "@/app/hooks"
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "@/app/components/ui/Button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface PostFormProps {
    postTodo(params: PostTodoParams): void
}

type PostFormInputs = {
    title: string
}


export default function PostForm(props: PostFormProps) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<PostFormInputs>()

    const [title, setTitle] = useState("")
    const [completed, setCompleted] = useState<boolean>(false)

    const handleDropdown = (selectEvent: ChangeEvent<HTMLSelectElement>) => {
        if (selectEvent.target.value == "-- Please select a value --") {
            return
        }

        setCompleted(selectEvent.target.value != "false")
    }

    const onSubmit: SubmitHandler<PostFormInputs> = () => {
        props.postTodo({
            title: title,
            completed: completed,
        })

        setTitle("")
    }

    return (
        <div className="flex justify-center items-center flex-col rounded-md p-10 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>
                        <strong>Title</strong>
                    </label>
                    <input
                        {...register("title", { required: true })}
                        className="border-2 rounded-md flex items-center p-1"
                        type="text"
                        value={title}
                        onChange={(titleInput) => setTitle(titleInput.target.value)}/>
                        {errors.title && <span className="text-red-400">Title is required!</span>}
                </div>
                <div>
                    <label>
                        <strong>Completed</strong>
                    </label>
                    <select
                        // id="completedDropdown"
                        className="border-2 rounded-md flex items-center w-full"
                        onChange={(event) => handleDropdown(event)}
                    >
                        <option value="" />
                        <option value="true">
                            True
                        </option>
                        <option value="false">
                            False
                        </option>
                    </select>
                </div>
                <div className="flex justify-center p-3">
                    <Button type="submit">
                        Post Data
                    </Button>
                </div>
            </form>
        </div>
    )
}