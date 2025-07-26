import Card from '../Card/Card.tsx';
import type { Starship } from '../../common/types.ts';
import SearchBar from '../SearchBar/SearchBar.tsx';
import { useEffect, useState } from 'react';
import useLocalStorage from '../utils/useLocalStorage.tsx';
import LoadingBar from '../LoadingBar/LoadingBar.tsx';

const ResultsList = () => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');

  useEffect(() => {
    handleSearch(searchTerm);
  }, []);

  const fetchData = async (term: string = ''): Promise<void> => {
    const trimmed = term.trim();
    const url = trimmed
      ? `https://www.swapi.tech/api/starships?name=${trimmed}`
      : `https://www.swapi.tech/api/starships?expanded=true`;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      const data: { result?: Starship[]; results?: Starship[] } =
        await res.json();
      setStarships(trimmed ? (data.result ?? []) : (data.results ?? []));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newTerm: string): void => {
    const trimmed = newTerm.trim();
    setSearchTerm(trimmed);
    fetchData(trimmed);
  };

  return (
    <div>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      {loading && <LoadingBar />}
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {(!starships || starships.length === 0) && (
        <p className="text-gray-500">No results found</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {starships.map((starship, index) => (
          <Card key={index} starship={starship} />
        ))}
      </div>
    </div>
  );
};

export default ResultsList;
