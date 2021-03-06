import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
    name: string;
    label: string;
    kind?: "text" | "phone" | "price";
    type: string;
    register?: UseFormRegisterReturn;
    required?: boolean;
    placeholder?: string;
}

export default function Input({
    name,
    label,
    kind = "text",
    register,
    type,
    required,
    placeholder,
}: InputProps) {
    return (
        <div>
            <label
                htmlFor={name}
                className='mb-1 block text-sm font-medium text-gray-700'
            >
                {label}
            </label>
            {kind === "text" && (
                <div className='rounded-md relative flex items-center shadow-sm'>
                    <input
                        id={name}
                        className='appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500'
                        type={type}
                        required={required}
                        {...register}
                        placeholder={placeholder}
                    />
                </div>
            )}
            {kind === "phone" && (
                <div className=' flex rounded-md shadow-sm'>
                    <span className='flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm'>
                        +82
                    </span>
                    <input
                        id={name}
                        className='appearance-none w-full px-3 py-2 border border-gray-300 rounded-md rounded-l-none shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500'
                        type={type}
                        {...register}
                        required={required}
                        placeholder={placeholder}
                    />
                </div>
            )}
            {kind === "price" && (
                <div className='rounded-md relative flex items-center shadow-sm'>
                    <div className='absolute pointer-events-none left-0 pl-3 flex items-center justify-center'>
                        <span className='text-gray-500 text-sm'>$</span>
                    </div>
                    <input
                        id={name}
                        className='appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500'
                        type={type}
                        {...register}
                        required={required}
                        placeholder={placeholder}
                    />
                    <div className='absolute pointer-events-none right-0 pr-3 flex items-center'>
                        <span className='rext-gray-500'>KRW</span>
                    </div>
                </div>
            )}
        </div>
    );
}
