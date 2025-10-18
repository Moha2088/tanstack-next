import { useState } from "react"
import { Todo } from "@/app/types/types"
import Button from "@/app/components/ui/Button"

interface PostFormProps {
    PostData: (todo: Todo) => void
}

export default function PostForm(props: PostFormProps) {
    const [input, setInput] = useState("");

    return (
        <div className="flex justify-center items-center flex-col border-2 rounded-md p-5">
            <form>
                <div>
                    <label>Id</label>
                    <input className="border-2 rounded-md" type="text"></input>
                </div>
                <div>
                    <label>UserId</label>
                    <input className="border-2 rounded-md" type="text"></input>
                </div>
                <div>
                    <label>Title</label>
                    <input className="border-2 rounded-md" type="text"></input>
                </div>
                <div>
                    <label>Id</label>
                    <input className="border-2 rounded-md" type="text"></input>
                </div>
            </form>

            <Button onClick={() => props.PostData}>
                Submit
            </Button>
        </div>
    )
}