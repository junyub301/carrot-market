import { cls } from "@libs/client/utils";

interface MessageProps {
    reverse: boolean;
    message: string;
}

export default function Message({ reverse, message }: MessageProps) {
    return (
        <div
            className={cls(
                "flex items-start space-x-2",
                reverse ? "flex-row-reverse space-x-reverse" : ""
            )}
        >
            <div className='w-8 h-8 rounded-full bg-slate-400' />
            <div className='w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md'>
                <p>{message}</p>
            </div>
        </div>
    );
}
