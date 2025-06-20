import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold">Mango Movie</h1>
            <p className="text-sm">Thank you for visiting. We’re glad you're here.</p>
          </div>
          <ul className="flex space-x-6 text-sm font-medium">
            <li>
              <a href="/" className="hover:underline hover:text-yellow-400 transition-colors duration-300">
                Home
              </a>
            </li>
            <li>
              <Link to="/toprated" className="hover:underline hover:text-yellow-400 transition-colors duration-300">
                Top rated
              </Link>
            </li>
            <li>
              <Link to="nowplaying" className="hover:underline hover:text-yellow-400 transition-colors duration-300">
                Now playing
              </Link>
            </li>
            <li>
              <Link to="/upcoming" className="hover:underline hover:text-yellow-400 transition-colors duration-300">
                Upcoming
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-600" />
        <p className="text-center text-sm font-medium">© 2025 YourCompany. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
