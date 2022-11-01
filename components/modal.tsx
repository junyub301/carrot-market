import {
    ModalsDispatchContext,
    ModalsStateContext,
} from "@libs/context/modalContext";
import React, { useContext } from "react";
import AlertModal from "./alterModal";

export const MODAL_TYPES = {
    ConfirmModal: "ConfirmModal",
    AlertModal: "AlertModal",
    CustomModal: "CustomModal",
};

const MODAL_COMPONENTS: any = {
    // [MODAL_TYPES.ConfirmModal]: ConfirmModal,
    [MODAL_TYPES.AlertModal]: AlertModal,
    // [MODAL_TYPES.CustomModal]: CustomModal,
};

const Modals = () => {
    const openModals = useContext(ModalsStateContext);
    const { close } = useContext(ModalsDispatchContext);
    return (
        <>
            {openModals.map((modal, index) => {
                const { modalType, props } = modal;
                if (!modalType) {
                    return null;
                }
                const ModalComponent = MODAL_COMPONENTS[modalType];
                return (
                    <ModalComponent
                        key={index}
                        {...props}
                        onClose={() => close(modalType)}
                    />
                );
            })}
        </>
    );
};
export default Modals;
