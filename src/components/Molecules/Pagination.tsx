import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate }) => {
  const getPagination = () => {
    const pages = [];
    const leftLimit = Math.max(currentPage - 1, 1);
    const rightLimit = Math.min(currentPage + 1, totalPages);

    if (leftLimit > 1) {
      pages.push(1);
      if (leftLimit > 2) pages.push('...');
    }

    for (let i = leftLimit; i <= rightLimit; i++) {
      pages.push(i);
    }

    if (rightLimit < totalPages - 1) {
      pages.push('...');
    }
    if (rightLimit < totalPages) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (pageNumber: number) => {
    paginate(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex justify-center mt-8">
      <ul className="flex space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 rounded ${currentPage === 1 ? 'bg-white hover:bg-gray-200 hover:text-blue-950 text-gray-400 border border-gray-300 font-bold' : 'text-blue-950 hover:bg-gray-200 border border-gray-300'}`}
        >
          <IoIosArrowBack />
        </button>
        {getPagination().map((page, index) => (
          <li key={index} className="flex">
            {typeof page === 'number' ? (
              <button
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${currentPage === page ? 'bg-white hover:bg-blue-950 hover:text-white text-blue-950 border border-blue-950 font-bold' : 'text-blue-950 hover:bg-gray-200 border border-gray-300'}`}
              >
                {page}
              </button>
            ) : (
              <span className="px-3 py-1 text-gray-500">...</span>
            )}
          </li>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 rounded ${currentPage === totalPages ? 'text-white hover:bg-gray-200 border border-gray-300 bg-white' : 'hover:bg-gray-200 hover:text-blue-950 text-gray-400 border border-gray-300 font-bold'}`}
        >
          <IoIosArrowForward />
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
