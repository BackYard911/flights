import { IPaginationProps } from "./pagination.types";

function Pagination ({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange }: IPaginationProps) {
    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    return (
        <div>
            <div>
                <label>
                    Page size:
                    <select
                        value={pageSize}
                        onChange={(event) => onPageSizeChange(Number(event.target.value))}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </label>
            </div>
            <div>
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                <span>{currentPage}</span>
                <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
            <div>
                <label>
                    Total pages:
                    <span>{totalPages}</span>
                </label>
            </div>
        </div>
    );
}

export default Pagination