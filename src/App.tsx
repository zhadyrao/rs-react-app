import { Component } from 'react';
import SearchBar from './components/SearchBar.tsx';
import LoadingBar from './components/LoadingBar/LoadingBar.tsx';
import type { Starship } from './common/types.ts';
import ResultsList from './components/ResultsList.tsx';
import { BASE_URL } from './common/constants.ts';

interface AppState {
  searchTerm: string;
  starships: Starship[];
  loading: boolean;
  error: string | null;
  throwError: boolean;
}

class App extends Component<object, AppState> {
  state: AppState = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    starships: [],
    loading: false,
    error: null,
    throwError: false,
  };

  componentDidMount() {
    this.handleSearch(this.state.searchTerm);
  }

  fetchData = (term: string = '') => {
    const trimmed = term.trim();
    const url = trimmed
      ? `${BASE_URL}?name=${trimmed}`
      : `${BASE_URL}?expanded=true`;

    this.setState({ loading: true, error: null });

    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        this.setState({
          starships: trimmed ? data.result : data.results,
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ error: err.message, loading: false });
      });
  };

  handleSearch = (newTerm: string) => {
    localStorage.setItem('searchTerm', newTerm.trim());
    this.setState({ searchTerm: newTerm }, () => {
      this.fetchData(newTerm);
    });
  };

  render() {
    const { searchTerm, starships, loading, error, throwError } = this.state;

    if (throwError) {
      throw new Error('Тестовая ошибка в render()!');
    }

    return (
      <div className="min-h-screen items-center justify-center">
        <SearchBar searchTerm={searchTerm} onSearch={this.handleSearch} />
        {loading && <LoadingBar />}
        {error && <div className="text-red-600 mt-4">{error}</div>}
        {!loading && !error && <ResultsList starships={starships} />}
        <button
          type="button"
          onClick={() => this.setState({ throwError: true })}
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
  }
}

export default App;
