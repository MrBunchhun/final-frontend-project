import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { profileStore } from "../store/profileStore";
import { request } from "../util/request";
import Logo from "../assets/logo.png";
import ConfirmAlert from "./ComfirmAlert";
import FavoriteModal from "./FavoriteModal";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { user, funClear } = profileStore();
  const location = useLocation();
  const navigate = useNavigate();

  const [active, setActive] = useState(location.pathname);
  const [showAlert, setShowAlert] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [message, setMessage] = useState("");

  const dropdownRef = useRef();
  const userDropdownRef = useRef();

  const handleMenuClick = (path) => {
    setActive(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    funClear();
    setShowAlert(false);
    navigate("/login");
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim().length > 1) {
        request(`search?query=${encodeURIComponent(query.trim())}`, "get")
          .then((res) => {
            const allResults = res.results || [];
            const activeMovies = allResults.filter((movie) => movie.status === 1);

            if (allResults.length > 0 && activeMovies.length === 0) {
              setMessage("This movie is not available right now.");
            } else if (allResults.length === 0) {
              setMessage("No movies found.");
            } else {
              setMessage("");
            }

            setResults(activeMovies);
            setShowDropdown(true);
          })
          .catch(() => {
            setMessage("Error while searching.");
            setShowDropdown(false);
          });
      } else {
        setResults([]);
        setShowDropdown(false);
        setMessage("");
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <nav className="bg-black/40 backdrop-blur-md text-white shadow-md z-50 fixed w-full">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center space-x-2" onClick={() => handleMenuClick("/")}>
          <img src={Logo} alt="Logo" className="h-12 w-auto" />
        </Link>

        <div className="flex md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
            {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          {['/', '/toprated', '/nowplaying', '/upcoming'].map((path) => (
            <Link
              key={path}
              to={path}
              className={`hover:text-yellow-400 transition ${active === path ? 'text-yellow-500' : ''}`}
              onClick={() => handleMenuClick(path)}
            >
              {path === '/' ? 'Home' : path.slice(1).replace(/^(.)/, (c) => c.toUpperCase())}
            </Link>
          ))}
          <div ref={dropdownRef} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="text-black px-3 py-1 rounded-md w-48 focus:outline-none"
            />
            {showDropdown && results.length > 0 && (
              <div className="absolute top-10 left-0 z-50 w-72 bg-white text-black shadow-lg rounded-md max-h-64 overflow-y-auto">
                {results.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.tmdb_id}`}
                    className="block px-4 py-2 hover:bg-gray-100 border-b"
                    onClick={() => {
                      setShowDropdown(false);
                      setQuery("");
                    }}
                  >
                    {movie.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative ml-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => document.getElementById("user-dropdown")?.classList.toggle("hidden")}
                className="w-9 h-9 rounded-full overflow-hidden border border-white"
              >
                <img
                  src={user.profileImage || "https://flowbite.com/docs/images/people/profile-picture-3.jpg"}
                  alt="User"
                  className="object-cover w-full h-full"
                />
              </button>
              <div
                id="user-dropdown"
                ref={userDropdownRef}
                className="hidden absolute right-0 z-50 mt-2 w-48 bg-white text-black divide-y rounded-lg shadow"
              >
                <div className="px-4 py-3">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <ul className="py-2">
                  {user.roles?.includes("admin") && (
                    <li>
                      <Link to="/admin" className="block px-4 py-2 text-sm">
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => setShowFavorites(true)}
                      className="block w-full text-left px-4 py-2 text-sm"
                    >
                      Favorites
                    </button>
                    <FavoriteModal isOpen={showFavorites} onClose={() => setShowFavorites(false)} />
                  </li>
                  <li>
                    <button
                      onClick={() => setShowAlert(true)}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/login" className="py-2 px-4 bg-yellow-500 text-black rounded-md hover:bg-yellow-600">
              Login
            </Link>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 py-4 bg-black/90 backdrop-blur-md space-y-3">
          {['/', '/toprated', '/nowplaying', '/upcoming'].map((path) => (
            <Link
              key={path}
              to={path}
              onClick={() => handleMenuClick(path)}
              className="block text-white hover:text-yellow-500"
            >
              {path === '/' ? 'Home' : path.slice(1).replace(/^(.)/, (c) => c.toUpperCase())}
            </Link>
          ))}
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 text-black rounded-md"
            />
            {showDropdown && (
              <div className="absolute top-full left-0 z-50 w-full bg-white text-black shadow-lg rounded-md max-h-64 overflow-y-auto mt-2">
                {message && <div className="px-4 py-2 text-yellow-600 text-sm border-b">{message}</div>}
                {results.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.tmdb_id}`}
                    className="block px-4 py-2 hover:bg-gray-100 border-b"
                    onClick={() => {
                      setShowDropdown(false);
                      setQuery("");
                    }}
                  >
                    {movie.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showAlert && (
        <ConfirmAlert onConfirm={handleLogout} onCancel={() => setShowAlert(false)} />
      )}
    </nav>
  );
};

export default Navbar;