import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { IFlight } from "./types/flights.types";
import { deleteFlight, getFlights } from "./api/endpoints";
import Table from "./components/global/Table/Table";
import Pagination from "./components/global/Pagination/Pagination";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ImagePreview } from "./components/global/ImagePreview/ImagePreview";
import Modal from "./components/global/Modal/Modal";
import useDebouncedSearch from "./hooks/useDebouncedSearch";
import { Input } from "./components/global/Input/Input";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [flights, setFlights] = useState<IFlight[]>();
  const [pageSize, setPageSize] = useState(
    searchParams.get("size") ? Number(searchParams.get("size")) : 10
  );
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1
  );
  const [totalPages, setTotalPages] = useState(
    searchParams.get("totalPages") ? Number(searchParams.get("totalPages")) : 1
  );
  const [imagePreviewSrc, setImagePreviewSrc] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("code") || ""
  );

  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 500, 3);

  const handleGetFlights = useCallback(() => {
    // add conditions for when search params are not numbers redirect to  /bad-request
    if (
      isNaN(currentPage) ||
      isNaN(pageSize) ||
      currentPage < 1 ||
      pageSize < 1 ||
      currentPage > totalPages
    ) {
      navigate("/bad-request");
      return;
    }
    getFlights({
      size: pageSize,
      page: currentPage,
      code: debouncedSearchTerm,
    }).then((data) => {
      setFlights(data?.resources || []);
      setTotalPages(data ? Math.ceil(data?.total / pageSize) : 0);
      updateSearchParams({
        _totalPages: data ? Math.ceil(data?.total / pageSize) : 0,
      });
    });
  }, [pageSize, currentPage, totalPages, navigate, debouncedSearchTerm]);

  const handleDeleteFlight = () => {
    deleteFlight(selectedFlightId).then(() => {
      handleGetFlights();
      setIsModalOpen(false);
    });
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    updateSearchParams({ _page: page });
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
    updateSearchParams({ _size: pageSize });
  };

  const updateSearchParams = ({
    _page = currentPage,
    _size = pageSize,
    _totalPages = totalPages,
    _code = searchTerm,
  } = {}) => {
    setSearchParams({
      size: _size.toString(),
      page: _page.toString(),
      totalPages: _totalPages.toString(),
      code: _code,
    });
  };

  useEffect(() => {
    handleGetFlights();
  }, [handleGetFlights]);

  useEffect(() => {
    updateSearchParams({ _code: debouncedSearchTerm });
  }, [searchParams]);

  return (
    <>
      <Input
        type="text"
        maxLength={6}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        required={false}
      />
      <Link to="/create-flight">
        <button>Create Flight</button>
      </Link>
      {flights?.length ? (
        <>
          <Table
            headers={["Code", "Capacity", "Departure Date", "Image", "Actions"]}
            data={flights || []}
            onImageClick={setImagePreviewSrc}
            deleteFlight={(id) => {
              setSelectedFlightId(id);
              setIsModalOpen(true);
            }}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={onPageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      ) : (
        <div>No Results</div>
      )}
      {imagePreviewSrc && (
        <ImagePreview
          src={imagePreviewSrc}
          alt="flight preview"
          handleClose={() => setImagePreviewSrc("")}
        />
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          handleClose={() => {
            setIsModalOpen(false);
            setSelectedFlightId("");
          }}
          text="Are you sure you want to delete this flight?"
          handleConfirm={handleDeleteFlight}
        />
      )}
    </>
  );
}

export default App;
