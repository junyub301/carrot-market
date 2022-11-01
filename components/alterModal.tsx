interface AlertProps {
    message?: string;
    confirmText?: string;
    onSubmit?: (...args: any) => void;
    onClose: () => void;
}

const AlertModal = ({
    message,
    confirmText = "OK",
    onSubmit,
    onClose,
}: AlertProps) => {
    const onAlertSubmit = () => {
        if (onSubmit) {
            onSubmit();
        }
        onClose();
    };
    return (
        <div className='bg-stone-700 z-30 fixed w-full h-full top-0 left-0 flex justify-center items-center'>
            <div className='absolute p-2.5 bg-white rounded-lg'>
                {message}
                <button className='' onClick={onAlertSubmit}>
                    {confirmText}
                </button>
            </div>
        </div>
    );
};

export default AlertModal;
