import { logout } from "../../../api/auth";
import styles from "./toolbar.module.css";

function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <h1>Flights</h1>
      <div className={styles["toolbar-buttons"]}>
        <p>Hello, {localStorage.getItem("name")}</p>
        <button
          onClick={() => {
            logout();
          }}
          className={styles["toolbar-button"]}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
