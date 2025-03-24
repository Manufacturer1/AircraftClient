import React, { useState } from "react";
import chevronLeftIcon from "../images/chevronLeftLarge.svg";
import menuIcon from "../images/menu5.svg";

const CustomPagination = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;

    buttons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`px-3 py-1 mx-1 rounded-[4px] ${
          currentPage === 1
            ? "bg-[#11D396FF] border-2 border-solid border-[#11D396FF] \
             text-white hover:bg-[#0FBE86FF] hover:active:bg-[#0EA776FF] transition-all duration-150"
            : "text-[#9095A0FF] border-2 border-solid border-[#DEE1E6FF] hover:text-[#6E7787FF] \
             hover:active:text-[ #565E6CFF] transition-all duration-150"
        }`}
      >
        1
      </button>
    );

    if (currentPage > maxButtons - 2) {
      buttons.push(
        <button
          key="end-ellipsis"
          className="text-neutral-500 bg-white
        rounded-[4px] flex justify-center items-center
        border-2 border-solid border-[#DEE1E6FF]
        px-2 py-2 mx-1"
        >
          <img className="w-4" src={menuIcon} />
        </button>
      );
    }

    for (
      let i = Math.max(2, currentPage - 2);
      i <= Math.min(totalPages - 1, currentPage + 2);
      i++
    ) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded-[4px] border-2 border-solid border-[#11D396FF] ${
            currentPage === i
              ? "bg-[#11D396FF]  \
               text-white hover:bg-[#0FBE86FF] hover:active:bg-[#0EA776FF] transition-all duration-150"
              : "text-[#9095A0FF] border-2 border-solid border-[#DEE1E6FF] hover:text-[#6E7787FF] \
               hover:active:text-[ #565E6CFF] transition-all duration-150"
          }`}
        >
          {i}
        </button>
      );
    }

    // Show ellipsis if current page is far from the end
    if (currentPage < totalPages - (maxButtons - 2)) {
      buttons.push(
        <button
          key="start-ellipsis"
          className="text-neutral-500 bg-white
            rounded-[4px] flex justify-center items-center
            border-2 border-solid border-[#DEE1E6FF]
            px-2 py-2 mx-1"
        >
          <img className="w-4" src={menuIcon} />
        </button>
      );
    }

    // Always show the last page
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 mx-1 rounded-[4px] ${
            currentPage === totalPages
              ? "bg-[#11D396FF] border-2 border-solid border-[#11D396FF] \
               text-white hover:bg-[#0FBE86FF] hover:active:bg-[#0EA776FF] transition-all duration-150"
              : "text-[#9095A0FF] border-2 border-solid border-[#DEE1E6FF] hover:text-[#6E7787FF] \
               hover:active:text-[ #565E6CFF] transition-all duration-150"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex items-center justify-end my-4">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-1 py-1 mx-1 
        flex items-center 
        justify-center 
        rounded-[4px]
         bg-white disabled:opacity-40
         hover:bg-[#EAECEFFF] hover:active:bg-[#DEE1E6FF]
         transition-all duration-150 cursor-pointer disabled:cursor-not-allowed"
      >
        <img className="block w-7" src={chevronLeftIcon} />
      </button>

      {/* Pagination Buttons */}
      {renderPaginationButtons()}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-1 py-1
         mx-1 bg-white disabled:opacity-40
         rounded-[4px]
         hover:bg-[#EAECEFFF] hover:active:bg-[#DEE1E6FF]
         transition-all duration-150 cursor-pointer disabled:cursor-not-allowed "
      >
        <img className="block w-7 transform rotate-180" src={chevronLeftIcon} />
      </button>
    </div>
  );
};

export default CustomPagination;
