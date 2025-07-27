import Card from '../Card/Card.tsx';
import { useEffect, useState } from 'react';
import LoadingBar from '../LoadingBar/LoadingBar.tsx';
import Pagination from '../utils/Pagination.tsx';
import type { StarshipsResponse } from '../utils/types.ts';
import { fetchStarships } from '../utils/api.ts';
import { useSearchParams } from 'react-router-dom';

const ResultsList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<StarshipsResponse | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') ?? '1');
  const url = `https://www.swapi.tech/api/starships?expanded=true&limit=10&page=${currentPage}`;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchStarships(url);
        setData(result);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [url]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  if (loading) {
    return <LoadingBar />;
  } else if (error) {
    return <div className="text-red-600 mt-4">{error}</div>;
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.results.map((starship, index) => (
          <Card key={index} starship={starship} />
        ))}
      </div>
      <Pagination
        next={data?.next || null}
        previous={data?.previous || null}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ResultsList;
