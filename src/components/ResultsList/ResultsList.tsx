import { useEffect } from 'react';
import LoadingBar from '../LoadingBar/LoadingBar.tsx';
import { useNavigate } from 'react-router-dom';
import { fetchStarships } from '../../features/starships/starshipSlice.ts';
import { useAppDispatch, useAppSelector } from '../utils/hooks.ts';
import Pagination from '../utils/Pagination.tsx';
import Card from '../Card/Card.tsx';

interface ResultsListProps {
  currentPage: string;
}

const ResultsList = ({ currentPage }: ResultsListProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { starShipsList, loading, next, previous } = useAppSelector(
    (state) => state.starshipSlice
  );

  useEffect(() => {
    dispatch(fetchStarships(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage: number) => {
    navigate(`/${newPage}`);
  };

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {starShipsList?.map((starship, index) => (
          <div
            key={index}
            onClick={() => navigate(`/${currentPage}/${starship.id}`)}
            className="cursor-pointer"
          >
            <Card key={index} starship={starship} />
          </div>
        ))}
      </div>
      <Pagination
        next={next}
        previous={previous}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ResultsList;
