import { useState } from "react";
import "./Pagination.css";

const Pagination = ({ page, setPage, limit, setOffset, offset }) => {
  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => {
          setPage(page - 1);
          setOffset(offset - 40);
        }}
      >
        {"<"}
      </button>
      <p>{page}</p>
      <button
        disabled={page === limit}
        onClick={() => {
          setPage(page + 1);
          setOffset(offset + 40);
        }}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;