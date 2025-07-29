import { useEffect } from 'react';
import LoadingBar from '../LoadingBar/LoadingBar.tsx';
import { useNavigate } from 'react-router-dom';
import { fetchStarships } from '../../features/starships/starshipSlice.ts';
import { useAppDispatch, useAppSelector } from '../utils/hooks.ts';

interface ResultsListProps {
  currentPage: string;
}

const ResultsList = ({ currentPage }: ResultsListProps) => {
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  // const [data, setData] = useState<StarshipsResponse | null>(null);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       setLoading(true);
  //       const result = await fetchStarships(url);
  //       setData(result);
  //       setError(null);
  //     } catch (err) {
  //       setError((err as Error).message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   loadData();
  // }, [url]);

  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.starshipSlice);

  useEffect(() => {
    dispatch(fetchStarships(currentPage));
  }, [dispatch]);

  // const handlePageChange = (newPage: number) => {
  //   navigate(`/${newPage}`);
  // };

  if (loading) {
    return <LoadingBar />;
  }
  // else if (error) {
  //   return <div className="text-red-600 mt-4">{error}</div>;
  // }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list?.map((starship, index) => (
          <div
            key={index}
            onClick={() => navigate(`/${currentPage}/${starship.id}`)}
            className="cursor-pointer"
          >
            <p>1</p>
            {/*<Card key={index} starship={starship} />*/}
          </div>
        ))}
      </div>
      {/*<Pagination*/}
      {/*  next={data?.next || null}*/}
      {/*  previous={data?.previous || null}*/}
      {/*  currentPage={currentPage}*/}
      {/*  onPageChange={handlePageChange}*/}
      {/*/>*/}
    </div>
  );
};

export default ResultsList;
