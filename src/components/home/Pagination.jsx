import React from "react";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <ul className="pagination d-flex justify-content-center">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${
              pageNumber === currentPage ? "active" : ""
            }`}
          >
            <button
              className="page-link me-2"
              style={{
                backgroundColor: "#ffc107",
                borderColor: "#ffc107",
                color: "#fff",
              }}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        )
      )}
    </ul>
  );
};

export default Pagination;
