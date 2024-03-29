import { useEffect } from "react";

interface AlertProps {
    message?: string;
    confirmText?: string;
    onSubmit?: () => void;
    onClose: () => void;
}

const AlertModal = ({
    message,
    confirmText = "OK",
    onSubmit,
    onClose,
}: AlertProps) => {
    const onAlertSubmit = () => {
        if (typeof onSubmit === "function") {
            onSubmit();
        }
        onClose();
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <div className='bg-stone-700 bg-opacity-80  z-30 fixed w-full h-full top-0 left-0 flex justify-center items-center '>
            <div className='absolute p-4 pl-7 bg-white rounded-lg max-w-md w-96 h-52 max-h-60 space-y-3'>
                <div className='flex flex-1 justify-end'>
                    <button onClick={onClose}>X</button>
                </div>
                <div className='h-2/5 flex flex-col space-y-2'>
                    <span className='font-bold text-lg'>{message}</span>
                </div>
                <div className='flex justify-end'>
                    <button
                        onClick={onAlertSubmit}
                        className='text-white bg-red-600 w-20 p-2 rounded-md'
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;
