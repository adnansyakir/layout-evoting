import { Link } from "react-router-dom";
import { Home, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-blue-800 text-white flex items-center justify-between px-4 sm:px-6 md:px-12 py-3">
      <h1 className="font-bold text-base sm:text-lg md:ml-12 lg:ml-20">
        PEMIRA POLINELA
      </h1>
      {/* Hamburger menu for mobile */}
      <div className="sm:hidden">
        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="focus:outline-none"
        >
          <Menu size={32} />
        </button>
      </div>
      {/* Menu for desktop */}
      <ul className="hidden sm:flex gap-6 md:gap-8 font-bold text-md md:text-lg">
        <li className="flex items-center gap-1">
          <Home size={16} className="inline-block text-white" />
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/sambutan" className="hover:text-yellow-300">
            Sambutan
          </Link>
        </li>
        <li>
          <Link to="/kandidat" className="hover:text-yellow-300">
            Kandidat
          </Link>
        </li>
        <li>
          <Link to="/quickcount" className="hover:text-yellow-300">
            Quick Count
          </Link>
        </li>
        <li>
          <Link to="/hasil-quickcount" className="hover:text-yellow-300">
            Hasil Quick Count
          </Link>
        </li>
        <li>
          <Link to="/galeri" className="hover:text-yellow-300">
            Galeri
          </Link>
        </li>
      </ul>
      {/* Dropdown menu for mobile */}
      {menuOpen && (
        <ul className="absolute top-16 right-4 bg-blue-900 rounded-lg shadow-lg flex flex-col gap-2 p-4 z-50 w-48 sm:hidden animate-fadein">
          <li className="flex items-center gap-1">
            <Home size={16} className="inline-block text-white" />
            <Link
              to="/"
              className="hover:text-yellow-300"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/sambutan"
              className="hover:text-yellow-300"
              onClick={() => setMenuOpen(false)}
            >
              Sambutan
            </Link>
          </li>
          <li>
            <Link
              to="/kandidat"
              className="hover:text-yellow-300"
              onClick={() => setMenuOpen(false)}
            >
              Kandidat
            </Link>
          </li>
          <li>
            <Link
              to="/quickcount"
              className="hover:text-yellow-300"
              onClick={() => setMenuOpen(false)}
            >
              Quick Count
            </Link>
          </li>
          <li>
            <Link
              to="/hasil-quickcount"
              className="hover:text-yellow-300"
              onClick={() => setMenuOpen(false)}
            >
              Hasil Quick Count
            </Link>
          </li>
          <li>
            <Link
              to="/galeri"
              className="hover:text-yellow-300"
              onClick={() => setMenuOpen(false)}
            >
              Galeri
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
