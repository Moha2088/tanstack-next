import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: ButtonProps) {

    const isDisabled = props.disabled

    return (
        <button
            className={`rounded-md p-3 bg-black ${isDisabled ? "opacity-5" : ""} text-white text-sm font-bold ${!isDisabled ? "cursor-pointer hover:bg-neutral-600" : ""}`}
            {...props}
        >
        </button>
    )
}