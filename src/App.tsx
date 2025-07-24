import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import LoadingBar from './components/LoadingBar/LoadingBar.tsx';
import ResultsList from './components/ResultsList/ResultsList.tsx';
import type { Starship } from './common/types.ts';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(
    () => localStorage.getItem('searchTerm') || ''
  );
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [throwError, setThrowError] = useState<boolean>(false);

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
    localStorage.setItem('searchTerm', trimmed);
    setSearchTerm(trimmed);
    fetchData(trimmed);
  };

  if (throwError) {
    throw new Error('Тестовая ошибка в render()!');
  }

  return (
    <div className="min-h-screen items-center justify-center">
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      {loading && <LoadingBar />}
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {!loading && !error && <ResultsList starships={starships} />}
      <button
        type="button"
        onClick={() => setThrowError(true)}
        style={{
          marginTop: '1rem',
          backgroundColor: 'tomato',
          color: 'white',
          padding: '0.5rem',
        }}
      >
        Test Error
      </button>
    </div>
  );
};

export default App;
