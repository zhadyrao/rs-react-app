import { Component } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface Props {
  searchTerm: string;
  onSearch: (term: string) => void;
}

interface State {
  input: string;
}

class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { input: props.searchTerm || '' };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.onSearch(this.state.input);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
          placeholder="Search Starships..."
          className="border px-4 py-2 flex-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;
