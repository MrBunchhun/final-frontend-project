import { useNavigate } from "react-router-dom";
import { movieStore } from "../store/movieStore"; // Adjust path as needed

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const setCurrentMovie = movieStore((state) => state.setCurrentMovie);

  const handleClick = () => {
    setCurrentMovie(movie);
    navigate(`/movie/${movie.tmdb_id}`);
  };

  const fontSize = () => {
    const length = movie.title.length;
    if (length > 25) return "text-[18px]";
    if (length > 15) return "text-[24px]";
    return "text-[28px]";
  };

  const imageSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "/placeholder.jpg"; // Replace with your default image

  return (
    <div
      role="button"
      onClick={handleClick}
      aria-label={`Open movie ${movie.title}`}
      className="w-full h-[550px] rounded-2xl shadow-md bg-[#1a1a1a] flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-xl transition duration-300 group"
    >
      {/* Image */}
      <div className="overflow-hidden h-[350px] w-full">
        <img
          src={imageSrc}
          alt={movie.title}
          className="h-full w-full object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="px-6 py-4 text-center flex flex-col items-center">
        <h5
          className={`font-semibold tracking-tight text-white truncate ${fontSize()}`}
        >
          {movie.title}
        </h5>
        <p className="text-sm text-gray-400 mt-1">{movie.release_date}</p>

        {/* Rating */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="text-yellow-500 text-sm font-medium">Rated:</span>
          <span className="bg-yellow-300 text-black text-sm font-bold px-2.5 py-1 rounded-full w-[45px] flex justify-center items-center shadow-sm">
            {Number(movie.vote_average).toFixed(1)}
          </span>
        </div>

        {/* Kind Footer Message */}
        <p className="text-xs text-gray-500 italic mt-4">
          “Thanks for watching with us.”
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
