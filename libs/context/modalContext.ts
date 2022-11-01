import { createContext } from "react";

export interface ModalState {
    modalType?: "AlertModal" | "ConfirmModal" | "CustomModal";
    props?: any;
}

export interface ModalDispatch {
    open: ({ modalType, props }: ModalState) => void;
    close: (modalType: string) => void;
}

export const ModalsDispatchContext = createContext<ModalDispatch>({
    open: () => {},
    close: () => {},
});
export const ModalsStateContext = createContext<ModalState[]>([{}]);
