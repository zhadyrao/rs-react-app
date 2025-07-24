import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface Props {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchTerm, onSearch }) => {
  const [input, setInput] = useState<string>(searchTerm || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search Starships..."
        className="border px-4 py-2 flex-1"
        role="textbox"
      />
      <button type="submit" className="bg-red-500 text-white px-4 py-2">
        Search item
      </button>
    </form>
  );
};

export default SearchBar;
