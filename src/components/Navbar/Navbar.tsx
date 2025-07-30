import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext/ThemeContext.tsx';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="bg-gray-800 flex justify-between w-full">
      <nav className="text-white px-4 py-3 flex justify-between items-center w-100">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mb-6 text-blue-600 ">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
          className="border p-1 rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
