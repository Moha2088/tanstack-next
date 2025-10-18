import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: ButtonProps) {

    return (
        <button
            className=" rounded-md p-3 bg-black text-white text-sm font-bold cursor-pointer"
            {...props}
        >
        </button>
    )
}