import Button from "@/app/components/ui/Button"
import { useState } from "react"
import { UpdateTodoParams } from "@/app/hooks/useUpdateTodo"
import { DeleteTodoParams } from "@/app/hooks/useDeleteTodo"
import { EditForm } from "@/app/components/EditForm"


interface TodoProps {
    title: string
    completed: boolean
    updateTodo(params: UpdateTodoParams): void
    deleteTodo(params: DeleteTodoParams): void
}

export default function TodoItem(props: TodoProps) {
    const {title, completed, updateTodo, deleteTodo} = props

    const [canUpdate, setCanUpdate] = useState<boolean>(false)

    return (
            <div className="flex flex-col justify-center rounded-lg border-2 p-5 min-w-40">
                <div className="p-5">
                    <p className={`flex justify-center  ${completed ? "text-green-400" : "text-red-400 "}`}>
                        <strong>{completed ? "Completed": "Not completed"}</strong>
                    </p>
                    <p className="flex justify-center text-lg"><strong>Task: {title} </strong></p>
                </div>
                
                    <Button onClick={() => setCanUpdate(!canUpdate)}>
                        {canUpdate ? "Cancel": "Edit"}
                    </Button>
                {canUpdate &&
                    <EditForm
                        completed={completed}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                    />
                }
            </div>
    )
}