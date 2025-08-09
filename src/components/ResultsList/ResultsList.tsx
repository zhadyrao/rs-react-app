import LoadingBar from '../LoadingBar/LoadingBar.tsx';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination.tsx';
import Card from '../Card/Card.tsx';
import Flyout from '../Flyout/Flyout.tsx';
import { useGetStarshipsQuery } from '../services/starships.ts';

interface ResultsListProps {
  currentPage: string;
}

const ResultsList = ({ currentPage }: ResultsListProps) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetStarshipsQuery(currentPage);

  const handlePageChange = (newPage: number) => {
    navigate(`/${newPage}`);
  };

  if (isLoading) {
    return <LoadingBar />;
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.results?.map((starship, index) => (
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
        next={data?.next}
        previous={data?.previous}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Flyout />
    </div>
  );
};

export default ResultsList;
