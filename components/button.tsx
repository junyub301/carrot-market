import { cls } from "@libs/client/utils";

interface ButtonProps {
    large?: boolean;
    text: string;

    [key: string]: any;
}

export default function Button({ large = false, text, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={cls(
                "w-full bg-orange-500 hover:bg-orange-600 text-white px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none disabled:bg-gray-400",
                large ? "py-3 text-bas" : "py-2 text-sm"
            )}
        >
            {text}
        </button>
    );
}
