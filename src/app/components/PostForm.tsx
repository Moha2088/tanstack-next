import { JSX, useState } from "react"
import { Todo } from "@/app/types/types"
import Button from "@/app/components/ui/Button"

interface PostFormProps {
    HandleFormData (todo: Todo): void
}

export default function PostForm(props: PostFormProps) {
    const [id, setId] = useState<number>();

    const [userId, setUserId] = useState<number>();

    const [title, setTitle] = useState("");

    const [completed, setCompleted] = useState<boolean>(false);

    return (
        <div className="flex justify-center items-center flex-col border-2 rounded-md p-5">
            <form>
                <div>
                    <label>Id</label>
                    <input 
                        className="border-2 rounded-md"
                        type="text"
                        value={id} 
                        onChange={(idInput) => setId(Number(idInput.target.value))} />
                </div>
                <div>
                    <label>UserId</label>
                    <input 
                        className="border-2 rounded-md"
                        type="text"
                        value={userId} 
                        onChange={(userIdInput) => setUserId(Number(userIdInput.target.value))}/>
                </div>
                <div>
                    <label>Title</label>
                    <input className="border-2 rounded-md" 
                           type="text"
                           value={title} 
                           onChange={(titleInput) => setTitle(titleInput.target.value)}/>
                </div>
                <div>
                    <label>Completed</label>
                    <input 
                        className="border-2 rounded-md" 
                        type="text"
                        value={String(completed)}
                        onChange={(completedInput) => setCompleted(Boolean(completedInput.target.value))} />
                </div>
            </form>

            <Button onClick={() => props.HandleFormData({
                id: id,
                userId: userId,
                title: title,
                completed: completed,
            })}>
                Post Data
            </Button>
        </div>
    )
}