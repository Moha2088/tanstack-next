import Button from "@/app/components/ui/Button"
import { useEffect, useState } from "react"
import { UpdateTodoParams } from "@/app/hooks/useUpdateTodo"
import { DeleteTodoParams } from "@/app/hooks/useDeleteTodo"

interface EditFormProps {
    id: number
    completed: boolean
    updateTodo(params: UpdateTodoParams): void
    deleteTodo(params: DeleteTodoParams): void
}


export function EditForm(props: EditFormProps) {
    const {id, completed, updateTodo, deleteTodo} = props

    const [newTitle, setNewTitle] = useState<string>("")
    const [newStatus, setNewStatus] = useState<boolean>(completed)


    return (
        <div className="flex flex-col p-5">
            <label className="flex justify-start"><strong>New title</strong></label>
            <div>
                <input className="rounded-md border-2 p-2" type="text" onChange={(e) => setNewTitle(e.target.value)}/>
                <div className="flex justify-center p-5">
                    <Button
                        onClick={() => setNewStatus(!newStatus)}>
                        {!newStatus ? "Complete task": "Uncomplete task"}
                    </Button>
                </div>
            </div>
            <div className="flex justify-center">
                <Button
                    onClick={() => {
                        updateTodo({
                            id: id,
                            title: newTitle,
                            completed: newStatus
                        })
                    }}
                >
                    Update
                </Button>
                <Button onClick={() => {
                    deleteTodo({id: id})
                }}>Delete</Button>
            </div>
        </div>
    )
}