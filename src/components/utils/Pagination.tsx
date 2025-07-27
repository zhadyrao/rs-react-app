interface PaginationProps {
  next: string | null;
  previous: string | null;
  onPageChange: (url: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  next,
  previous,
  onPageChange,
}) => (
  <div className="pagination">
    <button
      disabled={!previous}
      onClick={() => previous && onPageChange(previous)}
    >
      Previous
    </button>
    <button disabled={!next} onClick={() => next && onPageChange(next)}>
      Next
    </button>
  </div>
);

export default Pagination;
