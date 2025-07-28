import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center w-100">
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
  );
};

export default Navbar;
