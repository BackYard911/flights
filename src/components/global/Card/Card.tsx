import { ICardProps } from "./card.types";
import styles from "./card.module.css";
import cameraIcon from "../../../assets/camera-icon.svg";
import editIcon from "../../../assets/edit-icon.svg";
import deleteIcon from "../../../assets/delete-icon.svg";
import { Link } from "react-router-dom";

function Card({
  code,
  capacity,
  departureDate,
  img,
  id,
  onImageClick,
  onDeleteClick,
}: ICardProps) {
  return (
    <div className={styles.card}>
      <div className={styles["card-header"]}>
        <p className={styles["card-header-code"]}>Code: {code}</p>
        <p className={styles["card-header-capacity"]}>Capacity: {capacity}</p>
      </div>
      <div className={styles["card-body"]}>
        <p className={styles["card-body-departure-date"]}>
          Departure date: {departureDate}
        </p>
      </div>
      <div className={styles["card-footer"]}>
        {img && (
          <button
            className={styles["card-footer-button"]}
            onClick={onImageClick}
          >
            <img src={cameraIcon} alt="camera" />
          </button>
        )}
         <Link to={`/edit-flight/${id}`}>
                    <button>
                      <img src={editIcon} alt="edit" />
                    </button>
                  </Link>
        <button
          className={styles["card-footer-button"]}
          onClick={onDeleteClick}
        >
          <img src={deleteIcon} alt="delete" />
        </button>
      </div>
    </div>
  );
}

export default Card;
