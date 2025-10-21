import { ChangeEvent, useState } from "react"
import { Todo } from "@/app/types/types"
import Button from "@/app/components/ui/Button"

interface PostFormProps {
    HandleFormData(todo: Todo): void
}

export default function PostForm(props: PostFormProps) {
    const [id, setId] = useState<number>()
    const [userId, setUserId] = useState<number>()
    const [title, setTitle] = useState("")
    const [completed, setCompleted] = useState<boolean>(false)

    const handleDropdown = (selectEvent: ChangeEvent<HTMLSelectElement>) => {
        if (selectEvent.target.value == "-- Please select a value --") {
            return
        }

        setCompleted(selectEvent.target.value === "false")
        console.log(completed)
    }

    const hasInput = () => {
        return !isNaN(Number(id)) && !isNaN(Number(userId)) && title != ""
    }

    return (
        <div className="flex justify-center items-center flex-col rounded-md p-10 shadow-2xl">
            <form
                onSubmit={(event) => event.preventDefault()}
                className="mb-5">
                <div>
                    <label>Id</label>
                    <input
                        className="border-2 rounded-md flex items-center p-1"
                        type="text"
                        value={id}
                        onChange={(idInput) => setId(Number(idInput.target.value))}/>
                </div>
                <div>
                    <label>UserId</label>
                    <input
                        className="border-2 rounded-md flex items-center p-1"
                        type="text"
                        value={userId}
                        onChange={(userIdInput) => setUserId(Number(userIdInput.target.value))}/>
                </div>
                <div>
                    <label>Title</label>
                    <input className="border-2 rounded-md flex items-center p-1"
                           type="text"
                           value={title}
                           onChange={(titleInput) => setTitle(titleInput.target.value)}/>
                </div>
                <div>
                    <label>Completed</label>
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
                onClick={() => props.HandleFormData({
                    id: id,
                    userId: userId,
                    title: title,
                    completed: completed,
                })}
                disabled={!hasInput()}>
                Post Data
            </Button>
        </div>
    )
}