interface IModalProps {
    isOpen: boolean;
    handleClose: () => void;
    text: string;
    handleConfirm: () => void;
}

export type { IModalProps };