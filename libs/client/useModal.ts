import { ModalsDispatchContext, ModalState } from "./../context/modalContext";
import { useContext } from "react";

export default function useModal() {
    const { open, close } = useContext(ModalsDispatchContext);

    const openModal = ({ modalType, props }: ModalState) => {
        open({ modalType, props });
    };

    const closeModal = (modalType: string) => close(modalType);

    return { openModal, closeModal };
}
