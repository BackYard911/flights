import Select, { CSSObjectWithLabel } from "react-select";
import { IPaginationProps } from "./pagination.types";
import { PAGE_SIZE_OPTIONS } from "../../../consts/generic";
import styles from "./pagination.module.css";

function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: IPaginationProps) {
  const SelectStyles = {
    container: (provided: CSSObjectWithLabel) => ({
      ...provided,
      width: "5em",
      margin: "0.5em auto",
    }),
    control: (provided: CSSObjectWithLabel) => ({
      ...provided,
      background: "#394d6b",
      borderColor: "#394d6b",
      borderRadius: "0.5em",
      color: "white",
      "&:hover": {
        borderColor: "#394d6b",
      },
    }),
    menu: (provided: CSSObjectWithLabel) => ({
      ...provided,
      background: "#394d6b",
      color: "white",
      "&:hover": {
        borderColor: "#394d6b",
      },
    }),
    singleValue: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color: "white",
    }),
  };
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className={styles.pagination}>
      <div className={styles["pagination-buttons-container"]}>
        <div className={styles["pagination-buttons"]}>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>{currentPage}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
        <div>
        <label>
          Total pages:
          <span>{totalPages}</span>
        </label>
      </div>
      </div>
      <div>
        <label>
          <Select
            options={PAGE_SIZE_OPTIONS}
            onChange={(value) => onPageSizeChange(value?.value as number)}
            defaultValue={{ value: pageSize, label: pageSize.toString() }}
            styles={SelectStyles}
            />
            Page size
        </label>

      </div>
    </div>
  );
}

export default Pagination;
