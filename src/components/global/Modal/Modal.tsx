import { IModalProps } from "./modal.types";
import styles from "./modal.module.css";

function Modal({ isOpen, handleClose, text, handleConfirm }: IModalProps) {
    return (
        <dialog
            open={isOpen}
            className={styles.modal}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div
                className="modal-content"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="modal-text">{text}</div>
                <div className="modal-buttons">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleConfirm();
                        }}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </dialog>
    );
}

export default Modal;