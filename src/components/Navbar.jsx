import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-teal-800 text-white flex justify-between items-center px-6 py-3">
      <div className="flex items-center gap-2">
        {/* <img
          src="https://via.placeholder.com/50"
          alt="Logo"
          className="h-10 w-10 rounded-full"
        /> */}
        <h1 className="font-bold text-lg ml-20">
          PEMIRA POLINELA
        </h1>
      </div>
      <ul className="flex gap-8 mr-20 -ml-4 font-bold text-md">
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
          <a href="#" className="hover:text-yellow-300">
            Hasil Quick Count
          </a>
        </li>
        <li>
          <Link to="/galeri" className="hover:text-yellow-300">
            Galeri
          </Link>
        </li>
        {/* <li>
          <a href="#" className="hover:text-yellow-300">
            Login 🔒
          </a>
        </li> */}
      </ul>
    </nav>
  );
}
