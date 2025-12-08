import { ChangeEvent, useState } from "react"
import { PostTodoParams } from "@/app/types/types"
import Button from "@/app/components/ui/Button"

interface PostFormProps {
    postTodo(params: PostTodoParams): void
}

export default function PostForm(props: PostFormProps) {
    const [title, setTitle] = useState("")
    const [completed, setCompleted] = useState<boolean>(false)

    const handleDropdown = (selectEvent: ChangeEvent<HTMLSelectElement>) => {
        if (selectEvent.target.value == "-- Please select a value --") {
            return
        }

        setCompleted(selectEvent.target.value != "false")
    }

    const hasInput = () => {
        return title != ""
    }

    return (
        <div className="flex justify-center items-center flex-col rounded-md p-10 shadow-2xl">
            <form
                onSubmit={(event) => event.preventDefault()}
                className="mb-5">
                <div>
                    <label>
                        <strong>Title</strong>
                    </label>
                    <input className="border-2 rounded-md flex items-center p-1"
                           type="text"
                           value={title}
                           onChange={(titleInput) => setTitle(titleInput.target.value)}/>
                </div>
                <div>
                    <label>
                        <strong>Completed</strong>
                    </label>
                    <select
                        id="completedDropdown"
                        className="border-2 rounded-md flex items-center w-full"
                        onChange={(event) => handleDropdown(event)}
                    >
                        <option>-- Please select a value --</option>
                        <option value="true">
                            True
                        </option>
                        <option value="false">
                            False
                        </option>
                    </select>
                </div>
            </form>

            <Button
                onClick={() =>{
                    props.postTodo({
                        title: title,
                        completed: completed,
                    })

                    setTitle("")
                }}
                disabled={!hasInput()}>
                Post Data
            </Button>
        </div>
    )
}