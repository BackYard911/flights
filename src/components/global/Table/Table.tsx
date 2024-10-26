import { ITableProps } from "./table.types";
import cameraIcon from "../../../assets/camera-icon.svg";
import deleteIcon from "../../../assets/delete-icon.svg";
import editIcon from "../../../assets/edit-icon.svg";
import { Link } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";
import Card from "../Card/Card";
import styles from "./table.module.css";
function Table({ headers, data, onImageClick, deleteFlight }: ITableProps) {
  const windowSize = useWindowSize();
  return (
    <>
      {windowSize[0] > 768 ? (
        <table cellSpacing={0}>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((flight) => (
              <tr key={flight.id} className={styles["table-row"]}>
                <td>{flight.code}</td>
                <td>{flight.capacity}</td>
                <td>{flight.departureDate}</td>
                <td>
                  {flight.img && (
                    <button onClick={() => onImageClick?.(flight.img || "")}>
                      <img src={cameraIcon} alt="camera" />
                    </button>
                  )}
                </td>
                <td>
                  <Link to={`/edit-flight/${flight.id}`}>
                    <button>
                      <img src={editIcon} alt="edit" />
                    </button>
                  </Link>
                  <button onClick={() => deleteFlight(flight.id)}>
                    <img src={deleteIcon} alt="delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        data.map((flight) => (
          <Card
            key={flight.id}
            code={flight.code}
            capacity={flight.capacity}
            departureDate={flight.departureDate}
            img={flight.img}
            id={flight.id}
            onImageClick={() => onImageClick?.(flight.img || "")}
            onDeleteClick={() => deleteFlight(flight.id)}
          />
        ))
      )}
    </>
  );
}

export default Table;
