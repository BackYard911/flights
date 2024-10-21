import { IImagePreviewProps } from "./image-preview.types";
import styles from "./image-preview.module.css";

export function ImagePreview({ src, alt, handleClose }: IImagePreviewProps) {
    return (
        <div className={styles["image-preview-container"]}>
            <button onClick={handleClose}>X</button>
            <img src={`http://localhost:3000/uploads/${src}.png`} alt={alt} />
        </div>
    );
}