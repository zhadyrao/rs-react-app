interface PaginationProps {
  next: string | null;
  previous: string | null;
  currentPage: string;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  next,
  previous,
  currentPage,
  onPageChange,
}) => (
  <div className="pagination">
    <button
      disabled={!previous}
      onClick={() => onPageChange(Number(currentPage) - 1)}
      className={
        'bg-green-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed'
      }
    >
      Previous
    </button>
    <span>Page {currentPage}</span>
    <button
      disabled={!next}
      onClick={() => onPageChange(Number(currentPage) + 1)}
      className={
        'bg-green-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed'
      }
    >
      Next
    </button>
  </div>
);

export default Pagination;
