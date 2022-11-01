import Modals from "@components/modal";
import React, { ReactComponentElement, useMemo, useState } from "react";
import {
    ModalDispatch,
    ModalsDispatchContext,
    ModalsStateContext,
    ModalState,
} from "./modalContext";

interface ModalsProviderProps {
    children: React.ReactNode;
}

const ModalsProvider = ({ children }: ModalsProviderProps) => {
    const [openModals, setOpenModals] = useState<ModalState[]>([]);
    const open = ({ modalType, props }: ModalState) => {
        setOpenModals((modals) => [...modals, { modalType, props }]);
    };

    const close = (modalType: string) => {
        setOpenModals((modals) =>
            modals.filter((modal) => modal.modalType !== modalType)
        );
    };

    const dispatch = useMemo<ModalDispatch>(() => ({ open, close }), []);
    return (
        <ModalsStateContext.Provider value={openModals}>
            <ModalsDispatchContext.Provider value={dispatch}>
                {children}
                <Modals />
            </ModalsDispatchContext.Provider>
        </ModalsStateContext.Provider>
    );
};
export default ModalsProvider;
