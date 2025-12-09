import Button from "@/app/components/ui/Button"
import { useState } from "react"
import { UpdateTodoParams } from "@/app/hooks/useUpdateTodo"
import { DeleteTodoParams } from "@/app/hooks/useDeleteTodo"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface EditFormProps {
    id: number
    completed: boolean
    updateTodo(params: UpdateTodoParams): void
    deleteTodo(params: DeleteTodoParams): void
}

type EditFormInputs = {
    newTitle: string
}


export function EditForm(props: EditFormProps) {
    const { id, completed, updateTodo, deleteTodo } = props
    const { register, handleSubmit, watch, formState: { errors } } = useForm<EditFormInputs>()

    const [newStatus, setNewStatus] = useState<boolean>(completed)

    const onSubmit: SubmitHandler<EditFormInputs> = (data) => {
        updateTodo({
            id: id,
            title: data.newTitle,
            completed: newStatus
        })
    }

    return (
        <div className="flex flex-col p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="flex justify-start"><strong>New title</strong></label>
                <div>
                    <input
                        className="rounded-md border-2 p-2"
                        type="text"
                        {...register("newTitle", { required: true })}
                    />

                    {errors.newTitle &&
                        <div>
                            <span className="text-red-400">New title is required!</span>
                        </div>
                    }

                    <div className="flex justify-center p-5">
                        <Button
                            type="button"
                            onClick={() => setNewStatus(!newStatus)}>
                            {!newStatus ? "Complete task": "Uncomplete task"}
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="p-2">
                        <Button type="submit">
                            Update 
                        </Button>
                    </div>
                    <div className="p-2">
                        <Button onClick={() => {
                                deleteTodo({id: id})
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}